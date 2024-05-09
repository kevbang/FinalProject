import { useState, useEffect } from "react";
import axios from "axios";
import { getFavoriteID } from "../components/UserHook.js";

export const FavoriteRecipes = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const userID = getFavoriteID();

    useEffect(() => {
        const getFavoriteRecipes = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/recipes/favorites/${userID}`);
                setFavoriteRecipes(res.data.favorites);
                console.log("hey"+favoriteRecipes);
            }
            catch( error) {
                console.log(error.message);
            }
        }

        getFavoriteRecipes();
    }, []);

    
    return( 
        <div> 
            <h2 className="favoriteTitle"> Favorite Recipes</h2>
            <ul>
                {favoriteRecipes && favoriteRecipes.map((recipe) => (
                    <li key={recipe._id}>
                        <div style={{
                                    textAlign: 'center', 
                                    marginBottom: '10px', 
                                }}>
                            <h2>{recipe.name}</h2>
                        </div>
                        <div className="instructions" style={{
                                    textAlign: 'center', 
                                    marginBottom: '10px', 
                                }}>
                            <p>{recipe.instructions}</p>
                        </div>
                        <img src={recipe.image} alt={recipe.name} style={{
                                width: '25%', 
                                height: 'auto', 
                                display: 'block', 
                                margin: '0 auto', 
                                borderRadius: '8px', 
                            }} />
                        <p style={{
                                    textAlign: 'center', 
                                    marginBottom: '10px', 
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
