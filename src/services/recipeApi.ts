const THE_MEAL_DB_SEARCH_URL =
  "https://www.themealdb.com/api/json/v1/1/search.php";

export type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string | null;
  strArea: string | null;
  strMealThumb: string;
  strInstructions: string | null;
  ingredients: Ingredient[];
};

export type Ingredient = {
  name: string;
  measure: string;
};

type RawMeal = Omit<Meal, "ingredients"> & {
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
};

type SearchResponse = {
  meals: RawMeal[] | null;
};

function normalizeMeal(rawMeal: RawMeal): Meal {
  const ingredients = Array.from({ length: 20 }, (_, index) => {
    const ingredientNumber = index + 1;
    const name = rawMeal[`strIngredient${ingredientNumber}`]?.trim() ?? "";
    const measure = rawMeal[`strMeasure${ingredientNumber}`]?.trim() ?? "";

    return name ? { name, measure } : null;
  }).filter((ingredient): ingredient is Ingredient => ingredient !== null);

  return { ...rawMeal, ingredients };
}

export async function searchRecipes(
  query: string,
  signal?: AbortSignal,
): Promise<Meal[]> {
  const searchTerm = query.trim();

  if (!searchTerm) {
    throw new Error("Please enter a recipe name to search.");
  }

  try {
    const params = new URLSearchParams({ s: searchTerm });
    const response = await fetch(`${THE_MEAL_DB_SEARCH_URL}?${params}`, {
      signal,
    });

    if (!response.ok) {
      throw new Error(`TheMealDB request failed with status ${response.status}.`);
    }

    const data = (await response.json()) as SearchResponse;

    return (data.meals ?? []).map(normalizeMeal);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    throw new Error("Could not reach TheMealDB. Check your connection and try again.");
  }
}
