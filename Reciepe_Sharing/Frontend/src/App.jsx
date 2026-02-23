import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeList from "./pages/RecipeList";
import MyRecipes from "./pages/MyRecipes";
import AddRecipe from "./pages/AddRecipe";

function App() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
        </Routes>
      </div>
    </>
  );
}

export default App;