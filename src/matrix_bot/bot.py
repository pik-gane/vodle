# bot.py
import asyncio
import logging
import os
import random
import sqlite3
import time
from datetime import datetime
from typing import Dict, Tuple

from nio import AsyncClient, ClientConfig, MatrixRoom, RoomMessageText, RoomMemberEvent

logging.basicConfig(level=logging.INFO)

DATABASE_PATH = os.environ.get("DATABASE_PATH", "/data/polls.db")
deadline_event = asyncio.Event()

async def create_database():
    """Creates the SQLite database and the deadline index if it doesn't exist."""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS polls (
                room_id TEXT NOT NULL,
                poll_id TEXT NOT NULL,
                deadline TEXT NOT NULL,
                PRIMARY KEY (room_id, poll_id)
            )
        """)
        await db.execute("CREATE INDEX IF NOT EXISTS idx_deadline ON polls (deadline)")
        await db.commit()

async def store_deadline(room_id: str, poll_id: str, deadline: str) -> bool:
    """Stores a deadline in the database and sets the event."""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute(
            "SELECT deadline FROM polls WHERE room_id = ? AND poll_id = ?",
            (room_id, poll_id),
        )
        existing_deadline = await cursor.fetchone()

        if existing_deadline:
            return False

        await db.execute(
            "INSERT INTO polls (room_id, poll_id, deadline) VALUES (?, ?, ?)",
            (room_id, poll_id, deadline),
        )
        await db.commit()
        deadline_event.set()
        return True

async def get_next_deadline_from_db() -> Tuple[datetime, str, str] | None:
    """Retrieves the next upcoming deadline from the database."""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute("SELECT room_id, poll_id, deadline FROM polls ORDER BY deadline LIMIT 1")
        row = await cursor.fetchone()
        if row:
            try:
                return datetime.fromisoformat(row[2]), row[0], row[1]
            except ValueError:
                logging.warning(f"Invalid datetime format in database: {row[2]}")
        return None

async def delete_deadline(room_id: str, poll_id: str):
    """Deletes a deadline from the database."""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute("DELETE FROM polls WHERE room_id = ? AND poll_id = ?", (room_id, poll_id))
        await db.commit()

async def send_message(client: AsyncClient, room_id: str, content: Dict):
    """Sends a message to the specified room."""
    await client.room_send(
        room_id=room_id,
        event_type="m.room.message",
        content={"msgtype": "m.text", "body": str(content)},
    )

async def handle_invite(client: AsyncClient, room: MatrixRoom, event: RoomMemberEvent):
    """Handles room invitations by joining the room."""
    if event.membership == "invite" and event.state_key == client.user_id:
        logging.info(f"Joining room {room.room_id}...")
        await client.join(room.room_id)

async def handle_message(client: AsyncClient, room: MatrixRoom, event: RoomMessageText):
    """Handles received messages."""
    if event.sender == client.user_id:
        return

    if event.room_id not in client.rooms:
        return

    if event.content.get("msgtype") == "m.text":
        try:
            message_content = eval(event.content["body"])
            if isinstance(message_content, dict) and all(key in message_content for key in ["room_id", "poll_id", "deadline"]):
                received_room_id = message_content["room_id"]
                received_poll_id = message_content["poll_id"]
                received_deadline_str = message_content["deadline"]
                try:
                    datetime.fromisoformat(received_deadline_str)
                    stored = await store_deadline(received_room_id, received_poll_id, received_deadline_str)
                    if not stored:
                        await send_message(
                            client,
                            event.room_id,
                            {"msgtype": "m.text", "body": f"Warning: Someone attempted to change the deadline for poll '{received_poll_id}' in this room."},
                        )
                    else:
                        logging.info(f"Stored deadline for room {received_room_id}, poll {received_poll_id}: {received_deadline_str}")
                except ValueError:
                    logging.warning(f"Invalid datetime format received: {received_deadline_str}")
                except sqlite3.IntegrityError:
                    logging.warning(f"Attempted to add duplicate entry: room_id={received_room_id}, poll_id={received_poll_id}")
        except (SyntaxError, TypeError, NameError):
            pass

async def deadline_checker(client: AsyncClient):
    """Checks for the next upcoming deadline from the database and sends messages."""
    while True:
        next_deadline_item = await get_next_deadline_from_db()
        if not next_deadline_item:
            await asyncio.sleep(60)
            continue

        next_deadline_dt, room_id, poll_id = next_deadline_item
        now = datetime.utcnow()

        if next_deadline_dt <= now:
            seed = random.randint(0, 2**32 - 1)
            await send_message(
                client,
                room_id,
                {
                    "room_id": room_id,
                    "poll_id": poll_id,
                    "deadline": next_deadline_dt.isoformat(),
                    "status": "closed",
                    "seed": seed,
                },
            )
            await delete_deadline(room_id, poll_id)
            continue  # Check for the next immediate deadline
        else:
            sleep_duration = (next_deadline_dt - now).total_seconds()
            logging.info(f"Next deadline in {sleep_duration:.2f} seconds for room {room_id}, poll {poll_id}")
            try:
                await asyncio.wait_for(deadline_event.wait(), timeout=sleep_duration)
            except asyncio.TimeoutError:
                pass
            finally:
                deadline_event.clear()

async def main():
    """Main entry point for the bot."""
    homeserver = "localhost" # os.environ.get("MATRIX_SERVER")
    username = "vodle_bot" # os.environ.get("MATRIX_USERNAME")
    password_path = "/run/secrets/matrix_password"
    try:
        with open(password_path, "r") as f:
            password = f.read().strip()
    except FileNotFoundError:
        password = os.environ.get("MATRIX_PASSWORD")
        if not password:
            logging.error("Matrix password not found in secret or environment variable.")
            return

    if not homeserver or not username or not password:
        logging.error("Matrix server, username, or password not configured.")
        return

    config = ClientConfig(store_sync_tokens=True)
    client = AsyncClient(homeserver, username, config=config)

    client.callbacks.add(handle_invite, RoomMemberEvent)
    client.callbacks.add(handle_message, RoomMessageText)

    await create_database()  # Database and index creation

    try:
        await client.login(password=password)
        logging.info(f"Logged in as {username} on {homeserver}")
        asyncio.create_task(deadline_checker(client))
        await client.sync_forever(timeout=30000)
    except Exception as e:
        logging.error(f"Error during login or sync: {e}")
    finally:
        await client.close()

if __name__ == "__main__":
    asyncio.run(main())

#    homeserver = "localhost" # os.environ.get("MATRIX_SERVER")
#    username = "vodle_bot" # os.environ.get("MATRIX_USERNAME")
