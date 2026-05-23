import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import productos from "../data/products";

function Productos () {
    const { usuario } = useContext(AuthContext);

    const rol = usuario?.rol || "Usuario";

    // Algoritmo simple: mostrar productos que incluyan el rol del usuario
    const recomendados = productos.filter(p => p.roles.includes(rol));

    return(
        <div>
            <h1>🛍️ Productos recomendados para {usuario?.nombre || 'invitado'}</h1>
            <p>Rol: {rol}</p>

            <ul>
                {recomendados.map(p => (
                    <li key={p.id}>{p.nombre} — <em>{p.categoria}</em></li>
                ))}
            </ul>

            {recomendados.length === 0 && (
                <p>No hay productos específicos para tu cuenta. Aquí algunos generales:</p>
            )}

            {recomendados.length === 0 && (
                <ul>
                    {productos.slice(0,4).map(p => (
                        <li key={p.id}>{p.nombre} — <em>{p.categoria}</em></li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Productos;