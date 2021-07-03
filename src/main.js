import { createApp } from 'vue'
import './assets/tailwind.css'
import Chart from './components/Chart.vue'
import App from './App.vue'

const app = createApp(App)

app.component('Chart', Chart)
app.mount('#app')
