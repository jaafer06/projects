from flask import Flask
app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def test():
    return "supp ma dude"

if __name__ == "__main__":
    app.run(host='localhost', port=5000)
