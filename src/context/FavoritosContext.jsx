import { createContext, useState, useEffect } from "react";

export const FavoritContext = createContext();

export function FavoritosProvider({ children }){
    const [favoritos, setFavoritos] = useState(() => {
        try {
            const raw = localStorage.getItem("favoritos_v1");
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("favoritos_v1", JSON.stringify(favoritos));
        } catch (e) {}
    }, [favoritos]);

    const agregarFavorito = (producto) => {
        setFavoritos(prev => {
            if (prev.find(p => p.id === producto.id)) return prev;
            return [...prev, producto];
        });
    };

    const quitarFavorito = (id) => {
        setFavoritos(prev => prev.filter(p => p.id !== id));
    };

    return (
        <FavoritContext.Provider value={{ favoritos, agregarFavorito, quitarFavorito }}>
            {children}
        </FavoritContext.Provider>
    );
}

export default FavoritContext;
