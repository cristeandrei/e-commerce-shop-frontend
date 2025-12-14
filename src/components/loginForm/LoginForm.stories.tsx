import type {Meta, StoryObj} from '@storybook/react';
import LoginForm from "./LoginForm.tsx";
import {MemoryRouter} from "react-router";
import {store} from "../../store.ts";
import {Provider} from "react-redux";


const meta = {
    // 👇 The component you're working on
    component: LoginForm,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story/>
            </MemoryRouter>
        ),
        (Story) => (
            <Provider store={store}>
                <Story/>
            </Provider>
        ),
    ]
} satisfies Meta<typeof LoginForm>;

export const decorators = [];

export default meta;
// 👇 Type helper to reduce boilerplate
type Story = StoryObj<typeof meta>;

// 👇 A story named Primary that renders `<Button primary label="Button" />`
export const Primary: Story = {
    args: {
        primary: true,
        label: 'Button',
    },
};