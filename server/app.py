from flask import Flask, request, jsonify
from flask_cors import CORS
import cloudinary
import cloudinary.uploader

app = Flask(__name__)
CORS(app)  # Allows your frontend (on Vercel) to access this API

# 🌐 Cloudinary Configuration (you can later use environment variables here)
cloudinary.config(
    cloud_name="dcznswrer",       # replace with your Cloudinary cloud name
    api_key="429725312244878",           # replace with your Cloudinary API key
    api_secret="IQ-SMZUpbOA1PYCKBF1IZ9t-SGE"         # replace with your Cloudinary API secret
)

# ✅ Test route to confirm backend is live
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend is live!"})


# ✅ Main route: handle form + image and upload to Cloudinary
@app.route("/api/upload_image", methods=["POST"])
def upload_image():
    title = request.form.get("title")
    description = request.form.get("description")
    image_file = request.files.get("image")

    if not image_file:
        return jsonify({"error": "No image uploaded"}), 400

    try:
        # Upload image to Cloudinary
        upload_result = cloudinary.uploader.upload(image_file)
        image_url = upload_result.get("secure_url")

        return jsonify({
            "message": "Image uploaded successfully!",
            "title": title,
            "description": description,
            "image_url": image_url
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 🔚 Local development
if __name__ == "__main__":
    app.run(debug=True)

