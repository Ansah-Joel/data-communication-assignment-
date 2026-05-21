"""Simple converter: reads DOCX and writes a basic PDF.
Usage: python convert_docx_to_pdf.py
"""
from docx import Document
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm

IN_DOCX = "ADVANCED DATA COMMUNICATION.docx"
OUT_PDF = "ADVANCED DATA COMMUNICATION.pdf"

def docx_to_text(path):
    doc = Document(path)
    lines = []
    for para in doc.paragraphs:
        text = para.text.strip()
        if text:
            lines.append(text)
    return lines

def write_pdf(lines, outpath):
    c = canvas.Canvas(outpath, pagesize=A4)
    width, height = A4
    margin = 20 * mm
    x = margin
    y = height - margin
    line_height = 6 * mm
    for line in lines:
        # wrap lines longer than the width
        words = line.split(' ')
        cur = ''
        for w in words:
            test = cur + (' ' if cur else '') + w
            if c.stringWidth(test, "Helvetica", 10) > (width - 2*margin):
                c.drawString(x, y, cur)
                y -= line_height
                cur = w
                if y < margin:
                    c.showPage()
                    y = height - margin
            else:
                cur = test
        if cur:
            c.drawString(x, y, cur)
            y -= line_height
        if y < margin:
            c.showPage()
            y = height - margin
    c.save()

def main():
    try:
        lines = docx_to_text(IN_DOCX)
    except Exception as e:
        print(f"Error reading {IN_DOCX}: {e}")
        return
    try:
        write_pdf(lines, OUT_PDF)
        print(f"Wrote {OUT_PDF}")
    except Exception as e:
        print(f"Error writing PDF: {e}")

if __name__ == '__main__':
    main()
