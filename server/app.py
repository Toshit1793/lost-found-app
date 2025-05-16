import cloudinary
import cloudinary.uploader

cloudinary.config(
    cloud_name= dcznswrer,
    api_key= 429725312244878,
    api_secret= IQ-SMZUpbOA1PYCKBF1IZ9t-SGE
)

@app.route("/api/upload_image", methods=["POST"])
def upload_image():
    file = request.files['image']
    result = cloudinary.uploader.upload(file)
    return jsonify({"url": result["secure_url"]})

from flask import Flask
from flask_cors import CORS
from server.routes.api import api_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(api_blueprint, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)