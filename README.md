# Cocktail Hub Project

This project displays a variety of cocktail brands using the free API from [TheCocktailDB](https://www.thecocktaildb.com/api.php).

It includes features such as:
- Search cocktails by ingredient name
- List available cocktails by alphabet
-Filter By Alcoholic and Non Alcoholic
- View cocktail details
- View Ingredient details


## How To Run This Project

### Clone This Repository
Install dependencies:

```bash
npm install
```

Set environment variables:

```env
VITE_API_BASE_URL=https://www.thecocktaildb.com/api/json/v1/1
```

Run the development server:

```bash
npm run dev
```

## Architectural Decisions

Due to the nature of this project, I created a single source of truth for data access using Axios in a central API client file that connects to the server URL.

This is extended through two different service files that expose the respective endpoints:
- `cocktail`
- `ingredients`

To enforce type safety, I also created dedicated type files.

Next, hooks handle server-state management using `@tanstack/react-query` for caching and overall server-state flow.

This is the flow that populates data across the pages.

## UI Decisions

I used Tailwind CSS together with DaisyUI (a Tailwind component library) to build the required UI components, all contained in the `components` folder.

I also created `pages` to define the actual route-level screens.

## Tradeoffs and Assumptions

The filter-by-alphabet implementation was chosen because the available API supports listing cocktails in alphabetical order.

I decided to implement Alcoholic vs Non-Alcoholic filtering using available list data instead of the dedicated filter endpoint. This was done because of inconsistencies in the separate endpoint response shape. The filter response may omit alcohol-brand/context details, which can be confusing for users.

## What I Would Improve

- Implement client-side pagination (while server-side pagination remains the ideal approach)
- Implement localization using an i18n library for different languages, since the API also returns localized data
