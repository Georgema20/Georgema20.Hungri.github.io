
// eb9d5479ac1744f3a9381303be711783
//api key ^ 

class food{
  
constructor(){
  this.link = "https://api.spoonacular.com/recipes/complexSearch?number=3&apiKey=eb9d5479ac1744f3a9381303be711783&instructionsRequired=true&sortDirection=asc&addRecipeInformation=true";
}


//ADDING IN INGREDIENTS TO LIST
  addIngredients(food){
  const addThis = document.createElement('div');
  const icon = document.createElement('i');
  icon.className='far fa-trash-alt ingredient';
  addThis.innerHTML = `${food}`;
  // addThis.className = 'ingredient'
  addThis.appendChild(icon);
  
  icon.addEventListener('click',()=>{
    icon.parentElement.remove();
  });

  const addHere = document.getElementById('ingredientsAdded');
  addHere.appendChild(addThis);
}


//CHECKING IF FORM IS VALID 
  isValidForm(){
    let isValid = true; 

    //check diets 
    const dietTypes = document.querySelectorAll("#dietType");
    let dietsChecked = 0; 

    dietTypes.forEach((dietType)=>{
      const diet = dietType.childNodes[1].childNodes[3]; 
      if(diet.checked===true){
        dietsChecked = dietsChecked + 1;}
    })

    if(dietsChecked===0){
      return false; }

    //check intolerances 

    const intolerances = document.querySelectorAll(".intolerance");
    let intolerancesChecked = 0; 
    
    intolerances.forEach((intolerance)=>{
      
      if(intolerance.checked===true){
        intolerancesChecked = intolerancesChecked + 1;}
       })
      
       if(intolerancesChecked===0){
        return false; }

    //check ingredients 

    const ingredientsAdded = document.getElementById('ingredientsAdded').childNodes;
    
    let ingredientsAddedChecked=0; 

    ingredientsAdded.forEach((ingredient, index)=>{
      ingredientsAddedChecked = ingredientsAddedChecked + 1; 
    })

    if(ingredientsAddedChecked===0){
      return false;
    }

    return isValid;
  }




  //FINDING A RECIPIE

  findARecipe(){
    let tempLink = this.link; 

    //Adding diets into link 
    const dietTypes = document.querySelectorAll("#dietType");
    
    let dietsChecked = 0; 

    dietTypes.forEach((dietType)=>{
      
      const diet = dietType.childNodes[1].childNodes[3]; 
      

      if(diet.checked===true){
       

        if(diet.id!="NoDiet"){
          dietsChecked = dietsChecked + 1;
          
          if(dietsChecked===1){
          tempLink += `&diet=${diet.id}`;}

          if(dietsChecked>1){
            tempLink+=`,+${diet.id}`;
          }
              }}
    })


    //Adding intolerances into link 

    const intolerances = document.querySelectorAll(".intolerance");
    let intolerancesChecked = 0; 



    intolerances.forEach((intolerance)=>{
      
      if(intolerance.checked===true){


        if(intolerance.id!="NoIntolerances"){
          intolerancesChecked = intolerancesChecked + 1;
          
          if(intolerancesChecked===1){
          tempLink += `&intolerances=${intolerance.id}`;}

          if(intolerancesChecked>1){
            tempLink+=`,+${intolerance.id}`;
          }
              }}
    })

    //Adding ingrediants into link 

    const ingredientsAdded = document.getElementById('ingredientsAdded').childNodes;

    ingredientsAdded.forEach((ingredient, index)=>{
      //need to get rid of spaces and turn into hyphens 
     
      const rightFood = getRidOfSpaces(ingredient.innerText);
     
      if(index===0){
        tempLink += `&includeIngredients=${rightFood}`;
      }
      else{
        tempLink+=`,+${rightFood}`;
      }
    })

    this.createCarousel(tempLink);
    
  }


 //warning 

 warning(){
  const warning = document.getElementById('warning')

  warning.innerText = "Please choose AT LEAST ONE option in BOTH the diet and  intolerance section. Also, make sure to put in AT LEAST ONE ingredient!";

  warning.scrollIntoView();

  setTimeout(()=>{
    warning.innerText="";
  }, 4000);
 }

 //Create Carousel 

 async createCarousel(url){
    console.log(url);
    //const resData = this.get(url).then((recipe)=>{this.implementCarousel(recipe)})
    const resData = await this.get(url);
    this.implementCarousel(resData);
 }


//Implementing Carousel 

 implementCarousel(data){
  
  const rec = data.results;


  rec.forEach((recipe, index)=>{
    //GETTING INFORMATION
    const title = recipe.title;
    const blurb = `${title} serves about ${recipe.servings} and takes roughly ${recipe.readyInMinutes} minutes to make!`;
    const img = recipe.image;
    const Recsteps = recipe.analyzedInstructions[0].steps
  
    //Adding recipe steps into steps 
    const instructionsPlace = document.getElementById(`instructions${index+1
    }`)
    instructionsPlace.innerHTML= `<h4>Instructions</h4>`

    

    Recsteps.forEach((step)=>{
      const li = document.createElement('li');
      li.innerHTML= `<span class="bold">${step.number
      })</span> ${step.step}`

      instructionsPlace.appendChild(li); 
    })
    
    //ADDING INGREDIENTS INTO 


    this.getIngredients(recipe.id).then((neededIngredients)=>{const theStuff = neededIngredients.extendedIngredients;
     
      const ingredientsPlace = document.getElementById(`ingredients${index+1}`)
      console.log(`ingredients${index+1}`);

      ingredientsPlace.innerHTML =  `<h4>Ingredients</h4>`;

        theStuff.forEach((stuff)=>{
          const li = document.createElement('li');
          li.innerHTML= `${stuff.original}`
          ingredientsPlace.appendChild(li); 
        })

    }
    
    );

    //REPLACING STUFF 

    let recipeTitle = document.querySelectorAll('#recipe')[index].children.item(0).children.item(0);

    recipeTitle.innerText=title;

    let recipeBlurb = document.querySelectorAll('#recipe')[index].children.item(0).children.item(2);
    recipeBlurb.innerText=blurb;

    
    let recipePhoto = document.querySelectorAll('#recipe')[index].children.item(0).children.item(1);
    recipePhoto.src=img;
  })
 }



  //GET 
 async get(url){
  const response = await fetch(url);
  const resData = await response.json();
  return resData;
 }



//Getting ingredients w food id 
getIngredients(id){
const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=eb9d5479ac1744f3a9381303be711783`

 return this.get(url);
}





}