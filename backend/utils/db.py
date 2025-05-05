# db.py

import sqlite3

# Create a connection to the SQLite database
def get_db_connection():
    conn = sqlite3.connect('insurance.db')
    conn.row_factory = sqlite3.Row  # To return rows as dictionaries
    return conn

# Create initial tables
def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user'
        )
    ''')

    # Claims table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS claims (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_name TEXT,
            hospital TEXT,
            diagnosis TEXT,
            icd_code TEXT,
            treatment TEXT,
            amount_claimed REAL,
            date_of_service TEXT,
            policy_number TEXT,
            status TEXT DEFAULT 'Pending',
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    ''')

    conn.commit()
    conn.close()

# Run this file directly to initialize the database
if __name__ == '__main__':
    init_db()
    print("Database initialized successfully.")
