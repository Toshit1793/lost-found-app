import { useEffect, useState } from "react";
import axios from "axios";

function ViewItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://lost-found-backend-tnk9.onrender.com/api/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Failed to fetch items:", err));
  }, []);

  const lostItems = items.filter(item => item.type === "lost");
  const foundItems = items.filter(item => item.type === "found");

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🔍 Lost Items</h2>
      {lostItems.length === 0 && <p>No lost items submitted yet.</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {lostItems.map((item, index) => (
          <div key={index} style={{ border: "1px solid red", padding: "1rem", borderRadius: "8px", width: "200px" }}>
            <img src={item.image_url} alt={item.title} style={{ width: "100%", height: "auto" }} />
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <small>Submitted by: {item.user}</small>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "2rem" }}>📦 Found Items</h2>
      {foundItems.length === 0 && <p>No found items submitted yet.</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {foundItems.map((item, index) => (
          <div key={index} style={{ border: "1px solid green", padding: "1rem", borderRadius: "8px", width: "200px" }}>
            <img src={item.image_url} alt={item.title} style={{ width: "100%", height: "auto" }} />
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <small>Submitted by: {item.user}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewItems;

