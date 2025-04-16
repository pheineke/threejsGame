from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app=app)


@app.route('/', methods=['GET'])
def index():
    return render_template('game.html')

@socketio.on('connected')
def connected():
    print("Client connected")


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)