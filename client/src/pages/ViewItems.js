import { useEffect, useState } from "react";

export default function ViewItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://lost-found-backend-tnk9.onrender.com/api/items")
      .then(res => res.json())
      .then(setItems)
      .catch(err => alert("Failed to load items"));
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Lost/Found Submissions</h2>
      {items.length === 0 && <p>No items submitted yet.</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
        {items.map((item, i) => (
          <div key={i} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <img src={item.image_url} alt={item.title} style={{ width: "100%" }} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
