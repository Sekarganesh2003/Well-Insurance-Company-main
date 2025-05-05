# auth.py

from werkzeug.security import generate_password_hash, check_password_hash
from db import get_db_connection

# Register a new user
def register_user(username, email, password):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Hash the password
    hashed_password = generate_password_hash(password)

    try:
        cursor.execute('''
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)
        ''', (username, email, hashed_password))
        conn.commit()
        return True
    except Exception as e:
        print("Registration Error:", e)
        return False
    finally:
        conn.close()

# Login validation
def validate_login(username, password):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()

    conn.close()

    if user and check_password_hash(user['password'], password):
        return dict(user)
    return None
