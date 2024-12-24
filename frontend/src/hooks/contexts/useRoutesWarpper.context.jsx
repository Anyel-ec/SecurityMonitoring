import React, { createContext, useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { checkInstallationStatusService } from '../services/installationService';

// Crea el contexto
const InstallationContext = createContext();

// Proveedor del contexto
export const InstallationProvider = ({ children }) => {
    const [isInstalled, setIsInstalled] = useState(null); // Estado inicial: desconocido

    useEffect(() => {
        const checkInstallationStatus = async () => {
            try {
                Swal.fire({
                    title: 'Cargando...',
                    text: 'Por favor, espera mientras verificamos el estado de la instalación',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });

                const data = await checkInstallationStatusService();
                setIsInstalled(data.result);
                Swal.close();
            } catch (error) {
                console.error('Error al verificar el estado de instalación:', error);
                Swal.close();
                Swal.fire('Error', 'Hubo un problema al verificar el estado de instalación.', 'error');
            }
        };

        checkInstallationStatus();
    }, []);

    // Si el estado aún no se ha determinado, muestra un "loading" o nada
    if (isInstalled === null) {
        return null; // Oculta la interfaz hasta que se resuelva el estado
    }

    return (
        <InstallationContext.Provider value={isInstalled}>
            {children}
        </InstallationContext.Provider>
    );
};

// Hook para usar el contexto
export const useInstallation = () => {
    return useContext(InstallationContext);
};
