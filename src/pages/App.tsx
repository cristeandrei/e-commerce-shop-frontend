import {useSelector} from "react-redux";
import {selectUserDetails} from "../services/userSlice.ts";

export default function App() {
    const user = useSelector(selectUserDetails);

    if (user.username) {
        return <p>Hello {user.username}</p>;
    }
    return <p>Home</p>;
}
