// HTML point to variables
var resultsContainer = $('#results')
var backBtn = $('#backBtn')

// Give it a wine and get a food
function getWinePairing() {
  fetch(pairingUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var resultCardContainer = $('<div>')
      var description = $('<p>')

      description.text(data.text)

      resultsContainer.append(resultCardContainer)
      resultCardContainer.append(description)

      for (var i = 0; i < data.pairings.length; i++) {
        pairFood = data.pairings[i]
        pairedWineRecipes(pairFood)
      }
    })
}

function pairedWineRecipes() {
  fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${pairFood}&app_key=d0e7ce8996da109b870161b5504f5e87&app_id=b7a56f5e`)
    .then(function (response) {
      console.log(response)
      return response.json();
    })
    .then(function (dataPF) {
      console.log(dataPF)

      var dh = dataPF.hits[0]
      var resultEntry = $('<div>')
      var saveBtn = $('<button>');
      var recipeImg = $('<img>');
      var nameOfRecipe = $('<h2>');
      var linkToRecipe = $('<a>')
      var imgPContainer = $('<div>');

      recipeImg.attr('src', dataPF.hits[0].recipe.image);
      saveBtn.text('save');
      saveBtn.attr('class', 'saveBtn');
      recipeImg.attr('class', 'object-scale-down h-48 w-96')
      //   resultEntry.attr('class', 'border-4 border-green-800 border-double my-5')
      // linkToRecipe.attr([{
      //   'href': dh.recipe.url,
      //   'class': 'recipe-content'
      // }]) // don't know why but these were not working had to separate them 
      linkToRecipe.attr({
        'href': dh.recipe.url,
        'class': 'recipe-content',
      })
      nameOfRecipe.attr('class', 'font-bold text-xl mb-2')
      resultEntry.attr('class', 'recipe border-4 border-green-800 border-double my-5');
      imgPContainer.attr('class', 'content-container')

      nameOfRecipe.text(dh.recipe.label)
      linkToRecipe.text('Go to Recipe')

      resultsContainer.append(resultCardContainer)
      imgPContainer.append(recipeImg, linkToRecipe);
      resultEntry.append(nameOfRecipe, imgPContainer, saveBtn);
    }

    )
}

// Give it a food and get a wine
function getFoodPairing() {
  fetch(foodPairingUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var resultEntry = $('<div>');
      var pairMatch = $('<p>');
      var pairingText = $('<p>');
      var wineImg = $('<img>');
      var wineLink = $('<a>');
      var saveBtn = $('<button>');
      var imgPContainer = $('<div>');

      imgPContainer.attr('class', 'content-container')
      wineImg.attr('src', data.productMatches[0].imageUrl);
      wineLink.attr({
        'href': data.productMatches[0].link,
        'class': 'recipe-content'
      });
      resultEntry.attr('class', 'recipe px-6 py-4 border-4 border-green-800 border-double my-5')
      pairMatch.attr('class', 'recipe-content');
      pairingText.attr('class', 'recipe-content');

      pairMatch.text('Top Choice: ' + data.productMatches[0].title)
      saveBtn.text('Save');
      pairingText.text(data.pairingText)
      wineLink.text('Grab One Here')

      resultsContainer.append(resultEntry);
      imgPContainer.append(wineImg, pairingText, pairMatch, wineLink);
      resultEntry.append(imgPContainer, saveBtn);

    })
}

// Get Recipes
function getRecipes() {
  fetch(edrecipeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < 5; i++) {
        var dh = data.hits[i]
        var resultEntry = $('<div>');
        var saveBtn = $('<button>');
        var recipeImg = $('<img>');
        var nameOfRecipe = $('<h2>');
        var linkToRecipe = $('<a>')
        var imgPContainer = $('<div>');

        imgPContainer.attr('class', 'content-container')
        recipeImg.attr({
          'src': data.hits[i].recipe.image,
          'class': 'object-scale-down h-48 w-96'
        });
        saveBtn.text('save');
        saveBtn.attr('class', 'saveBtn');
        resultEntry.attr('class', 'border-4 border-green-800 border-double my-5')
        linkToRecipe.attr({
          'href': dh.recipe.url,
          'class': 'recipe-content'
        });
        nameOfRecipe.attr('class', 'font-bold text-xl mb-2')

        nameOfRecipe.text(dh.recipe.label)
        linkToRecipe.text('Go to Recipe')

        resultsContainer.append(resultEntry)
        imgPContainer.append(recipeImg, linkToRecipe);
        resultEntry.append(nameOfRecipe, imgPContainer, saveBtn)
      }

    })

}


function getDrinkByName() {
  fetch(cocktailURLDrinkName)
    .then(function (response) {
      return response.json();
    })
    .then(function (dataDrinkName) {
      console.log(dataDrinkName);
      for (var i = 0; i < 5; i++) {
        var entryContainer = $('<div>');
        var imgPContainer = $('<div>');
        var drinkName = $('<h2>');
        var ingredients = $('<p>');
        var instructions = $('<p>');
        var measurements = $('<p>');
        var thumbNail = $('<img>');
        var saveBtn = $('<button>');
        var instructionsCont = $('<div>');
        // URL issue, if time, revisit this
        // var video = $('<iframe>').appendTo(entryContainer);

        instructionsCont.attr('class', 'instr-holder');
        imgPContainer.attr('class', 'content-container');
        instructions.attr('class', 'recipe-content');
        measurements.attr('class', 'recipe-content');
        ingredients.attr('class', 'recipe-content');
        saveBtn.text('save');
        saveBtn.attr('class', 'saveBtn');
        thumbNail.attr('src', dataDrinkName.drinks[i].strDrinkThumb);
        entryContainer.attr('class', 'recipe border-4 border-green-800 border-double my-5');
        // video.attr({
        //   src: dataDrinkName.drinks[0].strVideo,
        //   class: 'aspect-video'
        // });

        var arr = [dataDrinkName.drinks[i].strIngredient1, dataDrinkName.drinks[i].strIngredient2, dataDrinkName.drinks[i].strIngredient3, dataDrinkName.drinks[i].strIngredient4, dataDrinkName.drinks[i].strIngredient5, dataDrinkName.drinks[i].strIngredient6, dataDrinkName.drinks[i].strIngredient7, dataDrinkName.drinks[i].strIngredient8, dataDrinkName.drinks[i].strIngredient9, dataDrinkName.drinks[i].strIngredient10, dataDrinkName.drinks[i].strIngredient11, dataDrinkName.drinks[i].strIngredient12, dataDrinkName.drinks[i].strIngredient13, dataDrinkName.drinks[i].strIngredient14, dataDrinkName.drinks[i].strIngredient15];
        var measArr = [dataDrinkName.drinks[i].strMeasure1, dataDrinkName.drinks[i].strMeasure2, dataDrinkName.drinks[i].strMeasure3, dataDrinkName.drinks[i].strMeasure, dataDrinkName.drinks[i].strMeasure4, dataDrinkName.drinks[i].strMeasure5, dataDrinkName.drinks[i].strMeasure6, dataDrinkName.drinks[i].strMeasure7, dataDrinkName.drinks[i].strMeasure8, dataDrinkName.drinks[i].strMeasure9, dataDrinkName.drinks[i].strMeasure10, dataDrinkName.drinks[i].strMeasure11, dataDrinkName.drinks[i].strMeasure12, dataDrinkName.drinks[i].strMeasure13, dataDrinkName.drinks[i].strMeasure14, dataDrinkName.drinks[i].strMeasure15]

        var ingredientItems = arr.filter(function (el) {
          return el != null;
        });
        var measurementItems = measArr.filter(function (el) {
          return el != null;
        });

        instructions.text(dataDrinkName.drinks[i].strInstructions);
        drinkName.text(dataDrinkName.drinks[i].strDrink);
        measurements.text(`Measurements: ${measurementItems}`);
        ingredients.text(`Ingredients: ${ingredientItems}`);
        
        resultsContainer.append(entryContainer);
        instructionsCont.append( ingredients, measurements, instructions)
        imgPContainer.append(thumbNail, instructionsCont)
        entryContainer.append(drinkName, imgPContainer,  saveBtn)
      }
    })
}

// fetching a Random drink
function randomDrink() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(function (response) {
      return response.json();
    })
    .then(function (dataRandom) {
      console.log(dataRandom)
      var dataR = dataRandom.drinks[0]
      var ingredientArray = [dataR.strIngredient1, dataR.strIngredient2, dataR.strIngredient3, dataR.strIngredient4, dataR.strIngredient5, dataR.strIngredient6, dataR.strIngredient7, dataR.strIngredient8, dataR.strIngredient9, dataR.strIngredient10, dataR.strIngredient11, dataR.strIngredient12, dataR.strIngredient13, dataR.strIngredient14, dataR.strIngredient15]
      var amountArray = [dataR.strMeasure1, dataR.strMeasure2, dataR.strMeasure3, dataR.strMeasure4, dataR.strMeasure5, dataR.strMeasure6, dataR.strMeasure7, dataR.strMeasure8, dataR.strMeasure9, dataR.strMeasure10, dataR.strMeasure11, dataR.strMeasure12, dataR.strMeasure13, dataR.strMeasure14, dataR.strMeasure15]
      var resultEntry = $('<div>');
      var saveBtn = $('<button>');
      var cocktailImg = $('<img>');
      var nameOfDrink = $('<h2>');
      var drinkRecipe = $('<a>');
      var instructions = $('<p>');
      var imgPContainer = $('<div>');
      
      imgPContainer.attr('class', 'content-container')
      drinkRecipe.attr('class', 'recipe-content');
      instructions.attr('class', 'recipe-content');
      resultEntry.attr('class', 'recipe border-4 border-green-800 border-double my-5')
      cocktailImg.attr('src', dataR.strDrinkThumb);
      cocktailImg.attr('class', 'object-scale-down h-48 w-96');
      nameOfDrink.attr('class', 'font-bold text-xl mb-2')
      
      drinkRecipe.text("Go to Recipe");
      nameOfDrink.text(dataR.strDrink);
      saveBtn.text('save');
      saveBtn.attr('class', 'saveBtn');
      
      var ingredientList = [];
      for (var i = 0; i < ingredientArray.length; i++) {
        console.log(ingredientArray[i])
        console.log(ingredientArray[i] === null)
        if (ingredientArray[i] !== null) {
          ingredientList.push(ingredientArray[i]);
        }
      }
      var amountList = [];
      for (var i = 0; i < amountArray.length; i++) {
        console.log(amountArray[i])
        console.log(amountArray[i] === null)
        if (amountArray[i] !== null) {
          amountList.push(amountArray[i]);
        }
      }
      instructions.text(dataR.strInstructions + '' + 'Ingredients: ' + ingredientList + '.' + ' Amounts: ' + amountList);
      
      resultsContainer.append(resultEntry);
      imgPContainer.append(instructions);
      resultEntry.append(nameOfDrink, imgPContainer, cocktailImg, saveBtn);
    })
}

// this says depending on what parameters the user choose run the corresponding function 
function apiCalls() {
  if (wine !== null) {
    getWinePairing()
    wine = "";
    localStorage.removeItem('wine')
  } else if (wineP === 'true' && food !== null) {
    getFoodPairing()
    food = "";

    localStorage.removeItem('food')
    wineP = 'false'
    localStorage.removeItem('wineP')

  } else if (food !== null) {
    getRecipes()
    food = "";
    localStorage.removeItem('food')
  } else if (drinkName !== null) {

    getDrinkByName()
    drinkName = ""
    localStorage.removeItem('drinkName')
  } else if (random === 'true') {
    randomDrink()
    // Homepage - the initial value is going to be false and then there is going to be an event listener that removes this to true
    random = 'false'
    localStorage.removeItem('random')
  }
}
setURL()

function setURL() {
  food = localStorage.getItem("food")
  drinkName = localStorage.getItem("drinkName")
  wine = localStorage.getItem("wine")
  random = localStorage.getItem("random")
  wineP = localStorage.getItem("wineP")

  var recipeApiKey = "0ed1c23457ba46ddaffacdeb0b81d967"; //"20f9574ee747498490dd1bd80b379967"; 
  pairingUrl = `https://api.spoonacular.com/food/wine/dishes?wine=${wine}&apiKey=${recipeApiKey}`;
  // this wine pairing is give it a food and get a wine
  foodPairingUrl = `https://api.spoonacular.com/food/wine/pairing?food=${food}&apiKey=${recipeApiKey}`;
  edrecipeUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_key=d0e7ce8996da109b870161b5504f5e87&app_id=b7a56f5e`;

  cocktailURLDrinkName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?key=1&s=${drinkName}`;

  apiCalls()
};

// Click save button to get form to select what category, i.e. "Dinner Party A" to save recipe to
resultsContainer.on('click', '.saveBtn', function () {
  var currentContainer = $(this).parent();
  var form = $('<form>');
  var input = $('<input>');
  var select = $('<datalist>');
  var submit = $('<input>');

  input.attr({
    type: 'text',
    list: 'options',
    class: 'input'
  });
  select.attr('id', 'options');
  form.attr('id', 'form');
  submit.attr({
    type: 'submit',
    value: 'Submit',
    id: 'submit'
  })

  form.append(input, submit, select);
  currentContainer.append(form);

  // Get formObj from local storage, OR if that key doesn't exist, console waiting message
  var formObj = JSON.parse(localStorage.getItem("formObj")) || console.log('formObj doesn\'t exist yet, waiting');
  // If formObj exists, create datalist options for each item
  if (formObj) {
    for (var i = 0; i < formObj.length; i++) {
      var formEntry = $('<option>');
      formEntry.text(formObj[i]);
      select.append(formEntry);
    }
  }

})

$(document).on('click', '#submit', function (e) {
  e.preventDefault();
  e.stopPropagation();
  // Get formObj from local storage, OR if that key doesn't exist, create an array
  var formObj = JSON.parse(localStorage.getItem("formObj")) || [];
  // Whatever the user types/selects will be newItem
  var newItem = ($('.input').val());
  // If the user types in a category that already exists, don't add it to local storage
  if (formObj.includes(newItem)) {
  } else {
    // If this category doesn't exist, push it into the array
    formObj.push(newItem);
  }
  // Replace the old value of this array in local storage with this updated version 
  localStorage.setItem("formObj", JSON.stringify(formObj));
  // Get the entire the object of the category selected, i.e. "Dinner Party A" from local storage OR if it doesn't exist, create a new object
  var recipeObj = JSON.parse(localStorage.getItem(newItem)) || {};
  // title is name of recipe and content is everything listed in entry
  var title = $('#form').siblings('h2').text();
  var content = $('#form').siblings('.recipe-content').text();
  // If the entry exists in object, log all done! -- probably switch to updating the page with a message that says that
  if (title in recipeObj) {
    console.log('already saved, done!')
    return
  } else {
    // If the entry doesn't exist in object, add new nested object with title as key and content as value
    recipeObj[title] = content;
    // add to local storage
    localStorage.setItem(newItem, JSON.stringify(recipeObj));
  }
  // Removes the save form from page
  $('#form').remove();
})
