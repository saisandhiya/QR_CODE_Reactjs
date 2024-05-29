import { useState } from "react";

export const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrdata] = useState(
    "https://github.com/saisandhiya/User_Card_Reactjs"
  );
  const [size, setSize] = useState("150");

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}X${size}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.log("Error generating QR Code " + error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.log("Error downloding ", error));
  }
  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait..</p>}
      {img && <img src={img} className="qrcode-image" alt="qrcode" />}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR code:
        </label>
        <input
          value={qrData}
          type="text"
          id="dataInput"
          placeholder="Enter data for QR Code"
          onChange={(e) => setQrdata(e.target.value)}
        />
        <label htmlFor="sizeInput" className="input-label">
          Image size (e.g.,150)
        </label>
        <input
          value={size}
          type="text"
          id="sizeInput"
          placeholder="Enter image size"
          onChange={(e) => setSize(e.target.value)}
        />

        <button
          className="generate-button"
          disabled={loading}
          onClick={generateQR}
        >
          Generate QR Code
        </button>
        <button className="download-button" onClick={downloadQR}>
          Download QR Code
        </button>
      </div>
      <p className="footer">
        Designed by{" "}
        <a href="https://github.com/saisandhiya/User_Card_Reactjs">Sandhiya</a>
      </p>
    </div>
  );
};
