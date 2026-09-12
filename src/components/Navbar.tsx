export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2 text-brand no-underline">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <path
                d="M7 3v8a5 5 0 1 0 10 0V3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M12 11v10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight text-ink">
            RecipeFinder
          </span>
        </a>
        <p className="hidden text-sm text-ink/60 sm:block">
          Find meals from ingredients you already have
        </p>
      </nav>
    </header>
  );
}
