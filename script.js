const recipes = [
  {
    name: "Spaghetti Bolognese",
    type: "Italian",
    image: "https://via.placeholder.com/150",
    description: "A classic Italian pasta dish with a rich, meaty sauce.",
  },
  {
    name: "Chicken Curry",
    type: "Asian",
    image: "https://via.placeholder.com/150",
    description: "A spicy and flavorful chicken curry made with Indian spices.",
  },
  {
    name: "Caesar Salad",
    type: "Italian",
    image: "https://via.placeholder.com/150",
    description:
      "A fresh salad with romaine lettuce, croutons, and Caesar dressing.",
  },
  // Add more recipe objects with 'type' property
];

// Initialize Fuse.js options
const options = {
  keys: ["name"],
  threshold: 0.3,
};

// Create a Fuse instance
const fuse = new Fuse(recipes, options);

const searchBar = document.getElementById("searchBar");
const filterDropdown = document.getElementById("filterDropdown");
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

// Function to filter recipes by type
function filterRecipes(type) {
  if (type === "" || type === null) {
    return recipes;
  } else {
    return recipes.filter((recipe) => recipe.type === type);
  }
}

// Event listener for search bar and filter dropdown
function updateRecipes() {
  const searchString = searchBar.value;
  const selectedType = filterDropdown.value;

  let filteredRecipes = filterRecipes(selectedType);

  if (searchString.trim() !== "") {
    filteredRecipes = fuse.search(searchString).map((result) => result.item);
    // Further filter by type after the Fuse search
    filteredRecipes = filteredRecipes.filter(
      (recipe) => recipe.type === selectedType || selectedType === ""
    );
  }

  displayRecipes(filteredRecipes);
}

searchBar.addEventListener("input", updateRecipes);
filterDropdown.addEventListener("change", updateRecipes);
