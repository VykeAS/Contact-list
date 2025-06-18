export const initialStore = () => {
    return {
      contacts: [
            {
            name: "",
            phone: "",
            email: "",
            address: "",
            id: 0
            }
        ]
    }
  }
  
  export default function storeReducer(store, action = {}) {
    switch (action.type) {
  
  
      case 'set_contacts':
        return {
          ...store, contacts: action.payload
        };
  
      case 'add_contact':
  
        return {
          ...store, contacts: [...store.contacts, action.payload]
        };
  
      case 'edit_contact':
  
        return {
          ...store,
          contacts: store.contacts.map(contact =>
            contact.id === action.payload.id ? action.payload : contact
          )
        };
  
      case 'delete_contact':
  
        return {
          ...store,
          contacts: store.contacts.filter(contact => contact.id !== action.payload)
        };
  
      default:
        console.error("❌ Acción desconocida:", action.type); 
        throw Error('Unknown action.');

    };
  };