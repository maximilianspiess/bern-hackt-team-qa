from flask import Flask, request, jsonify
import os
import cohere

app = Flask(__name__)

co = cohere.Client(os.environ["COHERE_API_KEY"])

@app.route("/embed", methods=["POST"])
def embed():
    data = request.json
    texts = data.get("texts") or data.get("text")
    if not texts:
        return jsonify({"error": "texts field required"}), 400
    if not isinstance(texts, list):
        texts = [texts]

    try:
        response = co.embed(
            texts=texts,
            model="embed-english-v3.0",
            input_type="search_document"   # default, adjust as needed
        )
        return jsonify({"embeddings": response.embeddings})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
