import React, { useState } from "react";

export function MenuDisplay() {
    // Données fictives pour le menu
    const menuItems = [
        // Entrées
        { id: 1, name: "Salade César", description: "Une salade classique avec poulet et croûtons.", price: "8.50", category: "Entrées", image_url: "saladeCesar.png" },
        { id: 2, name: "Soupe à l'oignon", description: "Un classique français avec fromage gratiné.", price: "6.00", category: "Entrées", image_url: "soupeALoignon.png" },
        { id: 3, name: "Bruschetta", description: "Pain grillé garni de tomates fraîches et basilic.", price: "5.00", category: "Entrées", image_url: "bruschetta.png" },
        { id: 4, name: "Caprese", description: "Mozzarella et tomates fraîches avec basilic.", price: "7.50", category: "Entrées", image_url: "https://via.placeholder.com/150" },
        { id: 5, name: "Assiette de charcuterie", description: "Sélection de jambon, saucisson et pâté.", price: "12.00", category: "Entrées", image_url: "https://via.placeholder.com/150" },
        { id: 6, name: "Carpaccio de bœuf", description: "Fines tranches de bœuf cru avec parmesan.", price: "10.00", category: "Entrées", image_url: "https://via.placeholder.com/150" },
        { id: 7, name: "Soupe de légumes", description: "Un mélange sain et savoureux de légumes.", price: "5.50", category: "Entrées", image_url: "https://via.placeholder.com/150" },
        { id: 8, name: "Tartare de saumon", description: "Saumon frais avec avocat et citron.", price: "11.50", category: "Entrées", image_url: "https://via.placeholder.com/150" },
        { id: 9, name: "Oeuf mayonnaise", description: "Simple et délicieux, servi avec salade.", price: "4.50", category: "Entrées", image_url: "https://via.placeholder.com/150" },
        { id: 10, name: "Escargots à l'ail", description: "Escargots dans une sauce au beurre et ail.", price: "9.00", category: "Entrées", image_url: "https://via.placeholder.com/150" },
    
        // Plats
        { id: 11, name: "Filet de bœuf", description: "Servi avec une sauce au poivre.", price: "20.00", category: "Plats", image_url: "https://via.placeholder.com/150" },
        { id: 12, name: "Risotto aux champignons", description: "Crémeux et savoureux.", price: "16.00", category: "Plats", image_url: "https://via.placeholder.com/150" },
        { id: 13, name: "Poulet rôti", description: "Servi avec pommes de terre fondantes.", price: "14.50", category: "Plats", image_url: "https://via.placeholder.com/150" },
        { id: 14, name: "Pâtes Carbonara", description: "Un grand classique italien avec bacon.", price: "12.00", category: "Plats", image_url: "https://via.placeholder.com/150" },
        { id: 15, name: "Côtelettes d'agneau", description: "Grillées à la perfection avec herbes.", price: "19.00", category: "Plats", image_url: "https://via.placeholder.com/150" },
        { id: 16, name: "Saumon grillé", description: "Servi avec une sauce citronnée.", price: "17.50", category: "Plats", image_url: "https://via.placeholder.com/150" },
        { id: 17, name: "Hamburger maison", description: "Pain brioché, bœuf et cheddar.", price: "13.00", category: "Plats", image_url: "https://via.placeholder.com/150" },
        { id: 18, name: "Curry de légumes", description: "Plat végétarien épicé et délicieux.", price: "15.00", category: "Plats", image_url: "https://via.placeholder.com/150" },
        { id: 19, name: "Magret de canard", description: "Avec une sauce au miel et orange.", price: "22.00", category: "Plats", image_url: "https://via.placeholder.com/150" },
        { id: 20, name: "Lasagnes", description: "Servies avec une salade verte.", price: "12.50", category: "Plats", image_url: "https://via.placeholder.com/150" },
    
        // Desserts
        { id: 21, name: "Tarte Tatin", description: "Une délicieuse tarte aux pommes renversée.", price: "7.00", category: "Desserts", image_url: "https://via.placeholder.com/150" },
        { id: 22, name: "Fondant au chocolat", description: "Un gâteau au chocolat au cœur fondant.", price: "6.50", category: "Desserts", image_url: "https://via.placeholder.com/150" },
        { id: 23, name: "Crème brûlée", description: "Un classique français avec caramel craquant.", price: "5.50", category: "Desserts", image_url: "https://via.placeholder.com/150" },
        { id: 24, name: "Panna Cotta", description: "Servie avec un coulis de fruits rouges.", price: "6.00", category: "Desserts", image_url: "https://via.placeholder.com/150" },
        { id: 25, name: "Mousse au chocolat", description: "Légère et chocolatée.", price: "5.00", category: "Desserts", image_url: "https://via.placeholder.com/150" },
        { id: 26, name: "Tiramisu", description: "Un dessert italien classique.", price: "6.50", category: "Desserts", image_url: "https://via.placeholder.com/150" },
        { id: 27, name: "Macarons", description: "Assortiment de saveurs colorées.", price: "8.00", category: "Desserts", image_url: "https://via.placeholder.com/150" },
        { id: 28, name: "Profiteroles", description: "Choux garnis de glace avec chocolat.", price: "7.50", category: "Desserts", image_url: "https://via.placeholder.com/150" },
        { id: 29, name: "Charlotte aux fraises", description: "Avec crème fouettée et biscuits.", price: "9.00", category: "Desserts", image_url: "https://via.placeholder.com/150" },
        { id: 30, name: "Sorbet", description: "2 boules au choix.", price: "4.50", category: "Desserts", image_url: "https://via.placeholder.com/150" },
    
        // Boissons
        { id: 31, name: "Coca-Cola", description: "Boisson rafraîchissante.", price: "3.00", category: "Boissons", image_url: "https://via.placeholder.com/150" },
        { id: 32, name: "Chardonnay", description: "Vin blanc fruité et élégant.", price: "5.00", category: "Boissons", image_url: "https://via.placeholder.com/150" },
        { id: 33, name: "Eau minérale", description: "Plate ou gazeuse.", price: "2.00", category: "Boissons", image_url: "https://via.placeholder.com/150" },
        { id: 34, name: "Thé glacé", description: "Infusion froide légèrement sucrée.", price: "3.50", category: "Boissons", image_url: "https://via.placeholder.com/150" },
        { id: 35, name: "Expresso", description: "Café italien intense.", price: "2.50", category: "Boissons", image_url: "https://via.placeholder.com/150" },
        { id: 36, name: "Latte Macchiato", description: "Café au lait doux et crémeux.", price: "4.50", category: "Boissons", image_url: "https://via.placeholder.com/150" },
        { id: 37, name: "Jus d'orange", description: "100% pur jus pressé.", price: "3.00", category: "Boissons", image_url: "https://via.placeholder.com/150" },
        { id: 38, name: "Mojito sans alcool", description: "Cocktail rafraîchissant à la menthe.", price: "6.00", category: "Boissons", image_url: "https://via.placeholder.com/150" },
        { id: 39, name: "Vin rouge Bordeaux", description: "Aromatique et corsé.", price: "5.50", category: "Boissons", image_url: "https://via.placeholder.com/150" },
        { id: 40, name: "Bière artisanale", description: "Blonde ou ambrée.", price: "4.50", category: "Boissons", image_url: "https://via.placeholder.com/150" }
    ];
    

    // Images représentatives des catégories
    const categoryImages = {
        Entrées: "entree.png",
        Plats: "plat.png",
        Desserts: "dessert.png",
        Boissons: "boissons.png",
        Vins :"vins.png"
    };

    // Fonction pour gérer le retour à la section des catégories
    const handleBackToCategories = () => {
        setSelectedCategory(null);
    };

    // State pour gérer la catégorie sélectionnée
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Fonction pour filtrer les items par catégorie
    const filteredItems = selectedCategory
        ? menuItems.filter((item) => item.category === selectedCategory)
        : [];

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <h1>Menu</h1>
         
            {/* Si aucune catégorie sélectionnée, afficher les photos des catégories */}
            {!selectedCategory ? (
                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fit, minmax(5rem, 1fr))", // Corrigé : Retrait de la virgule
                    gap: "10px" // Corrigé : Placé correctement en dehors de `gridTemplateColumns`
                }}>
                
                    {Object.keys(categoryImages).map((category) => (
                        <div
                            key={category}
                            style={{
                                textAlign: "center",
                                cursor: "pointer",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                // overflow: "hidden",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
                                backgroundColor: "#fff",
                            }}
                            onClick={() => setSelectedCategory(category)} // Sélectionner une catégorie
                        >
                            <img
                                src={categoryImages[category]}
                                alt={category}
                                style={{ width: "100%", height: "3rem", objectFit: "cover" }}
                            />
                            <h2 style={{ margin: "0.rem 0", color: "black" }}>{category}</h2>
                        </div>
                    ))}
                </div>
                               
            ) : (
                // Si une catégorie est sélectionnée, afficher les items de la catégorie
                <div>
            
                    <h2>{selectedCategory}</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    padding: "15px",
                                    backgroundColor: "#fff",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    style={{
                                        width: "100%",
                                        height: "150px",
                                        objectFit: "cover",
                                        borderRadius: "5px",
                                        marginBottom: "10px",
                                    }}
                                />
                                <h3 style={{ margin: "0 0 10px 0" }}>{item.name}</h3>
                                <p style={{ margin: "0 0 10px 0", color: "#555" }}>{item.description}</p>
                                <p style={{ fontWeight: "bold", color: "#333" }}>{item.price} €</p>
                            </div>
                        ))}
                       {/* Bouton de retour fixe */}
                            <button
                                onClick={handleBackToCategories}
                                style={{
                                    position: 'fixed',
                                    bottom: '10px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    padding: '15px 30px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                }}
                            >
                                Retour aux catégories
                            </button>
                    </div>
                </div>
                
            )}
        </div>
    );
}
