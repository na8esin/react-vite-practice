import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Square } from "./Square";

const meta = {
  title: "Square",
  component: Square,
  tags: ["autodocs"],
  args: {
    onSquareClick: fn()
  }
} satisfies Meta<typeof Square>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: null,
    partOfWonLine: false,
  }
};
