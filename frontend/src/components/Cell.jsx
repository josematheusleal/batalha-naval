import './Cell.css';

export const Cell = ({ status, isOpponent, rowIndex, colIndex, onClick }) => {
  const renderMarker = () => {
    if (status === 'MISS') return <div className="marker miss"></div>;

    if (status === 'HIT' || status === 'SUNK') return <div className="marker hit"></div>;
    if (status === 'SHIP' && !isOpponent) return <div className="marker ship"></div>;
    
    return null;
  };

  const gridStyle = {
    gridRow: rowIndex + 1,
    gridColumn: colIndex + 1
  };

  return (
    <div className="grid-cell" style={gridStyle} onClick={onClick}>
      {renderMarker()}
    </div>
  );
};