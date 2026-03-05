import { useQuery } from '@tanstack/react-query';
import { getIngredientById, getIngredientByName } from '../services/ingredients';

export const ingredientQueryKeys = {
  all: ['ingredients'] as const,
  byId: (id: string) => [...ingredientQueryKeys.all, 'id', id] as const,
  byName: (name: string) => [...ingredientQueryKeys.all, 'name', name] as const,
};

export const useIngredientById = (id: string) =>
  useQuery({
    queryKey: ingredientQueryKeys.byId(id),
    queryFn: () => getIngredientById(id),
    enabled: id.trim().length > 0,
  });

export const useIngredientByName = (name: string) =>
  useQuery({
    queryKey: ingredientQueryKeys.byName(name),
    queryFn: () => getIngredientByName(name),
    enabled: name.trim().length > 0,
  });
