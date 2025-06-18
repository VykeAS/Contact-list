import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AñadirContacto = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    function handleChange(e) {
        setFormData({
            ...formData,  
            [e.target.name]: e.target.value, 
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.address.trim()) return;

        dispatch({
            type: "add_contact",  
            payload: formData,
        });
    
        await pushContactos(formData); 

        
        setFormData({
            name: "",
            phone: "",
            email: "",
            address: ""
        });

        navigate("/");
    }

    async function pushContactos(formData) {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/Enrique/contacts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Error al añadir el contacto");

        } catch (err) {
            console.log(err);
        }
    }


    
    return (
        <>
            <div className="container">
                <h2>Añadir contacto:</h2>
                <form className="form-container" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre..."
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Teléfono..."
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email..."
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Dirección..."
                        value={formData.address}
                        onChange={handleChange}
                    />
                </form>
            </div>
    
           
            <div className="button-container">
                <button type="submit" onClick={handleSubmit}>Añadir contacto</button>
            </div>
        </>
    );    
}    