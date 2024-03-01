from flask import Flask, request, make_response
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['POST'])
def receive_data():
    data = request.get_json()
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

if __name__ == "__main__":
    app.run(debug=True)