<template>
    <div class="container">
        <h1 class="text-start">Listado Empleados |
            <button @click="newEmployee()" class="btn btn-success mx-2">
                <font-awesome-icon icon="plus" />
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID Empleado</th>
                    <th scope="col">ID Usuario</th>
                    <th scope="col">Posición</th>
                    <th scope="col">Identificación</th>
                    <th scope="col">Salario</th>
                    <th scope="col">Fecha Contratación</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(employee, index) in employees" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ employee.id }}</td>
                    <td>{{ employee.user_id }}</td>
                    <td>{{ employee.position }}</td>
                    <td>{{ employee.identification_number }}</td>
                    <td>{{ employee.salary }}</td>
                    <td>{{ employee.hire_date }}</td>
                    <td>
                        <button @click="deleteEmployee(employee.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editEmployee(employee.id)" class="btn btn-warning mx-2">
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
    name: 'Employees',
    data() {
        return {
            employees: []
        }
    },
    methods: {
        deleteEmployee(id) {
            Swal.fire({
                title: `¿Quieres eliminar el empleado  ${id}?`,
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/employees/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire('¡Eliminado!', '', 'success')
                                this.employees = response.data.employees
                            }
                        })
                        .catch(error => {
                            console.error("Hubo un error al eliminar el empleado:", error);
                            Swal.fire('Error', 'No se pudo eliminar el empleado.', 'error');
                        });
                }
            })
        },
        editEmployee(id) {
            this.$router.push({ name: 'EditEmployee', params: { id: `${id}` } })
        },
        newEmployee() {
            this.$router.push({ name: 'NewEmployee' });
        }
    },
    mounted() {
        axios
            .get('http://127.0.0.1:8000/api/employees')
            .then(response => (this.employees = response.data.employees))
            .catch(error => {
                console.error("Hubo un error al obtener los empleados:", error);
            });
    },
}
</script>