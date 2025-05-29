<template>
    <div class="container mt-4">
        <h2>Editar Empleado</h2>
        <form @submit.prevent="updateEmployee">
            <div v-if="apiError" class="alert alert-danger" role="alert">
                {{ apiError }}
            </div>

            <div class="mb-3">
                <label for="userId" class="form-label">Usuario</label>
                <select class="form-select" id="userId" v-model="employee.user_id" required>
                    <option value="" disabled>Selecciona un usuario</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
                </select>
                <div v-if="validationErrors.user_id" class="text-danger small">
                    {{ validationErrors.user_id[0] }}
                </div>
            </div>
            <div class="mb-3">
                <label for="position" class="form-label">Posición</label>
                <select class="form-select" id="position" v-model="employee.position" required>
                    <option value="" disabled>Selecciona una posición</option>
                    <option value="cajero">Cajero</option>
                    <option value="administrador">Administrador</option>
                    <option value="cocinero">Cocinero</option>
                    <option value="mensajero">Mensajero</option>
                </select>
                <div v-if="validationErrors.position" class="text-danger small">
                    {{ validationErrors.position[0] }}
                </div>
            </div>
            <div class="mb-3">
                <label for="identification_number" class="form-label">Número de Identificación</label>
                <input type="text" class="form-control" id="identification_number" v-model="employee.identification_number" required maxlength="20">
                <div v-if="validationErrors.identification_number" class="text-danger small">
                    {{ validationErrors.identification_number[0] }}
                </div>
            </div>
            <div class="mb-3">
                <label for="salary" class="form-label">Salario</label>
                <input type="number" step="0.01" class="form-control" id="salary" v-model="employee.salary" required>
                <div v-if="validationErrors.salary" class="text-danger small">
                    {{ validationErrors.salary[0] }}
                </div>
            </div>
            <div class="mb-3">
                <label for="hire_date" class="form-label">Fecha de Contratación</label>
                <input type="date" class="form-control" id="hire_date" v-model="formattedHireDate" required>
                <div v-if="validationErrors.hire_date" class="text-danger small">
                    {{ validationErrors.hire_date[0] }}
                </div>
            </div>

            <button type="submit" class="btn btn-primary">Actualizar Empleado</button>
            <button type="button" @click="goBack" class="btn btn-secondary ms-2">Cancelar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'EditEmployee',
    data() {
        return {
            employee: {
                user_id: '',
                position: '',
                identification_number: '',
                salary: 0.00,
                hire_date: '' 
            },
            users: [],
            apiError: null,
            validationErrors: {}
        };
    },
    computed: {
        formattedHireDate: {
            get() {
                if (this.employee.hire_date) {
                    const date = new Date(this.employee.hire_date);
                    return date.toISOString().split('T')[0];
                }
                return '';
            },
            set(value) {
                this.employee.hire_date = value;
            }
        }
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users');
                this.users = response.data.users;
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
                Swal.fire('Error', 'No se pudieron cargar los usuarios para la edición.', 'error');
            }
        },
        async fetchEmployee() {
            try {
                const employeeId = this.$route.params.id;
                const response = await axios.get(`http://127.0.0.1:8000/api/employees/${employeeId}`);
                this.employee = response.data.employee;
                if (this.employee.hire_date) {
                    this.employee.hire_date = new Date(this.employee.hire_date).toISOString().split('T')[0];
                }
            } catch (error) {
                console.error("Error al obtener datos del empleado:", error);
                this.apiError = 'No se pudo cargar la información del empleado para editar.';
                Swal.fire('Error', this.apiError, 'error');
                this.$router.push({ name: 'EmployeeList' });
            }
        },
        async updateEmployee() {
            this.apiError = null;
            this.validationErrors = {};

            try {
                const employeeId = this.$route.params.id;
                const response = await axios.put(`http://127.0.0.1:8000/api/employees/${employeeId}`, this.employee);
                if (response.data.employee) {
                    Swal.fire('¡Actualizado!', 'El empleado ha sido actualizado exitosamente.', 'success');
                    this.$router.push({ name: 'EmployeeList' });
                }
            } catch (error) {
                console.error("Error al actualizar el empleado:", error);
                if (error.response) {
                    if (error.response.status === 422) {
                        this.validationErrors = error.response.data.errors;
                        this.apiError = 'Por favor, corrige los errores en el formulario.';
                    } else if (error.response.status === 404) {
                        this.apiError = 'El empleado no fue encontrado.';
                    }
                    else if (error.response.status === 500) {
                        this.apiError = error.response.data.message || 'Error interno del servidor. Por favor, revisa los logs del backend.';
                    } else {
                        this.apiError = error.response.data.message || 'Ocurrió un error inesperado al actualizar el empleado.';
                    }
                } else if (error.request) {
                    this.apiError = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet o el estado del servidor.';
                } else {
                    this.apiError = 'Ocurrió un error al configurar la solicitud. Por favor, intenta de nuevo.';
                }
                Swal.fire('Error', this.apiError, 'error');
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    },
    async mounted() {
        await this.fetchUsers();
        await this.fetchEmployee();
    }
};
</script>