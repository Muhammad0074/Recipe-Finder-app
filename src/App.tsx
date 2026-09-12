import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSearch from "./components/HeroSearch";
import RecipeResults from "./components/RecipeResults";
import RecipeModal from "./components/RecipeModal";
import { searchRecipes, type Meal } from "./services/recipeApi";

export default function App() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Meal | null>(null);

  async function handleSearch(query: string) {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      setMeals(await searchRecipes(query));
    } catch (searchError) {
      if (searchError instanceof DOMException && searchError.name === "AbortError") {
        return;
      }

      setMeals([]);
      setError(
        searchError instanceof Error
          ? searchError.message
          : "Something went wrong while searching for recipes.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSearch onSearch={handleSearch} loading={loading} />
        <RecipeResults
          meals={meals}
          loading={loading}
          error={error}
          hasSearched={hasSearched}
          onSelect={setSelectedRecipe}
        />
      </main>
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
