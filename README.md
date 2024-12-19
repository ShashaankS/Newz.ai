# Newz.ai

**Newz.ai** is a web application that provides AI-powered text summarization for news articles. It features a **React.js** frontend, a **Flask** backend, and an integrated machine learning model for summarizing text.

---

## Features

- **AI-Powered Summarization**: Extract concise summaries from lengthy articles.
- **React.js Frontend**: Responsive and user-friendly interface.
- **Flask Backend**: Handles API requests and integrates the ML model.
- **ML Integration**: Utilizes a pretrained `t5-small` model for summarization.
- **Cross-Origin Support**: Seamless communication between frontend and backend with CORS.

---

## Tech Stack

### Frontend
- **React.js**
- **Axios** (for API communication)
- **TailwindCSS** (for UI components)

### Backend
- **Flask**
- **Flask-CORS**
- **Transformers** library
- **BeautifulSoup** for web scraping
- **PyTorch** backend for ML inference

---

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (for the frontend)
- **Python 3.7+** (for the backend)

---

### Clone the Repository
```bash
git clone https://github.com/your-username/Newz.ai.git
cd Newz.ai
```

### Setting up frontend
```bash
npm install
npm run dev
```

### Setting up backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python base.py
