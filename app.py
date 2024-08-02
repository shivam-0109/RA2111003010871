from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['POST'])
def handle_post():
    try:
        data = request.json.get('data', [])
        if not isinstance(data, list):
            raise ValueError("Invalid data format")

        user_id = "shivam_kumar_singh_20092002"
        email = "sm1788@srmist.edu.in"
        roll_number = "RA2111003010871"

        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        highest_alphabet = max(alphabets, key=str.lower) if alphabets else None

        response = {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": [highest_alphabet] if highest_alphabet else []
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)}), 400

@app.route('/bfhl', methods=['GET'])
def handle_get():
    return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    app.run(debug=True)
