import { createFileRoute } from '@tanstack/react-router'
import {ItemDetails} from "../components/item/itemDetails.tsx";

export const Route = createFileRoute('/item')({
    component: Item,
})

function Item() {
    return <ItemDetails />;
}