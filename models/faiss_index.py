import faiss
import numpy as np

# Create a FAISS index for 1280-dimensional MobileNetV2 embeddings
index = faiss.IndexFlatL2(1280)  # L2 = Euclidean, or use IndexFlatIP for cosine

def add_embedding_to_index(embedding, item_id):
    index.add(np.array([embedding]).astype('float32'))  # Store vector
    # Store item_id in parallel database (e.g., MongoDB)

def search_similar(embedding, top_k=5):
    D, I = index.search(np.array([embedding]).astype('float32'), top_k)
    return I[0]
