// Fetch the recipes from the JSON file
fetch("/public/recipes.json")
  .then((response) => response.json())
  .then((recipes) => {
    // Initialize Fuse.js options
    const options = {
      keys: ["name"],
      threshold: 0.3,
    };

    // Create a Fuse instance
    const fuse = new Fuse(recipes, options);

    const searchBar = document.getElementById("searchBar");
    const filterDropdown = document.getElementById("filterDropdown");
    const ethnicityDropdown = document.getElementById("ethnicityDropdown");
    const foodGroupDropdown = document.getElementById("foodGroupDropdown");
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

    // Function to filter recipes by type, ethnicity, and food group
    function filterRecipes(type, ethnicity, foodGroup) {
      return recipes.filter((recipe) => {
        const matchesType =
          type === "All" || type === "" || recipe.type.includes(type);
        const matchesEthnicity =
          ethnicity === "All" ||
          ethnicity === "" ||
          recipe.ethnicity.includes(ethnicity);
        const matchesFoodGroup =
          foodGroup === "All" ||
          foodGroup === "" ||
          recipe.foodGroup.includes(foodGroup);
        return matchesType && matchesEthnicity && matchesFoodGroup;
      });
    }

    // Event listener for search bar and filter dropdowns
    function updateRecipes() {
      const searchString = searchBar.value.trim();
      const selectedType = filterDropdown.value;
      const selectedEthnicity = ethnicityDropdown.value;
      const selectedFoodGroup = foodGroupDropdown.value;

      let filteredRecipes = filterRecipes(
        selectedType,
        selectedEthnicity,
        selectedFoodGroup
      );

      if (searchString !== "") {
        filteredRecipes = fuse
          .search(searchString)
          .map((result) => result.item);

        // Further filter by type, ethnicity, and food group after the Fuse search
        filteredRecipes = filteredRecipes.filter(
          (recipe) =>
            (selectedType === "All" || recipe.type.includes(selectedType)) &&
            (selectedEthnicity === "All" ||
              recipe.ethnicity.includes(selectedEthnicity)) &&
            (selectedFoodGroup === "All" ||
              recipe.foodGroup.includes(selectedFoodGroup))
        );
      }

      displayRecipes(filteredRecipes);
    }

    searchBar.addEventListener("input", updateRecipes);
    filterDropdown.addEventListener("change", updateRecipes);
    ethnicityDropdown.addEventListener("change", updateRecipes);
    foodGroupDropdown.addEventListener("change", updateRecipes);
  })
  .catch((error) => console.error("Error loading recipes:", error));
