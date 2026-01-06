import type {Preview} from "@storybook/react-vite";
import {DefaultBodyType, delay, http, HttpResponse, PathParams} from "msw";
import {initialize, mswLoader} from 'msw-storybook-addon'
import '../src/styles.css';
import {UserDetailsResponse} from '../src/types/userDetailsResponse.ts';

const preview: Preview = {
    beforeAll: async () => {
        initialize({onUnhandledRequest: "error"});
    },
    loaders: [mswLoader],
    parameters: {
        msw: {
            handlers: {
                csrf: [
                    http.get('*/auth/csrfToken', async () => {
                        await delay();

                        return new HttpResponse(null, {
                            headers: {
                                'set-cookie': 'XSRF-TOKEN=XSRF-TOKEN-FROM-SERVER',
                            },
                        })
                    }),
                ],
                auth: [
                    http.post<PathParams, DefaultBodyType, UserDetailsResponse>('*/auth/login', async () => {
                        await delay();

                        return HttpResponse.json({
                            username: "test",
                        })
                    }),
                ]
            }
        },

        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: "todo",
        },
    },
};

export default preview;