import type { Meta, StoryContext, StoryObj } from "@storybook/react";
import LoginForm from "./LoginForm.tsx";
import { MemoryRouter } from "react-router";
import { store } from "../../store.ts";
import { Provider } from "react-redux";
import type { UserDetailsResponse } from "../../types/userDetailsResponse.ts";
import { type DefaultBodyType, http, HttpResponse, type PathParams } from "msw";

const meta = {
  // 👇 The component you're working on
  component: LoginForm,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SuccesfulLogin: Story = {
  play: loginWithUser
};

export const FailedLogin: Story = {
  play: loginWithUser,
  parameters: {
    msw: {
      handlers: {
        auth: [
          http.post<PathParams, DefaultBodyType, UserDetailsResponse>('*/login', () => {
            return HttpResponse.error()
          })
        ]
      }
    }
  },
};

async function loginWithUser(context: StoryContext) {

  const usernameInput = context.canvas.getByLabelText("Username")

  await context.userEvent.type(usernameInput, 'username');

  const passwordInput = context.canvas.getByLabelText("Password")

  await context.userEvent.type(passwordInput, 'password12345');

  const loginButton = context.canvas.getByText("Login")

  await context.userEvent.click(loginButton);
}
