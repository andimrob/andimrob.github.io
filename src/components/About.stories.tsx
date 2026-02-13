import type { Meta, StoryObj } from "@storybook/react-vite";
import About from "./About";

const meta = {
  title: "Components/About",
  component: About,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkMode: Story = {
  globals: {
    theme: "dark",
  },
};
