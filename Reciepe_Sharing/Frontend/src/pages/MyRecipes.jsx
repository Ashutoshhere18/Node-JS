import { useEffect, useState } from "react";
import axios from "axios";

function MyRecipes() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const fetchMyRecipes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/recipes/my",
        { withCredentials: true }
      );

      setRecipes(res.data);
    } catch {
      alert("Login Required");
    }
  };

  return (
    <>
      <h3>My Recipes</h3>

      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-4 mb-3" key={recipe._id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>{recipe.title}</h5>
                <p>{recipe.ingredients}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyRecipes;