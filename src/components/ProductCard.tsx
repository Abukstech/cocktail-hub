import type { Cocktail } from '../types/cocktail';

interface ProductCardProps {
  cocktail: Cocktail;
  onClick: (id: string) => void;
}

export const ProductCard = ({ cocktail, onClick }: ProductCardProps) => {
  return (
    <button
      type="button"
      className="card bg-base-100 w-full shadow-sm text-left transition hover:shadow-lg"
      onClick={() => onClick(cocktail.idDrink)}
    >
      <figure>
        <img
          src={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
          className="h-56 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{cocktail.strDrink}</h2>

        <div className="card-actions justify-end">
         {cocktail.strAlcoholic && <div className="badge badge-outline">{cocktail.strAlcoholic}</div> } 
         {cocktail.strCategory && <div className="badge badge-outline">{cocktail.strCategory}</div>} 
        </div>
      </div>
    </button>
  );
};
