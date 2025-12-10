import {useQuery} from "@tanstack/react-query";

export function ItemDetails() {
    let fetchData = async () => {

        const base64Credentials = btoa("user:password");

        await fetch(
            'http://localhost:8080/auth/login',
            {
                method: 'GET',
                credentials: 'include',
                headers: {'Authorization': `Basic ${base64Credentials}`}
            });

        let item = await (await fetch(
            'http://localhost:8080/items/1',
            {
                method: 'GET',
                credentials: 'include',
            })).json();

        return JSON.stringify(item);
    }

    const { isPending, error, data } = useQuery({queryKey: ['todos'], queryFn: fetchData})

    if(isPending) return <p>Loading...</p>;

    if (error) return 'An error has occurred: ' + error.message

    return <p>{data}</p>
}