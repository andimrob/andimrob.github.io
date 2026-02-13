import type { Meta, StoryObj } from "@storybook/react-vite";
import Experience from "./Experience";

const meta = {
  title: "Components/Experience",
  component: Experience,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Experience>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkMode: Story = {
  globals: {
    theme: "dark",
  },
};
