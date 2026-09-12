# 🍳 RecipeFinder - React App Developed with AI

A clean, responsive React + TypeScript application built using AI as a development assistant. The app allows users to search for meals by name or main ingredients using the free [TheMealDB API](https://www.themealdb.com/api.php).

---

## 🤖 Prompts Used & AI Workflow

This section captures the major prompt-driven development steps used to build the recipe finder and modal flow.

### 0) Initial UI Layout & Static Setup
- **Prompt:**
  > "Create a clean React + TypeScript + Tailwind CSS layout for a Recipe Finder app. Include a Navbar with the app title 'RecipeFinder' and a hero search bar container. Do not fetch any data yet, just render the static UI components."

- **Feature Implemented:**
  - Built the initial static layout including a top Navbar with "RecipeFinder" branding.
  - Added hero search container with input/button placeholders.
  - Rendered a static empty grid section for future recipe cards.

---

### 1) Initial API + Search Integration
- **Prompt:**
  > "Now, create a service file `recipeApi.ts` using Axios or fetch to call TheMealDB API (`https://www.themealdb.com/api/json/v1/1/search.php?s=`). Connect the Search Bar in the UI to this function with proper loading and error handling states."

- **Feature Implemented:**
  - Created a dedicated API service to query TheMealDB by meal name.
  - Added fetch-based request logic with validation and network error handling.
  - Wired the search input/button to trigger the API request.
  - Added loading state while fetching and error state when a request fails.
  - Added empty-state handling for no result matches.

- **Manual Improvements & Refactoring:**
  - Switched from Axios to `fetch` because Axios was not installed in the project.
  - Cleaned up error handling to show user-friendly messages instead of raw API failures.
  - Ensured search input and button were properly enabled/disabled during loading.

---

### 2) Responsive Recipe Result Grid
- **Prompt:**
  > "Render the fetched recipe results in a responsive CSS Grid (3 columns on desktop, 1 on mobile). Each card should display the meal image (`strMealThumb`), title (`strMeal`), and category (`strCategory`)."

- **Feature Implemented:**
  - Changed the recipe list from a static placeholder to a responsive card grid.
  - Added recipe cards displaying thumbnail image, title, and category.
  - Applied a mobile-first layout (1 column on mobile, 3 columns on desktop).

- **Manual Improvements & Refactoring:**
  - Adjusted metadata to show category cleanly as the main label.
  - Kept loading, empty, and error states consistent with the search flow.

---

### 3) Recipe Detail Modal
- **Prompt:**
  > "Please implement a pop up Modal component for displaying recipe details when a recipe card is clicked. Requirements & Styling: 1. Modal Trigger & Structure: Clicking any recipe card sets selectedRecipe state and opens the pop up Modal. 2. Content & Controls: Top Header with Recipe title, image header, and a Close button. Body with Ingredients list and step-by-step instructions. 3. Closing Mechanics: The Modal must close when clicking the Close button, background overlay, or Esc key."

- **Feature Implemented:**
  - Added modal trigger behavior on recipe card clicks.
  - Added `selectedRecipe` state in app-level state management.
  - Rendered image, title, category, ingredient list, and instructions inside a dedicated component.
  - Added close button, overlay click close, and Escape key listeners.

- **Manual Improvements & Refactoring:**
  - Added keyboard support so cards could also be selected using `Enter` or `Space`.
  - Converted raw API ingredient/measure fields into typed objects for safer TypeScript rendering.

---

### 4) Modal Layout Fix / Proper Overlay Rendering
- **Prompt:**
  > "The Recipe Detail section is currently rendering inline at the bottom of the page instead of appearing as a proper pop-up Modal over the content. Please fix the Modal component styling and structure: 1. Overlay & Positioning: Wrap in fixed full-screen overlay backdrop (`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4`). 2. Box Constraints: Restrain modal width/height (`max-w-2xl w-full max-h-[85vh]`). Make body section scrollable. 3. Fix Close Button & Backdrop Click."

- **Feature Implemented:**
  - Fixed the modal into a proper full-screen fixed overlay with backdrop blur.
  - Constrained the modal to a floating centered dialog instead of full-page inline flow.
  - Made the body content scrollable while leaving headers fixed.

- **Manual Improvements & Refactoring:**
  - Refactored JSX and Tailwind classes from full-height inline elements to a floating dialog overlay.
  - Verified that `selectedRecipe` resets cleanly to `null` on all close triggers.

---

## 💡 How AI Assisted Throughout Implementation

AI served as a high-speed development assistant by:
- Instantly creating TypeScript interfaces for API responses.
- Writing boilerplate data fetching and state binding logic.
- Drafting initial Tailwind CSS card grids and modal overlays.

---

## 🛠️ Overall Reflection & Refactoring Summary

While AI accelerated initial UI and logic implementation, manual intervention was essential to ensure production quality:
1. **Architecture Corrections:** Corrected AI choices such as replacing missing npm packages (`axios` -> `fetch`).
2. **UI/UX Polish:** Transformed inline-rendered detail views into true fixed pop-up modals with blurred backdrops and proper size constraints.
3. **Accessibility:** Added full keyboard navigation support (`Esc` key close, `Enter`/`Space` card selection).

---

## 🚀 Project Summary

RecipeFinder is a responsive recipe search application built with React, TypeScript, and Tailwind CSS. It demonstrates how AI-assisted development can quickly scaffold a functional app, while manual refinement improves reliability, UX, and accessibility.
