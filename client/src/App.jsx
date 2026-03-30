import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import Login from "./components/Login";
import AddRecipe from "./components/AddRecipe";
import Favorites from "./components/Favorites";
import Contact from "./components/Contact";
import Category from "./components/Category";

// Home page
function Home() {
  return (
    <>
      <Hero />
      <Category />
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* ✅ HOME */}
        <Route path="/" element={<Home />} />

        {/* ✅ RECIPES PAGE */}
        <Route path="/recipes" element={<RecipeList />} />

        {/* ✅ SINGLE RECIPE */}
        <Route path="/recipe/:id" element={<RecipeDetail />} />

        {/* ✅ ADD RECIPE */}
        <Route path="/add" element={<AddRecipe />} />

        {/* OTHER */}
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;