import { useNavigate, useParams } from 'react-router-dom';
import { useIngredientByName } from '../hooks/useIngredient';

export const IngredientDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const ingredientName = decodeURIComponent(id ?? '');
  const ingredientDetailsQuery = useIngredientByName(ingredientName);
  const ingredient = ingredientDetailsQuery.data;

  return (
    <main className="container mx-auto px-4 py-8">
      <button className="btn btn-ghost mb-6" onClick={() => navigate('/')}>
        Back to list
      </button>

      {ingredientDetailsQuery.isLoading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}

      {ingredientDetailsQuery.isError && (
        <div className="alert alert-error">
          <span>Failed to load ingredient details.</span>
        </div>
      )}

      {ingredient && (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h1 className="card-title text-3xl">{ingredient.strIngredient}</h1>
            <p className="text-base-content/70">
              <span className="font-bold">Alcoholic:</span> {ingredient.strAlcohol}
            </p>
            {!!ingredient.strType && <p className="text-sm text-base-content/70">Type: {ingredient.strType}</p>}

            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p>{ingredient.strDescription}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
