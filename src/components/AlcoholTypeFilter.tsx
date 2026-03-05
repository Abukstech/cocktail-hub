import type { AlcoholicFilterType } from '../types/cocktail';

type AlcoholFilterValue = 'all' | AlcoholicFilterType;

interface AlcoholTypeFilterProps {
  value: AlcoholFilterValue;
  onChange: (value: AlcoholFilterValue) => void;
}

export const AlcoholTypeFilter = ({ value, onChange }: AlcoholTypeFilterProps) => {
  return (
    <div className="card bg-base-100 shadow-sm p-4">
      <p className="text-sm text-base-content/70 mb-2">Filter by Alcohol</p>
      <form className="filter space-y-2" onReset={() => onChange('all')}>
        <input className="btn btn-square" type="reset" value="×" aria-label="Clear alcohol filter" />
        <input
          className="btn w-40 "
          type="radio"
          name="alcohol-filter"
          aria-label="Alcoholic"
          checked={value === 'Alcoholic'}
          onChange={() => onChange('Alcoholic')}
        />
        <input
          className="btn w-40"
          type="radio"
          name="alcohol-filter"
          aria-label="Non Alcoholic"
          checked={value === 'Non_Alcoholic'}
          onChange={() => onChange('Non_Alcoholic')}
        />
      </form>
    </div>
  );
};
