type HeroSearchProps = {
  onSearch: (query: string) => void;
  loading: boolean;
};

export default function HeroSearch({ onSearch, loading }: HeroSearchProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSearch(String(formData.get("query") ?? ""));
  }

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(47,111,78,0.12),transparent_42%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-brand">
            Cook with what you have
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Discover recipes in seconds
          </h1>
          <p className="mt-4 text-base text-ink/70 sm:text-lg">
            Search by dish name or ingredients and find your next meal.
          </p>
        </div>

        <form
          className="mx-auto mt-10 max-w-2xl rounded-2xl border border-black/8 bg-white p-2 shadow-[0_16px_50px_rgba(31,42,36,0.08)]"
          onSubmit={handleSubmit}
        >
          <label htmlFor="recipe-search" className="sr-only">
            Search recipes
          </label>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-ink/40"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M20 20l-3.2-3.2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <input
                id="recipe-search"
                name="query"
                type="search"
                placeholder="Try pasta, chicken, or tomatoes..."
                className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink/40"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-80"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
