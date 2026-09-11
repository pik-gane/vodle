# vodle — homeserver administration for deploy/deploy.sh, run INSIDE the
# Synapse container (python3 -), where the admin API and the shared
# registration secret of /data/homeserver.yaml are reachable and no
# password ever appears on a command line:
#
#   ensure-user   registers the user $VODLE_USER with password $VODLE_PASSWORD
#                 (admin when $VODLE_ADMIN=1); an existing user is fine
#   ensure-token  creates the registration token $VODLE_TOKEN, logged in as
#                 $SYNAPSE_ADMIN_USER / $SYNAPSE_ADMIN_PASSWORD; an existing one is fine
#   check         prints the server version
#
# SYNAPSE_URL and SYNAPSE_CONFIG override the container defaults (tests).
import hashlib, hmac, json, os, sys, urllib.error, urllib.request

BASE = os.environ.get("SYNAPSE_URL", "http://localhost:8008")
CONFIG = os.environ.get("SYNAPSE_CONFIG", "/data/homeserver.yaml")


def request(method, path, body=None, token=None):
    data = json.dumps(body).encode() if body is not None else None
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = "Bearer " + token
    req = urllib.request.Request(BASE + path, data=data, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            return response.status, json.loads(response.read() or b"{}")
    except urllib.error.HTTPError as error:
        try:
            return error.code, json.loads(error.read() or b"{}")
        except ValueError:
            return error.code, {}


def shared_secret():
    import yaml
    with open(CONFIG) as handle:
        return yaml.safe_load(handle)["registration_shared_secret"]


def ensure_user(name, password, admin):
    status, body = request("GET", "/_synapse/admin/v1/register")
    if status != 200:
        fail("cannot fetch a registration nonce: %s %s" % (status, body))
    nonce = body["nonce"]
    mac = hmac.new(shared_secret().encode(), digestmod=hashlib.sha1)
    for part in (nonce, name, password, "admin" if admin else "notadmin"):
        if part is not nonce:
            mac.update(b"\x00")
        mac.update(part.encode())
    status, body = request("POST", "/_synapse/admin/v1/register", {
        "nonce": nonce, "username": name, "password": password, "admin": admin, "mac": mac.hexdigest()})
    if status == 200:
        print("registered %s%s" % (name, " (admin)" if admin else ""))
    elif body.get("errcode") == "M_USER_IN_USE":
        print("%s already registered" % name)
    else:
        fail("registering %s failed: %s %s" % (name, status, body))


def login(name, password):
    status, body = request("POST", "/_matrix/client/v3/login", {
        "type": "m.login.password", "identifier": {"type": "m.id.user", "user": name}, "password": password})
    if status != 200:
        fail("login as %s failed: %s %s" % (name, status, body))
    return body["access_token"]


def ensure_token(token):
    access = login(os.environ["SYNAPSE_ADMIN_USER"], os.environ["SYNAPSE_ADMIN_PASSWORD"])
    status, body = request("POST", "/_synapse/admin/v1/registration_tokens/new",
                           {"token": token, "uses_allowed": None, "expiry_time": None}, access)
    if status == 200:
        print("registration token created")
    elif "already exists" in json.dumps(body):
        print("registration token exists")
    else:
        fail("creating the registration token failed: %s %s" % (status, body))
    request("POST", "/_matrix/client/v3/logout", {}, access)


def check():
    status, body = request("GET", "/_matrix/client/versions")
    if status != 200:
        fail("the homeserver does not answer: %s" % status)
    print("homeserver answers; client API versions up to %s" % body.get("versions", ["?"])[-1])


def fail(message):
    print("synapse-admin: " + message, file=sys.stderr)
    sys.exit(1)


if __name__ == "__main__":
    command = sys.argv[1] if len(sys.argv) > 1 else ""
    if command == "ensure-user":
        ensure_user(os.environ["VODLE_USER"], os.environ["VODLE_PASSWORD"], os.environ.get("VODLE_ADMIN") == "1")
    elif command == "ensure-token":
        ensure_token(os.environ["VODLE_TOKEN"])
    elif command == "check":
        check()
    else:
        fail("usage: synapse-admin.py ensure-user | ensure-token | check")
