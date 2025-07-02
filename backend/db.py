import sqlite3

# Database functions for managing expenses

DB_PATH = 'expenses.db'

# create_db function to initialize the expenses database
def create_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            date TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()


# function to add an expense to the database
def add_expense(description, amount, category, date):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''INSERT INTO expenses (description, amount, category, date)
                 VALUES (?, ?, ?, ?)''', (description, amount, category, date))
    conn.commit()
    conn.close()

# function to retrieve all expenses from the database
def get_expenses():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''SELECT * FROM expenses''')
    rows = c.fetchall()
    conn.close()
     # convert to list of dicts for JSON
    expenses = [
        {"id": row[0], "description": row[1], "amount": row[2], "category": row[3], "date": row[4]}
        for row in rows
    ]
    return expenses

# function to delete an expense by its ID
def delete_expense(expense_id):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''DELETE FROM expenses WHERE id = ?''', (expense_id,))
    conn.commit()
    conn.close()

# function to update an existing expense
def update_expense(expense_id, description, amount, category, date): 
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''UPDATE expenses SET description = ?, amount = ?, category = ?, date = ?
                 WHERE id = ?''', (description, amount, category, date, expense_id))
    conn.commit()
    conn.close()


# function to get the total expenses
def get_total_expenses():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''SELECT SUM(amount) FROM expenses''')
    total = c.fetchone()[0]
    conn.close()
    return total if total is not None else 0.0

# function to get total expenses by category
def get_expenses_by_category(category):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''SELECT SUM(amount) FROM expenses WHERE category = ?''', (category,))
    total = c.fetchone()[0]
    conn.close()
    return total if total is not None else 0.0

# function to get unique categories from the expenses
def get_unique_categories():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''SELECT DISTINCT category FROM expenses''')
    categories = [row[0] for row in c.fetchall()]
    conn.close()
    return categories


# function to get expenses within a date range from a category or not
def get_expenses_by_date_range_cat(start_date, end_date, category=None): 
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    if category:
        c.execute('''SELECT * FROM expenses WHERE date BETWEEN ? AND ? AND category = ?''', (start_date, end_date, category))
    else:
        c.execute('''SELECT * FROM expenses WHERE date BETWEEN ? AND ?''', (start_date, end_date))
    expenses = c.fetchall()
    conn.close()
    return expenses


# main method to create the database and add some initial data
if __name__ == "__main__":
    create_db()
    # Example usage
    add_expense("Stationary Haul", 15.0, "Misc", "2025-06-30")
    add_expense("Bus Ticket", 2.5, "Transport", "2025-05-02")
    add_expense("Groceries", 50.0, "Food", "2025-05-13")
