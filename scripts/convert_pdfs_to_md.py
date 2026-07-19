import fitz
from pathlib import Path

uploads_dir = Path("/home/user/uploads")
output_dir = Path("/home/user/uploads")

pdf_files = list(uploads_dir.glob("*.pdf"))

for pdf_path in pdf_files:
    md_filename = pdf_path.stem + ".md"
    md_path = output_dir / md_filename
    
    print(f"Converting: {pdf_path.name} → {md_filename}")
    
    doc = fitz.open(pdf_path)
    md_content = []
    
    md_content.append(f"# {pdf_path.stem.replace('_', ' ')}\n\n")
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text()
        
        md_content.append(f"## Page {page_num + 1}\n\n")
        md_content.append(text)
        md_content.append("\n\n---\n\n")
    
    doc.close()
    
    with open(md_path, "w", encoding="utf-8") as f:
        f.write("".join(md_content))
    
    print(f"  ✓ Created: {md_path}")

print("\n✅ All PDFs converted to Markdown successfully!")
