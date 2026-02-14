FROM python:3.11-slim-buster

WORKDIR /app

# Install dependencies
RUN pip install --no-cache-dir matrix-nio>=0.19.0 aiosqlite

# Copy application code
COPY bot.py .

# Set environment variables (will be overridden by docker-compose or command line)
ENV MATRIX_USERNAME=""
ENV MATRIX_PASSWORD=""
ENV MATRIX_SERVER=""
ENV DATABASE_PATH="/data/polls.db"

# Temporary: List installed packages
RUN pip freeze

# Define the entrypoint for the container
ENTRYPOINT ["python", "bot.py"]