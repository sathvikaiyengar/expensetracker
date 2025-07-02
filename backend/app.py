from flask import Flask, jsonify, request
from flask_cors import CORS 
 
# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)   
import db

# get all expenses list
@app.route('/get-expenses', methods=['GET'])
def read_expenses():
    expenses = db.get_expenses()
    return jsonify(expenses), 200

# get total expense amount
@app.route('/get-total-expenses', methods=['GET'])
def read_total_expenses():
    total = db.get_total_expenses()
    return jsonify(total), 200

# get total expenses by category
@app.route('/get-category-total', methods=['GET'])
def read_expenses_by_category():
    categories_list = db.get_unique_categories()
    result = []
    for cat in categories_list:
        total = db.get_expenses_by_category(cat)
        result.append({'category': cat, 'total': total})
    return jsonify(result), 200


# add a new expense
@app.route('/add-expenses', methods=['POST'])
def create_expense():
    data = request.json
    description = data.get('description')
    amount = data.get('amount')
    category = data.get('category')
    date = data.get('date')

    if not all([description, amount, category, date]):
        return jsonify({'error': 'Missing required fields'}), 400

    db.add_expense(description, amount, category, date)
    return jsonify({'message': 'Expense added successfully'}), 201

# get expenses within a date range and category
@app.route('/get-expenses-by-date-cat', methods=['POST'])
def read_expenses_by_date_cat():
    data = request.json
    start_date = data.get('startDate')
    end_date = data.get('endDate')
    category = data.get('category')
    if not start_date or not end_date:
        return jsonify({'error': 'Start date and end date are required'}), 400

    expenses = db.get_expenses_by_date_range_cat(start_date, end_date, category)
    return jsonify(expenses), 200

if __name__ == '__main__':
    app.run(debug=True)