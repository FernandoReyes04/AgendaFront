<template>
  <div class="perfil-vista">
    <Header :enPerfil="true" @volver-agenda="$emit('volver')" />
    <div class="perfil-container">
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
            <span class="stat-numero">12</span>
            <span class="stat-label">Contactos</span>
          </div>
          <div class="stat-item">
            <span class="stat-numero">8</span>
            <span class="stat-label">Eventos</span>
          </div>
          <div class="stat-item">
            <span class="stat-numero">5</span>
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

    <!-- Navegación por pestañas -->
    <div class="tabs-container">
      <div class="tab-header">
        <button 
          class="tab-btn" 
          :class="{ 'active': pestanaActiva === 'contactos' }"
          @click="cambiarPestana('contactos')"
        >
          <i class="fas fa-address-book"></i> Mis Contactos
        </button>
        <button 
          class="tab-btn" 
          :class="{ 'active': pestanaActiva === 'eventos' }"
          @click="cambiarPestana('eventos')"
        >
          <i class="fas fa-calendar-alt"></i> Mis Eventos
        </button>
        <button 
          class="tab-btn" 
          :class="{ 'active': pestanaActiva === 'recordatorios' }"
          @click="cambiarPestana('recordatorios')"
        >
          <i class="fas fa-bell"></i> Mis Recordatorios
        </button>
      </div>

      <!-- Contenido de pestañas -->
      <div class="tab-content">
        <!-- Pestaña de Contactos -->
        <div v-if="pestanaActiva === 'contactos'" class="tab-pane">
          <div class="busqueda-container">
            <input type="text" class="busqueda-input" placeholder="Buscar contactos..." v-model="busquedaContactos">
            <button class="btn-buscar">
              <i class="fas fa-search"></i>
            </button>
          </div>
          
          <div class="lista-elementos">
            <!-- Ejemplos fijos de contactos -->
            <div class="elemento-tarjeta contacto-tarjeta">
              <div class="contacto-info">
                <div class="contacto-avatar">JP</div>
                <div class="contacto-detalles">
                  <h4>Juan Pérez</h4>
                  <p><i class="fas fa-phone"></i> 555-123-4567</p>
                  <p><i class="fas fa-envelope"></i> juan.perez@ejemplo.com</p>
                  <p class="contacto-notas"><i class="fas fa-sticky-note"></i> Amigo del trabajo</p>
                </div>
              </div>
              <div class="contacto-acciones">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            
            <div class="elemento-tarjeta contacto-tarjeta">
              <div class="contacto-info">
                <div class="contacto-avatar">MG</div>
                <div class="contacto-detalles">
                  <h4>María González</h4>
                  <p><i class="fas fa-phone"></i> 555-987-6543</p>
                  <p><i class="fas fa-envelope"></i> maria.gonzalez@ejemplo.com</p>
                  <p class="contacto-notas"><i class="fas fa-sticky-note"></i> Cliente importante</p>
                </div>
              </div>
              <div class="contacto-acciones">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            
            <div class="elemento-tarjeta contacto-tarjeta">
              <div class="contacto-info">
                <div class="contacto-avatar" style="background-color: #37b24d">CR</div>
                <div class="contacto-detalles">
                  <h4>Carlos Rodríguez</h4>
                  <p><i class="fas fa-phone"></i> 555-456-7890</p>
                  <p><i class="fas fa-envelope"></i> carlos.rodriguez@ejemplo.com</p>
                  <p class="contacto-notas"><i class="fas fa-sticky-note"></i> Familiar - Cumpleaños: 15 de agosto</p>
                </div>
              </div>
              <div class="contacto-acciones">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            
            <div class="elemento-tarjeta contacto-tarjeta">
              <div class="contacto-info">
                <div class="contacto-avatar" style="background-color: #f58634">LS</div>
                <div class="contacto-detalles">
                  <h4>Laura Sánchez</h4>
                  <p><i class="fas fa-phone"></i> 555-222-3333</p>
                  <p><i class="fas fa-envelope"></i> laura.sanchez@ejemplo.com</p>
                  <p class="contacto-notas"><i class="fas fa-sticky-note"></i> Compañera de universidad - Grupo de estudio</p>
                </div>
              </div>
              <div class="contacto-acciones">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>

            <!-- Los datos dinámicos-->
            <div class="elemento-tarjeta contacto-tarjeta" v-for="(contacto, index) in contactosFiltrados" :key="'contacto-'+index">
              <div class="contacto-info">
                <div class="contacto-avatar">{{ obtenerIniciales(contacto.first_name, contacto.last_name) }}</div>
                <div class="contacto-detalles">
                  <h4>{{ contacto.first_name }} {{ contacto.last_name }}</h4>
                  <p><i class="fas fa-phone"></i> {{ contacto.phone_number }}</p>
                  <p><i class="fas fa-envelope"></i> {{ contacto.email }}</p>
                  <p class="contacto-notas" v-if="contacto.notes"><i class="fas fa-sticky-note"></i> {{ contacto.notes }}</p>
                </div>
              </div>
              <div class="contacto-acciones">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            
            <div v-if="contactosFiltrados.length === 0" class="mensaje-vacio">
              <i class="fas fa-user-friends fa-3x"></i>
              <p>No hay contactos para mostrar</p>
            </div>
          </div>
        </div>

        <!-- Pestaña de Eventos -->
        <div v-if="pestanaActiva === 'eventos'" class="tab-pane">
          <div class="busqueda-container">
            <input type="text" class="busqueda-input" placeholder="Buscar eventos..." v-model="busquedaEventos">
            <button class="btn-buscar">
              <i class="fas fa-search"></i>
            </button>
          </div>
          
          <div class="lista-elementos">
            <!-- Ejemplos fijos para asegurar que se muestren -->
            <div class="elemento-tarjeta evento-tarjeta">
              <div class="evento-info">
                <div class="evento-fecha">
                  <div class="fecha-dia">10</div>
                  <div class="fecha-mes">May</div>
                </div>
                <div class="evento-detalles">
                  <h4>Reunión de trabajo</h4>
                  <p><i class="fas fa-clock"></i> 09:00</p>
                  <p><i class="fas fa-map-marker-alt"></i> Oficina central</p>
                  <p class="evento-descripcion"><i class="fas fa-info-circle"></i> Revisión del proyecto con el equipo de desarrollo</p>
                </div>
              </div>
              <div class="evento-acciones">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            
            <div class="elemento-tarjeta evento-tarjeta">
              <div class="evento-info">
                <div class="evento-fecha">
                  <div class="fecha-dia">15</div>
                  <div class="fecha-mes">May</div>
                </div>
                <div class="evento-detalles">
                  <h4>Cumpleaños de Ana</h4>
                  <p><i class="fas fa-clock"></i> 18:00</p>
                  <p><i class="fas fa-map-marker-alt"></i> Restaurante La Terraza</p>
                  <p class="evento-descripcion"><i class="fas fa-info-circle"></i> Llevar regalo y confirmar asistencia</p>
                </div>
              </div>
              <div class="evento-acciones">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            
            <div class="elemento-tarjeta evento-tarjeta">
              <div class="evento-info">
                <div class="evento-fecha" style="background-color: #37b24d">
                  <div class="fecha-dia">8</div>
                  <div class="fecha-mes">May</div>
                </div>
                <div class="evento-detalles">
                  <h4>Cita médica</h4>
                  <p><i class="fas fa-clock"></i> 11:30</p>
                  <p><i class="fas fa-map-marker-alt"></i> Clínica San Miguel</p>
                  <p class="evento-descripcion"><i class="fas fa-info-circle"></i> Revisión anual con Dr. Gutiérrez - Traer resultados de análisis previos</p>
                </div>
              </div>
              <div class="evento-acciones">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            
            <div class="elemento-tarjeta evento-tarjeta">
              <div class="evento-info">
                <div class="evento-fecha" style="background-color: #6c757d">
                  <div class="fecha-dia">11</div>
                  <div class="fecha-mes">May</div>
                </div>
                <div class="evento-detalles">
                  <h4>Clase de yoga</h4>
                  <p><i class="fas fa-clock"></i> 19:00</p>
                  <p><i class="fas fa-map-marker-alt"></i> Centro deportivo</p>
                  <p class="evento-descripcion"><i class="fas fa-info-circle"></i> Llevar esterilla y ropa cómoda. Instructor: Miguel Ángel - Salón 3</p>
                </div>
              </div>
              <div class="evento-acciones">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            
            <!-- Los datos dinamicos (que pueden no mostrarse correctamente aun) -->
            <div class="elemento-tarjeta evento-tarjeta" v-for="(evento, index) in eventosFiltrados" :key="'evento-'+index">
              <div class="evento-info">
                <div class="evento-fecha">
                  <div class="fecha-dia">{{ obtenerDia(evento.date) }}</div>
                  <div class="fecha-mes">{{ obtenerMes(evento.date) }}</div>
                </div>
                <div class="evento-detalles">
                  <h4>{{ evento.name }}</h4>
                  <p><i class="fas fa-clock"></i> {{ evento.hour }}</p>
                  <p><i class="fas fa-map-marker-alt"></i> {{ evento.location || 'Sin ubicación' }}</p>
                  <p class="evento-descripcion"><i class="fas fa-info-circle"></i> {{ evento.description || 'Sin descripción' }}</p>
                </div>
              </div>
              <div class="evento-acciones">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            
            <div v-if="eventosFiltrados.length === 0" class="mensaje-vacio">
              <i class="fas fa-calendar-day fa-3x"></i>
              <p>No hay eventos para mostrar</p>
            </div>
          </div>
        </div>

        <!-- Pestaña de Recordatorios -->
        <div v-if="pestanaActiva === 'recordatorios'" class="tab-pane">
          <div class="busqueda-container">
            <input type="text" class="busqueda-input" placeholder="Buscar recordatorios..." v-model="busquedaRecordatorios">
            <button class="btn-buscar">
              <i class="fas fa-search"></i>
            </button>
          </div>
          
          <div class="lista-elementos">
            <!-- Ejemplos fijos de recordatorios -->
            <div class="elemento-tarjeta recordatorio-tarjeta">
              <div class="recordatorio-info">
                <div class="recordatorio-fecha">
                  <div class="fecha-dia">7</div>
                  <div class="fecha-mes">May</div>
                </div>
                <div class="recordatorio-detalles">
                  <h4>Llamar al dentista</h4>
                  <p><i class="fas fa-clock"></i> 10:00</p>
                  <p><i class="fas fa-envelope"></i> raul@ejemplo.com</p>
                  <p class="recordatorio-descripcion"><i class="fas fa-info-circle"></i> Agendar cita para limpieza dental</p>
                </div>
              </div>
              <div class="recordatorio-estado">
                <span class="estado pendiente">Pendiente</span>
                <span class="prioridad prioridad-alta">Alta</span>
              </div>
              <div class="recordatorio-acciones">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            
            <div class="elemento-tarjeta recordatorio-tarjeta">
              <div class="recordatorio-info">
                <div class="recordatorio-fecha">
                  <div class="fecha-dia">12</div>
                  <div class="fecha-mes">May</div>
                </div>
                <div class="recordatorio-detalles">
                  <h4>Pagar factura de luz</h4>
                  <p><i class="fas fa-clock"></i> 12:00</p>
                  <p><i class="fas fa-envelope"></i> raul@ejemplo.com</p>
                  <p class="recordatorio-descripcion"><i class="fas fa-info-circle"></i> Fecha límite: 15 de mayo</p>
                </div>
              </div>
              <div class="recordatorio-estado">
                <span class="estado completado">Completado</span>
                <span class="prioridad prioridad-alta">Alta</span>
              </div>
              <div class="recordatorio-acciones">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            
            <div class="elemento-tarjeta recordatorio-tarjeta">
              <div class="recordatorio-info">
                <div class="recordatorio-fecha" style="background-color: #f58634">
                  <div class="fecha-dia">14</div>
                  <div class="fecha-mes">May</div>
                </div>
                <div class="recordatorio-detalles">
                  <h4>Comprar regalo</h4>
                  <p><i class="fas fa-clock"></i> 16:00</p>
                  <p><i class="fas fa-envelope"></i> raul@ejemplo.com</p>
                  <p class="recordatorio-descripcion"><i class="fas fa-info-circle"></i> Para el cumpleaños de Ana el 15 de mayo. Ideas: libro de cocina, plantas suculentas o set de té.</p>
                </div>
              </div>
              <div class="recordatorio-estado">
                <span class="estado pendiente">Pendiente</span>
                <span class="prioridad prioridad-media">Media</span>
              </div>
              <div class="recordatorio-acciones">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            
            <div class="elemento-tarjeta recordatorio-tarjeta">
              <div class="recordatorio-info">
                <div class="recordatorio-fecha" style="background-color: #6c757d">
                  <div class="fecha-dia">9</div>
                  <div class="fecha-mes">May</div>
                </div>
                <div class="recordatorio-detalles">
                  <h4>Recoger paquete</h4>
                  <p><i class="fas fa-clock"></i> 11:00</p>
                  <p><i class="fas fa-envelope"></i> raul@ejemplo.com</p>
                  <p class="recordatorio-descripcion"><i class="fas fa-info-circle"></i> En oficina de correos central. Número de seguimiento: TR-9874-5632. Llevar identificación oficial.</p>
                </div>
              </div>
              <div class="recordatorio-estado">
                <span class="estado pendiente">Pendiente</span>
                <span class="prioridad prioridad-baja">Baja</span>
              </div>
              <div class="recordatorio-acciones">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            
            <!-- Los datos dinámicos -->
            <div class="elemento-tarjeta recordatorio-tarjeta" v-for="(recordatorio, index) in recordatoriosFiltrados" :key="'recordatorio-'+index">
              <div class="recordatorio-info">
                <div class="recordatorio-fecha">
                  <div class="fecha-dia">{{ obtenerDia(recordatorio.date) }}</div>
                  <div class="fecha-mes">{{ obtenerMes(recordatorio.date) }}</div>
                </div>
                <div class="recordatorio-detalles">
                  <h4>{{ recordatorio.name }}</h4>
                  <p><i class="fas fa-clock"></i> {{ recordatorio.hour }}</p>
                  <p><i class="fas fa-envelope"></i> {{ recordatorio.email }}</p>
                  <p class="recordatorio-descripcion"><i class="fas fa-info-circle"></i> {{ recordatorio.description || 'Sin descripción' }}</p>
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
              <div class="recordatorio-acciones">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            
            <div v-if="recordatoriosFiltrados.length === 0" class="mensaje-vacio">
              <i class="fas fa-bell fa-3x"></i>
              <p>No hay recordatorios para mostrar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Se eliminó el botón para volver, ahora está en el header -->
  </div>
</div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';

export default {
  name: 'PerfilUsuario',
  components: {
    Header,
    Footer
  },
  props: {
    contactos: {
      type: Array,
      default: () => []
    },
    eventos: {
      type: Array,
      default: () => []
    },
    recordatorios: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      pestanaActiva: 'contactos',
      busquedaContactos: '',
      busquedaEventos: '',
      busquedaRecordatorios: '',
      // Datos de prueba
      contactos: [
        { first_name: 'Juan', last_name: 'Pérez', phone_number: '555-123-4567', email: 'juan.perez@ejemplo.com', notes: 'Amigo del trabajo' },
        { first_name: 'María', last_name: 'González', phone_number: '555-987-6543', email: 'maria.gonzalez@ejemplo.com', notes: 'Cliente importante' },
        { first_name: 'Carlos', last_name: 'Rodríguez', phone_number: '555-456-7890', email: 'carlos.rodriguez@ejemplo.com', notes: 'Familiar' },
        { first_name: 'Laura', last_name: 'Martínez', phone_number: '555-222-3333', email: 'laura.martinez@ejemplo.com', notes: 'Compañera de universidad' },
        { first_name: 'Roberto', last_name: 'Sánchez', phone_number: '555-777-8888', email: 'roberto.sanchez@ejemplo.com', notes: 'Proveedor de servicios' },
        { first_name: 'Ana', last_name: 'López', phone_number: '555-444-5555', email: 'ana.lopez@ejemplo.com', notes: 'Vecina del edificio' }
      ],
      eventos: [
        { name: 'Reunión de trabajo', date: '2025-05-10', hour: '09:00', location: 'Oficina central', description: 'Revisión del proyecto con el equipo de desarrollo' },
        { name: 'Cumpleaños de Ana', date: '2025-05-15', hour: '18:00', location: 'Restaurante La Terraza', description: 'Llevar regalo y confirmar asistencia' },
        { name: 'Presentación del proyecto', date: '2025-05-20', hour: '14:30', location: 'Sala de conferencias', description: 'Preparar diapositivas y material para la presentación' },
        { name: 'Cita médica', date: '2025-05-08', hour: '11:30', location: 'Clínica San Miguel', description: 'Revisión anual con Dr. Gutiérrez' },
        { name: 'Entrega de documentos', date: '2025-05-12', hour: '10:00', location: 'Oficina de trámites', description: 'Llevar formularios firmados y copias' },
        { name: 'Clase de yoga', date: '2025-05-11', hour: '19:00', location: 'Centro deportivo', description: 'Llevar esterilla y ropa cómoda' }
      ],
      recordatorios: [
        { name: 'Llamar al dentista', date: '2025-05-07', hour: '10:00', email: 'raul@ejemplo.com', completed: false, priority: 'Alta', description: 'Agendar cita para limpieza dental' },
        { name: 'Pagar factura de luz', date: '2025-05-12', hour: '12:00', email: 'raul@ejemplo.com', completed: true, priority: 'Alta', description: 'Fecha límite: 15 de mayo' },
        { name: 'Comprar regalo', date: '2025-05-14', hour: '16:00', email: 'raul@ejemplo.com', completed: false, priority: 'Media', description: 'Para el cumpleaños de Ana el 15 de mayo' },
        { name: 'Recoger paquete', date: '2025-05-09', hour: '11:00', email: 'raul@ejemplo.com', completed: false, priority: 'Baja', description: 'En oficina de correos, llevar identificación' },
        { name: 'Renovar suscripción', date: '2025-05-18', hour: '09:00', email: 'raul@ejemplo.com', completed: false, priority: 'Media', description: 'Servicio de streaming, revisar opciones de plan' },
        { name: 'Reunión virtual', date: '2025-05-08', hour: '15:30', email: 'raul@ejemplo.com', completed: true, priority: 'Alta', description: 'Videoconferencia con equipo internacional, preparar presentación' }
      ]
    };
  },
  computed: {
    contactosFiltrados() {
      if (!this.busquedaContactos) {
        console.log('Mostrando todos los contactos:', this.contactos);
        return this.contactos;
      }
      
      const busqueda = this.busquedaContactos.toLowerCase();
      return this.contactos.filter(contacto => 
        contacto.first_name.toLowerCase().includes(busqueda) ||
        contacto.last_name.toLowerCase().includes(busqueda) ||
        contacto.email.toLowerCase().includes(busqueda) ||
        contacto.phone_number.includes(busqueda)
      );
    },
    eventosFiltrados() {
      if (!this.busquedaEventos) {
        console.log('Mostrando todos los eventos:', this.eventos);
        return this.eventos;
      }
      
      const busqueda = this.busquedaEventos.toLowerCase();
      return this.eventos.filter(evento => 
        evento.name.toLowerCase().includes(busqueda) ||
        (evento.location && evento.location.toLowerCase().includes(busqueda))
      );
    },
    recordatoriosFiltrados() {
      if (!this.busquedaRecordatorios) {
        console.log('Mostrando todos los recordatorios:', this.recordatorios);
        return this.recordatorios;
      }
      
      const busqueda = this.busquedaRecordatorios.toLowerCase();
      return this.recordatorios.filter(recordatorio => 
        recordatorio.name.toLowerCase().includes(busqueda) ||
        recordatorio.email.toLowerCase().includes(busqueda)
      );
    }
  },
  methods: {
    cambiarPestana(pestana) {
      this.pestanaActiva = pestana;
    },
    obtenerIniciales(nombre, apellido) {
      return (nombre.charAt(0) + apellido.charAt(0)).toUpperCase();
    },
    obtenerDia(fecha) {
      return new Date(fecha).getDate();
    },
    obtenerMes(fecha) {
      const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      return meses[new Date(fecha).getMonth()];
    }
  }
};
</script>

<style scoped>
/* Estilos para la vista completa de perfil */
.perfil-vista {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
  padding-bottom: 50px;
  overflow-y: auto;
}

.perfil-container {
  flex: 1;
  padding-top: 100px; /* Aumentado para dejar más espacio para el header fijo */
  padding-bottom: 40px; /* Espacio para evitar que el contenido choque con el footer */
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  overflow-y: auto; /* Garantizar que se pueda hacer scroll si el contenido es muy largo */
}

.perfil-footer {
  margin-top: auto;
}

.volver-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
}

.btn-volver {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.btn-volver:hover {
  background-color: #3a5a9e;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-volver i {
  margin-right: 8px;
}

/* Colores principales de la aplicación */
:root {
  --primary-color: #4a6baf;
  --secondary-color: #f58634;
  --accent-color: #37b24d;
  --neutral-100: #f8f9fa;
  --neutral-200: #e9ecef;
  --neutral-300: #dee2e6;
  --neutral-400: #ced4da;
  --neutral-500: #adb5bd;
  --neutral-600: #6c757d;
  --neutral-700: #495057;
  --neutral-800: #343a40;
  --neutral-900: #212529;
}

/* Estilos generales */
.perfil-container {
  font-family: 'Poppins', sans-serif;
  background-color: var(--neutral-100);
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin: 20px;
  overflow: hidden;
}

/* Estilos para el encabezado del perfil */
.perfil-header {
  display: flex;
  padding: 25px;
  background-color: white;
  border-bottom: 1px solid var(--neutral-200);
  flex-wrap: wrap;
}

.avatar-container {
  margin-right: 25px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
}

.info-usuario {
  flex: 1;
}

.nombre-usuario {
  font-size: 1.8rem;
  margin-bottom: 5px;
  color: var(--neutral-800);
}

.correo-usuario {
  color: var(--neutral-600);
  margin-bottom: 15px;
}

.estadisticas {
  display: flex;
  gap: 25px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-numero {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--neutral-600);
}

.acciones {
  display: flex;
  align-items: flex-start;
}

.btn-editar {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 0.9rem;
}

.btn-editar:hover {
  background-color: #3a5a9e;
}

/* Estilos para las pestañas */
.tabs-container {
  background-color: white;
}

.tab-header {
  display: flex;
  border-bottom: 1px solid var(--neutral-300);
}

.tab-btn {
  flex: 1;
  padding: 15px;
  background-color: var(--neutral-100);
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  color: var(--neutral-700);
  border-bottom: 3px solid transparent;
}

.tab-btn:hover {
  background-color: white;
}

.tab-btn.active {
  background-color: white;
  color: var(--primary-color);
  border-bottom: 3px solid var(--primary-color);
}

.tab-content {
  min-height: 300px;
}

.tab-pane {
  padding: 20px 0;
  position: relative;
  z-index: 1;
}

/* Estilos para la búsqueda */
.busqueda-container {
  display: flex;
  margin-bottom: 20px;
}

.busqueda-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid var(--neutral-300);
  border-radius: 6px 0 0 6px;
  font-size: 0.9rem;
}

.btn-buscar {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0 6px 6px 0;
  padding: 10px 15px;
  cursor: pointer;
}

/* Estilos para las tarjetas */
.lista-elementos {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  position: relative;
  z-index: 5;
}

.elemento-tarjeta {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: transform 0.2s, box-shadow 0.3s;
  margin-bottom: 15px;
}

.elemento-tarjeta:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Estilos específicos para tarjetas de contacto */
.contacto-tarjeta {
  border-left: 4px solid var(--primary-color);
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
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
}

.contacto-detalles h4 {
  margin: 0 0 5px 0;
  color: var(--neutral-800);
}

.contacto-detalles p {
  margin: 2px 0;
  color: var(--neutral-600);
  font-size: 0.85rem;
}

/* Estilos específicos para tarjetas de evento */
.evento-tarjeta {
  border-left: 4px solid var(--secondary-color);
}

.evento-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.evento-fecha {
  width: 60px;
  height: 60px;
  background-color: var(--secondary-color);
  color: white;
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
  color: var(--neutral-800);
}

.evento-detalles p {
  margin: 2px 0;
  color: var(--neutral-600);
  font-size: 0.85rem;
}

/* Estilos específicos para tarjetas de recordatorio */
.recordatorio-tarjeta {
  border-left: 4px solid var(--accent-color);
}

.recordatorio-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.recordatorio-fecha {
  width: 60px;
  height: 60px;
  background-color: var(--accent-color);
  color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.recordatorio-estado {
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-end;
}

.estado, .prioridad {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
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
  color: var(--neutral-800);
}

.recordatorio-detalles p {
  margin: 2px 0;
  color: var(--neutral-600);
  font-size: 0.85rem;
}

.recordatorio-descripcion, .evento-descripcion, .contacto-notas {
  margin-top: 5px !important;
  font-style: italic;
  color: var(--neutral-700);
  background-color: var(--neutral-100);
  border-radius: 4px;
  padding: 5px 8px;
  border-left: 3px solid var(--neutral-300);
  font-size: 0.82rem !important;
  line-height: 1.3;
  max-width: 350px;
  white-space: normal;
  word-wrap: break-word;
}

.evento-descripcion i, .recordatorio-descripcion i {
  color: var(--neutral-600);
  margin-right: 5px;
}

/* Estilos para botones de acción */
.contacto-acciones,
.evento-acciones,
.recordatorio-acciones {
  display: flex;
  gap: 8px;
}

.btn-accion {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.editar {
  background-color: var(--neutral-200);
  color: var(--neutral-700);
}

.editar:hover {
  background-color: var(--primary-color);
  color: white;
}

.eliminar {
  background-color: var(--neutral-200);
  color: var(--neutral-700);
}

.eliminar:hover {
  background-color: #dc3545;
  color: white;
}

/* Estilos para mensaje vacío */
.mensaje-vacio {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  color: var(--neutral-500);
  text-align: center;
}

.mensaje-vacio i {
  margin-bottom: 15px;
}

.mensaje-vacio p {
  font-size: 1.1rem;
}

/* Responsividad */
@media (max-width: 768px) {
  .perfil-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .avatar-container {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .info-usuario {
    margin-bottom: 15px;
  }
  
  .estadisticas {
    justify-content: center;
  }
  
  .tab-header {
    flex-direction: column;
  }
  
  .elemento-tarjeta {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .contacto-acciones,
  .evento-acciones,
  .recordatorio-acciones {
    margin-top: 10px;
    align-self: flex-end;
  }
}
</style>
