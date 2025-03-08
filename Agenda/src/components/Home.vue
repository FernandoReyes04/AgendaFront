<template>
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
      </div>
    </div>

    <CalendarioInteractivo :events="eventos" />

    <FormularioContacto v-if="mostrarModalContacto" ref="formularioContactoRef" @cerrar="cerrarModalContacto" />
    <FormularioEvento v-if="mostrarModalEvento" ref="formularioEventoRef" @cerrar="cerrarModalEvento" @guardar="guardarEvento" />
    <RecordatorioModal v-if="mostrarRecordatorio" ref="recordatorioRef" @cerrar="cerrarRecordatorio" @guardar="guardarRecordatorio" />
    <Contactos v-if="mostrarContactos" ref="contactosRef" @cerrar="cerrarContactosModal"/>
    <Eventos v-if="mostrarEventos" ref="eventosRef" @cerrar="cerrarEventosModal"/>
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

export default {
  components: {
    Login,
    Header,
    FormularioContacto,
    Contactos,
    Eventos,
    FormularioEvento,
    CalendarioInteractivo,
    RecordatorioModal
  },
  data() {
    return {
      isLoggedIn: false,
      eventos: [],
      mostrarContactos: false,
      mostrarEventos: false,
      mostrarModalContacto: false,
      mostrarModalEvento: false,
      mostrarRecordatorio: false
    };
  },
  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true;
    },
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
    mostrarRecordatorioModal() {
      this.mostrarRecordatorio = true;
      this.$nextTick(() => {
        this.$refs.recordatorioRef.showModal();
      });
    },
    mostrarContactosModal() {
      this.mostrarContactos = true;
      this.$nextTick(() => {
        this.$refs.contactosRef.showModal();
      });
    },
    mostrarEventosModal() {
      this.mostrarEventos = true;
      this.$nextTick(() => {
        this.$refs.eventosRef.showModal();
      });
    },
    cerrarModalContacto() {
      this.mostrarModalContacto = false;
      this.$nextTick(() => {
        const modalElement = document.getElementById('contactoModal');
        if (modalElement) {
          modalElement.remove();
        }
      });
    },
    cerrarModalEvento() {
      this.mostrarModalEvento = false;
      this.$nextTick(() => {
        const modalElement = document.getElementById('eventoModal');
        if (modalElement) {
          modalElement.remove();
        }
      });
    },
    cerrarRecordatorio() {
      this.mostrarRecordatorio = false;
      this.$nextTick(() => {
        const modalElement = document.getElementById('recordatorioModal');
        if (modalElement) {
          modalElement.remove();
        }
      });
    },
    cerrarContactosModal() {
      this.mostrarContactos = false;
      this.$nextTick(() => {
        const modalElement = document.getElementById('contactosModal');
        if (modalElement) {
          modalElement.remove();
        }
      });
    },
    cerrarEventosModal() {
      this.mostrarEventos = false;
      this.$nextTick(() => {
        const modalElement = document.getElementById('eventosModal');
        if (modalElement) {
          modalElement.remove();
        }
      });
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