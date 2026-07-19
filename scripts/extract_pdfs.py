import fitz

pdfs = [
    "/home/user/uploads/AI_PROJECT_CONTEXT.pdf",
    "/home/user/uploads/PROJECT_STATE.pdf",
    "/home/user/uploads/Master_AI_CoFounder_System_Prompt_v3.pdf",
    "/home/user/uploads/Technical_Execution_Coding_Prompt_v1.pdf",
    "/home/user/uploads/architecture.pdf"
]

for pdf_path in pdfs:
    print(f"\n{'='*80}")
    print(f"CONTENT OF: {pdf_path.split('/')[-1]}")
    print('='*80)
    doc = fitz.open(pdf_path)
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text()
        print(f"\n--- Page {page_num + 1} ---\n")
        print(text)
    doc.close()
