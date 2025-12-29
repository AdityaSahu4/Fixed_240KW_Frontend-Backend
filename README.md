# Fixed_240KW_Frontend and Backend

This project contains both **Frontend** and **Backend** for the Fixed 240 kW platform.

---

## ⚙️ Backend Setup

> **All backend steps must be done inside the `backend` folder**

### Steps

1. Navigate to backend folder:
```bash
cd backend
```
2. Create a virtual environment
```bash
python -m venv .venv
```
3. Activate the virtual environment
```bash
.venv\Scripts\activate
```
4. Install required packages
```bash
pip install fastapi uvicorn sqlalchemy pydantic
```
5. Run the backend server
```bash
uvicorn app:app --reload
```
6. Access URLs
```bash
http://127.0.0.1:8000
http://127.0.0.1:8000/docs
```


---

## ⚙️ Frontend Setup

---

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

---

## Installation

1. Navigate to root folder:
```bash
cd..
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```
4. Open your browser and navigate to:
```bash
http://localhost:5173
```





