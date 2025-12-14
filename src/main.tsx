import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";
import App from "./pages/App.tsx";
import NavigationLayout from "./layout/NavigationLayout.tsx";
import Login from "./pages/Login.tsx";
import {Provider} from "react-redux";
import {store} from "./store.ts";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route element={<NavigationLayout/>}>
                        <Route path="/" element={<App/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
);
