import type { Meal } from "../services/recipeApi";

type RecipeResultsProps = {
  meals: Meal[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
  onSelect: (meal: Meal) => void;
};

export default function RecipeResults({
  meals,
  loading,
  error,
  hasSearched,
  onSelect,
}: RecipeResultsProps) {
  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6" aria-live="polite">
        <div className="rounded-3xl border border-brand/15 bg-white/70 px-6 py-16 text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
          <h2 className="text-lg font-semibold text-ink">Searching recipes</h2>
          <p className="mt-2 text-sm text-ink/65">Fetching matches from TheMealDB...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6" aria-live="assertive">
        <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-16 text-center">
          <h2 className="text-lg font-semibold text-red-800">Search failed</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-red-700">{error}</p>
        </div>
      </section>
    );
  }

  if (!hasSearched) {
    return (
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl border border-dashed border-brand/25 bg-white/60 px-6 py-16 text-center">
          <h2 className="text-lg font-semibold text-ink">No recipes yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink/65">
            Use the search bar above to look up recipes by name.
          </p>
        </div>
      </section>
    );
  }

  if (meals.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6" aria-live="polite">
        <div className="rounded-3xl border border-dashed border-brand/25 bg-white/60 px-6 py-16 text-center">
          <h2 className="text-lg font-semibold text-ink">No recipes found</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink/65">
            Try a different dish name, like chicken, pasta, or pie.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6" aria-live="polite">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-lg font-semibold text-ink">
          {meals.length} recipe{meals.length === 1 ? "" : "s"} found
        </h2>
      </div>
      <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {meals.map((meal) => (
          <li key={meal.idMeal}>
            <article
              className="cursor-pointer overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_8px_24px_rgba(31,42,36,0.06)] transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(31,42,36,0.1)]"
              onClick={() => onSelect(meal)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(meal);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-base font-semibold text-ink">{meal.strMeal}</h3>
                <p className="mt-1 text-sm text-ink/60">{meal.strCategory}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
