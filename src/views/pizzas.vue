<template>
    <div class="container">
        <h1 class="text-start">Listado Pizzas |
            <button @click="newPizza()" class="btn btn-success mx-2">
                <font-awesome-icon icon="plus" />
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(pizza, index) in pizzas" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ pizza.id }}</td>
                    <td>{{ pizza.name }}</td>
                    <td>
                        <button @click="deletePizza(pizza.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editPizza(pizza.id)" class="btn btn-warning mx-2">
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
    name: 'Pizza',
    data() {
        return {
            pizzas: []
        }
    },
    methods: {
        deletePizza(id) {
            Swal.fire({
                title: `Do you want to delete the Pizza with id ${id}?`,
                showCancelButton: true,
                confirmButtonText: 'Delete',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/pizzas/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire('Deleted!!', '', 'success')
                                this.pizzas = response.data.pizzas
                            }
                        })
                }
            })
        },
        editPizza(id) {
            this.$router.push({ name: 'EditarPizza', params: { id: `${id}` } })
        },
        newPizza() {
            this.$router.push({ name: 'NewPizza' });
        }
    },
    mounted() {
        axios
            .get('http://127.0.0.1:8000/api/pizzas')
            .then(response => (this.pizzas = response.data.pizzas))
    },
}
</script>