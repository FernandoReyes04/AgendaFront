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

      <!-- ✅ Calendario muestra eventos desde el backend -->
      <CalendarioInteractivo :events="eventos" />

      <!-- ✅ Modales -->
      <FormularioContacto v-if="mostrarModalContacto" ref="formularioContactoRef" @cerrar="cerrarModalContacto" />
      <FormularioEvento 
        v-if="mostrarModalEvento" 
        ref="formularioEventoRef" 
        @cerrar="cerrarModalEvento" 
        @guardar="guardarEvento" 
      />
      <RecordatorioModal 
        v-if="mostrarRecordatorio" 
        ref="recordatorioRef" 
        @cerrar="cerrarRecordatorio" 
        @guardar="guardarRecordatorio" 
      />
      <Contactos v-if="mostrarContactos" ref="contactosRef" @cerrar="cerrarContactosModal" />
      <Eventos v-if="mostrarEventos" ref="eventosRef" @cerrar="cerrarEventosModal" />
      <Recordatorios 
        v-if="mostrarRecordatorios" 
        :recordatorios="misRecordatorios" 
        @cerrar="cerrarRecordatoriosModal" 
      />
      <RecordatorioModal
      v-if="mostrarRecordatorio"
      @cerrar="cerrarRecordatorio"
      @guardar="guardarRecordatorio"
      />
      <Recordatorios
      v-if="mostrarRecordatorios"
      :recordatorios="recordatorios"
      @cerrar="cerrarRecordatoriosModal"
      />
      <FormularioContacto
      v-if="mostrarFormularioContacto"
      @cerrar="cerrarFormularioContacto"
      @guardar="guardarContacto"
    />
    <ContactosList
      :contactos="contactos"
      @eliminar="eliminarContacto"
      @editar="editarContacto"
    />

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
import { getRecordatorios } from '@/services/recordatorioServices'; //importar los gets para recordatorios
import RecordatorioModal from './RecordatorioModal.vue'; // import del modal
import Recordatorios from './Recordatorios.vue'; 
import { getEventos } from '@/services/eventoServices'; //  Importar servicio de eventos
import { getContactos, deleteContacto, updateContacto } from '@/services/contactoServices'; //import de los gets de contactos

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
    Recordatorios,
    
  },
  data() {
    return {
      isLoggedIn: false,
      eventos: [], // ✅ Lista de eventos
      contactos: [],
      mostrarContactos: false,
      mostrarEventos: false,
      mostrarModalContacto: false,
      mostrarModalEvento: false,
      mostrarRecordatorio: false,
      mostrarRecordatorios: false,
      FormularioContacto: false,
      misRecordatorios: [],
      mostrarFormularioContacto: false,
    };
  },
  async created() {
    try {
      // ✅ Obtener eventos desde el backend
      this.eventos = await getEventos();
      console.log('Eventos cargados:', this.eventos);

      // ✅ Obtener recordatorios desde el backend
      this.misRecordatorios = await getRecordatorios();
      console.log('Recordatorios cargados:', this.misRecordatorios);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }

    try {
      this.recordatorios = await getRecordatorios();
      console.log('Recordatorios cargados:', this.recordatorios);
    } catch (error) {
      console.error('Error cargando recordatorios:', error);
    }

    try {
        this.contactos = await getContactos();
        console.log('Contactos cargados:', this.contactos);
      } catch (error) {
        console.error('Error cargando contactos:', error);
      }

  },
  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true;
    },
    abrirFormularioContacto() {
      this.mostrarFormularioContacto = true;
    },
    cerrarFormularioContacto() {
      this.mostrarFormularioContacto = false;
    },
    mostrarFormularioEventoModal() {
      this.mostrarModalEvento = true;
    },
    mostrarContactosModal() {
      this.mostrarContactos = true;
    },
    mostrarEventosModal() {
      this.mostrarEventos = true;
    },
    mostrarRecordatorioModal() {
      this.mostrarRecordatorio = true;
    },
    cerrarRecordatorio() {
      this.mostrarRecordatorio = false;
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
    cerrarContactosModal() {
      this.mostrarContactos = false;
    },
    cerrarEventosModal() {
      this.mostrarEventos = false;
    },
    // Guardar nuevo evento
    async guardarEvento(evento) {
      this.eventos.push(evento); // Añadir nuevo evento a la lista
      console.log('Evento guardado:', evento);
      this.cerrarModalEvento();
    },
    // Guardar nuevo recordatorio
    async guardarRecordatorio(recordatorio) {
      this.misRecordatorios.push(recordatorio);
      console.log('Recordatorio guardado:', recordatorio);
    },
    async guardarRecordatorio(recordatorio) {
      console.log('Nuevo recordatorio recibido:', recordatorio);
      this.recordatorios.push(recordatorio); // Añadir a la lista
    },
    async guardarContacto(contacto) {
      console.log('Nuevo contacto recibido:', contacto);
      this.contactos.push(contacto); // ✅ Añadir a la lista
    },
    async eliminarContacto(id) {
      try {
        await deleteContacto(id);
        this.contactos = this.contactos.filter(contacto => contacto.id !== id);
      } catch (error) {
        console.error('Error eliminando contacto:', error);
      }
    },
    async editarContacto(contactoActualizado) {
      try {
        const contacto = await updateContacto(contactoActualizado.id, contactoActualizado);
        const index = this.contactos.findIndex(c => c.id === contacto.id);
        if (index !== -1) {
          this.contactos.splice(index, 1, contacto);
        }
      } catch (error) {
        console.error('Error actualizando contacto:', error);
      }
    }
  }
};
</script>

<style scoped>
/*  Mantener el estilo original */
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
</style>
