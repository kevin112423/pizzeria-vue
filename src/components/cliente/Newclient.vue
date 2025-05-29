<template>
    <div class="container mt-4">
        <h2>Crear Nuevo Cliente</h2>
        <form @submit.prevent="saveClient">
            <div class="mb-3">
                <label for="userId" class="form-label">Usuario</label>
                <select class="form-select" id="userId" v-model="client.user_id" required>
                    <option value="" disabled>Selecciona un usuario</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Guardar Cliente</button>
            <button type="button" @click="goBack" class="btn btn-secondary ms-2">Cancelar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'Clients',
    data() {
        return {
            client: {
                user_id: ''
            },
            users: [] 
        };
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users'); 
                this.users = response.data.users;
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
                Swal.fire('Error', 'No se pudieron cargar los usuarios.', 'error');
            }
        },
        async saveClient() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/clients', this.client);
                if (response.data.client) {
                    Swal.fire('¡Guardado!', 'El cliente ha sido creado exitosamente.', 'success');
                    this.$router.push({ name: 'Clients' }); 
                }
            } catch (error) {
                console.error("Error al guardar el cliente:", error);
                Swal.fire('Error', 'No se pudo crear el cliente.', 'error');
            }
        },
        goBack() {
            this.$router.go(-1); 
        }
    },
    mounted() {
        this.fetchUsers(); 
    }
};
</script>