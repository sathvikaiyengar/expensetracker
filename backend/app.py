from flask import Flask, jsonify, request
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)   
# Importing the database functions
from db import (
    add_expense,
    get_expenses,
    delete_expense,
    get_unique_categories,
    update_expense,
    get_total_expenses,
    get_expenses_by_category,
    get_expenses_by_date_range,
    get_highest_lowest_spend,

)

# get all expenses
@app.route('/get-expenses', methods=['GET'])
def read_expenses():
    expenses = get_expenses()
    return jsonify(expenses), 200

# get total expenses
@app.route('/get-total-expenses', methods=['GET'])
def read_total_expenses():
    total = get_total_expenses()
    return jsonify(total), 200

# get total expenses by category
@app.route('/get-category-total', methods=['GET'])
def read_expenses_by_category():
    categories_list = get_unique_categories()
    result = []
    for cat in categories_list:
        total = get_expenses_by_category(cat)
        result.append({'category': cat, 'total': total})
    return jsonify(result), 200


# add a new expense
# @app.route('/add-expenses', methods=['POST'])
# def create_expense():
#     data = request.json
#     description = data.get('description')
#     amount = data.get('amount')
#     category = data.get('category')
#     date = data.get('date')

#     if not all([description, amount, category, date]):
#         return jsonify({'error': 'Missing required fields'}), 400

#     add_expense(description, amount, category, date)
#     return jsonify({'message': 'Expense added successfully'}), 201



# delete an expense by ID
# @app.route('/delete-expense/<int:expense_id>', methods=['DELETE'])
# def remove_expense(expense_id):
#     delete_expense(expense_id)
#     return jsonify({'message': 'Expense deleted successfully'}), 200    

# update an existing expense
# @app.route('/update-expense/<int:expense_id>', methods=['PUT'])
# def modify_expense(expense_id):
#     data = request.json
#     description = data.get('description')
#     amount = data.get('amount')
#     category = data.get('category')
#     date = data.get('date')

#     if not all([description, amount, category, date]):
#         return jsonify({'error': 'Missing required fields'}), 400

#     update_expense(expense_id, description, amount, category, date)
#     return jsonify({'message': 'Expense updated successfully'}), 200


if __name__ == '__main__':
    app.run(debug=True)