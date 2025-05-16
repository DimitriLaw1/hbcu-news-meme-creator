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
  const [newsCategory, setNewsCategory] = useState("NEWS"); // category for red box

  // Meme tab state
  const [memeCaption, setMemeCaption] = useState("");
  const [memeImage, setMemeImage] = useState(null);
  const memeRef = useRef(null);

  // Confession tab state
  const [confessionText, setConfessionText] = useState("");
  const confessionRef = useRef(null);
  const [confessionSchool, setConfessionSchool] = useState("");

  useEffect(() => {
    document.title =
      activeTab === "news"
        ? "HBCU Shaderoom News Creator"
        : activeTab === "memes"
        ? "HBCU Shaderoom Memes Creator"
        : "HBCU Confessions Creator";
  }, [activeTab]);

  const handleDownload = async () => {
    const targetRef =
      activeTab === "news"
        ? newsRef
        : activeTab === "memes"
        ? memeRef
        : confessionRef;

    const canvas = await html2canvas(targetRef.current, {
      useCORS: true,
      scale: 1,
      width: 1125,
      height: activeTab === "news" ? 1113 : 1285,
    });

    const link = document.createElement("a");
    link.download = `${activeTab}_template.png`;
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
      {/* Tab Switcher */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        {[
          { key: "news", label: "News Creator" },
          { key: "memes", label: "Memes Creator" },
          { key: "confessions", label: "Confessions Creator" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === tab.key ? "#3b82f6" : "#eee",
              color: activeTab === tab.key ? "#fff" : "#000",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* News Creator */}
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
          {/* Category Dropdown + Red Rectangle Label */}
          <div style={{ marginBottom: 20 }}>
            <select
              value={newsCategory}
              onChange={(e) => setNewsCategory(e.target.value)}
              style={{
                width: "100%",
                height: 40,
                padding: "0 10px",
                fontSize: 16,
                border: "1px solid #ccc",
                borderRadius: 4,
                backgroundColor: "white",
                marginBottom: 10,
                color: "black",
              }}
            >
              <option value="NEWS">NEWS</option>
              <option value="SPORTS">SPORTS</option>
              <option value="FASHION">FASHION</option>
              <option value="MUSIC">MUSIC</option>
            </select>
          </div>
          <div
            style={{
              textAlign: "right",
              fontSize: 12,
              color: newsHeadline.length >= 100 ? "red" : "gray",
              fontWeight: newsHeadline.length >= 100 ? "bold" : "normal",
              marginBottom: 10,
            }}
          >
            {newsHeadline.length}/100 characters
          </div>
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
                border: "none",
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
                  padding: "40px",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                  backgroundColor: "black",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column", // 💡 stack vertically
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {/* Red rectangle display */}
                  <div
                    style={{
                      backgroundColor: "red", // uses same red as your circle border
                      color: "black",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 24,
                      padding: "6px 0",
                      width: 250,
                      margin: "auto",
                      borderRadius: 4,
                    }}
                  >
                    {newsCategory}
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 64,
                      lineHeight: 1.2,
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      fontFamily: "Impact, sans-serif",
                      maxWidth: "100%",
                      marginBottom: 20,
                    }}
                  >
                    {newsHeadline.toUpperCase()}
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
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
                  style={{ width: 70, height: "auto" }}
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

      {/* Meme Creator */}
      {activeTab === "memes" && (
        <div style={{ textAlign: "center", color: "black" }}>
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
                  <div style={{ fontSize: 40, fontWeight: "bold" }}>
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

      {/* Confession Creator */}
      {activeTab === "confessions" && (
        <div style={{ textAlign: "center", color: "black" }}>
          <h2>HBCU Confessions Creator</h2>
          <textarea
            placeholder="Enter confession text"
            value={confessionText}
            onChange={(e) => setConfessionText(e.target.value)}
            rows={10}
            style={{
              width: "100%",
              fontSize: 16,
              backgroundColor: "white",
              color: "black",
              padding: 10,
              marginBottom: 10,
              border: "1px solid #ccc",
              borderRadius: 4,
              boxSizing: "border-box",
              resize: "none",
            }}
          />
          <input
            type="text"
            placeholder="Enter school name (e.g. - WSSU)"
            value={confessionSchool}
            onChange={(e) => setConfessionSchool(e.target.value)}
            style={{
              width: "100%",
              fontSize: 16,
              backgroundColor: "white",
              color: "black",
              height: 40,
              marginBottom: 20,
              padding: "0 10px",
              border: "1px solid #ccc",
              borderRadius: 4,
              boxSizing: "border-box",
            }}
          />

          <div style={{ width: "100%", overflowX: "auto", marginBottom: 20 }}>
            <div
              ref={confessionRef}
              style={{
                width: 1125,
                height: 1086,
                backgroundColor: "white",
                color: "black",
                borderRadius: 20,
                padding: 40,
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                boxSizing: "border-box",
                overflow: "hidden",
                margin: "auto",
                display: "block",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 30,
                  marginTop: 80,
                }}
              >
                <img
                  src={whitelogo}
                  alt="Profile"
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: 10,
                  }}
                />
                <div>
                  <div style={{ fontSize: 50, fontWeight: "bold" }}>
                    HBCUshaderoom
                  </div>
                  <div style={{ fontSize: 30, color: "gray" }}>
                    @hbcu.shaderoom
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: 45,
                  lineHeight: 1.4,
                  whiteSpace: "pre-wrap",
                  fontWeight: "normal",
                  marginBottom: 40,
                }}
              >
                {confessionText}
              </div>

              {confessionSchool && (
                <div
                  style={{
                    fontSize: 30,
                    marginTop: 40,
                    whiteSpace: "pre-wrap",
                    fontWeight: "normal",
                  }}
                >
                  {confessionSchool}
                </div>
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
            Download Confession
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
