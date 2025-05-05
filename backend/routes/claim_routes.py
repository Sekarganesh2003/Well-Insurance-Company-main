from flask import Blueprint, request, jsonify
from app import db
from models.claim import Claim

claim_bp = Blueprint('claim', __name__)

@claim_bp.route('/submit', methods=['POST'])
def submit_claim():
    data = request.json
    claim = Claim(**data)
    db.session.add(claim)
    db.session.commit()
    return jsonify({'message': 'Claim submitted'})

@claim_bp.route('/status/<int:user_id>', methods=['GET'])
def claim_status(user_id):
    claims = Claim.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': c.id,
        'status': c.status,
        'description': c.description
    } for c in claims])
