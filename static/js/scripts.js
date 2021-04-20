function getRecipes() {
  document.querySelector('.recipes').innerHTML = ``;
  fetch(`api/recipes`)
    .then((response) => response.json())
    .then((recipes) => renderRecipes(recipes));
}

function renderRecipes(recipes) {
  recipes.forEach((recipe) => {
    recipeEl = document.createElement('div');
    recipeEl.innerHTML = `
      <img src="img/${recipe.image}" />
      <h3><a href="detail.html?recipe=${recipe._id}">${recipe.title}</a></h3>
      <h5>${recipe.author}</h5>
      <ul><li>${recipe.ingredients}</li></ul>
      <div>${recipe.preparation}</div> 
      <p>${recipe.description}</p>
      <p>${recipe._id}</p>      
      <p>Created ${recipe.created}<p>
      <button class="delete" data-id=${recipe._id}>Delete</button>
    `;
    document.querySelector('.recipes').append(recipeEl);
  });
}

function addRecipe(event) {
  event.preventDefault();
  console.log('  ', event.target.preparation.value);
  const {
    title,
    image,
    author,
    ingredients,
    preparation,
    description,
  } = event.target;

  const recipe = {
    title: title.value,
    image: image.value,
    author: author.value,
    ingredients: ingredients.value,
    preparation: preparation.value,
    description: description.value,
  };

  fetch('api/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  })
    .then((response) => response.json())
    .then(getRecipes);
}

function deleteRecipe(event) {
  fetch(`api/recipes/${event.target.dataset.id}`, {
    method: 'DELETE',
  }).then(getRecipes);
}

function seed() {
  fetch('api/import').then(getRecipes);
}

function handleClicks(event) {
  if (event.target.matches('[data-id]')) {
    deleteRecipe(event);
  } else if (event.target.matches('#seed')) {
    seed();
  }
}

document.addEventListener('click', handleClicks);

const addForm = document.querySelector('#addForm');
addForm.addEventListener('submit', addRecipe);

getRecipes();
