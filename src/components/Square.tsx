import styled from "styled-components";

// ここにnullが含まれるとstorybookのDocsのControlで選択できなくなる
// https://github.com/storybookjs/storybook/issues/25305
// ↑これかな？
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

const Button = styled.button<{ $partOfWonLine?: boolean }>`
  background: ${(props) => (props.$partOfWonLine ? "aqua" : "white")};
  border: 1px solid #999;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
`;

export function Square({ value, partOfWonLine, onSquareClick }: SquareProps) {
  return (
    <Button $partOfWonLine={partOfWonLine} onClick={onSquareClick}>
      {value}
    </Button>
  );
}
