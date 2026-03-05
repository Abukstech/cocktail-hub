import apiClient from '../lib/axios';
import type { CocktailResponse } from '../types/api-response';
import type { Cocktail } from '../types/cocktail';

export const getCocktailsByAlphabet = async (alphabet: string): Promise<Cocktail[]> => {
  const response = await apiClient.get<CocktailResponse>(`/search.php?f=${alphabet}`);
  return response.data.drinks ?? [];
};

export const searchCocktailsByIngredient = async (ingredient: string): Promise<Cocktail[]> => {
  const response = await apiClient.get<CocktailResponse>(`/filter.php?i=${ingredient}`);
  return response.data.drinks ?? [];
};

export const getCocktailById = async (id: string): Promise<Cocktail | null> => {
  const response = await apiClient.get<CocktailResponse>(`/lookup.php?i=${id}`);
  return response.data.drinks?.[0] ?? null;
};
