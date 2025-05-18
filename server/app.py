from flask import Flask, request, jsonify
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
import os
import tempfile
import numpy as np
import faiss  # 🔎 Similarity search engine
from features import extract_features  # 🔍 Your feature extractor
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

# 🌐 Cloudinary Configuration
cloudinary.config(
    cloud_name="dcznswrer",
    api_key="429725312244878",
    api_secret="IQ-SMZUpbOA1PYCKBF1IZ9t-SGE"
)

# 📂 In-memory store for submitted items (each with features)
submitted_items = []

# 🔎 Initialize FAISS index (512-dim feature vectors)
faiss_index = faiss.IndexFlatL2(512)

# ✅ Health check
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend is live!"})

# 🔍 Match lost with found and vice versa
def check_for_match(new_feature, item_type):
    target_type = "found" if item_type == "lost" else "lost"
    matches = []
    for item in submitted_items:
        if item.get("item_type") == target_type:
            existing_feature = np.array(item["features"]).reshape(1, -1)
            sim = cosine_similarity([new_feature], existing_feature)[0][0]
            if sim > 0.85:
                matches.append(item)
    return matches

# ✅ Submit an item (lost or found)
@app.route("/api/upload_image", methods=["POST"])
def upload_image():
    title = request.form.get("title")
    description = request.form.get("description")
    item_type = request.form.get("type")  # "lost" or "found"
    user_email = request.form.get("userEmail")
    image_file = request.files.get("image")

    if not image_file:
        return jsonify({"error": "No image uploaded"}), 400

    try:
        # Save temp image
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
            image_path = tmp.name
            image_file.save(image_path)

        # Upload to Cloudinary
        upload_result = cloudinary.uploader.upload(image_path)
        image_url = upload_result.get("secure_url")

        # Extract features + FAISS
        vector = extract_features(image_path).astype('float32')
        faiss_index.add(np.array([vector]))
        os.remove(image_path)

        # Save item in memory
        item = {
            "title": title,
            "description": description,
            "image_url": image_url,
            "item_type": item_type,
            "user_email": user_email,
            "features": vector.tolist()
        }
        submitted_items.append(item)

        # Match against opposite type
        matches = check_for_match(vector, item_type)

        return jsonify({
            "message": "Image uploaded successfully!",
            "item": item,
            "matches": matches
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ Get all submitted items
@app.route("/api/items", methods=["GET"])
def get_items():
    return jsonify(submitted_items)

# ✅ Search by uploading an image (FAISS)
@app.route("/api/search_by_image", methods=["POST"])
def search_by_image():
    image_file = request.files.get("image")
    if not image_file:
        return jsonify({"error": "No image uploaded"}), 400

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
            image_path = tmp.name
            image_file.save(image_path)

        query_vec = extract_features(image_path).astype("float32")
        os.remove(image_path)

        D, I = faiss_index.search(np.array([query_vec]), k=5)
        results = [submitted_items[i] for i in I[0] if i < len(submitted_items)]

        return jsonify({"matches": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🖥 Run server locally
if __name__ == "__main__":
    app.run(debug=True)

