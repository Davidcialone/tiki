import React, { useState } from "react";

export function MenuDisplay() {
    const menuItems = [
        { id: 1, name: "Salade César", description: "Une salade classique avec poulet et croûtons.", price: "8.50", category: "Entrées", image_url: "saladeCesar.png" },
        { id: 2, name: "Soupe à l'oignon", description: "Un classique français avec fromage gratiné.", price: "6.00", category: "Entrées", image_url: "soupeALoignon.png" },
        { id: 11, name: "Filet de bœuf", description: "Servi avec une sauce au poivre.", price: "20.00", category: "Plats", image_url: "https://via.placeholder.com/150" },
        { id: 21, name: "Tarte Tatin", description: "Une délicieuse tarte aux pommes renversée.", price: "7.00", category: "Desserts", image_url: "https://via.placeholder.com/150" },
        { id: 31, name: "Coca-Cola", description: "Boisson rafraîchissante.", price: "3.00", category: "Boissons", image_url: "https://via.placeholder.com/150" },
    ];

    const categoryImages = {
        Entrées: "entree.png",
        Plats: "plat.png",
        Desserts: "dessert.png",
        Boissons: "boissons.png",
    };

    const [selectedCategory, setSelectedCategory] = useState(null);

    // Logique de filtrage
    const filteredItems = selectedCategory
        ? menuItems.filter((item) => item.category === selectedCategory)
        : [];

    return (
        <div className="font-sans p-6 mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Menu</h1>

            {!selectedCategory ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {Object.keys(categoryImages).map((category) => (
                        <div
                            key={category}
                            className="flex flex-col items-center border border-gray-300 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => {
                                console.log("Catégorie cliquée :", category);
                                setSelectedCategory(category);
                            }}
                        >
                            <img
                                src={categoryImages[category]}
                                alt={category}
                                className="w-24 h-24 object-cover mb-4 rounded-full"
                            />
                            <h2 className="text-lg font-semibold">{category}</h2>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center">{selectedCategory}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg"
                            >
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-full h-40 object-cover mb-4 rounded-lg"
                                />
                                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                                <p className="text-gray-600 mb-2">{item.description}</p>
                                <p className="text-lg font-bold">{item.price} €</p>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => {
                            console.log("Retour à la liste des catégories");
                            setSelectedCategory(null);
                        }}
                        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Retour aux catégories
                    </button>
                </div>
            )}
        </div>
    );
}
