import React, { useState } from "react";
import { X} from 'lucide-react';

export function MenuDisplay() {
    const menuItems = [
        // Entrées
        { id: 1, name: "Salade César", description: "Une salade classique avec poulet et croûtons.", price: "8.50", category: "Entrées", image_url: "https://images.unsplash.com/photo-1580013759032-c96505e24c1f" },
        { id: 2, name: "Soupe à l'oignon", description: "Un classique français avec fromage gratiné.", price: "6.00", category: "Entrées", image_url: "https://images.unsplash.com/photo-1616501268209-edfff098fdd2" },
        { id: 3, name: "Bruschetta", description: "Pain grillé garni de tomates fraîches et basilic.", price: "5.00", category: "Entrées", image_url: "https://images.unsplash.com/photo-1506280754576-f6fa8a873550" },
        { id: 4, name: "Salade de chèvre chaud", description: "Avec miel, noix et vinaigrette balsamique.", price: "9.00", category: "Entrées", image_url: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsYWRlfGVufDB8fDB8fHww" },
        { id: 5, name: "Assiette de charcuterie", description: "Sélection de jambon, saucisson et pâté.", price: "12.00", category: "Entrées", image_url: "https://images.unsplash.com/photo-1611764197743-702a4d01463b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGxhbmNoZSUyMGRlJTIwY2hhcmN1dGVyaWV8ZW58MHx8MHx8fDA%3D" },
        { id: 6, name: "Carpaccio de bœuf", description: "Fines tranches de bœuf cru avec parmesan.", price: "10.00", category: "Entrées", image_url: "https://images.unsplash.com/photo-1727243866425-3bf2cbf7480a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FycGFjY2lvJTIwZGUlMjBib2V1ZnxlbnwwfHwwfHx8MA%3D%3D" },
        { id: 7, name: "Soupe de légumes", description: "Un mélange sain et savoureux de légumes.", price: "5.50", category: "Entrées", image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd" },
        { id: 8, name: "Tartare de saumon", description: "Saumon frais avec avocat et citron.", price: "11.50", category: "Entrées", image_url: "https://images.unsplash.com/photo-1713561058967-905087ad8e5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRhcnRhcmUlMjBkZSUyMHNhdW1vbnxlbnwwfHwwfHx8MA%3D%3D" },
        { id: 9, name: "Oeuf mayonnaise", description: "Simple et délicieux, servi avec salade.", price: "4.50", category: "Entrées", image_url: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7" },
        { id: 10, name: "Gaspacho", description: "Soupe froide espagnole aux tomates et concombres.", price: "6.50", category: "Entrées", image_url: "https://images.unsplash.com/photo-1589187154184-995b8a4e740a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhenBhY2hvfGVufDB8fDB8fHww" },
   
        // Plats
        { id: 11, name: "Filet de bœuf", description: "Servi avec une sauce au poivre.", price: "20.00", category: "Plats", image_url: "https://images.unsplash.com/photo-1625937329935-287441889bce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmlsZXQlMjBkZSUyMGJvZXVmfGVufDB8fDB8fHww"},
        { id: 12, name: "Risotto aux champignons", description: "Crémeux et savoureux.", price: "16.00", category: "Plats", image_url: "https://plus.unsplash.com/premium_photo-1695030934648-5b98c05a688d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmlzb3R0byUyMGF1eCUyMGNoYW1waWdub25zfGVufDB8fDB8fHww" },
        { id: 13, name: "Poulet rôti", description: "Servi avec pommes de terre fondantes.", price: "14.50", category: "Plats", image_url: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b" },
        { id: 14, name: "Pâtes Carbonara", description: "Un grand classique italien avec bacon.", price: "12.00", category: "Plats", image_url: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c" },
        { id: 15, name: "Côtelettes d'agneau", description: "Grillées à la perfection avec herbes.", price: "19.00", category: "Plats", image_url: "https://images.unsplash.com/photo-1659275799237-cbc057d97e7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y290ZWxldHRlcyUyMGQnJTIwYWduZWF1fGVufDB8fDB8fHww" },
        { id: 16, name: "Saumon grillé", description: "Servi avec une sauce citronnée.", price: "17.50", category: "Plats", image_url: "https://images.unsplash.com/photo-1485921325833-c519f76c4927" },
        { id: 17, name: "Hamburger maison", description: "Pain brioché, bœuf et cheddar.", price: "13.00", category: "Plats", image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
        { id: 18, name: "Curry de légumes", description: "Plat végétarien épicé et délicieux.", price: "15.00", category: "Plats", image_url: "https://images.unsplash.com/photo-1596797038530-2c107229654b" },
        { id: 19, name: "Magret de canard", description: "Avec une sauce au miel et orange.", price: "22.00", category: "Plats", image_url: "https://images.unsplash.com/photo-1582391123232-6130296f1fcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFncmFpJTIwZGUlMjBjYW5hcmR8ZW58MHx8MHx8fDA%3D" },
        { id: 20, name: "Lasagnes", description: "Servies avec une salade verte.", price: "12.50", category: "Plats", image_url: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3" },
   
        // Desserts
        { id: 21, name: "Tarte Tatin", description: "Une délicieuse tarte aux pommes renversée.", price: "7.00", category: "Desserts", image_url: "https://images.unsplash.com/photo-1722195073835-1b48530cfdbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRhcnRlJTIwdGF0aW58ZW58MHx8MHx8fDA%3D" },
        { id: 22, name: "Fondant au chocolat", description: "Un gâteau au chocolat au cœur fondant.", price: "6.50", category: "Desserts", image_url: "https://images.unsplash.com/photo-1600326145308-d7d5a04f4ce6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvbmRhbnQlMjBhdSUyMGNob2NvbGF0fGVufDB8fDB8fHww" },
        { id: 23, name: "Crème brûlée", description: "Un classique français avec caramel craquant.", price: "5.50", category: "Desserts", image_url: "https://images.unsplash.com/photo-1676300184943-09b2a08319a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNyJUMzJUE4bWUlMjBicnVsJUMzJUE5ZXxlbnwwfHwwfHx8MA%3D%3D" },
        { id: 24 ,name: "tarte citron meringuée", description: "Une tarte acidulée et sucrée.", price: "8.00", category: "Desserts", image_url: "https://images.unsplash.com/photo-1618591646018-7fa30c56fab1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGFydGUlMjBjaXRyb24lMjBtZXJpbmd1JUMzJUE5ZXxlbnwwfHwwfHx8MA%3D%3D" },
        { id: 25, name: "Mousse au chocolat", description: "Légère et chocolatée.", price: "5.00", category: "Desserts", image_url: "https://images.unsplash.com/photo-1621792907526-e69888069079?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW91c3NlJTIwYXUlMjBjaG9jb2xhdHxlbnwwfHwwfHx8MA%3D%3D" },
        { id: 26, name: "Tiramisu", description: "Un dessert italien classique.", price: "6.50", category: "Desserts", image_url: "https://images.unsplash.com/photo-1712262582493-01aa9ec5c7f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGlyYW1pc3V8ZW58MHx8MHx8fDA%3D" },
        { id: 27, name: "Macarons", description: "Assortiment de saveurs colorées.", price: "8.00", category: "Desserts", image_url: "https://images.unsplash.com/photo-1569864358642-9d1684040f43" },
        { id: 28, name: "Profiteroles", description: "Choux garnis de glace avec chocolat.", price: "7.50", category: "Desserts", image_url: "https://images.unsplash.com/photo-1606163050754-05a6a7530815?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZml0ZXJvbGVzfGVufDB8fDB8fHww" },
        { id: 29, name: "tarte aux fraise", description: "Une tarte aux fraises fraîches et crème pâtissière.", price: "9.00", category: "Desserts", image_url: "https://plus.unsplash.com/premium_photo-1716892887684-2d722f73a206?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBhcnQlMjBkZSUyMHRhcnRlJTIwYXV4JTIwZnJhaXNlc3xlbnwwfHwwfHx8MA%3D%3D" },
        { id: 30, name: "Sorbet", description: "2 boules au choix.", price: "4.50", category: "Desserts", image_url: "https://images.unsplash.com/photo-1579954115567-dff2eeb6fdeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2xhY2UlMjBzb3JiZXR8ZW58MHx8MHx8fDA%3D" },
   
        // Boissons
        { id: 31, name: "Coca-Cola", description: "Boisson rafraîchissante.", price: "3.00", category: "Boissons", image_url: "https://plus.unsplash.com/premium_photo-1725075086083-89117890371d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmVycmUlMjBkZSUyMGNvY2F8ZW58MHx8MHx8fDA%3D" },
        { id: 32, name: "spritz", description: "Cocktail italien pétillant.", price: "8.00", category: "Boissons", image_url: "https://images.unsplash.com/photo-1596977652341-2e1fe2ba5dcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmVycmUlMjBzcHJpdHp8ZW58MHx8MHx8fDA%3D" },
        { id: 33, name: "cocktail sans alcool", description: "Rafraîchissant et fruité.", price: "7.00", category: "Boissons", image_url: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29ja3RhaWx8ZW58MHx8MHx8fDA%3D" },
        { id: 34, name: "Thé glacé", description: "Infusion froide légèrement sucrée.", price: "3.50", category: "Boissons", image_url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc" },
        { id: 35, name: "Expresso", description: "Café italien intense.", price: "2.50", category: "Boissons", image_url: "https://images.unsplash.com/photo-1610632380989-680fe40816c6" },
        { id: 36, name: "Latte Macchiato", description: "Café au lait doux et crémeux.", price: "4.50", category: "Boissons", image_url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735" },
        { id: 37, name: "Jus de fruits", description: "Orange, pomme, ananas, etc.", price: "3.50", category: "Boissons", image_url: "https://images.unsplash.com/photo-1657101455328-6821c90b0ad3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8anVzJTIwZGUlMjBmcnVpdHN8ZW58MHx8MHx8fDA%3D" },
        { id: 38, name: "Mojito sans alcool", description: "Cocktail rafraîchissant à la menthe.", price: "6.00", category: "Boissons", image_url: "https://images.unsplash.com/photo-1546171753-97d7676e4602" },
        { id: 39, name: "Smoothie", description: "Fruits frais mixés.", price: "4.00", category: "Boissons", image_url: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c21vb3RoaWV8ZW58MHx8MHx8fDA%3D" },
        { id: 40, name: "Bière artisanale", description: "Blonde ou ambrée.", price: "4.50", category: "Boissons", image_url: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d" },
   
        // Vins
        { id: 41, name: "Château Margaux", description: "Grand cru classé de Bordeaux.", price: "150.00", category: "Vins", image_url: "https://plus.unsplash.com/premium_photo-1682097091093-dd18b37764a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmluJTIwcm91Z2V8ZW58MHx8MHx8fDA%3D" },
        { id: 42, name: "Champagne", description: "Bulles festives pour célébrer.", price: "60.00", category: "Vins", image_url: "https://plus.unsplash.com/premium_photo-1661344235865-7d203ccabebd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2hhbXBhZ25lfGVufDB8fDB8fHww" },
        { id: 43, name: "Chardonnay", description: "Vin blanc fruité et élégant.", price: "30.00", category: "Vins", image_url: "https://images.unsplash.com/photo-1651665849313-91055ad02729?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmluJTIwY2hhcmRvbm5heXxlbnwwfHwwfHx8MA%3D%3D" },
        { id: 44, name: "Pinot Noir", description: "Rouge léger et fruité.", price: "35.00", category: "Vins", image_url: "https://plus.unsplash.com/premium_photo-1725075086205-627ae4c7bcd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmluJTIwcm91Z2V8ZW58MHx8MHx8fDA%3D" },
        { id: 45, name: "Rosé", description: "Vin frais et délicat.", price: "25.00", category: "Vins", image_url: "https://images.unsplash.com/photo-1532313432596-0362b492b33c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHZpbiUyMHJvcyVDMyVBOXxlbnwwfHwwfHx8MA%3D%3D" },
        { id: 46, name: "Sauvignon Blanc", description: "Vin blanc sec et vif.", price: "28.00", category: "Vins", image_url: "https://images.unsplash.com/photo-1596438214057-5ff7c7fa76b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hhbXBhZ25lfGVufDB8fDB8fHww" },
        { id: 47, name: "Merlot", description: "Rouge souple et fruité.", price: "32.00", category: "Vins", image_url: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea" },
        { id: 48, name: "Châteauneuf-du-Pape", description: "Vin rouge corsé et épicé.", price: "40.00", category: "Vins", image_url: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb" },
        { id: 49, name: "Sancerre", description: "Vin blanc minéral et frais.", price: "35.00", category: "Vins", image_url: "https://images.unsplash.com/photo-1606767208159-1a5fb0a87841?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmluJTIwYmxhbmN8ZW58MHx8MHx8fDA%3D" },
        { id: 50, name: "Côtes du Rhône", description: "Vin rouge fruité et équilibré.", price: "30.00", category: "Vins", image_url: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmluJTIwY290ZSUyMGR1JTIwcmhvbmV8ZW58MHx8MHx8fDA%3D" }
    ];
   

    // Ajout des menus composés
    const setMenus = [
        {
            id: "menu1",
            name: "Menu Découverte",
            description: "Une sélection parfaite pour découvrir notre cuisine",
            price: "32.00",
            includes: {
                entree: ["Salade César", "Soupe à l'oignon", "Bruschetta"],
                plat: ["Filet de bœuf", "Risotto aux champignons", "Saumon grillé"],
                dessert: ["Crème brûlée", "Tiramisu", "Mousse au chocolat"]
            },
            image_url: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5"
        },
        {
            id: "menu2",
            name: "Menu Gastronomique",
            description: "Notre sélection gastronomique pour les fins gourmets",
            price: "45.00",
            includes: {
                entree: ["Carpaccio de bœuf", "Tartare de saumon", "Foie gras"],
                plat: ["Magret de canard", "Côtelettes d'agneau", "Risotto aux champignons"],
                dessert: ["Tarte Tatin", "Fondant au chocolat", "Profiteroles"]
            },
            image_url: "https://images.unsplash.com/photo-1592861956120-e524fc739696"
        },
        {
            id: "menu3",
            name: "Menu du Jour",
            description: "Notre formule du jour à prix doux",
            price: "25.00",
            includes: {
                entree: ["Soupe du jour", "Salade verte", "Œuf mayonnaise"],
                plat: ["Plat du jour", "Pâtes Carbonara", "Poulet rôti"],
                dessert: ["Dessert du jour", "Sorbet", "Mousse au chocolat"]
            },
            image_url: "https://images.unsplash.com/photo-1559847844-5315695dadae"
        }
    ];

    const categories = ["Entrées", "Plats", "Desserts", "Boissons", "Vins", "Menus"];


    const [selectedItem, setSelectedItem] = useState(null);

    const renderListItem = (item) => (
        <div
            key={item.id}
            className="group p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-b border-gray-100 last:border-none"
            onClick={() => setSelectedItem(item)}
        >
            <div className="flex items-start justify-between gap-6">
                {/* Nom et Description */}
                <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                    </p>
                </div>
    
                {/* Prix */}
                <div className="text-right shrink-0">
                    <p className="text-lg font-semibold text-gray-900">
                        {item.price} €
                    </p>
                </div>
            </div>
        </div>
    );
    
    

    const renderModal = (item) => (
        <div className="relative font-sans text-gray-800 min-h-screen">
      <div className="relative w-full h-screen bg-[url('/restaurant2.png')] bg-center bg-cover bg-no-repeat z-0"></div>
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedItem(null)}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col relative"
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: "calc(100vh - 40px)" }}
            >
                {/* Header avec image en arrière-plan - hauteur fixe */}
                <div className="h-64 shrink-0 relative overflow-hidden">
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${item.image_url})`,
                            filter: 'blur(2px)',
                            transform: 'scale(1.1)'
                        }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    
                    {/* Bouton de fermeture */}
                    <button
                        className="absolute top-4 right-4 p-2 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors duration-200 shadow-lg"
                        onClick={() => setSelectedItem(null)}
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
    
                    {/* Titre et prix superposés sur l'image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <h2 className="text-3xl font-bold text-white mb-2">{item.name}</h2>
                        <p className="text-xl text-white/90">{item.price} €</p>
                    </div>
                </div>
    
                {/* Contenu principal - scrollable */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-6">
                        {/* Description */}
                        <div className="border-l-4 border-gray-800 pl-4">
                            <p className="text-gray-700 text-lg italic">{item.description}</p>
                        </div>
    
                        {/* Contenu des menus */}
                        {item.includes && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {Object.entries(item.includes).map(([key, values]) => (
                                    <div 
                                        key={key}
                                        className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                                    >
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 capitalize">
                                            {key}
                                        </h3>
                                        <ul className="space-y-3">
                                            {values.map((val, index) => (
                                                <li 
                                                    key={index}
                                                    className="flex items-center text-gray-700 group"
                                                >
                                                    <span className="w-2 h-2 rounded-full bg-gray-300 mr-3 group-hover:bg-gray-800 transition-colors duration-200" />
                                                    <span className="group-hover:text-gray-900 transition-colors duration-200">
                                                        {val}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
    
                {/* Footer avec bouton - hauteur fixe */}
                <div className="p-6 bg-white border-t border-gray-100 shrink-0">
                    <button
                        onClick={() => setSelectedItem(null)}
                        className="w-full bg-gray-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm"
                    >
                        <span>Fermer le menu</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    );

    const renderCategory = (category) => (
        <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-gray-900 mr-4 rounded-full"></span>
                {category}
            </h2>
            <div className="space-y-2">
                {menuItems
                    .filter((item) => item.category === category)
                    .map(renderListItem)}
            </div>
        </div>
    );
    

    

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-fixed "
            style={{
                backgroundImage: "url(/restaurant2.png)",
            }}
        >
            {/* Overlay pour assurer la lisibilité */}
            <div className="bg-white/20 min-h-screen">
                <div className="p-6 mt-20 container mx-auto">
                    {/* En-tête décoratif */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                            Explorez nos menus
                        </h1>
                        <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
                    </div>
    
                    {/* Contenu des menus */}
                    <div className="max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-lg p-8">
                        {/* Menus composés */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center">
                                <span className="w-2 h-8 bg-gray-900 mr-4 rounded-full"></span>
                                Menus composés
                            </h2>
                            <div className="space-y-2">
                                {setMenus.map(renderListItem)}
                            </div>
                        </div>
    
                        {/* À la carte */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="w-2 h-8 bg-gray-900 mr-4 rounded-full"></span>
                                À la carte
                            </h2>
                            <div className="space-y-2">
                                {categories.map(renderCategory)}
                            </div>

                            <div className="space-y-2">
                                {menuItems.map(renderListItem)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            {/* Modal */}
            {selectedItem && renderModal(selectedItem)}
        </div>
    );
}

export default MenuDisplay;
