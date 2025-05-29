<template>
    <div class="container mt-4">
        <h2>Editar Cliente</h2>
        <form @submit.prevent="updateClient">
            <div class="mb-3">
                <label for="userId" class="form-label">Usuario</label>
                <select class="form-select" id="userId" v-model="client.user_id" required>
                    <option value="" disabled>Selecciona un usuario</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Actualizar Cliente</button>
            <button type="button" @click="goBack" class="btn btn-secondary ms-2">Cancelar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'EditClient',
    data() {
        return {
            client: {
                id: null, 
                user_id: ''
            },
            users: []
        };
    },
    methods: {
        async fetchClient() {
            try {
                const clientId = this.$route.params.id;
                const response = await axios.get(`http://127.0.0.1:8000/api/clients/${clientId}`);
                if (response.data.client) {
                    this.client.id = response.data.client.id;
                    this.client.user_id = response.data.client.user_id;
                } else {
                    Swal.fire('Error', 'Cliente no encontrado.', 'error');
                    this.$router.push({ name: 'Clients' });
                }
            } catch (error) {
                console.error("Error al obtener el cliente:", error);
                Swal.fire('Error', 'No se pudo cargar la información del cliente.', 'error');
            }
        },
        async fetchUsers() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users'); 
                this.users = response.data.users;
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
                Swal.fire('Error', 'No se pudieron cargar los usuarios.', 'error');
            }
        },
        async updateClient() {
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/clients/${this.client.id}`, this.client);
                if (response.data.client) {
                    Swal.fire('¡Actualizado!', 'El cliente ha sido actualizado exitosamente.', 'success');
                    this.$router.push({ name: 'Clients' }); 
                }
            } catch (error) {
                console.error("Error al actualizar el cliente:", error);
                Swal.fire('Error', 'No se pudo actualizar el cliente.', 'error');
            }
        },
        goBack() {
            this.$router.go(-1); 
        }
    },
    async mounted() {
        await this.fetchUsers(); 
        await this.fetchClient(); 
    }
};
</script>