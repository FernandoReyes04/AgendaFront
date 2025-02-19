<template>
  <div class="home-container" @click="cerrarTodo">
    <Header />
    <div class="button-group">
      <button @click="toggleFormulario">Agregar Contacto +</button>
      <button @click="toggleCalendarioRecordatorio">Añadir Recordatorio +</button>
      <button @click="toggleFormularioEvento">Añadir Evento +</button> <--- Nuevo botón
      <button @click="toggleContactos">Mis Contactos</button> <--- Nuevo botón
      <button>Mis Recordatorios</button>
      <button @click="toggleEventos">Mis Eventos</button> <--- Nuevo botón
    </div>

    <FormularioContacto v-if="mostrarFormulario" />

    <div v-if="mostrarCalendario || mostrarCalendarioRecordatorio">
      <div class="calendar-container">
        <v-calendar is-expanded :events="eventos" />
      </div>
    </div>

    <Contactos v-if="mostrarContactos" />
    <FormularioEventoComponente v-if="mostrarFormularioEvento" /> <--- Nuevo componente
    <Eventos v-if="mostrarEventos" />
  </div>
</template>

<script>
import Header from './Header.vue';
import FormularioContacto from './FormularioContacto.vue';
import Contactos from './Contactos.vue';
import Eventos from './Eventos.vue';
import FormularioEventoComponente from './FormularioEventoComponente.vue'; // Importa el nuevo componente

export default {
  components: {
    Header,
    FormularioContacto,
    Contactos,
    Eventos,
    FormularioEventoComponente // Registra el nuevo componente
  },
  data() {
    return {
      mostrarFormulario: false,
      mostrarCalendario: false,
      mostrarCalendarioRecordatorio: false,
      mostrarContactos: false,
      mostrarEventos: false,
      mostrarFormularioEvento: false // Nueva propiedad
    };
  },
  methods: {
    toggleFormulario() {
      this.mostrarFormulario = !this.mostrarFormulario;
      this.mostrarCalendario = false;
      this.mostrarCalendarioRecordatorio = false;
      this.mostrarContactos = false;
      this.mostrarEventos = false;
      this.mostrarFormularioEvento = false;
    },
    toggleCalendario() {
      this.mostrarCalendario = !this.mostrarCalendario;
      this.mostrarFormulario = false;
      this.mostrarCalendarioRecordatorio = false;
      this.mostrarContactos = false;
      this.mostrarEventos = false;
      this.mostrarFormularioEvento = false;
    },
    toggleCalendarioRecordatorio() {
      this.mostrarCalendarioRecordatorio = !this.mostrarCalendarioRecordatorio;
      this.mostrarFormulario = false;
      this.mostrarCalendario = false;
      this.mostrarContactos = false;
      this.mostrarEventos = false;
      this.mostrarFormularioEvento = false;
    },
    toggleContactos() {
      this.mostrarContactos = !this.mostrarContactos;
      this.mostrarFormulario = false;
      this.mostrarCalendario = false;
      this.mostrarCalendarioRecordatorio = false;
      this.mostrarEventos = false;
      this.mostrarFormularioEvento = false;
    },
    toggleEventos() {
      this.mostrarEventos = !this.mostrarEventos;
      this.mostrarFormulario = false;
      this.mostrarCalendario = false;
      this.mostrarCalendarioRecordatorio = false;
      this.mostrarContactos = false;
      this.mostrarFormularioEvento = false;
    },
    toggleFormularioEvento() { // Nueva función
      this.mostrarFormularioEvento = !this.mostrarFormularioEvento;
      this.mostrarFormulario = false;
      this.mostrarCalendario = false;
      this.mostrarCalendarioRecordatorio = false;
      this.mostrarContactos = false;
      this.mostrarEventos = false;
    },
    cerrarTodo(event) {
      if (!event.target.closest('.formulario-contacto') && !event.target.closest('.calendar-container') && !event.target.closest('.button-group')) {
        this.mostrarFormulario = false;
        this.mostrarCalendario = false;
        this.mostrarCalendarioRecordatorio = false;
        this.mostrarContactos = false;
        this.mostrarEventos = false;
        this.mostrarFormularioEvento = false;
      }
    }
  },
};
</script>
<style scoped>
/* Estilos para el contenedor principal */
.home-container {
  display: flex;
  flex-direction: column;
  align-items: left; /* Alinea los elementos a la izquierda */
  justify-content: flex-start; /* Alinea el contenido al inicio del contenedor */
  height: 100vh; /* Ocupa toda la altura de la pantalla */
  width: 100%; /* Ocupa todo el ancho de la pantalla */
  padding-top: 60px; /* Espacio superior para evitar superposición con el header */
}

/* Estilos para el grupo de botones */
.button-group {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

/* Estilos para los botones (MODIFICADOS) */
.button-group button {
  padding: 8px 16px; /* Padding reducido */
  font-size: 14px; /* Tamaño de fuente reducido (opcional) */
  border: none;
  border-radius: 5px; /* Radio de borde ajustado (opcional) */
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
  width: auto; /* Ajusta el ancho automáticamente */
  white-space: nowrap; /* Evita que el texto se corte */
}

.button-group button:hover {
  background-color: #0056b3;
}

.calendar-container {
  margin-top: 20px; /* Espacio debajo del header */
  width: 90%;
  max-width: 400px; /* Reducimos el tamaño */
  height: 25vh; /* Ocupa un cuarto de la pantalla */
  overflow: hidden; /* Evita que el contenido se expanda demasiado */
}
</style>