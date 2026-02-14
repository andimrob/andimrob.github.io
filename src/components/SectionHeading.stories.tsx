import type { Meta, StoryObj } from "@storybook/react-vite";
import SectionHeading from "./SectionHeading";

const meta = {
  title: "Components/SectionHeading",
  component: SectionHeading,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Section Title",
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkMode: Story = {
  globals: {
    theme: "dark",
  },
};
