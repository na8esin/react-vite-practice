export type SquareValue = "X" | "O" | null;


// type SquareProps = {
//   value: SquareValue;
//   onSquareClick: () => void;
// }
// でも同じ。歴史的経緯とかプロジェクトによって変わる気がする
interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
}

export function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}