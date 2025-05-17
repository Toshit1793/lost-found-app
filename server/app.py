from flask import Flask, request, jsonify
from flask_cors import CORS
import cloudinary
import cloudinary.uploader

app = Flask(__name__)
CORS(app)  # Allows your frontend (on Vercel) to access this API

# 🌐 Cloudinary Configuration (placeholders – update or move to env vars)
cloudinary.config(
  cloud_name="dcznswrer",
  api_key="12345678",
  api_secret="abcdefgh"
)

# ✅ ROUTES

# Test route to confirm deployment
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend is live!"})

# Your existing image route
@app.route("/api/upload_image", methods=["POST"])
def upload_image():
    data = request.get_json()
    return jsonify({"message": "Received", "data": data})

# 🔚 Only required if running locally
if __name__ == "__main__":
    app.run(debug=True)

