import styled from 'styled-components';

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

const Button = styled.button`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
`

export function Square({ value, partOfWonLine, onSquareClick }: SquareProps) {
  const content = partOfWonLine
    ? <div style={{backgroundColor: 'deepskyblue'}}>{value}</div>
    : value;

  return (
    <Button onClick={onSquareClick}>
      {content}
    </Button>
  );
}
