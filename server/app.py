from flask import Flask, request, jsonify
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
import os
from features import extract_features  # 🔍 Feature extractor from features.py
import tempfile
import numpy as np
import faiss  # 🔎 Similarity search engine

app = Flask(__name__)
CORS(app)

# 🌐 Cloudinary Configuration
cloudinary.config(
    cloud_name="dcznswrer",       
    api_key="429725312244878",    
    api_secret="IQ-SMZUpbOA1PYCKBF1IZ9t-SGE"
)

# 📂 In-memory store for submitted items
submitted_items = []
feature_vectors = []  # 🧠 Feature vectors for FAISS

# 🔎 Initialize FAISS index (128 bins for 8x8x8 histogram)
faiss_index = faiss.IndexFlatL2(512)  # 8x8x8 = 512 features

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
        # Save temporarily for feature extraction
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
            image_path = tmp.name
            image_file.save(image_path)

        # Upload to Cloudinary
        upload_result = cloudinary.uploader.upload(image_path)
        image_url = upload_result.get("secure_url")

        # Extract features & store
        vector = extract_features(image_path)
        faiss_index.add(np.array([vector]).astype('float32'))
        os.remove(image_path)

        item = {
            "title": title,
            "description": description,
            "image_url": image_url
        }
        submitted_items.append(item)
        feature_vectors.append(vector)

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

# ✅ Search by image route
@app.route("/api/search_by_image", methods=["POST"])
def search_by_image():
    image_file = request.files.get("image")
    if not image_file:
        return jsonify({"error": "No image uploaded"}), 400

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
            image_path = tmp.name
            image_file.save(image_path)

        query_vec = extract_features(image_path)
        os.remove(image_path)

        D, I = faiss_index.search(np.array([query_vec]).astype('float32'), k=5)  # top 5 results

        results = [submitted_items[i] for i in I[0] if i < len(submitted_items)]
        return jsonify({"matches": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🖚 Only for local development
if __name__ == "__main__":
    app.run(debug=True)
