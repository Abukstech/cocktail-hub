import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCocktailById } from '../hooks/useCocktail';

export const CocktailDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const cocktailDetailsQuery = useCocktailById(id ?? '');
  const cocktail = cocktailDetailsQuery.data;

  const ingredients =
    cocktail == null
      ? []
      : Array.from({ length: 15 }, (_, index) => {
          const slot = index + 1;
          const ingredient = cocktail[`strIngredient${slot}` as keyof typeof cocktail];
          const measure = cocktail[`strMeasure${slot}` as keyof typeof cocktail];
          return {
            ingredient: typeof ingredient === 'string' ? ingredient.trim() : '',
            measure: typeof measure === 'string' ? measure.trim() : '',
          };
        }).filter((item) => item.ingredient);

  return (
    <main className="container mx-auto px-4 py-8">
      <button className="btn btn-ghost mb-6" onClick={() => navigate('/')}>
        Back to list
      </button>

      {cocktailDetailsQuery.isLoading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}

      {cocktailDetailsQuery.isError && (
        <div className="alert alert-error">
          <span>Failed to load cocktail details.</span>
        </div>
      )}

      {cocktail && (
        <div className="card bg-base-100 shadow-sm">
          <figure>
            <img
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              className="w-full max-h-105 object-cover"
            />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-3xl">{cocktail.strDrink}</h1>
            <p className="text-base-content/70">
              {cocktail.strAlcoholic} | {cocktail.strCategory} | {cocktail.strGlass}
            </p>
            {!!cocktail.strIBA && <p className="text-sm text-base-content/70">IBA: {cocktail.strIBA}</p>}
            {!!cocktail.strTags && <p className="text-sm text-base-content/70">Tags: {cocktail.strTags}</p>}

            <div>
              <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
              <ul className="list-disc pl-6 space-y-1">
                {ingredients.map((item) => (
                  <li key={`${item.ingredient}-${item.measure}`}>
                    {item.measure ? `${item.measure} ` : ''}
                    <Link
                      to={`/ingredient/${encodeURIComponent(item.ingredient)}`}
                      className="link link-hover link-primary"
                    >
                      {item.ingredient}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Instructions</h2>
              <p>{cocktail.strInstructions}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
