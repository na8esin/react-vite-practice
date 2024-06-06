import { useState } from "react";
import "./index.css";
import Toggle from "./components/Toggle.tsx";
import { Square, SquareValue } from "./components/Square.tsx";

interface BoardProps {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (squares: SquareValue[]) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const wonLine = calculateWonLine(squares);

  function handleClick(i: number) {
    if (squares[i] || wonLine) return;

    // コピーするだけ
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  // 引き分け条件
  // 現在の盤面が全て埋まってるにも関わらず、勝利ラインの計算結果がnull
  // someを使って、全体を反転させた方が、計算量は少なくなりそうだけど、かなりわかりづらい。
  const isDraw = squares.every((e) => e != null) && wonLine == null;

  return (
    <>
      {/*
        ここの変数にdrawかどうかも入れるとなると、引数が増えすぎて嫌だけどやむなし。
        対案としては、squaresを中に入れて、wonLineを計算しつつ、drawの判定すれば良さそうだけど、
        もっと複雑なゲームの場合はそこそこ重たい処理だろうし、何度も実行したくない。
      */}
      <CurrentGameStatus text={gameStatus(wonLine, xIsNext, isDraw)} />
      <div className="board-container">
        {Array.from({ length: 9 }, (_, i) => (
          <Square
            key={i}
            value={squares[i]}
            partOfWonLine={!!wonLine?.some((e) => e === i)}
            onSquareClick={() => handleClick(i)}
          />
        ))}
      </div>
    </>
  );
}

interface CurrentGameStatus {
  text: string;
}

// もはやコンポーネント化する理由が薄くなった
function CurrentGameStatus({ text }: CurrentGameStatus) {
  return <div className="status">{text}</div>;
}

// drawも判定
function gameStatus(
  wonLine: number[] | null,
  xIsNext: boolean,
  isDraw: boolean
): string {
  const winner = xIsNext ? "O" : "X";
  const nextPlayer = xIsNext ? "X" : "O";

  if (isDraw) return "Draw";

  if (wonLine) return "Winner: " + winner;

  return "Next player: " + nextPlayer;
}

export default function Game() {
  const [history, setHistory] = useState<SquareValue[][]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [onOff, setOnOff] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // それぞれのマス目をクリックしたときの最後に呼ばれる処理
  // nextSquares: クリックしたマス目の値が更新された後の盤面。 currentBoard的な名前の方がわかりやすいかも
  function handlePlay(nextSquares: SquareValue[]) {
    // ここの処理で、歴史を塗り替えた場合に、それ以降の歴史を削除する部分も含まれる
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function handleToggle() {
    setOnOff(!onOff);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div style={{ paddingInlineStart: "40px" }}>
          <Toggle onToggle={handleToggle} />
        </div>
        <ol reversed={!onOff}>
          <Moves
            history={history}
            currentMove={currentMove}
            jumpTo={jumpTo}
            onOff={onOff}
          />
        </ol>
      </div>
    </div>
  );
}

interface MovesProps {
  history: SquareValue[][];
  currentMove: number;
  jumpTo: (move: number) => void;
  onOff: boolean;
}

// コンポーネントにしてみた
// この名前のままstorybookにするとデザイナーさんは意味わからないだろうなぁ。
function Moves({ history, currentMove, jumpTo, onOff }: MovesProps) {
  const moves = history.map((_, move) => {
    const descriptionButton =
      move > 0 ? "Go to move #" + move : "Go to game start";

    const description =
      move === 0 ? "You are at Game start" : "You are at move #" + move;

    return (
      <li key={move}>
        {move === currentMove ? (
          <b>{description}</b>
        ) : (
          <button onClick={() => jumpTo(move)}>{descriptionButton}</button>
        )}
      </li>
    );
  });

  return onOff ? moves : moves.reverse();
}

// 元々は、OXをを返していたが、勝利条件のラインを返すように変更。
// nullじゃないときは勝負が決まっているということ
//
// lineと勝者一緒に返す変更でも良さそうだけど、勝者は呼び出しもとで判別できるため不要だと思う
//
// 引き分けも判定するとどう？空配列が帰ってきた時に引き分けとか。
function calculateWonLine(squares: SquareValue[]): number[] | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}
