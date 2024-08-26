from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

summarizer = pipeline("summarization", model="t5-small")

def extract_text(url):
    try:
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')

        # Remove script and style elements
        for script in soup(["script", "style"]):
            script.decompose()

        text_parts = []
        for tag in soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
            text_parts.append(tag.get_text(strip=True))

        other_texts = soup.get_text()
        lines = (line.strip() for line in other_texts.splitlines())

        for line in lines:
            if line and not any(line in text for text in text_parts):
                text_parts.append(line)

        cleaned_text = '\n'.join(text_parts)
        return cleaned_text[:1000]
    
    except Exception as e:
        return str(e)

def summarize_text(text, max_length=200, min_length=100):
    # T5 expects a "summarize: " prefix for summarization tasks
    input_text = "summarize: " + text
    summary = summarizer(input_text, max_length=max_length, min_length=min_length, do_sample=False)
    return summary[0]['summary_text']

@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        data = request.json
        url = data.get('url')
        
        if not url:
            return jsonify({"error": "Text is required"}), 400
        
        # Summarize the text
        text= extract_text(url)
        # text = """Rate limiting Event Registry has rate limits in place to ensure that the service is available to all users. The rate limits are based on the number of simultaneous requests that the user is making at the same time. The maximum allowed number of simultaneous requests that the user can be executing at the same time is 5. If more requests are made, the user will receive a 503 status code in the response and the request will not be executed. The suggested approach is to not even make the code parallel but instead make requests sequentially, one after the other. Limits on the conditions in the query When making queries, you can specify multiple conditions, like keywords, concepts, categories, source, locations, etc. In some cases you need to provide multiple conditions of the same type, like multiple keywords. For each type of the condition, there is a maximum number of items that you can provide in a single query. The limits are set differently for free users vs. users with a paid API subscription and are shown in the table below. """
        summary = summarize_text(text)
        
        return jsonify({"summary": summary})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)