import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home} from "./pages/Home";
import {CreateRecipe} from "./pages/CreateRecipe";
import {FavoriteRecipes} from "./pages/FavoriteRecipe";
import { Authorization } from "./pages/authorization.js";
import {Info} from "./pages/Info";
import Navbar from "./components/navbar";


function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/CreateRecipe" element={<CreateRecipe/>}/>
          <Route path="/FavoriteRecipe" element={<FavoriteRecipes/>}/>
          <Route path="/info" element={<Info/>}></Route>
          <Route path="/auth" element={<Authorization/>}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
