# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

# Initialize the summarizer pipeline
summarizer = pipeline("summarization", model="facebook/bart-base")

def extract_article_text(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    article_body = soup.find('article')  # Adjust the tag as needed
    article_text = article_body.get_text(separator="\n", strip=True)
    return article_text

def summarize_text(text):
    if len(text) > 1000:
        text = text[:1000]  # Truncate to 1000 characters
    summary = summarizer(text, max_length=150, min_length=30, length_penalty=2.0)
    return summary[0]['summary_text']

@app.route('/summarize', methods=['POST'])
def summarize_article():
    data = request.json
    url = data.get('url')
    if not url:
        return jsonify({'error': 'No URL provided'}), 400
    
    try:
        article_text = extract_article_text(url)
        summary = summarize_text(article_text)
        return jsonify({'summary': summary})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
