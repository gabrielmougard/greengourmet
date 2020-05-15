# -*- coding: utf-8 -*-
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return flask.render_template("index.html",token="deligth no film les gros nuls")

if __name__ == "__main__":
    app.run(debug=True)