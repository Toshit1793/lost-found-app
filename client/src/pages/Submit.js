import { useState } from "react";

export default function Submit() {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://lost-found-backend-tnk9.onrender.com/api/upload_image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      alert("Response from backend: " + JSON.stringify(data));
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Submit Lost/Found Item</h2>
      <input
        placeholder="Item title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
