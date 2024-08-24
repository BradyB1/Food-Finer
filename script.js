const recipes = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    type: ["Italian"],
    image: "Spaghetti.jpg",
    description: "A classic Italian pasta dish with a rich, meaty sauce.",
    ingredients: [
      "Spaghetti",
      "Ground beef: 1ib",
      "Tomato sauce",
      "Onion",
      "Garlic",
    ],
    steps: [
      "Cook spaghetti according to package instructions.",
      "In a pan, cook ground beef until browned.",
      "Add chopped onions and garlic, and cook until softened.",
      "Stir in tomato sauce and simmer.",
      "Combine sauce with spaghetti and serve.",
    ],
  },
  {
    id: 2,
    name: "Chicken Curry",
    type: "Asian",
    image: "https://via.placeholder.com/150",
    description: "A spicy and flavorful chicken curry made with Indian spices.",
    ingredients: ["Chicken", "Curry powder", "Coconut milk", "Onion", "Garlic"],
    steps: [
      "Heat oil in a pan and cook chopped onions and garlic until golden.",
      "Add curry powder and cook for another minute.",
      "Add chicken pieces and cook until browned.",
      "Pour in coconut milk and simmer until chicken is cooked through.",
      "Serve with rice.",
    ],
  },
  {
    id: 3,
    name: "Caesar Salad",
    type: "Italian",
    image: "https://via.placeholder.com/150",
    description:
      "A fresh salad with romaine lettuce, croutons, and Caesar dressing.",
    ingredients: [
      "Romaine lettuce",
      "Croutons",
      "Caesar dressing",
      "Parmesan cheese",
    ],
    steps: [
      "Tear lettuce into bite-sized pieces.",
      "Toss with Caesar dressing and croutons.",
      "Sprinkle with Parmesan cheese and serve.",
    ],
  },
  // Add more recipes
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
          <a href="recipe.html?id=${recipe.id}">
              <img src="${recipe.image}" alt="${recipe.name}">
              <h3>${recipe.name}</h3>
              <p>${recipe.description}</p>
          </a>
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
