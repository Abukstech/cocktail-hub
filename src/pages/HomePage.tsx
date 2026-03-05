import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AlcoholTypeFilter } from '../components/AlcoholTypeFilter';
import { AlphabetDropdown } from '../components/AlphabetDropdown';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { useCocktailsByAlphabet, useCocktailsByIngredient } from '../hooks/useCocktail';
import type { AlcoholFilterType } from '../types/cocktail';

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedAlphabet, setSelectedAlphabet] = useState('a');
  const [selectedAlcoholType, setSelectedAlcoholType] = useState<'all' | AlcoholFilterType>('all');
  const ingredientQuery = searchParams.get('ingredient')?.trim() ?? '';

  const cocktailsByAlphabetQuery = useCocktailsByAlphabet(selectedAlphabet);
  const cocktailsByIngredientQuery = useCocktailsByIngredient(ingredientQuery);
  const cocktailsQuery = ingredientQuery ? cocktailsByIngredientQuery : cocktailsByAlphabetQuery;
  const filteredCocktails =
    cocktailsQuery.data?.filter((cocktail) => {
      if (selectedAlcoholType === 'all') {
        return true;
      }
      if (selectedAlcoholType === 'Alcoholic') {
        return cocktail.strAlcoholic.toLowerCase() === 'alcoholic';
      }
      const normalized = cocktail.strAlcoholic.toLowerCase().replace(/[\s_-]/g, '');
      return normalized === 'nonalcoholic';
    }) ?? [];

  return (
    <>
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="lg:sticky lg:top-4 lg:self-start space-y-4">
            <AlphabetDropdown value={selectedAlphabet} onChange={setSelectedAlphabet} />
            <AlcoholTypeFilter value={selectedAlcoholType} onChange={setSelectedAlcoholType} />
            {!!ingredientQuery && (
              <div className="card bg-base-100 shadow-sm p-4">
                <p className="text-sm text-base-content/70">Searching ingredient</p>
                <p className="font-semibold">{ingredientQuery}</p>
              </div>
            )}
          </aside>

          <section>
            {cocktailsQuery.isLoading && (
              <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg" />
              </div>
            )}

            {cocktailsQuery.isError && (
              <div className="alert alert-error">
                <span>Failed to load cocktails.</span>
              </div>
            )}

            {!!filteredCocktails.length && (
              <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCocktails.map((cocktail) => (
                  <ProductCard
                    key={cocktail.idDrink}
                    cocktail={cocktail}
                    onClick={(id) => navigate(`/cocktail/${encodeURIComponent(id)}`)}
                  />
                ))}
              </section>
            )}

            {cocktailsQuery.isSuccess && !filteredCocktails.length && (
              <div className="alert alert-info">
                <span>
                  {ingredientQuery
                    ? `No cocktails found for ingredient "${ingredientQuery}".`
                    : selectedAlcoholType === 'all'
                      ? `No cocktails found for letter "${selectedAlphabet.toUpperCase()}".`
                      : `No ${selectedAlcoholType.replace('_', ' ')} cocktails found.`}
                </span>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};
