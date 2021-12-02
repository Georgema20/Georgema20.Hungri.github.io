
const myFood = new food();

//GET STARTED 

const getStarted = document.getElementById('getStarted'); 
const input = document.getElementById('input');

getStarted.addEventListener('click',(e)=>{
  
  input.style.display = 'block';    
  input.scrollIntoView();
  e.preventDefault();

});

//ENTERING IN INGREDIENT

const ingredients = document.getElementById('ingredients');
ingredients.addEventListener('keypress',(e)=>{
  if(e.key==='Enter'&&ingredients.value.trim()!=""){
    myFood.addIngredients(ingredients.value);
    ingredients.value = '';
  }
});

//Carousel 

const carousel = document.getElementById('carousel');

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.carousel');
  var instances = M.Carousel.init(elems);
  carousel.style.display= "none";
});

//Find Recipe 

const findRecipe = document.getElementById('findRecipe');

findRecipe.addEventListener('click', ()=>{

  //if form valid filled out 
  
  if(myFood.isValidForm()){
    //MATERIALIZE CAROUSEL INITIATION 
          carousel.style.display= "block";

        //Recipe stuff 
    myFood.findARecipe();
    carousel.style.display="block";
    carousel.scrollIntoView();
}

  //if form not valid filled out 
  else{
    myFood.warning(); 
    carousel.style.display="none";
  }
 });

 //Helper function to get rid of spaces 

 function getRidOfSpaces(word){
  
  let firstLetter = 0; 
  let lastLetter = word.length -1;

  for(let i = 0; i<word.length; i++){
    if(word[i]!==" "){
      firstLetter = i;
      i=word.length;}
  }

  for(let i = word.length-1; i>=0; i--){
    if(word[i]!==" "){
      lastLetter = i;
      i=-1;}
  }
  
  word = word.substring(firstLetter,lastLetter+1);
  //replace all spaces with hypen 
  const newWord = word.replace(/\s/g, '-');

  return newWord;
 }


 //The NONE and not NONE button event listeners 

//intolerances
 const intolerances = document.querySelectorAll('.intolerance');

 intolerances.forEach((intolerance)=>{
   if(intolerance.id!="NoIntolerances"){
      intolerance.addEventListener('change', ()=>{
        //make the no intolerance one clear 
        if(intolerance.checked===true){
        const temp = document.getElementById('NoIntolerances');
        temp.checked=false;}
      })
   }

   else{
    intolerance.addEventListener('change',()=>{
      //make all other intolerances not checked 
      if(intolerance.checked===true){
        intolerances.forEach((intolerance2)=>{
          if(intolerance2.id!=="NoIntolerances"){
            intolerance2.checked=false;
          }
        })
      }
    })
   }
 })

//diets 

 const dietTypes = document.querySelectorAll("#dietType");

    dietTypes.forEach((dietType)=>{
      
      const diet = dietType.childNodes[1].childNodes[3]; 

      if(diet.id!=="NoDiet"){
        diet.addEventListener('change',()=>{
          if(diet.checked===true){
            const temp = document.getElementById('NoDiet');
            temp.checked = false;
          }
        })
       }

       else{
        diet.addEventListener('change', ()=>{
          if(diet.checked===true){
            dietTypes.forEach((dietType2)=>{
              const diet2 = dietType2.childNodes[1].childNodes[3]; 
              if(diet2.id!=="NoDiet"){
                diet2.checked=false;
              }
            })
          }
        })
       }
    })
