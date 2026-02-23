import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function AddRecipe() {

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/recipes",
        { title, ingredients, instructions },
        { withCredentials: true }
      );

      alert("Recipe Added");
      navigate("/");

    } catch (error) {
      alert("Login Required");
    }
  };

  return (
    <div className="col-md-6 mx-auto">
      <h3 className="mb-3">Add Recipe</h3>

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)} />

        <textarea className="form-control mb-2"
          placeholder="Ingredients"
          onChange={(e) => setIngredients(e.target.value)} />

        <textarea className="form-control mb-2"
          placeholder="Instructions"
          onChange={(e) => setInstructions(e.target.value)} />

        <button className="btn btn-warning w-100">Add</button>
      </form>
    </div>
  );
}

export default AddRecipe;