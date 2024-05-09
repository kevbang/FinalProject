import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateRecipe = (recipeID) => {
    const [updatedRecipe, setUpdatedRecipe] = useState({
        name: "",
        description: "",
        ingredients: [],
        instructions: "",
        image: "",
        prepTime: 0,
        category: ""
    });
  

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/recipes/${recipeID}`);
                setUpdatedRecipe(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchRecipe();
    }, [recipeID]);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setUpdatedRecipe({
            ...updatedRecipe,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:3001/recipes/${recipeID}`, updatedRecipe);
            alert("Recipe updated successfully!");
        } catch (error) {
            console.log(error.message);
            alert("Failed to update recipe");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" value={updatedRecipe.name} onChange={handleInput} />
            <label htmlFor="description">Description:</label>
            <input type="text" name="description" value={updatedRecipe.description} onChange={handleInput} />
            <label htmlFor="ingredients">Ingredients:</label>
            <input type="text" name="ingredients" value={updatedRecipe.ingredients.join(", ")} onChange={handleInput} />
            <label htmlFor="instructions">Instructions:</label>
            <input type="text" name="instructions" value={updatedRecipe.instructions} onChange={handleInput} />
            <label htmlFor="image">Image URL:</label>
            <input type="text" name="image" value={updatedRecipe.image} onChange={handleInput} />
            <label htmlFor="prepTime">Preparation Time:</label>
            <input type="number" name="prepTime" value={updatedRecipe.prepTime} onChange={handleInput} />
            <label htmlFor="category">Category:</label>
            <input type="text" name="category" value={updatedRecipe.category} onChange={handleInput} />
            <button type="submit">Update Recipe</button>
        </form>
    );
};

export default UpdateRecipe;
