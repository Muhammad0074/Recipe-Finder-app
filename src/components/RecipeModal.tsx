import { useEffect } from "react";
import type { Meal } from "../services/recipeApi";

type RecipeModalProps = {
  recipe: Meal;
  onClose: () => void;
};

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <section
        aria-labelledby="recipe-modal-title"
        aria-modal="true"
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="h-56 w-full object-cover sm:h-72"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close recipe details"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/65 text-2xl leading-none text-white transition hover:bg-black/85"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <h2 id="recipe-modal-title" className="text-2xl font-semibold text-ink">
            {recipe.strMeal}
          </h2>
          <p className="mt-1 text-sm text-ink/60">{recipe.strCategory}</p>

          <h3 className="mt-6 text-lg font-semibold text-ink">Ingredients</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {recipe.ingredients.map((ingredient) => (
              <li key={`${ingredient.name}-${ingredient.measure}`} className="text-sm text-ink/75">
                <span className="font-medium text-ink">{ingredient.measure}</span>{" "}
                {ingredient.name}
              </li>
            ))}
          </ul>

          <h3 className="mt-7 text-lg font-semibold text-ink">Instructions</h3>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-ink/75">
            {recipe.strInstructions || "No instructions are available for this recipe."}
          </p>
        </div>
      </section>
    </div>
  );
}