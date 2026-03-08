import './Ship.css';

export const Ship = ({ ship, isOpponent }) => {
  //se for o adversário, só mostra o navio se estiver afundado
  const isVisible = !isOpponent || ship.sunk;
  if (!isVisible) return null;

  const gridRow = `${ship.row + 1} / span ${ship.orientation === 'vertical' ? ship.size : 1}`;
  const gridColumn = `${ship.col + 1} / span ${ship.orientation === 'horizontal' ? ship.size : 1}`;

  return (
    <div 
      className="ship-capsule" 
      style={{ gridRow, gridColumn }}
    />
  );
};