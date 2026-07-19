import os
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
import uuid

QDRANT_HOST = os.environ.get("QDRANT_HOST", "qdrant")
QDRANT_PORT = int(os.environ.get("QDRANT_PORT", 6333))

client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)

COLLECTION_NAME = "maximus_content"

def init_vector_db():
    """Initialize Qdrant collection if it doesn't exist."""
    try:
        client.get_collection(COLLECTION_NAME)
    except:
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=384, distance=Distance.COSINE),
        )
    return True


def add_document(text: str, metadata: dict = None):
    """Add a document to the vector database."""
    from sentence_transformers import SentenceTransformer
    model = SentenceTransformer('all-MiniLM-L6-v2')
    vector = model.encode(text).tolist()

    point = PointStruct(
        id=str(uuid.uuid4()),
        vector=vector,
        payload={"text": text, **(metadata or {})}
    )
    client.upsert(collection_name=COLLECTION_NAME, points=[point])
    return point.id


def search_similar(query: str, limit: int = 5):
    """Search for similar documents."""
    from sentence_transformers import SentenceTransformer
    model = SentenceTransformer('all-MiniLM-L6-v2')
    vector = model.encode(query).tolist()

    results = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=vector,
        limit=limit
    )
    return [hit.payload for hit in results]