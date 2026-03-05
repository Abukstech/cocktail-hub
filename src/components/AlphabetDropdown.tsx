const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface AlphabetDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const AlphabetDropdown = ({ value, onChange }: AlphabetDropdownProps) => {
  return (
    <div className="card bg-base-100 shadow-sm p-4">
      <p className="text-sm text-base-content/70 mb-2">Filter by Alphabet</p>
      <div className="dropdown w-full">
        <div tabIndex={0} role="button" className="btn w-full justify-between">
          Letter: {value.toUpperCase()}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 max-h-80 overflow-auto p-2 shadow-sm"
        >
          {ALPHABETS.map((letter) => {
            const lowerCaseLetter = letter.toLowerCase();
            return (
              <li key={letter}>
                <button
                  type="button"
                  className={value === lowerCaseLetter ? 'active' : ''}
                  onClick={() => onChange(lowerCaseLetter)}
                >
                  {letter}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
