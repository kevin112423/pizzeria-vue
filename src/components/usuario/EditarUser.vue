<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Usuario</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Datos del Usuario
            </div>
            <div class="card-body">
                <form @submit.prevent="updateUser">
                    <div class="row mb-3">
                        <label for="id" class="form-label">ID:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="hashtag" /></div>
                            <input type="text" class="form-control" id="id" v-model="user.id" disabled>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="name" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="user" /></div>
                            <input type="text" class="form-control" id="name" placeholder="Nombre completo"
                                v-model="user.name" required>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="email" class="form-label">Email:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="envelope" /></div>
                            <input type="email" class="form-control" id="email" placeholder="Correo electrónico"
                                v-model="user.email" required>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="password" class="form-label">Contraseña (dejar en blanco para no cambiar):</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="lock" /></div>
                            <input type="password" class="form-control" id="password" placeholder="Nueva contraseña (opcional)"
                                v-model="user.password">
                        </div>
                    </div>

                    <button class="btn btn-primary" type="submit">Actualizar Usuario</button>
                    <button class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'EditarUser', // Cambiado a EditarUser para que coincida con el nombre del archivo y las prácticas comunes
    props: ['id'], 
    data() {
        return {
            user: {
                id: '',
                name: '',
                email: '',
                password: '' 
            }
        };
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'users' });
        },
        async getUser() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/users/${this.id}`);
                this.user = response.data.user;
                this.user.password = ''; 
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
                let errorMessage = 'No se pudo cargar la información del usuario.';
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                });
                this.$router.push({ name: 'users' }); 
            }
        },
        async updateUser() {
            try {
                const dataToUpdate = {
                    name: this.user.name,
                    email: this.user.email,
                };
                if (this.user.password) {
                    dataToUpdate.password = this.user.password;
                }

                const res = await axios.put(`http://127.0.0.1:8000/api/users/${this.id}`, dataToUpdate);

                if (res.status === 200) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario actualizado exitosamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.$router.push({ name: 'users' });
                }
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                let errorMessage = 'Hubo un error al actualizar el usuario.';
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                });
            }
        }
    },
    mounted() {
        this.getUser();
    }
};
</script>