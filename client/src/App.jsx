import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import Login from "./components/Login";
import AddRecipe from "./components/AddRecipe";
import Favorites from "./components/Favorites";
import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />

        {/* TEMP pages */}
       <Route path="/add" element={<AddRecipe />} />
       <Route path="/favorites" element={<Favorites />} />
       <Route path="/contact" element={<Contact />} />
       <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;