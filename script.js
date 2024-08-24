const recipes = [
  {
    name: "Spaghetti",
    image: "Spaghetti.jpg",
    description: "A classic Italian pasta dish with a rich, meaty sauce.",
  },
  {
    name: "Chicken Curry",
    image: "https://via.placeholder.com/150",
    description: "A spicy and flavorful chicken curry made with Indian spices.",
  },
  {
    name: "Caesar Salad",
    image: "https://via.placeholder.com/150",
    description:
      "A fresh salad with romaine lettuce, croutons, and Caesar dressing.",
  },
  // Add more recipe objects here
];

// Initialize Fuse.js options
const options = {
  keys: ["name"], // Specify which keys to search in
  threshold: 0.3, // Adjust this to make the search more or less strict
};

// Create a Fuse instance
const fuse = new Fuse(recipes, options);

const searchBar = document.getElementById("searchBar");
const recipeContainer = document.getElementById("recipeContainer");

// Function to display recipes
function displayRecipes(recipesToDisplay) {
  recipeContainer.innerHTML = "";
  recipesToDisplay.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipeCard");
    recipeCard.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.name}">
          <h3>${recipe.name}</h3>
          <p>${recipe.description}</p>
      `;
    recipeContainer.appendChild(recipeCard);
  });
}

// Display all recipes by default
displayRecipes(recipes);

// Event listener for search bar
searchBar.addEventListener("input", (e) => {
  const searchString = e.target.value;
  let filteredRecipes;

  if (searchString.trim() === "") {
    // Display all recipes if the search string is empty
    filteredRecipes = recipes;
  } else {
    // Use Fuse.js to perform the search
    filteredRecipes = fuse.search(searchString).map((result) => result.item);
  }

  displayRecipes(filteredRecipes);
});
