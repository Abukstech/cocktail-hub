
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ingredient, setIngredient] = useState(
    () => new URLSearchParams(location.search).get('ingredient') ?? '',
  );

  useEffect(() => {
    setIngredient(new URLSearchParams(location.search).get('ingredient') ?? '');
  }, [location.search]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = ingredient.trim();
    if (!normalized) {
      navigate('/');
      return;
    }
    navigate(`/?ingredient=${encodeURIComponent(normalized)}`);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          cocktailHub
        </Link>
      </div>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search By Ingredients"
          className="input input-bordered w-40 md:w-auto"
          value={ingredient}
          onChange={(event) => setIngredient(event.target.value)}
        />
        <button type="submit" className="btn btn-secondary">
          Search
        </button>
      </form>
    </div>
  )
}
