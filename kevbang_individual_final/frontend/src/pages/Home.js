import { useState, useEffect } from "react";
import axios from "axios";
import { getFavoriteID } from "../components/UserHook.js";
import { useNavigate, BrowserRouter as Route} from "react-router-dom";

export const Home = () => {
    const [recipeList, setRecipeList] = useState([]);
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const navigate = useNavigate();
    const [updatedPrepTime, setUpdatedPrepTime] = useState(0);
    const userID = getFavoriteID();

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const res = await axios.get("http://localhost:3001/recipes");
                setRecipeList(res.data);
            } catch(error) {
                console.log(error.message);
            }
        }
        const getFavoriteRecipes = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/recipes/favorites/ids/${userID}`);
                setFavoriteRecipes(res.data.favorites);
            }
            catch( error) {
                console.log(error.message);
            }
        }
        getRecipe();
        getFavoriteRecipes();
    }, []);

    const makeFavorite = async (recipeID) => {
        try {
            if(!recipeID) {
                console.log("Favorite ID is not created yet");
                return;
            }
            const res = await axios.put("http://localhost:3001/recipes", { 
                recipeID: recipeID,
                userID: userID,
            });
            setFavoriteRecipes(res.data.favoriteRecipes);
            
        } catch(error) {
            console.log(error.message);
        }
    };
    const deleteRecipe = async (recipeID) => {
        try {
            await axios.delete(`http://localhost:3001/recipes/${recipeID}`);
            
            setRecipeList(recipeList.filter(recipe => recipe._id !== recipeID));
        }
        catch(error) {
            console.log(error.message);
        }
    }
    const isAlreadyFavorited = (id) => 
        {
            if(!favoriteRecipes || !favoriteRecipes.length)
                {
                    return false;
                }
            return favoriteRecipes.includes(id);
        }

        const updateRecipe = async (recipeID) => {
            try {
                // Get the current recipe
                const recipeToUpdate = recipeList.find(recipe => recipe._id === recipeID);
                if (!recipeToUpdate) {
                    console.log("Recipe not found.");
                    return;
                }
        
                // Prepare the updated recipe object with the new prep time
                const updatedRecipe = { ...recipeToUpdate, prepTime: updatedPrepTime };
        
                // Send a PUT request to update the recipe on the server
                const res = await axios.put(`http://localhost:3001/recipes/${recipeID}`, updatedRecipe);
        
                // Update the recipe list with the updated recipe
                setRecipeList(recipeList.map(recipe => recipe._id === recipeID ? res.data : recipe));
        
                // Reset updated prep time
                setUpdatedPrepTime(0);
            } catch(error) {
                console.log(error.message);
            }
        };
        return( 
            <div> 
                <h2 className="homeTitle">Recipes</h2>
                <ul>
                    {recipeList.map((recipe) => (
                        <li key={recipe._id} className="recipeItem">
                            <div style={{
                                    textAlign: 'center', 
                                    marginBottom: '10px', 
                                }}>
                                <h2
                                style={{
                                    textAlign: 'center', 
                                    marginBottom: '10px', 
                                }}>{recipe.name}</h2>
                                <button 
                                    onClick={() => makeFavorite(recipe._id)} 
                                    disabled={isAlreadyFavorited(recipe._id)}
                                    className="favoriteButton"
                                    style={{
                                    textAlign: 'center', 
                                    marginBottom: '10px', 
                                }}
                                >
                                    {isAlreadyFavorited(recipe._id) ? "Favorited" : "Favorite"}
                                </button>
                                <button onClick={() => deleteRecipe(recipe._id)} className="deleteButton">Delete</button>
                                <button 
                                    onClick={() => updateRecipe(recipe._id)} 
                                    className="updateButton"
                                    
                                >
                                    Update Prep Time
                                </button>
        
                                <input 
                                    type="number"
                                    value={updatedPrepTime}
                                    onChange={(event) => setUpdatedPrepTime(parseInt(event.target.value))}
                                    className="prepTimeInput"
                                />
                                
                            </div>
                            <div className="instructions">
                                <p style={{
                                    textAlign: 'center', 
                                    marginBottom: '10px', 
                                }}>{recipe.instructions}</p>
                            </div>
                            <img src={recipe.image} alt={recipe.name} className="recipeImage"style={{
                                width: '25%', 
                                height: 'auto', 
                                display: 'block', 
                                margin: '0 auto', 
                                borderRadius: '8px', 
                            }} />
                            <p className="prepTime" style={{
                                    textAlign: 'center', /* Center-align the text */
                                    marginBottom: '10px', /* Space below the heading */
                                }}>Takes about: {recipe.prepTime} minutes.</p>
                            <p style={{
                                    textAlign: 'center', 
                                    marginBottom: '10px', 
                                }}>Ingredient List: {recipe.ingredients}</p>
                        </li>
                    ))}
                </ul>
            </div>
        ); 
};
