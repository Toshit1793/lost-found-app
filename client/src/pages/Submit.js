import { useState } from "react";

export default function Submit() {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleSubmit = () => {
    alert("Submitted: " + JSON.stringify(form));
  };

  return (
    <div>
      <input
        placeholder="Item title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}