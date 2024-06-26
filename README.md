# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## 構成

```
✔ Select a framework: › React
✔ Select a variant: › TypeScript + SWC
```

## forで要素を配置とか？
Array.fromを使ってみた

## ハンドラで二つのstateをsetすると二回レンダリングされる？
例えばこれ、
```js
function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
```
そんなことはなさそう。

## 単純に関数に切り出すとパフォーマンスが悪くなったりしない？
flutterで問題になるやつ

## 勝利につながった 3 つのマス目をハイライト表示する
https://ja.react.dev/learn/tutorial-tic-tac-toe#wrapping-up

buttonタグの間にdivタグを入れてから、X, O入れるようにするとsquares系の変数を全部変えないといけなさそう。

## typeのtypeってわかりづらい？
`type History = SquareValue[][]`
を宣言するなら、そのままSquareValue[][]を登場させる方が分かりやすいか？

## prettier
vscodeでautosaveにしている場合も⌘+sを押す必要がある。autosave自体は何も押さなくてもされる。

## srcのサブディレクトリのコードが、vscode上でlintされない
tscではちゃんとエラーになる

tsconfig.jsonの`"include": ["src"],`を`"include": ["src/**/*"],`にするとちゃんと怒られる。
と思ったけど、気のせいかもしれない。。。

## .eslintrc.cjsってなに？
https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file

今、ファイル名違う気がするけど↑

https://eslint.org/docs/latest/use/configure/configuration-files-deprecated

↑やっぱりdeprecatedになってるな。

### どこで入りこんだ？
`npm create vite@latest`のタイミング。
`npx storybook@latest init`でも更新されてる

## floatって別のコンポーネントに影響与えちゃうから良くない
知らないうちに解決してた
## 引き分けやってない -> 完了
currentSquaresが全てnullでないということで判定する

状態が、勝ち、負け、引き分け、勝負の途中の4つある
## Square.storyを作る
とりあえずOK
### なんかバグっぽいやつ
`type SquareValue = "X" | "O" | null`をstorybookで表示するとバグる

https://github.com/storybookjs/storybook/issues/25305

https://react-docgen.dev/playground
でみたけど、わからん。結局argTypesで対応した