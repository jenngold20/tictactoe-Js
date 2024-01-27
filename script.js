document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const resetButton = document.getElementById('reset');
  let currentPlayer = 'X';
  let gameActive = true;

  // Generar las celdas del tablero
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => {
      if (gameActive && !cell.textContent) {
        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
          alert(`Player ${currentPlayer} wins!`);
          gameActive = false;
        } else if (checkDraw()) {
          alert('It\'s a draw!');
          gameActive = false;
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    });
    board.appendChild(cell);
  }

  // Reiniciar el juego
  resetButton.addEventListener('click', () => {
    board.querySelectorAll('.cell').forEach(cell => {
      cell.textContent = '';
    });
    currentPlayer = 'X';
    gameActive = true;
  });

  // Funciones de verificación de victoria y empate
  function checkWin(player) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winConditions.some(condition => {
      return condition.every(index => {
        return board.children[index].textContent === player;
      });
    });
  }

  function checkDraw() {
    return [...board.children].every(cell => {
      return cell.textContent !== '';
    });
  }
});