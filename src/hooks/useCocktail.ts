import { useQuery } from '@tanstack/react-query';
import {
  getCocktailById,
  getCocktailsByAlphabet,
  searchCocktailsByIngredient,
} from '../services/cocktail';
 

export const cocktailQueryKeys = {
  all: ['cocktails'] as const,
  byAlphabet: (alphabet: string) => [...cocktailQueryKeys.all, 'alphabet', alphabet] as const,
  byIngredient: (ingredient: string) =>
    [...cocktailQueryKeys.all, 'ingredient', ingredient] as const,
  byId: (id: string) => [...cocktailQueryKeys.all, 'id', id] as const,
};

export const useCocktailsByAlphabet = (alphabet: string) =>
  useQuery({
    queryKey: cocktailQueryKeys.byAlphabet(alphabet),
    queryFn: () => getCocktailsByAlphabet(alphabet),
    enabled: alphabet.trim().length === 1,
  });

export const useCocktailsByIngredient = (ingredient: string) =>
  useQuery({
    queryKey: cocktailQueryKeys.byIngredient(ingredient),
    queryFn: () => searchCocktailsByIngredient(ingredient),
    enabled: ingredient.trim().length > 0,
  });

export const useCocktailById = (id: string) =>
  useQuery({
    queryKey: cocktailQueryKeys.byId(id),
    queryFn: () => getCocktailById(id),
    enabled: id.trim().length > 0,
  });
