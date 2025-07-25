export const countGroups = (sticks) => {
    let groups = 0;
    let inGroup = false;
    for (let i = 0; i < sticks.length; i++) {
        if (sticks[i] === 1 && !inGroup) {
            groups++;
            inGroup = true;
        } else if (sticks[i] === 0) {
            inGroup = false;
        }
    }
    return groups;
}

export const findThreeInRow = (sticks) => {
    const moves = [];
    for (let i = 0; i <= sticks.length - 3; i++) {
        if (sticks[i] === 1 && sticks[i + 1] === 1 && sticks[i + 2] === 1) {
            moves.push([i + 1, i + 2, i + 3]);
        }
    }
    return moves;
};

export const generateMoves = (sticks) => {
    const moves = [];
    const threeInRowMoves = findThreeInRow(sticks);
    moves.push(...threeInRowMoves);

    const rest = sticks.reduce((sum, s) => sum + s, 0);
    const groups = countGroups(sticks);
    let movesOnTwo = 0;

    
        const stickIndices = sticks.reduce((indices, s, i) => {
            if (s === 1) indices.push(i + 1);
            return indices;
        }, []);
        for (let i = 0; i < stickIndices.length; i++) {
            for (let j = i + 1; j < stickIndices.length; j++) {
                moves.push([stickIndices[i], stickIndices[j]]);
                if (rest >= 15) {
                    movesOnTwo++
                }
                if (movesOnTwo >= 20) break;
            }
            if (movesOnTwo >= 20) break;
        }

    
    for (let i = 0; i < sticks.length; i++) {
        if (sticks[i] === 1) moves.push([i + 1]);
    }
    return moves;
};

export const applyMove = (sticks, move) => {
    const newSticks = [...sticks];

    if (move.length === 3) {
        const [a, b, c] = move.sort((x, y) => x - y);
        if (b !== a + 1 || c !== a + 2) {
            console.error('Неверный ход:', move);
            throw new Error('Три палочки должны идти подряд');
        }
    }
    move.forEach(pos => {
        newSticks[pos - 1] = 0;
    });
    return newSticks;
}

export const ratePosition = (sticks) => {
    const remaining = sticks.reduce((sum, s) => sum + s, 0);
    const groups = countGroups(sticks);
    const hasThreeInRow = findThreeInRow(sticks) !== null;

    if (remaining === 0) return -1; // Проигрыш
    if ([1, 2].includes(remaining)) return 1; // Выигрыш

    let score = 0;
    if (hasThreeInRow) score += 0.5; // Возможность взять 3 подряд — плюс
    score -= groups * 0.2; // Много групп — минус
    score += (remaining % 2 === 0 ? -0.2 : 0.2); // Чётность
    score -= remaining * 0.05; // Меньше палочек — лучше

    return score;
}

export const getMaxDepth = (stickCount, groupCount) => {
    if (stickCount <= 12) return Infinity;
    if (stickCount > 22 || groupCount > 4) return 2;
    if (stickCount > 18 || groupCount > 3) return 3;
    if (stickCount > 14 || groupCount > 2) return 4;
    return 5;
}

export const memo = {};

export const grundy = (sticks, depth = 0, maxDepth = Infinity) => {
    const key = sticks.join(',');
    if (memo[key] !== undefined) {
        return memo[key];
    }

    if (depth >= maxDepth) {
        const value = ratePosition(sticks);
        memo[key] = value;
        return value;
    }

    const moves = generateMoves(sticks);
    if (moves.length === 0) {
        memo[key] = 0; // Проигрышная позиция
        return 0;
    }

    const subGrundy = new Set();
    for (const move of moves) {
        const newSticks = applyMove(sticks, move);
        subGrundy.add(grundy(newSticks, depth + 1, maxDepth));
    }

    let mex = 0;
    while (subGrundy.has(mex)) {
        mex++; // теорема Шпрага-Гранди
    }

    memo[key] = mex;
    return mex;
}