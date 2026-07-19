from apps.ai.vector import search_similar
from apps.ai.services import generate_content
from typing import List, Dict


def rag_generate(prompt: str, context_limit: int = 3) -> Dict:
    """
    Retrieval-Augmented Generation:
    1. Search vector database for relevant context
    2. Inject context into prompt
    3. Generate response with context
    """
    similar_docs = search_similar(prompt, limit=context_limit)
    context = "\n\n".join([doc.get("text", "") for doc in similar_docs])

    augmented_prompt = f"""You are a helpful assistant. Use the following context to answer the question.

Context:
{context}

Question: {prompt}

Answer:"""

    result = generate_content(augmented_prompt)
    result["context_used"] = len(similar_docs)
    
    return result