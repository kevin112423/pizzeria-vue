<template>
    <div class="container">
        <h1 class="text-start">Listado Clientes |
            <button @click="newClient()" class="btn btn-success mx-2">
                <font-awesome-icon icon="plus" />
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID Cliente</th>
                    <th scope="col">Usuario Asociado</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(client, index) in clients" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ client.id }}</td>
                    <td>{{ client.user_name }}</td>
                    <td>
                        <button @click="deleteClient(client.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editClient(client.id)" class="btn btn-warning mx-2">
                            <font-awesome-icon icon="pencil" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'Client',
    data() {
        return {
            clients: []
        }
    },
    methods: {
        deleteClient(id) {
            Swal.fire({
                title: `¿Quieres eliminar el cliente ${id}?`,
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/clients/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire('¡Eliminado!', '', 'success')
                                this.clients = response.data.clients
                            }
                        })
                        .catch(error => {
                            console.error("Hubo un error al eliminar el cliente:", error);
                            Swal.fire('Error', 'No se pudo eliminar el cliente.', 'error');
                        });
                }
            })
        },
        editClient(id) {
            this.$router.push({ name: 'EditClient', params: { id: `${id}` } })
        },
        newClient() {
            this.$router.push({ name: 'NewClient' });
        }
    },
    mounted() {
        axios
            .get('http://127.0.0.1:8000/api/clients')
            .then(response => (this.clients = response.data.clients))
            .catch(error => {
                console.error("Hubo un error al obtener los clientes:", error);
            });
    },
}
</script>