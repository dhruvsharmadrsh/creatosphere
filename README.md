# Creato-Sphere

> AI-powered ad creative generator with automated compliance checking

## 🎯 Overview
Upload product images → AI removes background → Generate branded backgrounds → 
Apply templates → Check compliance → Export multi-format assets

## 🏗️ Architecture
- **Frontend**: React + Vite + Tailwind + Fabric.js
- **Backend**: FastAPI + Python 3.11
- **AI Services**: SAM (background removal), SDXL (generation), GPT-4 (copy)
- **Storage**: AWS S3 + CloudFront
- **Queue**: Celery + Redis

## 🚀 Quick Start

### Backend
cd backend
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

text

### Frontend
cd frontend
npm install
npm run dev

text

## 📁 Project Structure
creatosphere/
├── backend/
│ ├── app/
│ │ ├── main.py
│ │ ├── routers/
│ │ ├── models/
│ │ └── services/
│ ├── requirements.txt
│ └── Dockerfile
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── utils/
│ └── package.json
└── README.md

text

## 🔧 Environment Variables
See `.env.example` files in backend/ and frontend/

## 📝 Development Progress
Track progress on [Project Board](link)

## 👥 Team
- Frontend: drsh
- Backend: drsh
- DevOps: drsh