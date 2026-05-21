# Data Communication assignment

This repository contains a small website summarizing studies in Data Communication for Joel Ansah (ID: puit24110102).

Files:
- `index.html` — main page
- `styles.css` — styling
- `ADVANCED DATA COMMUNICATION.docx` — original assignment (provided)
- `ADVANCED DATA COMMUNICATION.pdf` — converted PDF (generated)
- `photo_2026-05-21_13-58-20.jpg` — student photo
 

To convert the DOCX to PDF locally (requires `python-docx` and `reportlab`):

```bash
python -m pip install python-docx reportlab
python convert_docx_to_pdf.py
```

To publish:

```bash
git init
git add .
git commit -m "Initial site for Data Communication assignment"
git branch -M main
# create repo on GitHub then add remote
git remote add origin https://github.com/Ansah-Joel/data-communication-assignment-
git push -u origin main
```
