<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nuevo Usuario</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Datos del Usuario
            </div>
            <div class="card-body">
                <form @submit.prevent="saveUser">
                    <div class="row mb-3">
                        <label for="name" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="user" />
                            </div>
                            <input type="text" class="form-control" id="name" placeholder="Nombre completo"
                                v-model="user.name" required>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="email" class="form-label">Email:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="envelope" />
                            </div>
                            <input type="email" class="form-control" id="email" placeholder="Correo electrónico"
                                v-model="user.email" required>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="password" class="form-label">Contraseña:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="lock" />
                            </div>
                            <input type="password" class="form-control" id="password" placeholder="Contraseña"
                                v-model="user.password" required>
                        </div>
                    </div>

                    <button class="btn btn-primary" type="submit">Guardar Usuario</button>
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
    name: 'NewUser', 
    data() {
        return {
            user: {
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
        async saveUser() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/users', this.user);

                if (res.status === 201) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario guardado exitosamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.$router.push({ name: 'users' });
                }
            } catch (error) {
                console.error('Error al guardar el usuario:', error);

                let errorMessage = 'Hubo un error al guardar el usuario.';
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
    }
};
</script>