import type { Cocktail } from './cocktail';
import type { Ingredient } from './ingredient';



export interface CocktailResponse {
  drinks: Cocktail[] | null;
}

export interface IngredientResponse {
  ingredients: Ingredient[] | null;
}
