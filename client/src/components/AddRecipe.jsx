import React, { useState } from "react";
import "./AddRecipe.css";
import { useNavigate } from "react-router-dom";

export default function AddRecipe() {
  const navigate = useNavigate(); // ✅ inside component

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState("");

  // ✅ FIX: define BEFORE use
  const cleanCategory = (cat) =>
    cat.toLowerCase().replace(/\s+/g, "-");

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    return data.image;
  };

  const handleSubmit = async () => {
    let imageName = "";

    if (image) {
      imageName = await uploadImage();
    }

    await fetch("http://localhost:5000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        ingredients,
        steps,
        time,
        image: imageName,
        category: cleanCategory(category) // ✅ fixed
      })
    });

    alert("Recipe Added Successfully!");

    navigate("/recipes"); // ✅ correct place
  };

  return (
    <div className="add-container">
      <div className="add-card">

        <h2>Add New Recipe 🍽</h2>

        <div className="image-upload">
          <label>Upload Image</label>

          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />

          {preview && <img src={preview} alt="preview" />}
        </div>

        <input
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <textarea
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />

        <input
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="kathiyawadi">Kathiyawadi</option>
          <option value="south-indian">South Indian</option>
          <option value="fast-food">Fast Food</option>
          <option value="punjabi">Punjabi</option>
        </select>

        <button onClick={handleSubmit}>
          Submit Recipe 🚀
        </button>

      </div>
    </div>
  );
}