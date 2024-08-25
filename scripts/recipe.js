document.addEventListener("DOMContentLoaded", () => {
  const recipeDetails = document.getElementById("recipeDetails");
  const backButton = document.getElementById("backButton");

  // Get the recipe id from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = parseInt(urlParams.get("id"));

  // Fetch recipes from the JSON file
  fetch("/public/recipes.json")
    .then((response) => response.json())
    .then((recipes) => {
      // Find the recipe with the matching id
      const recipe = recipes.find((r) => r.id === recipeId);

      if (recipe) {
        // Display the recipe details
        recipeDetails.innerHTML = `
                  <h2>${recipe.name}</h2>
                  <img src="${recipe.image}" alt="${recipe.name}">
                  <p>${recipe.description}</p>
                  <h3>Ingredients:</h3>
                  <ul>
                      ${recipe.ingredients
                        .map((ingredient) => `<li>${ingredient}</li>`)
                        .join("")}
                  </ul>
                  <h3>Steps:</h3>
                  <ol>
                      ${recipe.steps.map((step) => `<li>${step}</li>`).join("")}
                  </ol>
              `;
      } else {
        recipeDetails.innerHTML = `<p>Recipe not found.</p>`;
      }
    })
    .catch((error) => console.error("Error loading recipes:", error));

  // Go back to the previous page
  backButton.addEventListener("click", () => {
    window.history.back();
  });
});
