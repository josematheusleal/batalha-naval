import { Cell } from './Cell';
import { Ship } from './Ship';
import './Board.css';

export const Board = ({ gridData, ships = [], isOpponent, onCellClick }) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="board-wrapper">

      <div className="corner-empty"></div>
      
      <div className="coords-letters">
        {letters.map((letter) => (
          <div key={letter} className="coord-label">{letter}</div>
        ))}
      </div>

      <div className="coords-numbers">
        {numbers.map((num) => (
          <div key={num} className="coord-label">{num}</div>
        ))}
      </div>

      <div className="board-grid">
        {ships.map((ship) => (
          <Ship key={ship.id} ship={ship} isOpponent={isOpponent} />
        ))}

        {gridData.map((row, rowIndex) => (
          row.map((cellStatus, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              status={cellStatus}
              isOpponent={isOpponent}
              rowIndex={rowIndex}
              colIndex={colIndex}
              onClick={() => onCellClick && onCellClick(rowIndex, colIndex)}
            />
          ))
        ))}
      </div>
    </div>
  );
};