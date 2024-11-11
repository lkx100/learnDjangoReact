import React, { useState, useEffect } from "react";

function ItemList() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '' });

    useEffect(() => {
        fetch('http://localhost:8000/api/items/')
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleChange = (e) => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();   // Prevents page reload behaviour on form submition
        fetch('http://localhost:8000/api/items/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        })
        .then((response) => response.json())
        .then((data) => {
            setItems([...items, data]);  // Add new item to items list
            setNewItem({ name: '', description: '' });  // Reset form
        })
        .catch((error) => console.error('Error adding item:', error));
    }

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

            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text" name="name" value={newItem.name} onChange={handleChange} placeholder="Name" required
                />
                <input
                    type="text" name="description" value={newItem.description} onChange={handleChange} placeholder="Description" required
                />

                <button type="submit">Add Item</button>
            </form>

        </div>
        </>
    )
}

export default ItemList