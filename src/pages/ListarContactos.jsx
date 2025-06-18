import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../index.css"; 

export const ListarContactos = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const getContactos = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/Enrique");

            if (!response.ok) throw new Error("Error al traer los datos de la API!");

            const data = await response.json();
            console.log("Contactos obtenidos:", data.contacts);

            dispatch({
                type: "set_contacts",
                payload: Array.isArray(data.contacts) ? data.contacts : []
            });

        } catch (error) {
            console.error("Error al obtener contactos:", error);
        }
    };

    useEffect(() => {
        getContactos();
    }, []);

    async function eliminarContacto(id) {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/Enrique/contacts/${id}`, {
                method: "DELETE",
            });
    
            if (!response.ok) {
                throw new Error("Error al eliminar el contacto");
            }
    
           
            dispatch({
                type: "delete_contact",
                payload: id
            });

            getContactos(); 
    
        } catch (err) {
            console.error("Error al eliminar contacto:", err);
        }
    }
    

    return (
        <div className="container">
            <h2>Lista de Contactos</h2>
    
            <ul className="task-list">
                {store.contacts.length === 0 ? (
                    <p className="no-contacts">No hay contactos disponibles</p> 
                ) : (
                    store.contacts.map((contacto) => (
                        <li key={contacto.id+1} className="contact-item">
                            <h3>{contacto.name}</h3>
                            <p>Teléfono: {contacto.phone}</p>
                            <p>Email: {contacto.email}</p>
                            <p>Dirección: {contacto.address}</p>
                            <button onClick={() => navigate(`/editar/${contacto.id}`)}>Editar contacto</button>
                            <button className="delete-btn" onClick={() => eliminarContacto(contacto.id)}>Eliminar contacto</button>
                        </li>
                    ))
                )}
            </ul>

            <div className="button-container">
                <button onClick={() => navigate(`/anadircontacto`)}>Añadir contacto</button>
            </div>
        </div>
    );
};