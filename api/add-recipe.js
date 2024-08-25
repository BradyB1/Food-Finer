import { readFile, writeFile } from "fs/promises";
import path from "path";

const recipesFilePath = path.resolve("public", "recipes.json");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Read the existing recipes
      let recipes = [];
      try {
        const data = await readFile(recipesFilePath, "utf-8");
        recipes = JSON.parse(data);
      } catch (error) {
        // File might not exist, that's okay
      }

      // Add the new recipe
      const newRecipe = req.body;
      recipes.push(newRecipe);

      // Write back to the recipes file
      await writeFile(
        recipesFilePath,
        JSON.stringify(recipes, null, 4),
        "utf-8"
      );

      res.status(200).json({ message: "Recipe added successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Error adding recipe" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
