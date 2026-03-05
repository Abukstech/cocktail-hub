import apiClient from '../lib/axios';
import type { IngredientResponse } from '../types/api-response';
import type { Ingredient} from '../types/ingredient';

export const getIngredientById = async (id: string): Promise<Ingredient | null> => {
  const response = await apiClient.get<IngredientResponse>(`/lookup.php?iid=${id}`);
  return response.data.ingredients?.[0] ?? null;
};

export const getIngredientByName = async (name: string): Promise<Ingredient | null> => {
  const response = await apiClient.get<IngredientResponse>(`/search.php?i=${name}`);
  return response.data.ingredients?.[0] ?? null;
};
