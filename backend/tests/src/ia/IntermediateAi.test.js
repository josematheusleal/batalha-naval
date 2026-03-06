import IntermediateAI from '../../../src/ai/IntermediateAI.js';

describe('Testes da IntermediateAI', () => {
    let ai;
    let mockOpponentBoard;

    
    beforeEach(() => {
        ai = new IntermediateAI('cpu-1', 'Bot Intermediário');
        mockOpponentBoard = {
            attacks: [] 
        };
    });

    test('Modo Caça: Deve retornar uma jogada válida no início do jogo', () => {
        const move = ai.getBestMove(mockOpponentBoard);

        // Verifica se retornou um objeto com row e col
        expect(move).toHaveProperty('row');
        expect(move).toHaveProperty('col');

        // Verifica se a jogada está dentro dos limites do tabuleiro (0 a 9)
        expect(move.row).toBeGreaterThanOrEqual(0);
        expect(move.row).toBeLessThan(10);
        expect(move.col).toBeGreaterThanOrEqual(0);
        expect(move.col).toBeLessThan(10);
    });

    test('Modo Alvo: Deve retornar uma célula estritamente adjacente após um ACERTO', () => {
        // Simulamos que a IA atirou na linha 5, coluna 5
        mockOpponentBoard.attacks.push('5,5');
        
        // Avisamos a IA que foi um acerto (Hit)
        ai.registerAttackResult(5, 5, 'hit', null);

        // Pedimos a próxima jogada
        const nextMove = ai.getBestMove(mockOpponentBoard);

        // Os únicos vizinhos válidos para 5,5 são: (4,5), (6,5), (5,4) e (5,6)
        const isAdjacent = 
            (nextMove.row === 4 && nextMove.col === 5) || // Cima
            (nextMove.row === 6 && nextMove.col === 5) || // Baixo
            (nextMove.row === 5 && nextMove.col === 4) || // Esquerda
            (nextMove.row === 5 && nextMove.col === 6);   // Direita

        expect(isAdjacent).toBe(true);
    });

    test('Modo Alvo (Canto): Não deve tentar atirar fora do tabuleiro se o acerto for no canto', () => {
        // Acerto no canto superior esquerdo (0,0)
        mockOpponentBoard.attacks.push('0,0');
        ai.registerAttackResult(0, 0, 'hit', null);

        const nextMove = ai.getBestMove(mockOpponentBoard);

        // Os únicos vizinhos válidos dentro do mapa para 0,0 são (0,1) e (1,0)
        const isAdjacentAndValid = 
            (nextMove.row === 0 && nextMove.col === 1) || 
            (nextMove.row === 1 && nextMove.col === 0);

        expect(isAdjacentAndValid).toBe(true);
    });

    test('Retorno à Caça: Deve voltar a atirar aleatoriamente após afundar o alvo', () => {
        // Acertou parte do navio
        mockOpponentBoard.attacks.push('2,2');
        ai.registerAttackResult(2, 2, 'hit', null);

        // Acertou a outra parte e afundou
        mockOpponentBoard.attacks.push('2,3');
        ai.registerAttackResult(2, 3, 'sunk', true);

        // Como o navio afundou, a memória de acertos recentes (lastHits) deve ser limpa
        // e a IA deve escolher um alvo em qualquer lugar válido, não apenas adjacente.
        
        // Vamos rodar algumas vezes para garantir que ela não ficou "presa" nos vizinhos
        let foundNonAdjacent = false;
        
        for(let i = 0; i < 20; i++) {
            const move = ai.getBestMove(mockOpponentBoard);
            
            // Verifica se a jogada NÃO é vizinha de (2,2) ou (2,3)
            const isNeighborOf2_2 = Math.abs(move.row - 2) + Math.abs(move.col - 2) === 1;
            const isNeighborOf2_3 = Math.abs(move.row - 2) + Math.abs(move.col - 3) === 1;

            if (!isNeighborOf2_2 && !isNeighborOf2_3) {
                foundNonAdjacent = true;
                break; // Se achou um longe, provamos que ela saiu do modo alvo
            }
        }

        expect(foundNonAdjacent).toBe(true);
    });

    test('Fim de Jogo: Deve retornar null se não houver mais jogadas disponíveis', () => {
        // Preenchemos o tabuleiro falso inteiro (100 jogadas)
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                mockOpponentBoard.attacks.push(`${r},${c}`);
            }
        }

        const move = ai.getBestMove(mockOpponentBoard);
        
        // Como o mapa está cheio, não há jogadas possíveis
        expect(move).toBeNull();
    });
});