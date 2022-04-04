import React from 'react'

const RecipeIngredients = ( {recipe} ) => {

    const ingredients = recipe.ingredients.split('\n')
    .filter( (ingredient=>ingredient!==""))

  return (
    <div>
        <h4>Ingredients</h4>
        {ingredients.map((ingredient,index) =>{
            return(
                <span className="user-infos ingredient" key={index}>{ingredient}</span> 
            )
        })}
    </div>
  ) 
                  
}

export default RecipeIngredients;