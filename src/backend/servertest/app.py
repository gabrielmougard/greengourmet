# -*- coding: utf-8 -*-
import uuid
from flask import Flask,jsonify, render_template,request
import json
app = Flask(__name__)

@app.route("/api", methods=['POST'])
def name():

    data = request.get_json()
    name = data['name']
    return jsonify({'name':name})

if __name__ == "__main__":
    app.run(debug=True)
