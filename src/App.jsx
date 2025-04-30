import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import "./App.css";
import hbculogo from "./assets/hbculogo.png";
import whitelogo from "./assets/whitelogo.png";

const App = () => {
  const [activeTab, setActiveTab] = useState("news");

  // News tab state
  const [newsHeadline, setNewsHeadline] = useState("");
  const [newsBackground, setNewsBackground] = useState(null);
  const [newsCircle, setNewsCircle] = useState(null);
  const newsRef = useRef(null);

  // Meme tab state
  const [memeCaption, setMemeCaption] = useState("");
  const [memeImage, setMemeImage] = useState(null);
  const memeRef = useRef(null);

  useEffect(() => {
    document.title =
      activeTab === "news"
        ? "HBCU Shaderoom News Creator"
        : "HBCU Shaderoom Memes Creator";
  }, [activeTab]);

  const handleDownload = async () => {
    const targetRef = activeTab === "news" ? newsRef : memeRef;
    const canvas = await html2canvas(targetRef.current, {
      useCORS: true,
      scale: 1,
      width: 1125,
      height: activeTab === "news" ? 1113 : 1285,
    });

    const link = document.createElement("a");
    link.download =
      activeTab === "news" ? "news_template.png" : "meme_template.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="app-container"
      style={{
        fontFamily: "Impact, sans-serif",
        padding: 20,
        maxWidth: 600,
        margin: "auto",
      }}
    >
      {/* TAB SWITCHER */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <button
          onClick={() => setActiveTab("news")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "news" ? "#3b82f6" : "#eee",
            color: activeTab === "news" ? "#fff" : "#000",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          News Creator
        </button>
        <button
          onClick={() => setActiveTab("memes")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "memes" ? "#3b82f6" : "#eee",
            color: activeTab === "memes" ? "#fff" : "#000",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Memes Creator
        </button>
      </div>

      {/* NEWS CREATOR */}
      {activeTab === "news" && (
        <>
          <h2 style={{ textAlign: "center" }}>HBCU Shaderoom News Creator</h2>

          <input
            type="text"
            placeholder="Type news headline"
            value={newsHeadline}
            maxLength={100}
            onChange={(e) => setNewsHeadline(e.target.value)}
            style={{
              width: "100%",
              fontSize: 16,
              backgroundColor: "white",
              color: "black",
              height: 40,
              padding: "0 10px",
              border: "1px solid #ccc",
              borderRadius: 4,
              boxSizing: "border-box",
              marginBottom: 10,
            }}
          />

          <div style={{ marginBottom: 10 }}>
            <label>Upload Background Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setNewsBackground)}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Upload Circle Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setNewsCircle)}
            />
          </div>

          <div style={{ width: "100%", overflowX: "auto", margin: "20px 0" }}>
            <div
              ref={newsRef}
              style={{
                width: 1125,
                height: 1113,
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#000",
                margin: "auto",
                border: "2px solid #ccc",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: 654,
                  overflow: "hidden",
                }}
              >
                {newsBackground && (
                  <img
                    src={newsBackground}
                    alt="Background"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: 459,
                  backgroundColor: "black",
                }}
              ></div>

              {newsCircle && (
                <div
                  style={{
                    position: "absolute",
                    top: 50,
                    right: 50,
                    width: 324,
                    height: 304,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "6px solid red",
                    backgroundColor: "white",
                  }}
                >
                  <img
                    src={newsCircle}
                    alt="Circle"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>
              )}

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: 459,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 40px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 72,
                    lineHeight: 1.2,
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    fontFamily: "Impact, sans-serif",
                  }}
                >
                  {newsHeadline.toUpperCase()}
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: "white",
                    maxWidth: 200,
                  }}
                ></div>
                <img
                  src={hbculogo}
                  alt="HBCU Logo"
                  style={{ width: 100, height: "auto" }}
                />
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: "white",
                    maxWidth: 200,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            style={{
              marginTop: 20,
              padding: "10px 20px",
              fontSize: 16,
              width: "100%",
            }}
          >
            Download Graphic
          </button>
        </>
      )}

      {/* MEME CREATOR */}
      {activeTab === "memes" && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>HBCU Shaderoom Memes Creator</h2>

          <input
            type="text"
            placeholder="Enter meme caption"
            value={memeCaption}
            onChange={(e) => setMemeCaption(e.target.value)}
            style={{
              width: "100%",
              fontSize: 16,
              backgroundColor: "white",
              color: "black",
              height: 40,
              marginBottom: 10,
              padding: "0 10px",
              border: "1px solid #ccc",
              borderRadius: 4,
              boxSizing: "border-box",
            }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setMemeImage)}
            style={{ marginBottom: 20 }}
          />

          <div style={{ width: "100%", overflowX: "auto", marginBottom: 20 }}>
            <div
              ref={memeRef}
              style={{
                width: 1125,
                height: 1285,
                backgroundColor: "white",
                color: "black",
                borderRadius: 20,
                padding: 40,
                textAlign: "left",
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                boxSizing: "border-box",
                overflow: "hidden",
                margin: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <img
                  src={whitelogo}
                  alt="Profile"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    marginRight: 10,
                  }}
                />
                <div>
                  <div style={{ fontSize: 30, fontWeight: "bold" }}>
                    HBCUshaderoom
                  </div>
                  <div style={{ fontSize: 30, color: "gray" }}>
                    @hbcu.shaderoom
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontSize: 72,
                  marginBottom: 20,
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  lineHeight: 1.2,
                  fontWeight: "normal",
                }}
              >
                {memeCaption}
              </div>

              {memeImage && (
                <img
                  src={memeImage}
                  alt="Meme"
                  style={{
                    width: "100%",
                    height: 900,
                    maxHeight: 900,
                    objectFit: "cover",
                    objectPosition: "top",
                    borderRadius: 12,
                    border: "1px solid #ccc",
                  }}
                />
              )}
            </div>
          </div>

          <button
            onClick={handleDownload}
            style={{
              padding: "10px 20px",
              fontSize: 16,
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              width: "100%",
            }}
          >
            Download Meme
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
