<template>
  <div class="home-container">
    <Header />
    <div class="button-container">
      <div class="button-group">
        <button class="btn btn-primary btn-lg" @click="mostrarFormularioContactoModal">Agregar Contacto +</button>
        <button class="btn btn-success btn-lg" @click="mostrarFormularioEventoModal">Añadir Evento +</button>
        <button class="btn btn-outline-secondary btn-lg" @click="mostrarCalendarioModal">Mostrar Calendario</button>
        <button class="btn btn-outline-primary btn-lg" @click="toggleContactos">Mis Contactos</button>
        <button class="btn btn-outline-success btn-lg" @click="toggleEventos">Mis Eventos</button>
      </div>
    </div>

    <CalendarioInteractivo :events="eventos" />

    <FormularioContacto v-if="mostrarModalContacto" ref="formularioContactoRef" @cerrar="cerrarModalContacto" />
    <FormularioEventoComponente v-if="mostrarModalEvento" ref="formularioEventoRef" @cerrar="cerrarModalEvento" />
    <Calendario v-if="mostrarCalendario" ref="calendarioRef" @cerrar="cerrarCalendario" />
    <Contactos v-if="mostrarContactos" />
    <Eventos v-if="mostrarEventos" />
  </div>
</template>

<script>
import Header from './Header.vue';
import FormularioContacto from './FormularioContacto.vue';
import Contactos from './Contactos.vue';
import Eventos from './Eventos.vue';
import FormularioEventoComponente from './FormularioEventoComponente.vue';
import Calendario from './Calendario.vue';
import CalendarioInteractivo from './CalendarioInteractivo.vue';

export default {
  components: {
    Header,
    FormularioContacto,
    Contactos,
    Eventos,
    FormularioEventoComponente,
    Calendario,
    CalendarioInteractivo
  },
  data() {
    return {
      eventos: [],
      mostrarContactos: false,
      mostrarEventos: false,
      mostrarModalContacto: false,
      mostrarModalEvento: false,
      mostrarCalendario: false
    };
  },
  methods: {
    mostrarFormularioContactoModal() {
      this.mostrarModalContacto = true;
      this.$nextTick(() => {
        this.$refs.formularioContactoRef.showModal();
      });
    },
    mostrarFormularioEventoModal() {
      this.mostrarModalEvento = true;
      this.$nextTick(() => {
        this.$refs.formularioEventoRef.showModal();
      });
    },
    mostrarCalendarioModal() {
      this.mostrarCalendario = true;
      this.$nextTick(() => {
        this.$refs.calendarioRef.showModal();
      });
    },
    cerrarModalContacto() {
      this.mostrarModalContacto = false;
    },
    cerrarModalEvento() {
      this.mostrarModalEvento = false;
    },
    cerrarCalendario() {
      this.mostrarCalendario = false;
    },
    toggleContactos() {
      this.mostrarContactos = !this.mostrarContactos;
      this.mostrarEventos = false;
    },
    toggleEventos() {
      this.mostrarEventos = !this.mostrarEventos;
      this.mostrarContactos = false;
    }
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  padding-top: 60px;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.button-group button {
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.button-group button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.calendar-container {
  margin-top: 20px;
  width: 95%;
  max-width: 800px;
  height: 60vh;
  overflow: hidden;
}

/* Paleta de colores azules */
.btn-primary {
  background-color: #4728fe; /* color3 */
  border-color: #4728fe;
}

.btn-primary:hover {
  background-color: #633afe; /* color4 */
  border-color: #633afe;
}

.btn-success {
  background-color: #804cff; /* color5 */
  border-color: #804cff;
}

.btn-success:hover {
  background-color: #633afe; /* color4 */
  border-color: #633afe;
}

.btn-outline-primary {
  color: #4728fe; /* color3 */
  border-color: #4728fe;
}

.btn-outline-primary:hover {
  background-color: #e0e0e0;
  border-color: #4728fe;
}

.btn-outline-success {
  color: #804cff; /* color5 */
  border-color: #804cff;
}

.btn-outline-success:hover {
  background-color: #e0e0e0;
  border-color: #804cff;
}
</style>