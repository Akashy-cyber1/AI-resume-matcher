import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT / "api"))

from app.db.database import get_connection

conn = get_connection()
cur = conn.cursor()
cur.execute("SELECT version();")
print(cur.fetchone())
cur.close()
conn.close()
