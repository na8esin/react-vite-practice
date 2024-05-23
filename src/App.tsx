import { useState } from 'react';
import './index.css'
import Toggle from "./Toggle.tsx";

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

function Square({value, onSquareClick}: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (squares: (string | null)[]) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) return;

    // コピーするだけ
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);

  return (
    <>
      <CurrentGameStatus winner={winner} xIsNext={xIsNext} />
      <div className="board-container">
        {
          Array.from({ length: 9 }, (_, i) =>
            <Square
              key={i}
              value={squares[i]}
              onSquareClick={() => handleClick(i)} />)
        }
      </div>
    </>
  );
}

interface CurrentGameStatus {
  winner: string | null;
  xIsNext: boolean;
}

function CurrentGameStatus({winner, xIsNext}: CurrentGameStatus) {
  const status = (winner) ?
    "Winner: " + winner :
    "Next player: " + (xIsNext ? "X" : "O");

  return <div className="status">{status}</div>;
}

type History = (string | null)[][];

export default function Game() {
  const [history, setHistory] = useState<History>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // それぞれのマス目をクリックしたときの最後に呼ばれる処理
  // nextSquares: クリックしたマス目の値が更新された後の盤面。 currentBoard的な名前の方がわかりやすいかも
  function handlePlay(nextSquares: (string | null)[]) {
    // ここの処理で、歴史を塗り替えた場合に、それ以降の歴史を削除する部分も含まれる
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    const descriptionButton = (move > 0)?
      'Go to move #' + move:
      'Go to game start';

    const description = (move === 0)?
      'You are at Game start':
      'You are at move #' + move;

    return (
      <li key={move}>
        {move === currentMove ?
          (<b>{description}</b>) :
          (<button onClick={() => jumpTo(move)}>{descriptionButton}</button>)
        }
      </li>
    );
  })

  return (
    <div className="game">
      <div className="game-board">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div style={{ paddingInlineStart: '40px' }}>
          <Toggle />
        </div>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: (string | null)[]): string | null{
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}