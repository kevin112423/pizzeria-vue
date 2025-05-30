import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
   {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/users/nueva',
    name: 'NuevoUsuario',
    component: NewUser
  },
  {
    path: '/users/editar/:id',
    name: 'EditarUsuario',
    props: true,
    component: EditarUser
  },
  {
    path: '/pizzas',
    name: 'Pizzas',
    component: Pizzas
  },
  {
    path: '/pizzas/editar/:id',
    name: 'EditarPizza',
    component: EditarPizza
  },
  {
    path: '/pizzas/nueva',
    name: 'NewPizza',
    component: NewPizza
  },
  {
    path: '/ingredients',
    name: 'Ingredients',
    component: Ingredients
  },
  {
    path: '/ingredients/nueva',
    name: 'NewIngredient',
    component: NewIngredient
  },
  {
    path: '/ingredients/editar/:id',
    name: 'EditarIngredient',
    component: EditarIngredient
  },
  {
    path: '/pizzaingredients',
    name: 'PizzaIngredients',
    component: PizzaIngredients
  },
  {
    path: '/pizzaingredients/nueva',
    name: 'NewPizzaIngredient',
    component: NewPizzaIngredient
  },
  {
    path: '/pizza-ingredients/edit/:id',
    name: 'EditarPizzaIngredient',
    component: EditarPizzaIngredient
  },
  {
    path: '/extra-ingredients',
    name: 'ExtraIngredients',
    component: ExtraIngredients
  },
  {
    path: '/extra-ingredients/new',
    name: 'NewExtraIngredient',
    component: NewExtraIngredient
  },
  {
    path: '/extra-ingredients/edit/:id',
    name: 'EditarExtraIngredient',
    component: EditarExtraIngredient
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients
  },
  {
    path: '/clients/new',
    name: 'NewClient',
    component: NewClient
  },
  {
    path: '/clients/edit/:id',
    name: 'EditClient',
    component: EditarClient
  },
  {
    path: '/employees',
    name: 'EmployeeList',
    component: Employees
  },
  {
    path: '/employees/new',
    name: 'NewEmployee',
    component: NewEmployee
  },
  {
    path: '/employees/edit/:id',
    name: 'EditEmployee',
  },
  {
    path: '/employees/edit/:id',
    name: 'EditEmployee',
    component: EditarEmployee
  },
  { 
    path: '/orders', 
    name: 'Orders', 
    component: Orders },
   { 
    path: '/orders/new', 
    name: 'NewOrder', 
    component: NewOrder },
  { 
    path: '/orders/edit/:id', 
    name: 'EditarOrder', 
    component: EditarOrder },
  { 
    path: '/pizza_sizes', 
    name: 'PizzaSize', 
    component: PizzaSize },
  { 
    path: '/pizza_sizes/new', 
    name: 'NewPizzaSize', 
    component: NewPizzaSize },
  { 
    path: '/pizza_sizes/edit/:id', 
    name: 'EditarPizzaSize', 
    component: EditarPizzaSize },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
