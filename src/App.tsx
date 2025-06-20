import "./App.css";

function App() {
  return (
    <main className="container">
      <header className="header">
        <img src="/vite.svg" className="logo" alt="Reformit logo" />
        <h1>Welcome to Reformit</h1>
        <p className="tagline">
          Your all-in-one file conversion Chrome extension
        </p>
      </header>

      <section className="features">
        <h2>✨ What You Can Do</h2>
        <ul>
          <li>🎨 Convert images, documents, audio & videos effortlessly</li>
          <li>🧠 OCR support to extract text from images and PDFs</li>
          <li>🗜️ Extract archives (ZIP, RAR, TAR, etc.)</li>
          <li>⚡ Works offline for lightweight conversions</li>
        </ul>
      </section>

      <section className="cta">
        <a href="/reformit-extension.zip" download className="download-button">
          ⬇️ Download Chrome Extension
        </a>
        <p className="note">
          Unzip and load it via <code>chrome://extensions</code>
        </p>
      </section>

      <footer>
        <p className="footer-text">
          Made with ❤️ by Smruti Dash ·{" "}
          <a href="https://github.com/yourusername/reformit" target="_blank">
            GitHub
          </a>
        </p>
      </footer>
    </main>
  );
}

export default App;
