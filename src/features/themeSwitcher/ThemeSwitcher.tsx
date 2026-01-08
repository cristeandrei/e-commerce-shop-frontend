import styles from "./ThemeSwitcher.module.css"

export default function ThemeSwitcher() {
    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const theme = event.target.checked ? "light" : "dark";

        localStorage.setItem("theme", theme);
    };

    const getInitialThemeState = () => {
        const theme = localStorage.getItem('theme');

        if (theme !== null) {
            return theme === "dark" ? false : true;
        }

        const isLight = window.matchMedia('(prefers-color-scheme: light)').matches;

        const preferedTheme = isLight ? "light" : "dark";

        localStorage.setItem("theme", preferedTheme);

        return undefined;
    };

    return <>
        <label className={styles.switch}>
            <input onChange={handleThemeChange} defaultChecked={getInitialThemeState()} type="checkbox" />
            <span className={styles.slider}></span>
        </label>
    </>;
}