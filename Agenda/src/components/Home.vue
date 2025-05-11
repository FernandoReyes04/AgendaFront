<template>
  <div class="home-container">
    <Login v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
    <PerfilUsuario 
      v-else-if="mostrarPerfil" 
      @volver="cerrarPerfilUsuario"
      :contactos="contactos"
      :eventos="eventos"
      :recordatorios="recordatorios"
    />
    <div v-else class="main-content">
      <Header @show-login="showLogin" />
      
      <div class="app-container">
        <!-- Barra lateral con botones -->
        <div class="sidebar">
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
          <!-- ✅ Calendario muestra eventos desde el backend -->
          <CalendarioInteractivo :events="eventos" />
        </div>
      </div>

      <!-- ✅ Modales -->
      <FormularioContacto
        v-if="mostrarModalContacto"
        ref="formularioContactoRef"
        @cerrar="cerrarModalContacto"
        @guardar="guardarContacto"
        />

      <FormularioEvento 
        v-if="mostrarModalEvento" 
        ref="formularioEventoRef" 
        @cerrar="cerrarModalEvento" 
        @guardar="guardarEvento" 
      />

      <FormularioRecordatorio
        v-if="mostrarModalRecordatorio" 
        ref="formularioRecordatorioRef" 
        @cerrar="cerrarModalRecordatorio" 
        @guardar="guardarRecordatorio" 
      />

      <Contactos
        v-if="mostrarContactos"
        :contactos="this.contactos"
        @cerrar="cerrarContactosModal"
      />
      <Eventos
      v-if="mostrarEventos"
      :eventos="this.eventos"
      @cerrar="cerrarEventosModal"
       />
      <Recordatorios 
        v-if="mostrarRecordatorios" 
        :recordatorios="this.recordatorios" 
        @cerrar="cerrarRecordatoriosModal" 
      />

      <!-- Perfil de Usuario -->
      <PerfilUsuario
        v-if="mostrarPerfil"
        :contactos="this.contactos"
        :eventos="this.eventos"
        :recordatorios="this.recordatorios"
        @cerrar="cerrarPerfilUsuario"
      />

    </div>
    <div class="footer-wrapper" v-if="isLoggedIn">
      <Footer />
    </div>
  </div>  
</template>

<script>
import Login from './Login.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import FormularioContacto from './FormularioContacto.vue';
import Contactos from './Contactos.vue';
import Eventos from './Eventos.vue';
import FormularioEvento from './FormularioEvento.vue';
import FormularioRecordatorio from './FormularioRecordatorio.vue';
import CalendarioInteractivo from './CalendarioInteractivo.vue';
import { createRecordatorio, getRecordatorios } from '@/services/recordatorioServices'; //importar los gets para recordatorios
import RecordatorioModal from './RecordatorioModal.vue'; // import del modal
import Recordatorios from './Recordatorios.vue'; 
import { getEventos } from '@/services/eventoServices'; //  Importar servicio de eventos
import { getContactos, deleteContacto, updateContacto } from '@/services/contactoServices'; //import de los gets de contactos
import PerfilUsuario from './PerfilUsuario.vue';

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
    Recordatorios,
    PerfilUsuario
  },
  data() {
    return {
      isLoggedIn: true, // Modificado para saltar la pantalla de login
      eventos: [],
      contactos: [],
      mostrarContactos: false,
      mostrarEventos: false,
      mostrarModalContacto: false,
      mostrarModalEvento: false,
      mostrarModalRecordatorio: false,
      mostrarRecordatorios: false,
      FormularioContacto: false,
      mostrarFormularioContacto: false,
      recordatorios: [],
      mostrarPerfil: false
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
    },
    showLogin() {
      this.isLoggedIn = false;
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
      this.mostrarEventos = true;
    },
    mostrarFormularioRecordatorio() {
      // Primero limpiamos cualquier residuo de modal anterior
      this.limpiarResidualModal();
      // Luego mostramos el modal actual
      this.mostrarModalRecordatorio = true;
    },
    cerrarModalRecordatorio() {
      this.mostrarModalRecordatorio = false;
      this.limpiarResidualModal();
    },
    mostrarRecordatoriosModal() {
      this.mostrarRecordatorios = true;
    },
    cerrarRecordatoriosModal() {
      this.mostrarRecordatorios = false;
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
      this.mostrarContactos = true;
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
    async guardarRecordatorio(recordatorio) {
      this.recordatorios.push(recordatorio);
      console.log('Recordatorio guardado:', recordatorio)
      this.cerrarModalRecordatorio();
    },
    async guardarContacto(contacto) {
      console.log('Nuevo contacto recibido:', contacto);
      this.contactos.push(contacto);
      this.cerrarContactosModal();
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
    },
    mostrarPerfilUsuario() {
      this.mostrarPerfil = true;
    },
    cerrarPerfilUsuario() {
      this.mostrarPerfil = false;
      this.limpiarResidualModal();
    },
    
    // Método centralizado para limpiar residuales de modales
    limpiarResidualModal() {
      // Eliminar la clase modal-open del body
      document.body.classList.remove('modal-open');
      
      // Eliminar cualquier backdrop modal que pueda quedar
      const backdrops = document.getElementsByClassName('modal-backdrop');
      while(backdrops.length > 0) {
        backdrops[0].parentNode.removeChild(backdrops[0]);
      }
      
      // Eliminar cualquier modal que quede en el DOM
      const modals = document.querySelectorAll('.modal');
      modals.forEach(modal => {
        if (modal && modal.style) {
          modal.style.display = 'none';
          modal.classList.remove('show');
          modal.setAttribute('aria-hidden', 'true');
          modal.removeAttribute('aria-modal');
          modal.removeAttribute('role');
        }
      });
      
      // Desbloquear el scroll
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }
};
</script>

<style scoped>
/* Estilos unificados */
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  background-color: white;
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
  width: 250px;
  min-width: 250px;
  background-color: var(--neutral-100);
  border-radius: 10px;
  box-shadow: var(--shadow-md);
  padding: 15px;
  margin-top: 20px;
  border: 1px solid var(--neutral-300);
  align-self: flex-start;
  position: sticky;
  top: 90px; /* Ajustado para que quede por debajo del header fijo */
  font-size: 0.92em; /* Texto ligeramente más pequeño */
}

.sidebar-section {
  margin-bottom: 25px;
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
  display: block;
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 10px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
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
  display: flex;
  align-items: center;
  justify-content: center;
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
