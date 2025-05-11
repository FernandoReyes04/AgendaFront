<template>
  <div class="perfil-page">
    <Header :enPerfil="true" @volver-agenda="$emit('volver')" />
    <div class="perfil-contenedor">
    
    <!-- Encabezado del perfil -->
    <div class="perfil-header">
      <div class="avatar-container">
        <div class="avatar">
          <span>RS</span>
        </div>
      </div>
      <div class="info-usuario">
        <h2 class="nombre-usuario">Raul Sosa</h2>
        <p class="correo-usuario">raul@ejemplo.com</p>
        <div class="estadisticas">
          <div class="stat-item">
            <span class="stat-numero">{{ contactos.length }}</span>
            <span class="stat-label">Contactos</span>
          </div>
          <div class="stat-item">
            <span class="stat-numero">{{ eventos.length }}</span>
            <span class="stat-label">Eventos</span>
          </div>
          <div class="stat-item">
            <span class="stat-numero">{{ recordatorios.length }}</span>
            <span class="stat-label">Recordatorios</span>
          </div>
        </div>
      </div>
      <div class="acciones">
        <button class="btn-editar">
          <i class="fas fa-pencil-alt"></i> Editar Perfil
        </button>
      </div>
    </div>

    <!-- Contenido principal con listas directas -->
    <div class="perfil-content">
      <!-- SECCIÓN DE CONTACTOS -->
      <div class="seccion-lista">
        <h3 class="seccion-titulo"><i class="fas fa-address-book"></i> Mis Contactos</h3>
        
        <div class="lista-elementos">
          <div v-for="(contacto, index) in contactos" :key="'contacto-'+index" class="elemento-tarjeta contacto-tarjeta">
            <div class="contacto-info">
              <div class="contacto-avatar">{{ obtenerIniciales(contacto.first_name, contacto.last_name) }}</div>
              <div class="contacto-detalles">
                <h4>{{ contacto.first_name }} {{ contacto.last_name }}</h4>
                <p><i class="fas fa-phone"></i> {{ contacto.phone_number }}</p>
                <p><i class="fas fa-envelope"></i> {{ contacto.email }}</p>
              </div>
            </div>
            <div class="contacto-actions-container">
              <div class="contacto-actions">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
              <div class="contacto-notes-section">
                <div class="contacto-notes-content">
                  <p v-if="contacto.notes">{{ contacto.notes }}</p>
                  <p v-else class="empty-notes">Sin notas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN DE EVENTOS -->
      <div class="seccion-lista">
        <h3 class="seccion-titulo"><i class="fas fa-calendar-alt"></i> Mis Eventos</h3>
        
        <div class="lista-elementos">
          <div v-for="(evento, index) in eventos" :key="'evento-'+index" class="elemento-tarjeta evento-tarjeta">
            <div class="evento-info">
              <div class="evento-fecha">
                <div class="fecha-dia">{{ obtenerDia(evento.date) }}</div>
                <div class="fecha-mes">{{ obtenerMes(evento.date) }}</div>
              </div>
              <div class="evento-detalles">
                <h4>{{ evento.name }}</h4>
                <p><i class="fas fa-clock"></i> {{ evento.hour }}</p>
                <p><i class="fas fa-map-marker-alt"></i> {{ evento.location || 'Sin ubicación' }}</p>
              </div>
            </div>
            <div class="evento-actions-container">
              <div class="evento-actions">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
              <div class="evento-desc-section">
                <div class="evento-desc-content">
                  <p v-if="evento.description">{{ evento.description }}</p>
                  <p v-else class="empty-desc">Sin descripción</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN DE RECORDATORIOS -->
      <div class="seccion-lista">
        <h3 class="seccion-titulo"><i class="fas fa-bell"></i> Mis Recordatorios</h3>
        
        <div class="lista-elementos">
          <div v-for="(recordatorio, index) in recordatorios" :key="'recordatorio-'+index" class="elemento-tarjeta recordatorio-tarjeta">
            <div class="recordatorio-info">
              <div class="recordatorio-fecha">
                <div class="fecha-dia">{{ obtenerDia(recordatorio.date) }}</div>
                <div class="fecha-mes">{{ obtenerMes(recordatorio.date) }}</div>
              </div>
              <div class="recordatorio-detalles">
                <h4>{{ recordatorio.name }}</h4>
                <p><i class="fas fa-clock"></i> {{ recordatorio.hour }}</p>
                <p><i class="fas fa-envelope"></i> {{ recordatorio.email }}</p>
              </div>
            </div>
            <div class="recordatorio-estado">
              <span class="estado" :class="recordatorio.completed ? 'completado' : 'pendiente'">
                {{ recordatorio.completed ? 'Completado' : 'Pendiente' }}
              </span>
              <span class="prioridad" :class="'prioridad-' + recordatorio.priority.toLowerCase()">
                {{ recordatorio.priority }}
              </span>
            </div>
            <div class="recordatorio-actions-container">
              <div class="recordatorio-actions">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
              <div class="recordatorio-desc-section">
                <div class="recordatorio-desc-content">
                  <p v-if="recordatorio.description">{{ recordatorio.description }}</p>
                  <p v-else class="empty-desc">Sin notas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
  name: 'PerfilSimple',
  components: {
    Header
  },
  props: {
    contactos: {
      type: Array,
      default: () => [
        { first_name: 'Juan', last_name: 'Pérez', phone_number: '555-123-4567', email: 'juan.perez@ejemplo.com', notes: 'Amigo del trabajo' },
        { first_name: 'María', last_name: 'González', phone_number: '555-987-6543', email: 'maria.gonzalez@ejemplo.com', notes: 'Cliente importante' },
        { first_name: 'Carlos', last_name: 'Rodríguez', phone_number: '555-456-7890', email: 'carlos.rodriguez@ejemplo.com', notes: 'Familiar' }
      ]
    },
    eventos: {
      type: Array,
      default: () => [
        { name: 'Reunión de trabajo', date: '2025-05-10', hour: '09:00', location: 'Oficina central', description: 'Revisión del proyecto con el equipo de desarrollo' },
        { name: 'Cumpleaños de Ana', date: '2025-05-15', hour: '18:00', location: 'Restaurante La Terraza', description: 'Llevar regalo y confirmar asistencia' }
      ]
    },
    recordatorios: {
      type: Array,
      default: () => [
        { name: 'Llamar al dentista', date: '2025-05-07', hour: '10:00', email: 'raul@ejemplo.com', completed: false, priority: 'Alta', description: 'Agendar cita para limpieza dental' },
        { name: 'Pagar factura de luz', date: '2025-05-12', hour: '12:00', email: 'raul@ejemplo.com', completed: true, priority: 'Alta', description: 'Fecha límite: 15 de mayo' }
      ]
    }
  },
  data() {
    return {
      expandedContactoNotes: {},
      expandedEventoDetails: {},
      expandedRecordatorioDetails: {}
    };
  },
  methods: {
    obtenerIniciales(nombre, apellido) {
      return (nombre ? nombre.charAt(0) : '') + (apellido ? apellido.charAt(0) : '');
    },
    obtenerDia(fecha) {
      return fecha ? fecha.split('-')[2] : '';
    },
    obtenerMes(fecha) {
      const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      return fecha ? meses[parseInt(fecha.split('-')[1]) - 1] : '';
    },
    // Métodos para las notas desplegables de contactos
    toggleContactoNotes(index) {
      this.$set(this.expandedContactoNotes, index, !this.expandedContactoNotes[index]);
    },
    isContactoExpanded(index) {
      return !!this.expandedContactoNotes[index];
    },
    // Métodos para los detalles desplegables de eventos
    toggleEventoDetails(index) {
      this.$set(this.expandedEventoDetails, index, !this.expandedEventoDetails[index]);
    },
    isEventoExpanded(index) {
      return !!this.expandedEventoDetails[index];
    },
    // Métodos para los detalles desplegables de recordatorios
    toggleRecordatorioDetails(index) {
      this.$set(this.expandedRecordatorioDetails, index, !this.expandedRecordatorioDetails[index]);
    },
    isRecordatorioExpanded(index) {
      return !!this.expandedRecordatorioDetails[index];
    }
  }
};
</script>

<style scoped>
/* Estilos generales */
.perfil-page {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background-color: #f8f9fa;
  position: relative;
}

.perfil-contenedor {
  width: 100%;
  padding: 0 0 100px 0;
  display: flex;
  flex-direction: column;
}

/* Estilos para el encabezado del perfil */
.perfil-header {
  background-color: #1b263b; /* Oxford Blue */
  color: #e0e1dd; /* Platinum */
  padding: 30px;
  display: flex;
  align-items: center;
  border-bottom: 4px solid #415a77; /* Yinmn Blue */
  margin-bottom: 20px;
}

.avatar-container {
  margin-right: 25px;
}

.avatar {
  width: 80px;
  height: 80px;
  background-color: #415a77; /* Yinmn Blue */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
  color: #e0e1dd; /* Platinum */
  border: 3px solid #778da9; /* Silver Lake Blue */
}

.info-usuario {
  flex: 1;
}

.nombre-usuario {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.correo-usuario {
  margin: 5px 0 15px;
  font-size: 1rem;
  opacity: 0.8;
}

.estadisticas {
  display: flex;
  gap: 20px;
}

.stat-item {
  text-align: center;
}

.stat-numero {
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.btn-editar {
  background-color: #415a77; /* Yinmn Blue */
  color: #e0e1dd; /* Platinum */
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.btn-editar:hover {
  background-color: #778da9; /* Silver Lake Blue */
}

/* Contenido principal */
.perfil-content {
  padding: 0 30px 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.seccion-titulo {
  color: #0d1b2a; /* Rich Black */
  font-size: 1.5rem;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #415a77; /* Yinmn Blue */
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Estilos para las tarjetas */
.lista-elementos {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.elemento-tarjeta {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.elemento-tarjeta:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* Estilos para tarjetas de contacto */
.contacto-tarjeta {
  border-left: 4px solid #1b263b; /* Oxford Blue */
}

.contacto-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.contacto-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #415a77; /* Yinmn Blue */
  color: #e0e1dd; /* Platinum */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
}

.contacto-detalles h4 {
  margin: 0 0 5px 0;
  color: #0d1b2a; /* Rich Black */
}

.contacto-detalles p {
  margin: 2px 0;
  color: #415a77; /* Yinmn Blue */
  font-size: 0.9rem;
}

/* Estilos para tarjetas de evento */
.evento-tarjeta {
  border-left: 4px solid #778da9; /* Silver Lake Blue */
}

.evento-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.evento-fecha {
  width: 60px;
  height: 60px;
  background-color: #415a77; /* Yinmn Blue */
  color: #e0e1dd; /* Platinum */
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.fecha-dia {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
}

.fecha-mes {
  font-size: 0.8rem;
  text-transform: uppercase;
}

.evento-detalles h4 {
  margin: 0 0 5px 0;
  color: #0d1b2a; /* Rich Black */
}

.evento-detalles p {
  margin: 2px 0;
  color: #415a77; /* Yinmn Blue */
  font-size: 0.9rem;
}

/* Estilos para tarjetas de recordatorio */
.recordatorio-tarjeta {
  border-left: 4px solid #415a77; /* Yinmn Blue */
}

.recordatorio-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.recordatorio-fecha {
  width: 60px;
  height: 60px;
  background-color: #778da9; /* Silver Lake Blue */
  color: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.recordatorio-estado {
  margin: 10px 0;
  display: flex;
  gap: 10px;
  align-items: center;
}

.estado, .prioridad {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.prioridad {
  text-align: center;
  min-width: 60px;
}

.prioridad-alta {
  background-color: #ffebee;
  color: #c62828;
}

.prioridad-media {
  background-color: #fff8e1;
  color: #f57f17;
}

.prioridad-baja {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.completado {
  background-color: #d4edda;
  color: #155724;
}

.pendiente {
  background-color: #fff3cd;
  color: #856404;
}

.recordatorio-detalles h4 {
  margin: 0 0 5px 0;
  color: #0d1b2a; /* Rich Black */
}

.recordatorio-detalles p {
  margin: 2px 0;
  color: #415a77; /* Yinmn Blue */
  font-size: 0.9rem;
}

/* Estilos para secciones desplegables */
.contacto-actions-container,
.evento-actions-container,
.recordatorio-actions-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 10px;
}

.contacto-actions,
.evento-actions,
.recordatorio-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
}

.contacto-notes-section,
.evento-desc-section,
.recordatorio-desc-section {
  width: 100%;
  margin-top: 8px;
}

.contacto-notes-content,
.evento-desc-content,
.recordatorio-desc-content {
  padding: 12px;
  background-color: #e0e1dd; /* Platinum */
  border-radius: 6px;
  margin-top: 6px;
  color: #0d1b2a; /* Rich Black */
  font-size: 0.92rem;
  line-height: 1.5;
  border-left: 3px solid #415a77; /* Yinmn Blue */
  transition: all 0.3s ease;
}

.notes-toggle,
.desc-toggle {
  background-color: transparent;
  border: none;
  color: #415a77; /* Yinmn Blue */
  font-size: 0.9rem;
  cursor: pointer;
  padding: 6px 0;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}

.notes-toggle:hover,
.desc-toggle:hover {
  color: #1b263b; /* Oxford Blue */
  text-decoration: underline;
}

.notes-toggle::before,
.desc-toggle::before {
  content: '\25B6';
  font-size: 0.7rem;
  margin-right: 5px;
  transition: transform 0.3s ease;
}

.notes-toggle.expanded::before,
.desc-toggle.expanded::before {
  transform: rotate(90deg);
}

.notes-toggle.expanded,
.desc-toggle.expanded {
  font-weight: 600;
  color: #1b263b; /* Oxford Blue */
}

.empty-notes,
.empty-desc {
  font-style: italic;
  color: #778da9; /* Silver Lake Blue */
}

.btn-accion {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-accion.editar {
  color: #415a77; /* Yinmn Blue */
}

.btn-accion.editar:hover {
  background-color: rgba(65, 90, 119, 0.1);
}

.btn-accion.eliminar {
  color: #c62828;
}

.btn-accion.eliminar:hover {
  background-color: rgba(198, 40, 40, 0.1);
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .perfil-header {
    flex-direction: column;
    text-align: center;
  }
  
  .avatar-container {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .estadisticas {
    justify-content: center;
  }
  
  .acciones {
    margin-top: 15px;
  }
}
</style>
