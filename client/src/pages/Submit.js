import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Submit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [itemType, setItemType] = useState("lost");
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = getAuth().currentUser;
    if (!currentUser) {
      alert("🔒 You must be logged in to submit.");
      return;
    }

    if (!title.trim() || !description.trim() || !image) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("itemType", itemType);               // ✅ send item type
    formData.append("userEmail", currentUser.email);     // ✅ send user email

    try {
      setIsSubmitting(true);

      const response = await fetch("https://lost-found-backend-tnk9.onrender.com/api/upload_image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Submitted successfully!");
        console.log("Uploaded item:", data);

        // Reset form
        setTitle("");
        setDescription("");
        setImage(null);
        setItemType("lost");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        alert("❌ Upload failed: " + data.error);
      }
    } catch (error) {
      alert("❌ Error uploading: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📤 Submit Lost or Found Item</h2>

      {!user ? (
        <p style={{ color: "red" }}>🔒 Please log in to submit an item.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
          {/* Title Input */}
          <div style={{ marginBottom: "1rem" }}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          {/* Description Input */}
          <div style={{ marginBottom: "1rem" }}>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          {/* Image Upload */}
          <div style={{ marginBottom: "1rem" }}>
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
            {image && (
              <div style={{ marginTop: "0.5rem" }}>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  width="150"
                  style={{ border: "1px solid #ccc", padding: "5px" }}
                />
              </div>
            )}
          </div>

          {/* Lost or Found Buttons */}
          <div style={{ margin: "1rem 0" }}>
            <button
              type="button"
              onClick={() => setItemType("lost")}
              style={{
                backgroundColor: itemType === "lost" ? "#007bff" : "#ccc",
                color: "white",
                marginRight: "10px",
                padding: "5px 10px",
              }}
            >
              Lost Item
            </button>
            <button
              type="button"
              onClick={() => setItemType("found")}
              style={{
                backgroundColor: itemType === "found" ? "#28a745" : "#ccc",
                color: "white",
                padding: "5px 10px",
              }}
            >
              Found Item
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "10px 20px",
              backgroundColor: "#333",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}

export default Submit;
