import type { Cocktail } from './cocktail';
import type { Ingredient } from './ingredient';

export interface ApiResponse<T> {
  data: T;
}

export interface CocktailResponse {
  drinks: Cocktail[] | null;
}

export interface IngredientResponse {
  ingredients: Ingredient[] | null;
}
