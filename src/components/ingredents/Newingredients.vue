<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">New</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Ingredient
            </div>
            <div class="card-body">
                <form @submit.prevent="saveIngredient">
                    <div class="row mb-3">
                        <label for="name" class="form-label">Nombre :</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="flask" /></div>
                            <input type="text" class="form-control" id="name" placeholder="Nombre ingrediente"
                                v-model="ingredient.name">
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Save</button>
                    <button class="btn btn-secondary mx-2" @click="cancel">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'NewIngredient',
    data() {
        return {
            ingredient: {
                name: ''
            }
        }
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'Ingredients' })
        },
        async saveIngredient() {
            const res = await axios.post('http://127.0.0.1:8000/api/ingredients', this.ingredient)
            if (res.status === 200) {
                this.$router.push({ name: 'Ingredients' })
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Ingredient has been saved',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    }
}
</script>