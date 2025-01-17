import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import Header from './UserHeader';
import UserTable from './UsersTable';
import UserModal from './UserModal';
import {
    useCreateUserService,
    useGetAllUsersService,
    useUpdateUserService,
    useDeleteUserService,
} from '../../../hooks/services/system/users_services';

const Users = () => {
    const dispatch = useDispatch();

    const [addUserModal, setAddUserModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [editingUser, setEditingUser] = useState(null);

    const { content: fetchUsers, loading: loadingUsers } = useGetAllUsersService();
    const { content: createUser } = useCreateUserService();
    const { content: updateUser } = useUpdateUserService();
    const { content: deleteUser } = useDeleteUserService();

    useEffect(() => {
        dispatch(setPageTitle('Usuarios'));
        loadUsers();
    }, [dispatch]);

    const loadUsers = useCallback(async () => {
        try {
            const response = await fetchUsers();
            if (response.success && Array.isArray(response.result)) {
                setUsers(response.result);
            } else {
                console.error('Error al cargar usuarios:', response.message || 'Datos inválidos');
            }
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    }, [fetchUsers]);


    const filteredUsers = useMemo(() => {
        return users
            .filter((user) => user && user.username && user.email) // Verifica que las propiedades existan
            .filter((user) =>
                `${user.username} ${user.email}`.toLowerCase().includes(search.toLowerCase())
            );
    }, [users, search]);


    const saveUser = async (values, { resetForm }) => {
        try {
            const payload = {
                ...values,
                roles: values.roles.map((role) => role.value), // Extrae solo los IDs de los roles
            };

            if (editingUser) {
                await updateUser(editingUser.id, payload);
                setUsers((prev) =>
                    prev.map((user) =>
                        user.id === editingUser.id ? { ...user, ...values } : user
                    )
                );
            } else {
                const newUserResponse = await createUser(payload);
                if (newUserResponse.success && newUserResponse.result) {
                    setUsers((prev) => [newUserResponse.result, ...prev]);
                } else {
                    console.error('Error al crear usuario:', newUserResponse.message);
                }
            }
            resetForm();
            setAddUserModal(false);
        } catch (error) {
            console.error('Error al guardar usuario:', error);
        }
    };



    const editUser = (user) => {
        setEditingUser(user);
        setAddUserModal(true);
    };

    const removeUser = async (user) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar al usuario ${user.username}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await deleteUser(user.id);
                setUsers((prev) => prev.filter((u) => u.id !== user.id));
            } catch (error) {
                console.error('Error al eliminar usuario:', error);
            }
        }
    };

    return (
        <div>
            <Header search={search} setSearch={setSearch} onAddUser={() => setAddUserModal(true)} />
            <UserTable users={filteredUsers} onEdit={editUser} onDelete={removeUser} />
            <UserModal
                isOpen={addUserModal}
                onClose={() => setAddUserModal(false)}
                onSave={saveUser}
                user={editingUser}
            />
        </div>
    );
};

export default Users;
