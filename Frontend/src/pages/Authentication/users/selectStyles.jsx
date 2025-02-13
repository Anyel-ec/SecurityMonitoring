// Estilos para Modo Claro
export const lightModeStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: state.isDisabled ? '#E7E8EE' : '#F7F9FC',
        color: state.isDisabled ? '#fff' : '#333',
        borderColor: '#D1D5DB',
        padding: '0rem 0.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontSize: '0.875rem', // Mantener consistencia con el tamaño de la fuente
        cursor: state.isDisabled ? 'not-allowed' : 'default',
        pointerEvents: 'auto',
        '&:hover': {
            borderColor: '#A0AEC0',
        },
        '&:focus-within': {
            outline: 'none',
            borderColor: '#3182CE',
            boxShadow: '0 0 0 2px rgba(49, 130, 206, 0.5)',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#3182CE' : '#F7F9FC',
        color: state.isSelected ? '#fff' : '#2D3748',
        padding: '0 0.5em',
        fontSize: '0.875rem',
        '&:hover': {
            backgroundColor: '#63B3ED',
            color: '#fff',
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#2D3748',
        fontSize: '0.875rem',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#F7F9FC',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderColor: '#E2E8F0',
        padding: '0',
        marginTop: '1px',
        marginBottom: '0',
        overflow: 'hidden',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#A0AEC0',
        fontSize: '0.875rem',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#718096',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '0',
    }),
    input: (provided) => ({
        ...provided,
        color: '#A0AEC0',
        fontSize: '0.875rem',  // Tamaño de fuente consistente
    }),
};

// Estilos para Modo Oscuro
export const darkModeStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: state.isDisabled ? '#20273C' : '#121E32',
        color: state.isDisabled ? '#999999' : '#798099',
        borderColor: '#17263C',
        padding: '0rem 0.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontSize: '0.875rem',  // Tamaño de fuente consistente
        cursor: state.isDisabled ? 'not-allowed' : 'default',
        pointerEvents: 'auto',
        '&:focus-within': {
            outline: 'none',
            borderColor: '#243778',
            boxShadow: '0 0 0 2px rgba(18, 30, 50, 0.5)',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#1967D2' : '#121E32',
        color: state.isSelected ? '#fff' : '#888E8D',
        padding: '0 0.5em',
        fontSize: '0.875rem',
        '&:hover': {
            backgroundColor: '#1967D2',
            color: '#fff',
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#888E8D',
        fontSize: '0.875rem',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#121E32',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderColor: '#fff',
        padding: '0',
        marginTop: '1px',
        marginBottom: '0',
        overflow: 'hidden',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#646B7A',
        fontSize: '0.875rem',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#5F6675',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '0',
    }),
    input: (provided) => ({
        ...provided,
        color: '#A0AEC0',
        fontSize: '0.875rem',  // Tamaño de fuente consistente
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#243b55',  // Fondo del elemento seleccionado
        color: '#ffffff',  // Color del texto
        borderRadius: '0.25rem', // Opcional: bordes redondeados
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: '#ffffff',  // Color del texto en el elemento seleccionado
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        color: '#ffffff',
        ':hover': {
            backgroundColor: '#1967D2', // Fondo al pasar el cursor
            color: '#ffffff',
        },
    }),
};

// Función para manejar los modos (claro/oscuro)
export const HandleMode = (isDarkMode) => {
    return isDarkMode ? darkModeStyles : lightModeStyles;
};
