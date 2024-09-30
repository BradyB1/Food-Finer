document.addEventListener("DOMContentLoaded", () => {
  // Handle the form submission
  const addRecipeForm = document.getElementById("addRecipeForm");
  addRecipeForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const newRecipe = {
      name: document.getElementById("name").value,
      type: document.getElementById("type").value,
      ethnicity: document.getElementById("ethnicity").value,
      foodGroup: document.getElementById("foodGroup").value,
      image: document.getElementById("image").value,
      description: document.getElementById("description").value,
      ingredients: document.getElementById("ingredients").value,
      steps: document.getElementById("steps").value,
    };

    try {
      const response = await fetch("/api/add-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        alert("Recipe added successfully!");
        window.location.href = "index.html"; // Redirect to index.html after adding recipe
      } else {
        alert("Error adding recipe");
      }
    } catch (error) {
      alert("Error adding recipe");
    }
  });

  // Event listener for Back button
  const backButton = document.getElementById("backButton");
  backButton.addEventListener("click", () => {
    window.location.href = "index.html"; // Navigate to index.html
  });
});
