import type { Meta, StoryObj } from "@storybook/react-vite";
import Header from "./Header";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithScrollSections: Story = {
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="pt-24">
          <section
            id="about"
            className="h-screen bg-gray-100 p-8 dark:bg-gray-900"
          >
            <h2 className="text-2xl font-bold">About</h2>
          </section>
          <section
            id="experience"
            className="h-screen bg-gray-200 p-8 dark:bg-gray-800"
          >
            <h2 className="text-2xl font-bold">Experience</h2>
          </section>
          <section
            id="projects"
            className="h-screen bg-gray-100 p-8 dark:bg-gray-900"
          >
            <h2 className="text-2xl font-bold">Projects</h2>
          </section>
        </div>
      </div>
    ),
  ],
};

export const DarkMode: Story = {
  globals: {
    theme: "dark",
  },
};
