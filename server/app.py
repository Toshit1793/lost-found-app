from flask import Flask, request, jsonify
from flask_cors import CORS
import cloudinary
import cloudinary.uploader


app = Flask(__name__)
CORS(app)  # Optional: allows your React frontend to talk to this API

cloudinary.config(
  cloud_name= "dcznswrer",
  api_key= "12345678",
  api_secret= "abcdefgh"
)


@app.route("/api/upload_image", methods=["POST"])
def upload_image():
    return jsonify({"message": "This works!"})

