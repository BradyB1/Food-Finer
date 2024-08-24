// Sample recipes data
const recipes = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    type: "Italian",
    image: "https://via.placeholder.com/150",
    description: "A classic Italian pasta dish with a rich, meaty sauce.",
    ingredients: [
      "Spaghetti",
      "Ground beef",
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

// Get the recipe ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const recipeId = parseInt(urlParams.get("id"));

// Find the recipe with the given ID
const recipe = recipes.find((r) => r.id === recipeId);

if (recipe) {
  const recipeDetails = document.getElementById("recipeDetails");
  recipeDetails.innerHTML = `
      <h1>${recipe.name}</h1>
      <img src="${recipe.image}" alt="${recipe.name}">
      <h2>Description</h2>
      <p>${recipe.description}</p>
      <h2>Ingredients</h2>
      <ul>
          ${recipe.ingredients
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("")}
      </ul>
      <h2>Steps</h2>
      <ol>
          ${recipe.steps.map((step) => `<li>${step}</li>`).join("")}
      </ol>
  `;
} else {
  document.getElementById("recipeDetails").innerHTML =
    "<p>Recipe not found.</p>";
}
