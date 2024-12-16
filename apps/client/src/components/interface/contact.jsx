import React, { useState } from "react";

export function Contact() {
    // État pour les champs du formulaire
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    // Gestion de l'envoi du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        // Vous pouvez ici envoyer les données à un serveur
        // Par exemple, un appel API pour envoyer le formulaire

        // Simuler un succès pour le moment
        setSuccess(true);

        // Réinitialiser les champs
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <h1>Contactez-nous</h1>

           <p> au : 04 78 49 02 39</p>

           <p>ou par message</p>
            
            {success && <p style={{ color: "green" }}>Merci pour votre message. Nous reviendrons vers vous sous peu !</p>}

            <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "15px" }}>
                <label htmlFor="name">Nom :</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                />

                <label htmlFor="email">Email :</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                />

                <label htmlFor="message">Message :</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows="5"
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                />

                <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    Envoyer
                </button>
            </form>
        </div>
    );
}
