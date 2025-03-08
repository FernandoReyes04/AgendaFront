<template>
  <div class="home-container">
    <Login v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
    <div v-else class="home-container">
      <Header />
      <div class="button-container">
        <div class="button-group">
          <button class="btn btn-primary btn-lg" @click="mostrarFormularioContactoModal">Agregar Contacto +</button>
          <button class="btn btn-success btn-lg" @click="mostrarFormularioEventoModal">Añadir Evento +</button>
          <button class="btn btn-info btn-lg" @click="mostrarRecordatorioModal">Añadir Recordatorio</button>
          <button class="btn btn-outline-primary btn-lg" @click="mostrarContactosModal">Mis Contactos</button>
          <button class="btn btn-outline-success btn-lg" @click="mostrarEventosModal">Mis Eventos</button>
          <button class="btn btn-outline-info btn-lg" @click="mostrarRecordatoriosModal">Mis Recordatorios</button>
        </div>
      </div>

      <CalendarioInteractivo :events="eventos" />

      <FormularioContacto v-if="mostrarModalContacto" ref="formularioContactoRef" @cerrar="cerrarModalContacto" />
      <FormularioEvento v-if="mostrarModalEvento" ref="formularioEventoRef" @cerrar="cerrarModalEvento" @guardar="guardarEvento" />
      <RecordatorioModal v-if="mostrarRecordatorio" ref="recordatorioRef" @cerrar="cerrarRecordatorio" @guardar="guardarRecordatorio" />
      <Contactos v-if="mostrarContactos" ref="contactosRef" @cerrar="cerrarContactosModal" />
      <Eventos v-if="mostrarEventos" ref="eventosRef" @cerrar="cerrarEventosModal" />
      <Recordatorios v-if="mostrarRecordatorios" :recordatorios="misRecordatorios" @cerrar="cerrarRecordatoriosModal" />
    </div>
  </div>
</template>

<script>
import Login from './Login.vue';
import Header from './Header.vue';
import FormularioContacto from './FormularioContacto.vue';
import Contactos from './Contactos.vue';
import Eventos from './Eventos.vue';
import FormularioEvento from './FormularioEvento.vue';
import CalendarioInteractivo from './CalendarioInteractivo.vue';
import RecordatorioModal from './RecordatorioModal.vue';
import Recordatorios from './Recordatorios.vue';

export default {
  components: {
    Login,
    Header,
    FormularioContacto,
    Contactos,
    Eventos,
    FormularioEvento,
    CalendarioInteractivo,
    RecordatorioModal,
    Recordatorios
  },
  data() {
    return {
      isLoggedIn: false,
      eventos: [],
      mostrarContactos: false,
      mostrarEventos: false,
      mostrarModalContacto: false,
      mostrarModalEvento: false,
      mostrarRecordatorio: false,
      mostrarRecordatorios: false,
      misRecordatorios: [ 
        { titulo: 'Recordatorio ', descripcion: 'Descripcion' },
        { titulo: 'REcordatorio ', descripcion: 'Descripcion' }
      ]
    };
  },
  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true;
    },
    mostrarFormularioContactoModal() {
      this.mostrarModalContacto = true;
    },
    mostrarFormularioEventoModal() {
      this.mostrarModalEvento = true;
    },
    mostrarRecordatorioModal() {
      this.mostrarRecordatorio = true;
    },
    mostrarContactosModal() {
      this.mostrarContactos = true;
    },
    mostrarEventosModal() {
      this.mostrarEventos = true;
    },
    mostrarRecordatoriosModal() {
      this.mostrarRecordatorios = true;
    },
    cerrarRecordatoriosModal() {
      this.mostrarRecordatorios = false;
    },
    cerrarModalContacto() {
      this.mostrarModalContacto = false;
    },
    cerrarModalEvento() {
      this.mostrarModalEvento = false;
    },
    cerrarRecordatorio() {
      this.mostrarRecordatorio = false;
    },
    cerrarContactosModal() {
      this.mostrarContactos = false;
    },
    cerrarEventosModal() {
      this.mostrarEventos = false;
    },
    guardarRecordatorio(recordatorio) {
      console.log('Recordatorio guardado:', recordatorio);
    },
    guardarEvento(evento) {
      this.eventos.push(evento);
      this.cerrarModalEvento();
    },
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
  background-color: white;
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
  max-width: 1200px;
  height: 80vh;
  overflow: hidden;
}

/* Paleta de colores azules */
.btn-primary {
  background-color: #4728fe;
  border-color: #4728fe;
}

.btn-primary:hover {
  background-color: #633afe;
  border-color: #633afe;
}

.btn-success {
  background-color: #804cff;
  border-color: #804cff;
}

.btn-success:hover {
  background-color: #633afe;
  border-color: #633afe;
}

.btn-outline-primary {
  color: #4728fe;
  border-color: #4728fe;
}

.btn-outline-primary:hover {
  background-color: #e0e0e0;
  border-color: #4728fe;
}

.btn-outline-success {
  color: #804cff;
  border-color: #804cff;
}

.btn-outline-success:hover {
  background-color: #e0e0e0;
  border-color: #804cff;
}

.btn-info {
  background-color: #0dcaf0;
  border-color: #0dcaf0;
}

.btn-info:hover {
  background-color: #3dd5f3;
  border-color: #3dd5f3;
}
</style>