import BaseAI from './BaseAI.js';

export default class IntermediateAI extends BaseAI {
    constructor() {
        super("intermediate-ai");
    }

    getBestMove(opponentBoard) {
        const availableMoves = this._getAvailableMoves(opponentBoard);
        
        if (availableMoves.length === 0) {
            return null;
        }

        let possibleTargets = [];
        if (this.lastHits && this.lastHits.length > 0) {
            possibleTargets = this._getAdjacentTargets(availableMoves);
        }

     if (possibleTargets.length > 0) {
            const randomIndex = Math.floor(Math.random() * possibleTargets.length);
            return possibleTargets[randomIndex];
        }

        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    }

    _getAdjacentTargets(availableMoves) {
        const targets = [];
        const directions = [
            { r: -1, c: 0 },
            { r: 1, c: 0 },
            { r: 0, c: -1 },
            { r: 0, c: 1 }
        ];

        for (const hit of this.lastHits) {
            for (const dir of directions) {
                const checkRow = hit.row + dir.r;
                const checkCol = hit.col + dir.c;
                const isAvailable = availableMoves.some(move => move.row === checkRow && move.col === checkCol);
                
                if (isAvailable) {
                    const alreadyAdded = targets.some(t => t.row === checkRow && t.col === checkCol);

                    if (!alreadyAdded) {
                        targets.push({ row: checkRow, col: checkCol });
                    }
                }
            }
        }

        return targets;
    }
}