from flask import Blueprint, request, jsonify
from app import db
from models.policy import Policy

policy_bp = Blueprint('policy', __name__)

@policy_bp.route('/add', methods=['POST'])
def add_policy():
    data = request.json
    policy = Policy(**data)
    db.session.add(policy)
    db.session.commit()
    return jsonify({'message': 'Policy added successfully'})

@policy_bp.route('/list', methods=['GET'])
def list_policies():
    policies = Policy.query.all()
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'premium': p.premium,
        'coverage': p.coverage_amount
    } for p in policies])
