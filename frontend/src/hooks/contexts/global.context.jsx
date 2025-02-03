import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDetailsUserService } from '../services/system/auth.service';

// Crear el contexto
const GlobalContext = createContext(null);

// Proveedor del contexto
export const GlobalProvider = ({ children }) => {
    const [globalVariables, setGlobalVariables] = useState({
        id: null,
        username: null,
        email: null,
        phone: null,
        name: null,
        lastname: null,
        company: null,
        firstLogin: null,
        createdAt: null,
        isActive: null,
        roles: [],
    });

    const [loading, setLoading] = useState(true); // Estado para saber si está cargando
    const [error, setError] = useState(null); // Estado para manejar errores
    const { content } = useDetailsUserService(); // Servicio para obtener detalles del usuario

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no encontrado en localStorage');
                }

                const response = await content(); // Realiza la llamada a la API
                if (response.success && response.result) {
                    setGlobalVariables({
                        id: response.result.id,
                        username: response.result.username,
                        email: response.result.email,
                        phone: response.result.phone,
                        name: response.result.name,
                        lastname: response.result.lastname,
                        company: response.result.company,
                        firstLogin: response.result.firstLogin,
                        createdAt: response.result.createdAt,
                        isActive: response.result.isActive,
                        roles: response.result.roles || [],
                    });
                } else {
                    throw new Error(response.message || 'Error al obtener los detalles del usuario');
                }
            } catch (err) {
                console.error('Error fetching user details:', err);
                setError(err.message);
                setGlobalVariables({
                    id: null,
                    username: null,
                    email: null,
                    phone: null,
                    name: null,
                    lastname: null,
                    company: null,
                    firstLogin: null,
                    createdAt: null,
                    isActive: null,
                    roles: [],
                });
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        fetchConfig();
    }, [content]);

    return (
        <GlobalContext.Provider value={{ globalVariables, setGlobalVariables, loading, error }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useGlobalContext = () => useContext(GlobalContext);
