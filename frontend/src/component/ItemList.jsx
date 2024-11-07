import { useState, useEffect } from "react";

function ItemList() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/api/items/')
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <>
        <div>
        <h1>Items</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <strong>{item.name}</strong>: {item.description}
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default ItemList