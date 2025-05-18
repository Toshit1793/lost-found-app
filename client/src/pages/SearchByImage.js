import { useState } from "react";

export default function SearchByImage() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image to search.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("https://lost-found-backend-tnk9.onrender.com/api/search_by_image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResults(data.matches || []);
    } catch (err) {
      alert("Search failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🔍 Search by Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ marginBottom: "1rem" }}
      />
      <button onClick={handleSubmit}>Search</button>

      <div style={{ marginTop: "2rem" }}>
        {results.length > 0 ? (
          <>
            <h3>🔎 Matches Found:</h3>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {results.map((item, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid #ccc",
                    padding: "1rem",
                    borderRadius: "8px",
                    width: "200px",
                  }}
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    style={{ width: "100%", borderRadius: "4px" }}
                  />
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
