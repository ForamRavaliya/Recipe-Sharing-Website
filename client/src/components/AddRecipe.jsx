import React, { useState } from "react";
import "./AddRecipe.css";

export default function AddRecipe() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

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
        image: imageName
      })
    });

    alert("Recipe Added Successfully!");
  };

  return (
    <div className="add-container">
      <div className="add-card">

        <h2>Add New Recipe 🍽</h2>

        {/* Image Upload */}
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

        {/* Inputs */}
        <input
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <textarea
          placeholder="Cooking Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />

        <input
          placeholder="Cooking Time (e.g. 30 mins)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button onClick={handleSubmit}>
          Submit Recipe 🚀
        </button>

      </div>
    </div>
  );
}