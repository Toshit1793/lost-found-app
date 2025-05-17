from flask import Flask, request, jsonify
from flask_cors import CORS
import cloudinary
import cloudinary.uploader

app = Flask(__name__)
CORS(app)

# 🌐 Cloudinary Configuration
cloudinary.config(
    cloud_name="dcznswrer",       
    api_key="429725312244878",    
    api_secret="IQ-SMZUpbOA1PYCKBF1IZ9t-SGE"
)

# 🗂️ In-memory store for submitted items
submitted_items = []

# ✅ Health check route
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend is live!"})

# ✅ Submit + upload route
@app.route("/api/upload_image", methods=["POST"])
def upload_image():
    title = request.form.get("title")
    description = request.form.get("description")
    image_file = request.files.get("image")

    if not image_file:
        return jsonify({"error": "No image uploaded"}), 400

    try:
        # Upload to Cloudinary
        upload_result = cloudinary.uploader.upload(image_file)
        image_url = upload_result.get("secure_url")

        item = {
            "title": title,
            "description": description,
            "image_url": image_url
        }

        # Save to in-memory list
        submitted_items.append(item)

        return jsonify({
            "message": "Image uploaded successfully!",
            **item
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ New route: get all items
@app.route("/api/items", methods=["GET"])
def get_items():
    return jsonify(submitted_items)

# 🔚 Only for local development
if __name__ == "__main__":
    app.run(debug=True)
