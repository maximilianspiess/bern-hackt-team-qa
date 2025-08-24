FROM python:3.11-slim

WORKDIR /app

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy service code
COPY embeddings_service.py .

EXPOSE 5000

CMD ["python", "embeddings_service.py"]
