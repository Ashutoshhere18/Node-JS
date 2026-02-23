import { useEffect, useState } from "react";
import axios from "axios";

function RecipeList() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const res = await axios.get("http://localhost:5000/api/recipes");
    setRecipes(res.data);
  };

  return (
    <>
      <h3>All Recipes</h3>

      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-4 mb-3" key={recipe._id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <button
  className="btn btn-sm btn-danger mt-2"
  onClick={async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/recipes/${recipe._id}`,
        { withCredentials: true }
      );
      alert("Deleted");
      fetchRecipes();
    } catch {
      alert("Only Admin Can Delete");
    }
  }}
>
  Delete
</button>
                <h5>{recipe.title}</h5>
                <p><strong>By:</strong> {recipe.createdBy?.username}</p>
                <p>{recipe.ingredients}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default RecipeList;