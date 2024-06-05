export type SquareValue = "X" | "O" | null;

// type SquareProps = {
//   value: SquareValue;
//   onSquareClick: () => void;
// }
// でも同じ
interface SquareProps {
  value: SquareValue;
  partOfWonLine: boolean; // 勝利ラインの一部のSquareかどうか
  onSquareClick: () => void;
}

export function Square({ value, partOfWonLine, onSquareClick }: SquareProps) {
  const content = partOfWonLine
    ? <div style={{backgroundColor: 'indigo'}}>{value}</div>
    : value;

  return (
    <button className="square" onClick={onSquareClick}>
      {content}
    </button>
  );
}
