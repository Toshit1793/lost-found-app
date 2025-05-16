from flask import Blueprint, request, jsonify

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/upload_item', methods=['POST'])
def upload_item():
    data = request.json
    # TODO: Save metadata, process image/text
    return jsonify({"status": "success", "message": "Item uploaded."})

@api_blueprint.route('/get_matches', methods=['POST'])
def get_matches():
    # TODO: Perform matching
    return jsonify({"matches": []})