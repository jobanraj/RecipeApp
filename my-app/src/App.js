import React, {useEffect, useState } from "react";
import Recipe from './Recipe';
import "./App.css";


const App = () => {
  const APP_ID = "063b6ff4";
  const APP_KEY = "f3effcbf3e49c12d085b26eb378aa47c";
   
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, []);

   const getRecipes = async () => {
     const response = await fetch(
       `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
     );
     const data = await response.json();
     setRecipes(data.hits);
     console.log(data.hits);
   };

   const updateSearch = e => {
     setSearch(e.target.value);
     console.log(search);
   };

   const getsearch = e => {
     e.preventDefault();
     setQuery(search);
   }


  return (
    <div className="App">
      <form onSubmit={getsearch} className="search-form">
        <input 
        className="search-bar"
        type="text"
        value={search}
        onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {recipes.map(recipe => (
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />

      )
      )}

    </div>
  );
}

export default App;
