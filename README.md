# 🔄 Reformit - Universal File Converter Chrome Extension

**Reformit** is a powerful Chrome extension that allows users to convert files directly from their browser! Supports various file types including images, documents, audio, video, and more — all with an intuitive interface.

---

## 🚀 Features

- 🎨 Image conversions (JPG ↔ PNG, WEBP, HEIC, etc.)
- 📄 Document conversions (PDF ↔ DOCX, PPTX, XLSX, TXT)
- 🎵 Audio conversions (MP3 ↔ WAV, OGG, AAC, FLAC)
- 🎞️ Video conversions (MP4 ↔ AVI, MOV, WEBM)
- 🗜️ Archive extraction (ZIP, RAR, TAR, 7Z)
- 🧠 OCR: Convert image/PDF to editable text
- 📦 Offline-ready processing (for lightweight conversions)
- 🧩 Intuitive UI integrated with Chrome popup
- 🌐 Powered by Next.js backend (optional) or in-browser tools

---

## 🧩 Architecture

```
Reformit (Chrome Extension)
│
├── UI: Vite + React-based popup (HTML/CSS + TS)
├── File Conversion Logic:
│   ├── Lightweight: Runs fully in-browser using JS/WASM
│   └── Heavy: Sent to backend via REST API (Flask, Go, or Node)
```

---

## 📁 File Structure

```
/reformit
├── /public
│   └── icon.png
│   └── manifest.json # Chrome Extension Manifest v3
├── /src
│   ├── /popup        # React + Vite popup interface
│   ├── /background   # Background scripts (if needed)
│   └── /lib          # File conversion utilities
├── vite.config.js    # Vite configuration
├── README.md

```

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/reformit.git
cd reformit
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Extension

```bash
npm run build
```

This will generate a production-ready `build` folder.

---

### 4. Load in Chrome

1. Open `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the `build` folder

---

## 🧠 Tech Stack

- React + Next.js (popup UI)
- Web APIs (FileReader, Blob)
- Node.js (via Next.js backend for conversions)
- Optional: Flask/FastAPI or Go for heavy backend processing
- Chrome Extension Manifest v3

---

## 🔐 Permissions Used

```json
"permissions": [
  "storage",
  "downloads",
  "activeTab"
],
"host_permissions": ["<all_urls>"]
```

---

## 🌟 Future Ideas

- Cloud file integration (Google Drive, Dropbox)
- AI-based OCR + language translation
- Offline-first conversions using WASM
- History of recent conversions
- Drag-and-drop support inside popup

---

## 🧑‍💻 Author

Made with ❤️ by Smruti Dash

---

## 📄 License

MIT License — free to use and modify.
