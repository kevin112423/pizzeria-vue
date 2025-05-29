<template>
    <div class="container">
        <h1 class="text-start">
            Listado Usuarios |
            <button @click="newUser()" class="btn btn-success mx-2">
                <font-awesome-icon icon="plus" />
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Email</th>
                    <th scope="col">Empleado</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.employee_relation_id ? 'Sí' : 'No' }}</td>
                    <td>{{ user.client_relation_id ? 'Sí' : 'No' }}</td>
                    <td>
                        <button @click="deleteUser(user.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editUser(user.id)" class="btn btn-warning mx-2">
                            <font-awesome-icon icon="pencil" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'User',
    data() {
        return {
            users: []
        };
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users');
                this.users = response.data.users;
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
                Swal.fire('Error', 'No se pudieron cargar los usuarios.', 'error');
            }
        },
        async deleteUser(id) {
            const result = await Swal.fire({
                title: `¿Deseas eliminar el usuario con ID ${id}?`,
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
                icon: 'warning'
            });

            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);
                    if (response.data.success) {
                        Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
                        this.users = response.data.users; 
                    } else {
                        Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
                    }
                } catch (error) {
                    console.error('Error al eliminar el usuario:', error);
                    Swal.fire('Error', 'Hubo un problema al eliminar el usuario.', 'error');
                }
            }
        },
        editUser(id) {
            this.$router.push({ name: 'EditarUsuario', params: { id } });
        },
        newUser() {
            this.$router.push({ name: 'NuevoUsuario' });
        }
    },
    mounted() {
        this.fetchUsers();
    }
};
</script>