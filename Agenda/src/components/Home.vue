<template>
  <div class="home-container">
    <Login v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
    <PerfilSimpleNuevo 
      v-else-if="mostrarPerfil" 
      @volver="cerrarPerfilUsuario"
      :contactos="contactos"
      :eventos="eventos"
      :recordatorios="recordatorios"
      @eliminar-contacto="eliminarContacto"
      @eliminar-evento="eliminarEvento"
      @eliminar-recordatorio="eliminarRecordatorio"
    />
    <div v-else class="main-content">
      <Header @show-login="showLogin" />
      
      <div class="app-container">
        <!-- Barra lateral con botones -->
        <div class="sidebar">
          <!-- Mini calendario para navegación rápida -->
          <div class="sidebar-section mini-calendar-wrapper">
            <MiniCalendario 
              :eventos="eventos" 
              :recordatorios="recordatorios"
              @seleccionar-fecha="manejarSeleccionFecha"
            />
          </div>
          
          <!-- Contenedor para los botones de "Agregar" -->
          <div class="sidebar-section">
            <h3 class="sidebar-title">Agregar</h3>
            <button class="sidebar-btn primary-btn" @click="mostrarFormularioContactoModal">
              <i class="fas fa-user-plus"></i> Añadir Contacto
            </button>
            <button class="sidebar-btn secondary-btn" @click="mostrarFormularioEventoModal">
              <i class="fas fa-calendar-plus"></i> Añadir Evento
            </button>
            <button class="sidebar-btn accent-btn" @click="mostrarFormularioRecordatorio">
              <i class="fas fa-bell"></i> Añadir Recordatorio
            </button>
          </div>

          <!-- Contenedor para los botones de "Consultar" -->
          <div class="sidebar-section">
            <h3 class="sidebar-title">Consultar</h3>
            <button class="sidebar-btn primary-btn" @click="mostrarContactosModal">
              <i class="fas fa-address-book"></i> Ver Contactos
            </button>
            <button class="sidebar-btn secondary-btn" @click="mostrarEventosModal">
              <i class="fas fa-calendar-alt"></i> Ver Eventos
            </button>
            <button class="sidebar-btn accent-btn" @click="mostrarRecordatoriosModal">
              <i class="fas fa-clipboard-list"></i> Ver Recordatorios
            </button>
          </div>
          
          <!-- Contenedor para el perfil -->
          <div class="sidebar-section">
            <h3 class="sidebar-title">Perfil</h3>
            <button class="sidebar-btn profile-btn" @click="mostrarPerfilUsuario">
              <i class="fas fa-user-circle"></i> Mi Perfil
            </button>
          </div>
        </div>
        
        <!-- Contenido principal con calendario -->
        <div class="main-area">
          <!-- Calendario interactivo que permite crear eventos y recordatorios al hacer clic en una fecha -->
          <CalendarioInteractivo 
            ref="calendarioInteractivoRef"
            :events="eventos" 
            @crear-evento="abrirModalEventoDesdeCalendario" 
            @crear-recordatorio="abrirModalRecordatorioDesdeCalendario"
          />
        </div>
      </div>

      <!-- ✅ Modales -->
      <FormularioContacto
        v-if="mostrarModalContacto"
        ref="formularioContactoRef"
        @cerrar="cerrarModalContacto"
        @guardar="guardarContacto"
        :contactoEdicion="contactoEnEdicion"
        :modoEdicion="modoEdicion"
        />

      <FormularioEvento 
        v-if="mostrarModalEvento" 
        ref="formularioEventoRef" 
        @cerrar="cerrarModalEvento" 
        @guardar="guardarEvento" 
        :eventoEdicion="eventoEnEdicion"
        :modoEdicion="modoEdicion"
      />

      <FormularioRecordatorio
        v-if="mostrarModalRecordatorio" 
        ref="formularioRecordatorioRef" 
        @cerrar="cerrarModalRecordatorio" 
        @guardar="guardarRecordatorio" 
        :recordatorioEdicion="recordatorioEnEdicion"
        :modoEdicion="modoEdicion"
      />

      <Contactos
        v-if="mostrarContactos"
        :contactos="this.contactos"
        @cerrar="cerrarContactosModal"
        @editar="editarContacto"
        @eliminar="eliminarContacto"
      />
      <Eventos
      v-if="mostrarEventos"
      :eventos="this.eventos"
      @cerrar="cerrarEventosModal"
      @editar="editarEvento"
      @eliminar="eliminarEvento"
       />
      <Recordatorios 
        v-if="mostrarRecordatorios" 
        :recordatorios="this.recordatorios" 
        @cerrar="cerrarRecordatoriosModal" 
        @editar="editarRecordatorio"
        @eliminar="eliminarRecordatorio"
      />

      <!-- El perfil de usuario ya está renderizado en la parte superior del template -->

    </div>
    <div class="footer-wrapper" v-if="isLoggedIn">
      <Footer />
    </div>
    
    <!-- Sistema de notificaciones -->
    <Notificacion
      :mostrar="notificacion.mostrar"
      :tipo="notificacion.tipo"
      :titulo="notificacion.titulo"
      :mensaje="notificacion.mensaje"
      :duracion="notificacion.duracion"
      @cerrar="cerrarNotificacion"
    />
  </div>  
</template>

<script>
import Login from './Login.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import Contactos from './Contactos.vue';
import FormularioContacto from './FormularioContacto.vue';
import Eventos from './Eventos.vue';
import FormularioEvento from './FormularioEvento.vue';
import FormularioRecordatorio from './FormularioRecordatorio.vue';
import CalendarioInteractivo from './CalendarioInteractivo.vue';
import RecordatorioModal from './RecordatorioModal.vue';
import Recordatorios from './Recordatorios.vue';
import PerfilSimpleNuevo from './PerfilSimpleNuevo.vue';
import MiniCalendario from './MiniCalendario.vue';
import { createRecordatorio, getRecordatorios, updateRecordatorio, deleteRecordatorio } from '@/services/recordatorioServices'; 
import { createEvento, getEventos, updateEvento, deleteEvento } from '@/services/eventoServices'; 
import { createContacto, getContactos, updateContacto, deleteContacto } from '@/services/contactoServices'; 
import Notificacion from './Notificacion.vue';

export default {
  components: {
    Login,
    Header,
    Footer,
    FormularioContacto,
    Contactos,
    Eventos,
    FormularioEvento,
    FormularioRecordatorio,
    CalendarioInteractivo,
    RecordatorioModal,
    Notificacion,
    Recordatorios,
    PerfilSimpleNuevo,
    MiniCalendario
  },
  data() {
    return {
      isLoggedIn: localStorage.getItem('userLoggedIn') === 'true' || false,
      eventos: [],
      contactos: [],
      mostrarContactos: false,
      mostrarEventos: false,
      mostrarModalContacto: false,
      mostrarModalEvento: false,
      mostrarModalRecordatorio: false,
      // Variables para la edición
      contactoEnEdicion: null,
      eventoEnEdicion: null,
      recordatorioEnEdicion: null,
      modoEdicion: false,
      mostrarRecordatorios: false,
      recordatorios: [],
      mostrarPerfil: false,
      // Sistema de notificaciones
      notificacion: {
        mostrar: false,
        tipo: 'exito',
        titulo: '',
        mensaje: '',
        duracion: 5000
      }
    };
  },
  mounted() {
    // Ya no necesitamos $on porque ahora usamos @event en la plantilla
  },
  async created() {
    try {
      this.eventos = await getEventos();
      console.log('Eventos cargados:', this.eventos);
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
      localStorage.setItem('userLoggedIn', 'true');
      this.cargarComponentes();
    },
    showLogin() {
      this.isLoggedIn = false;
      localStorage.removeItem('userLoggedIn');
    },
    mostrarFormularioContactoModal() {
      // Primero limpiamos cualquier residuo de modal anterior
      this.limpiarResidualModal();
      // Luego mostramos el modal actual
      this.mostrarModalContacto = true;
    },
    cerrarFormularioContactoModal() {
      this.mostrarModalContacto = false;
    },
    mostrarFormularioEventoModal() {
      // Primero limpiamos cualquier residuo de modal anterior
      this.limpiarResidualModal();
      // Luego mostramos el modal actual
      this.mostrarModalEvento = true;
      // Dar tiempo para que el componente se renderice antes de mostrar el modal
      this.$nextTick(() => {
        if (this.$refs.formularioEventoRef) {
          this.$refs.formularioEventoRef.showModal();
        }
      });
    },
    mostrarEventosModal() {
      // Primero limpiamos cualquier residuo de modal anterior
      this.limpiarResidualModal();
      // Luego mostramos el modal actual
      this.mostrarEventos = true;
    },
    mostrarFormularioRecordatorio() {
      // Primero limpiamos cualquier residuo de modal anterior
      this.limpiarResidualModal();
      // Luego mostramos el modal actual
      this.mostrarModalRecordatorio = true;
    },
    
    // Método para abrir formulario de evento con fecha seleccionada desde el calendario
    abrirModalEventoDesdeCalendario(fecha) {
      // Primero limpiamos cualquier residuo de modal anterior
      this.limpiarResidualModal();
      // Luego mostramos el modal de evento
      this.mostrarModalEvento = true;
      
      // Dar tiempo para que el componente se renderice
      this.$nextTick(() => {
        if (this.$refs.formularioEventoRef) {
          // Formateamos la fecha para el formato esperado por el formulario
          const date = new Date(fecha);
          const fechaFormateada = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
          
          // Pasamos la fecha preseleccionada al componente del formulario
          this.$refs.formularioEventoRef.preseleccionarFecha(fechaFormateada);
        }
      });
    },
    
    // Método para abrir formulario de recordatorio con fecha seleccionada desde el calendario
    abrirModalRecordatorioDesdeCalendario(fecha) {
      // Primero limpiamos cualquier residuo de modal anterior
      this.limpiarResidualModal();
      // Luego mostramos el modal de recordatorio
      this.mostrarModalRecordatorio = true;
      
      // Dar tiempo para que el componente se renderice
      this.$nextTick(() => {
        // Formateamos la fecha para el formato esperado por el formulario
        const date = new Date(fecha);
        const fechaFormateada = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        
        // Pasamos la fecha al estado para que el formulario la use
        // Nota: Aquí deberías adaptar esto según la implementación real de tu formulario de recordatorios
        if (this.$refs.formularioRecordatorioRef) {
          this.$refs.formularioRecordatorioRef.preseleccionarFecha(fechaFormateada);
        }
      });
    },
    cerrarModalRecordatorio() {
      this.mostrarModalRecordatorio = false;
      this.limpiarResidualModal();
    },
    mostrarRecordatoriosModal() {
      // Primero limpiamos cualquier residuo de modal anterior
      this.limpiarResidualModal();
      // Luego mostramos el modal actual
      this.mostrarRecordatorios = true;
    },
    cerrarRecordatoriosModal() {
      this.mostrarRecordatorios = false;
      this.limpiarResidualModal();
    },
    cerrarModalContacto() {
      this.mostrarModalContacto = false;
      this.limpiarResidualModal();
    },
    cerrarModalEvento() {
      this.mostrarModalEvento = false;
      this.limpiarResidualModal();
    },
    mostrarContactosModal() {
      // Primero limpiamos cualquier residuo de modal anterior
      this.limpiarResidualModal();
      // Luego mostramos el modal actual
      this.mostrarContactos = true;
    },
    cerrarContactosModal() {
      this.mostrarContactos = false;
      this.limpiarResidualModal();
    },
    cerrarEventosModal() {
      this.mostrarEventos = false;
      this.limpiarResidualModal();
    },
    // Guardar nuevo evento o actualizar existente
    async guardarEvento(evento) {
      try {
        console.log('Evento recibido:', evento);
        
        // Si estamos en modo edición, actualizamos el evento existente
        if (this.modoEdicion && this.eventoEnEdicion) {
          // Aseguramos que el evento tenga el ID correcto
          evento.id = this.eventoEnEdicion.id;
          const eventoActualizado = await updateEvento(evento.id, evento);
          
          // Actualizamos el evento en el array local
          const index = this.eventos.findIndex(e => e.id === eventoActualizado.id);
          if (index !== -1) {
            this.eventos.splice(index, 1, eventoActualizado);
          }
          
          // Resetear estado de edición
          this.modoEdicion = false;
          this.eventoEnEdicion = null;
          
          this.cerrarModalEvento();
          
          // Mostrar notificación de éxito
          this.mostrarNotificacion({
            tipo: 'exito',
            titulo: 'Evento actualizado',
            mensaje: 'Tu evento se ha actualizado correctamente. Puedes verlo en tu perfil.'
          });
        } else {
          // Es un nuevo evento
          const eventoGuardado = await createEvento(evento);
          this.eventos.push(eventoGuardado); // Añadir nuevo evento a la lista
          console.log('Evento guardado:', eventoGuardado);
          this.cerrarModalEvento();
          
          // Mostrar notificación de éxito
          this.mostrarNotificacion({
            tipo: 'exito',
            titulo: 'Evento guardado',
            mensaje: 'Tu evento se ha guardado correctamente. Puedes verlo en tu perfil.'
          });
        }
      } catch (error) {
        console.error('Error al guardar/actualizar evento:', error);
        
        // Mostrar notificación de error
        this.mostrarNotificacion({
          tipo: 'error',
          titulo: 'Error al procesar evento',
          mensaje: 'No se pudo guardar o actualizar el evento. Por favor, intenta nuevamente.'
        });
      }
    },
    
    // Método para eliminar un evento
    async eliminarEvento(id) {
      try {
        await deleteEvento(id);
        // Eliminar el evento del array local
        this.eventos = this.eventos.filter(evento => evento.id !== id);
        
        // Mostrar notificación de éxito
        this.mostrarNotificacion({
          tipo: 'exito',
          titulo: 'Evento eliminado',
          mensaje: 'El evento ha sido eliminado correctamente.'
        });
      } catch (error) {
        console.error('Error eliminando evento:', error);
        
        // Mostrar notificación de error
        this.mostrarNotificacion({
          tipo: 'error',
          titulo: 'Error al eliminar',
          mensaje: 'No se pudo eliminar el evento. Por favor, intenta nuevamente.'
        });
      }
    },
    
    async guardarRecordatorio(recordatorio) {
      try {
        console.log('Recordatorio recibido:', recordatorio);
        
        // Si estamos en modo edición, actualizamos el recordatorio existente
        if (this.modoEdicion && this.recordatorioEnEdicion) {
          // Aseguramos que el recordatorio tenga el ID correcto
          recordatorio.id = this.recordatorioEnEdicion.id;
          const recordatorioActualizado = await updateRecordatorio(recordatorio.id, recordatorio);
          
          // Actualizamos el recordatorio en el array local
          const index = this.recordatorios.findIndex(r => r.id === recordatorioActualizado.id);
          if (index !== -1) {
            this.recordatorios.splice(index, 1, recordatorioActualizado);
          }
          
          // Resetear estado de edición
          this.modoEdicion = false;
          this.recordatorioEnEdicion = null;
          
          this.cerrarModalRecordatorio();
          
          // Mostrar notificación de éxito
          this.mostrarNotificacion({
            tipo: 'exito',
            titulo: 'Recordatorio actualizado',
            mensaje: 'Tu recordatorio se ha actualizado correctamente. Puedes verlo en tu perfil.'
          });
        } else {
          // Es un nuevo recordatorio
          const recordatorioGuardado = await createRecordatorio(recordatorio);
          this.recordatorios.push(recordatorioGuardado); // Añadir nuevo recordatorio a la lista
          console.log('Recordatorio guardado:', recordatorioGuardado);
          this.cerrarModalRecordatorio();
          
          // Mostrar notificación de éxito
          this.mostrarNotificacion({
            tipo: 'exito',
            titulo: 'Recordatorio guardado',
            mensaje: 'Tu recordatorio se ha guardado correctamente. Puedes verlo en tu perfil.'
          });
        }
      } catch (error) {
        console.error('Error al guardar/actualizar recordatorio:', error);
        
        // Mostrar notificación de error
        this.mostrarNotificacion({
          tipo: 'error',
          titulo: 'Error al procesar recordatorio',
          mensaje: 'No se pudo guardar o actualizar el recordatorio. Por favor, intenta nuevamente.'
        });
      }
    },
    
    // Método para eliminar un recordatorio
    async eliminarRecordatorio(id) {
      try {
        await deleteRecordatorio(id);
        // Eliminar el recordatorio del array local
        this.recordatorios = this.recordatorios.filter(recordatorio => recordatorio.id !== id);
        
        // Mostrar notificación de éxito
        this.mostrarNotificacion({
          tipo: 'exito',
          titulo: 'Recordatorio eliminado',
          mensaje: 'El recordatorio ha sido eliminado correctamente.'
        });
      } catch (error) {
        console.error('Error eliminando recordatorio:', error);
        
        // Mostrar notificación de error
        this.mostrarNotificacion({
          tipo: 'error',
          titulo: 'Error al eliminar',
          mensaje: 'No se pudo eliminar el recordatorio. Por favor, intenta nuevamente.'
        });
      }
    },
    async guardarContacto(contacto) {
      try {
        console.log('Contacto recibido:', contacto);
        
        // Si estamos en modo edición, actualizamos el contacto existente
        if (this.modoEdicion && this.contactoEnEdicion) {
          // Aseguramos que el contacto tenga el ID correcto
          contacto.id = this.contactoEnEdicion.id;
          const contactoActualizado = await updateContacto(contacto.id, contacto);
          
          // Actualizamos el contacto en el array local
          const index = this.contactos.findIndex(c => c.id === contactoActualizado.id);
          if (index !== -1) {
            this.contactos.splice(index, 1, contactoActualizado);
          }
          
          // Resetear estado de edición
          this.modoEdicion = false;
          this.contactoEnEdicion = null;
          
          this.cerrarModalContacto();
          
          // Mostrar notificación de éxito
          this.mostrarNotificacion({
            tipo: 'exito',
            titulo: 'Contacto actualizado',
            mensaje: 'Tu contacto se ha actualizado correctamente. Puedes verlo en tu perfil.'
          });
        } else {
          // Es un nuevo contacto
          const contactoGuardado = await createContacto(contacto);
          this.contactos.push(contactoGuardado);
          this.cerrarModalContacto();
          
          // Mostrar notificación de éxito
          this.mostrarNotificacion({
            tipo: 'exito',
            titulo: 'Contacto guardado',
            mensaje: 'Tu contacto se ha guardado correctamente. Puedes verlo en tu perfil.'
          });
        }
      } catch (error) {
        console.error('Error al guardar/actualizar contacto:', error);
        
        // Mostrar notificación de error
        this.mostrarNotificacion({
          tipo: 'error',
          titulo: 'Error al procesar contacto',
          mensaje: 'No se pudo guardar o actualizar el contacto. Por favor, intenta nuevamente.'
        });
      }
    },
    
    // Método para eliminar un contacto
    async eliminarContacto(id) {
      try {
        await deleteContacto(id);
        // Eliminar el contacto del array local
        this.contactos = this.contactos.filter(contacto => contacto.id !== id);
        
        // Mostrar notificación de éxito
        this.mostrarNotificacion({
          tipo: 'exito',
          titulo: 'Contacto eliminado',
          mensaje: 'El contacto ha sido eliminado correctamente.'
        });
      } catch (error) {
        console.error('Error eliminando contacto:', error);
        
        // Mostrar notificación de error
        this.mostrarNotificacion({
          tipo: 'error',
          titulo: 'Error al eliminar',
          mensaje: 'No se pudo eliminar el contacto. Por favor, intenta nuevamente.'
        });
      }
    },

    mostrarPerfilUsuario() {
      // Limpiamos cualquier modal o estado residual antes de mostrar el perfil
      this.limpiarResidualModal();
      
      // Desactivamos cualquier otro modal o vista que pueda estar activa
      this.mostrarContactos = false;
      this.mostrarEventos = false;
      this.mostrarRecordatorios = false;
      this.mostrarModalContacto = false;
      this.mostrarModalEvento = false;
      this.mostrarModalRecordatorio = false;
      
      // Activamos la vista de perfil
      this.mostrarPerfil = true;
      
      // Nos aseguramos de que el scroll esté al inicio
      window.scrollTo(0, 0);
    },
    cerrarPerfilUsuario() {
      this.mostrarPerfil = false;
      this.limpiarResidualModal();
    },
    
    //  limpiar residuales de modales
    // Métodos para el sistema de notificaciones
    mostrarNotificacion({ tipo = 'exito', titulo = '', mensaje = '', duracion = 5000 }) {
      this.notificacion = {
        mostrar: true,
        tipo,
        titulo,
        mensaje,
        duracion
      };
    },
    
    cerrarNotificacion() {
      this.notificacion.mostrar = false;
    },
    
    limpiarResidualModal() {
      // Eliminar la clase modal-open del body
      document.body.classList.remove('modal-open');
      
      // Eliminar cualquier backdrop modal que pueda quedar
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => {
        if (backdrop) backdrop.remove();
      });
      
      // Eliminar cualquier modal que quede en el DOM con clase 'modal' y 'show'
      const modals = document.querySelectorAll('.modal.show');
      modals.forEach(modal => {
        if (modal && !modal.getAttribute('data-preserve')) {
          modal.classList.remove('show');
          modal.style.display = 'none';
        }
      });
      
      // Desbloquear el scroll
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '';
    },
    
    // Método para manejar cuando se selecciona una fecha en el minicalendario
    manejarSeleccionFecha(fecha) {
      console.log('Fecha seleccionada en minicalendario:', fecha);
      
      // Abre el modal para seleccionar entre evento y recordatorio
      if (this.$refs.calendarioInteractivoRef) {
        // Creamos un objeto similar al que espera el método handleDateClick
        const info = { date: fecha };
        this.$refs.calendarioInteractivoRef.handleDateClick(info);
      }
    },
  }
};
</script>

<style scoped>
/* Contenedor principal de toda la aplicación */
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  background-color: #e0e1dd; /* Platinum de la paleta de NotiQ */
}

.main-content {
  flex: 1;
  width: 100%;
  padding-top: 70px; /* Espacio para el header fijo */
  padding-bottom: 40px; /* Espacio para evitar que el contenido choque con el footer */
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Contenedor principal de la aplicación */
.app-container {
  display: flex;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  gap: 20px;
  padding: 0 20px;
}

/* Estilos para la barra lateral */
.sidebar {
  width: 220px;
  min-width: 220px;
  background-color: var(--neutral-100);
  border-radius: 10px;
  box-shadow: var(--shadow-md);
  padding: 15px;
  border: 1px solid var(--neutral-300);
  align-self: flex-start;
  position: sticky;
  top: 90px; /* Ajustado para que quede por debajo del header fijo */
  font-size: 0.92em; /* Texto ligeramente más pequeño */
}

.sidebar-section {
  margin-bottom: 25px;
}

.mini-calendar-wrapper {
  margin-bottom: 15px;
}

.sidebar-title {
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--primary-light);
}

.sidebar-btn {
  display: flex;
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 10px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  align-items: center;
  justify-content: center;
}

.sidebar-btn i {
  margin-right: 8px;
}

.sidebar-btn:hover {
  transform: translateX(5px);
  box-shadow: var(--shadow-md);
}

.sidebar-btn.accent-btn {
  background-color: var(--accent-color); /* Silver Lake Blue #778da9 */
  color: var(--text-light); /* Platinum #e0e1dd */
}

.sidebar-btn.accent-btn:hover {
  background-color: var(--accent-dark); /* Yinmn Blue #415a77 */
  color: var(--text-light); /* Platinum #e0e1dd */
}

.sidebar-btn:focus, .sidebar-btn:active {
  outline: 2px solid var(--accent-light) !important; /* Platinum #e0e1dd */
  background-color: var(--accent-dark) !important; /* Yinmn Blue #415a77 */
  color: var(--text-light) !important; /* Platinum #e0e1dd */
}

.sidebar-btn.profile-btn {
  background-color: var(--primary-color); /* Oxford Blue #1b263b */
  border: 2px solid var(--accent-color); /* Silver Lake Blue #778da9 */
  color: var(--text-light); /* Platinum #e0e1dd */
}

.sidebar-btn.profile-btn:hover {
  background-color: var(--accent-color); /* Silver Lake Blue #778da9 */
  color: var(--text-light); /* Platinum #e0e1dd */
}

/* Área principal con el calendario */
.main-area {
  flex: 1;
  display: flex;
  justify-content: center;
}

/* Wrapper para el footer de ancho completo */
.footer-wrapper {
  width: 100%;
  margin-top: auto; /* Empuja el footer al fondo */
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  margin-top: 20px;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  max-width: 1200px;
  padding: 0 20px;
}

/* Estilos para botones personalizados */
.custom-btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  margin: 5px;
  font-size: 14px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  border: none;
}

.custom-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Botones con fondo de color */
.primary-btn {
  background-color: var(--primary-color); /* Oxford Blue #1b263b */
  color: var(--text-light); /* Platinum #e0e1dd */
}

.primary-btn:hover {
  background-color: var(--primary-dark); /* Rich Black #0d1b2a */
  color: var(--text-light); /* Platinum #e0e1dd */
}

.secondary-btn {
  background-color: var(--secondary-color); /* Yinmn Blue #415a77 */
  color: var(--text-light); /* Platinum #e0e1dd */
}

.secondary-btn:hover {
  background-color: var(--secondary-dark); /* Oxford Blue #1b263b */
  color: var(--text-light); /* Platinum #e0e1dd */
}

.accent-btn {
  background-color: var(--accent-color); /* Silver Lake Blue #778da9 */
  color: var(--text-light); /* Platinum #e0e1dd */
}

.accent-btn:hover {
  background-color: var(--accent-dark);
}

/* Botones con outline */
.primary-outline-btn {
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.primary-outline-btn:hover {
  background-color: rgba(57, 73, 171, 0.1);
}

.secondary-outline-btn {
  background-color: transparent;
  color: var(--secondary-color);
  border: 2px solid var(--secondary-color);
}

.secondary-outline-btn:hover {
  background-color: rgba(0, 188, 212, 0.1);
}

.accent-outline-btn {
  background-color: transparent;
  color: var(--accent-color);
  border: 2px solid var(--accent-color);
}

.accent-outline-btn:hover {
  background-color: rgba(76, 175, 80, 0.1);
}

/* Estilos responsivos */
@media (max-width: 992px) {
  .app-container {
    flex-direction: column;
    align-items: center;
  }
  
  .sidebar {
    width: 100%;
    max-width: 600px;
    position: static; /* Quitar sticky en dispositivos pequeños */
    margin-bottom: 20px;
  }
  
  .sidebar-btn {
    padding: 15px;
    font-size: 16px;
  }
  
  .sidebar-section {
    margin-bottom: 15px;
  }
  
  .main-area {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .app-container {
    padding: 0 10px;
  }
  
  .sidebar {
    padding: 15px;
  }
  
  .sidebar-btn {
    padding: 12px 10px;
    font-size: 14px;
  }

  .sidebar-title {
    font-size: 16px;
  }
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
