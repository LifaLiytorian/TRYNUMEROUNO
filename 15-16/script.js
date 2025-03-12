// script.js

class Minesweeper {
    constructor(gameSize, numberOfMines) {
        this.gameSize = gameSize;
        this.numberOfMines = numberOfMines;
        this.gameStarted = false;
        this.gameWon = false;
        this.gameLost = false;
        this.revealedCells = 0;
        this.flaggedCells = 0;
        this.mines = [];
        this.cells = [];
        this.gameBoard = document.getElementById('game-board');
        this.resetButton = document.getElementById('reset-button');

        this.init();
    }

    init() {
        this.createGameBoard();
        this.resetButton.addEventListener('click', () => this.resetGame());
    }

    createGameBoard() {
        for (let i = 0; i < this.gameSize; i++) {
            const row = [];
            for (let j = 0; j < this.gameSize; j++) {
                const cell = document.createElement('button');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', (event) => this.handleCellClick(event));
                cell.addEventListener('contextmenu', (event) => this.handleCellRightClick(event));
                row.push(cell);
                this.gameBoard.appendChild(cell);
            }
            this.cells.push(row);
        }
    }

    handleCellClick(event) {
        if (this.gameStarted && !this.gameWon && !this.gameLost) {
            const row = parseInt(event.target.dataset.row);
            const col = parseInt(event.target.dataset.col);
            this.revealCell(row, col);
        }
    }

    handleCellRightClick(event) {
        event.preventDefault();
        if (this.gameStarted && !this.gameWon && !this.gameLost) {
            const row = parseInt(event.target.dataset.row);
            const col = parseInt(event.target.dataset.col);
            this.flagCell(row, col);
        }
    }

    revealCell(row, col) {
        if (!this.cells[row][col].classList.contains('revealed') && !this.cells[row][col].classList.contains('flagged')) {
            this.cells[row][col].classList.add('revealed');
            this.revealedCells++;
            if (this.mines.includes(`${row},${col}`)) {
                this.cells[row][col].classList.add('mine');
                this.gameLost = true;
                this.revealAllMines();
            } else {
                const adjacentMines = this.countAdjacentMines(row, col);
                if (adjacentMines > 0) {
                    this.cells[row][col].textContent = adjacentMines;
                } else {
                    this.revealAdjacentCells(row, col);
                }
            }
            this.checkGameWon();
        }
    }

    flagCell(row, col) {
        if (!this.cells[row][col].classList.contains('revealed')) {
            if (this.cells[row][col].classList.contains('flagged')) {
                this.cells[row][col].classList.remove('flagged');
                this.flaggedCells--;
            } else {
                this.cells[row][col].classList.add('flagged');
                this.flaggedCells++;
            }
        }
    }

    countAdjacentMines(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const adjacentRow = row + i;
                const adjacentCol = col + j;
                if (adjacentRow >= 0 && adjacentRow < this.gameSize && adjacentCol >= 0 && adjacentCol < this.gameSize) {
                    if (this.mines.includes(`${adjacentRow},${adjacentCol}`)) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    revealAdjacentCells(row, col) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const adjacentRow = row + i;
                const adjacentCol = col + j;
                if (adjacentRow >= 0 && adjacentRow < this.gameSize && adjacentCol >= 0 && adjacentCol < this.gameSize) {
                    this.revealCell(adjacentRow, adjacentCol);
                }
            }
 }
    }

    revealAllMines() {
        for (const mine of this.mines) {
            const [row, col] = mine.split(',').map(Number);
            this.cells[row][col].classList.add('mine');
        }
    }

    checkGameWon() {
        if (this.revealedCells === this.gameSize * this.gameSize - this.numberOfMines) {
            this.gameWon = true;
            alert('Congratulations, you won!');
        }
    }

    resetGame() {
        this.gameStarted = false;
        this.gameWon = false;
        this.gameLost = false;
        this.revealedCells = 0;
        this.flaggedCells = 0;
        this.mines = [];
        this.cells.forEach(row => {
            row.forEach(cell => {
                cell.classList.remove('revealed', 'mine', 'flagged');
                cell.textContent = '';
            });
        });
        this.startGame();
    }

    startGame() {
        this.gameStarted = true;
        // Randomly place mines on the board
        for (let i = 0; i < this.numberOfMines; i++) {
            let row, col;
            do {
                row = Math.floor(Math.random() * this.gameSize);
                col = Math.floor(Math.random() * this.gameSize);
            } while (this.mines.includes(`${row},${col}`));
            this.mines.push(`${row},${col}`);
        }
    }
}

// Initialize the game
const minesweeper = new Minesweeper(10, 10);