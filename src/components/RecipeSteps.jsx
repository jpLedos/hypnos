import React from 'react'

const RecipeSteps = ( {recipe} ) => {

    const steps = recipe.steps.split('\n')
    .filter( (step=>step!=="")) 

  return (
    <div>
        <h3>La préparation</h3>
        <div className="d-flex justify-content-between mx-5">
            <div>
                <span className="cuisson-title">Preparation </span><br />
                <span className="cuisson-infos">{recipe.preparationTime}</span>
            </div>
            <div>
                <span className="cuisson-title">Repos</span><br />       
                <span className="cuisson-infos" >{recipe.timeout}</span>
            </div>
            <div>
                <span className="cuisson-title">Cuisson</span><br />       
                <span className="cuisson-infos" >{recipe.cookingTime} </span>
            </div>
   
        </div> 
        <ol className = "steps">
            {steps.map((step,index) =>{
                return (
                    <li key={index}>{step}</li>
                )
            })}
        </ol>
    </div>
  ) 
                  
}

export default RecipeSteps