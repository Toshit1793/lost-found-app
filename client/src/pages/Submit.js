import { useState } from "react";

export default function Submit() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleSubmit = async () => {
    if (!form.image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("image", form.image); // actual file

    try {
      const response = await fetch("https://lost-found-backend-tnk9.onrender.com/api/upload_image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      alert("Server says: " + JSON.stringify(data));
    } catch (error) {
      alert("Error uploading: " + error.message);
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

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        style={{ display: "block", marginBottom: "1rem" }}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
