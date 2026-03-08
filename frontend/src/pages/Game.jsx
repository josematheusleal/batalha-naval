import { Board } from '../components/Board';
import './Game.css';

export const Game = () => {
  // Criando grids vazios (preenchidos com água)
  const emptyGrid = () => Array(10).fill(null).map(() => Array(10).fill('WATER'));

  // 1. DADOS ESTÁTICOS: SUA FROTA (Inspirado na sua imagem)
  const playerGrid = emptyGrid();
  playerGrid[1][4] = 'MISS'; 
  playerGrid[4][3] = 'MISS';
  playerGrid[8][6] = 'MISS';
  
  // Acertos no seu navio do meio
  playerGrid[6][2] = 'HIT';
  playerGrid[6][3] = 'HIT';
  playerGrid[6][4] = 'HIT';

  const playerShips = [
    { id: 'p1', row: 3, col: 4, size: 4, orientation: 'horizontal', sunk: false }, // Navio de 4
    { id: 'p2', row: 6, col: 2, size: 3, orientation: 'horizontal', sunk: false }, // Navio de 3 (Acertado)
    { id: 'p3', row: 5, col: 9, size: 2, orientation: 'vertical', sunk: false }    // Navio de 2
  ];

  // 2. DADOS ESTÁTICOS: ADVERSÁRIO
  const opponentGrid = emptyGrid();
  opponentGrid[2][4] = 'MISS';
  
  // Você acertou um navio de 3 dele
  opponentGrid[4][4] = 'SUNK';
  opponentGrid[4][5] = 'SUNK';
  opponentGrid[4][6] = 'SUNK';

  const opponentShips = [
    { id: 'o1', row: 4, col: 4, size: 3, orientation: 'horizontal', sunk: true }
  ];

  return (
    <div className="game-screen">
      {/* CABEÇALHO */}
      <header className="game-header">
        <div className="logo-section">
          <span className="logo-icon">⛵</span>
          <h1 className="logo-text">BATTLESHIP</h1>
        </div>
        <div className="credits">Crafted with ♥ by unfold</div>
      </header>

      {/* ÁREA DOS TABULEIROS */}
      <main className="boards-layout">
        
        {/* LADO ESQUERDO: SUA FROTA */}
        <section className="side-container">
          <div className="badge badge-red">YOUR FLEET</div>
          
          <Board 
            gridData={playerGrid} 
            ships={playerShips} 
            isOpponent={false} 
          />

          {/* ESTALEIRO (Shipyard) */}
          <div className="bottom-panel">
            <span className="panel-title-vertical">SHIPYARD</span>
            <div className="shipyard-ships">
              <div className="mock-ship size-4"></div>
              <div className="mock-ship size-3"></div>
              <div className="mock-ship size-3"></div>
              <div className="mock-ship size-2"></div>
            </div>
          </div>
        </section>

        {/* LADO DIREITO: ADVERSÁRIO */}
        <section className="side-container">
          <div className="badge badge-grey">OPPONENT</div>
          
          <Board 
            gridData={opponentGrid} 
            ships={opponentShips} 
            isOpponent={true} 
          />

          {/* CEMITÉRIO (Graveyard) */}
          <div className="bottom-panel graveyard-panel">
            <span className="panel-title-vertical">GRAVEYARD</span>
            <div className="graveyard-list">
              <div className="graveyard-col">
                <p>Cruiser (2)</p>
                <p className="sunk-text">Submarine (3)</p>
                <p>Destroyer (3)</p>
              </div>
              <div className="graveyard-col">
                <p>Battleship (4)</p>
                <p>Aircraft Carrier (5)</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};