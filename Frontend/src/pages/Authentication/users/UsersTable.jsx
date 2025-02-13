import React, { useState } from 'react';
import Pagination from './UserPagination';

const UsersTable = ({ users, onEdit, onDelete }) => {
    const [expandedRow, setExpandedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const itemsPerPage = 10; // Usuarios por página

    const totalPages = Math.ceil(users.length / itemsPerPage); // Número total de páginas

    // Obtener usuarios para la página actual
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handleRowClick = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    // Funciones para cambiar de página
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Usuario</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Compañía</th>
                            <th>Roles</th>
                            <th className="!text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user) => (
                                <React.Fragment key={user.id}>
                                    <tr>
                                        <td onClick={() => handleRowClick(user.id)} style={{ cursor: 'pointer' }}>
                                            <p className="text-xl">{expandedRow === user.id ? '-' : '+'}</p>
                                        </td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.name}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.company}</td>
                                        <td>
                                            {user.roles.map((role) => role.name).join(', ') || 'Sin roles asignados'}
                                        </td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <button type="button" className="btn btn-sm btn-dark" onClick={() => onEdit(user)}>
                                                    Editar
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(user)}>
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {expandedRow === user.id && (
                                        <tr className="expanded-row">
                                            <td colSpan="9">
                                                <div className="p-3 flex gap-5">
                                                    <strong>Creado en:</strong> {user.createdAt || 'No disponible'}
                                                    <strong>Activo:</strong> {user.isActive ? 'Sí' : 'No'}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center p-4">
                                    No hay usuarios disponibles.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default UsersTable;
