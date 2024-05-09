import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFavoriteID } from "../components/UserHook.js";
import "../App.css";
import { BiAddToQueue } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

export const CreateRecipe = () => {
    const userID = getFavoriteID();
    const [recipe, setRecipe] = useState({
        name: "",
        description: "",
        ingredients: [],
        instructions: "",
        image: "",
        prepTime: 0,
        category: "",
        user: userID,
    });

    const returnHome = useNavigate();
    
    /**
     * this method changes a specific detail of the recipe. 
     * @param {*} event event being passed in  
     */
    const changeDetail = (event) => {
        const { name, value } = event.target;
        setRecipe({...recipe, [name]: value });
    }

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
    }

    const changeIngredient = (event, index) => {
        const { value } = event.target;
        const copyOfIngredients = recipe.ingredients;
        copyOfIngredients[index] = value;
        setRecipe({...recipe, ingredients: copyOfIngredients });    
    }

    const submitRecipe = async (event) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:3001/recipes", recipe);
            alert("Successfully created a recipe!");
            returnHome("/");
        }
        catch( error) {
            console.log(error.message);
        }
    }
    console.log(recipe);
    return( 
    <div className="createRecipe"> 
    <h2 className="createRecipeTitle"> Create a Recipe: </h2>
    <form onSubmit={submitRecipe}>
    <div className="form__group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={changeDetail} className="form__field"/>
    </div>
    <div className="form__group">
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" onChange={changeDetail} className="form__field"></textarea>
    </div>
        <div className="form__group">

         <label htmlFor="ingredients" className="form__field">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
            <input key={index}
                type="text"
                name="ingredients" 
                value={ingredient} 
                onChange={(event) => changeIngredient(event, index)}
                className="form__field"
            />
        ))}
        <button 
            onClick={addIngredient} 
            type="button"
            style={{
                padding: '10px 20px',
                backgroundColor: '#222629',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
            }} >
                <BiAddToQueue /></button>   
    
        </div>
        
        <div className="form__group">
            <label htmlFor="instructions">Instructions</label>
            <textarea name="instructions" id="instructions" onChange={changeDetail} className="form__field"/> 
        </div>
       
        <div className="form__group">
            <label htmlFor="image">Image URL</label>
            <input type="text" id="image" name="image" onChange={changeDetail} className="form__field" />
        </div>
        
        <div className="form__group">
            <label htmlFor="prepTime">Time</label>
            <input type="number" id="prepTime" name="prepTime" onChange={changeDetail} className="form__field"/>
        </div>
        
        <div className="form__group">
                    <label htmlFor="category">Category</label>
        <input type="text" id="category" name="category" onChange={changeDetail} className="form__field"/>
        </div>

        <br/>
        <button type="submit" className="createButton"> <IoMdAdd></IoMdAdd> Create Recipe</button>
        
    </form>
    </div>

);
}