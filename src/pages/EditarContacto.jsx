import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../index.css"; 

export const EditarContacto = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams();  
    const contactId = parseInt(id, 10);

    if (isNaN(contactId)) {
        console.error("❌ ID inválido después de limpiar:", id);
        return <p>Error: ID de contacto inválido</p>;
    }

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    const [contactName, setContactName] = useState("");

    const getContactoSeleccionado = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/Enrique");
            if (!response.ok) throw new Error("Error al obtener los contactos");

            const data = await response.json();
            const contacto = data.contacts.find(c => c.id === contactId);

            if (contacto) {
                setFormData(contacto);
                setContactName(contacto.name);
            } else {
                console.error("❌ No se encontró el contacto con ID:", contactId);
            }
        } catch (error) {
            console.error("Error al obtener contactos:", error);
        }
    };

    useEffect(() => {
        const contacto = store.contacts.find(c => c.id === contactId);
        if (contacto) {
            setFormData(contacto);
            setContactName(contacto.name);
        } else {
            getContactoSeleccionado();
        }
    }, [contactId, store.contacts]); 

    function handleChange(e) {
        setFormData({
            ...formData,  
            [e.target.name]: e.target.value, 
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.address.trim()) return;

        dispatch({ type: "edit_contact", payload: formData });
        await editContact(contactId, formData);
        navigate("/");
    }

    async function editContact(id, formData) {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/Enrique/contacts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Error al editar el contacto");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container">
             <h2>Editar contacto de: <span className="contact-name">{contactName || "..."}</span></h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre..." value={formData.name} onChange={handleChange} />
                <input type="text" name="phone" placeholder="Teléfono..." value={formData.phone} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email..." value={formData.email} onChange={handleChange} />
                <input type="text" name="address" placeholder="Dirección..." value={formData.address} onChange={handleChange} />
                <button type="submit" className="edit-btn">Editar Contacto</button>
            </form>
        </div>
    );
};