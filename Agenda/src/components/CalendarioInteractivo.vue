<template>
    <div class="calendar-interactive-container">
      <FullCalendar :options="calendarOptions" />
    </div>
    
    <!-- Alerta personalizada para fechas pasadas -->
    <div v-if="showAlert" class="custom-alert-overlay">
      <div class="custom-alert">
        <div class="alert-header">
          <div class="alert-icon">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <h4>Fecha no disponible</h4>
        </div>
        <div class="alert-body">
          <p>No es posible programar eventos o recordatorios en fechas u horas que ya han pasado.</p>
        </div>
        <div class="alert-footer">
          <button class="alert-button" @click="closeAlert">Entendido</button>
        </div>
      </div>
    </div>
    
    <!-- Modal para seleccionar el tipo de entrada a crear -->
    <div v-if="showModal" class="calendar-action-modal">
      <div class="calendar-action-content">
        <div class="modal-header">
          <h5 class="modal-title">Añadir para {{ fechaSeleccionada }}</h5>
          <button type="button" class="btn-cerrar" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="action-buttons">
            <button class="action-btn evento-btn" @click="crearEvento">
              <i class="fas fa-calendar-plus"></i>
              <span>Crear Evento</span>
            </button>
            <button class="action-btn recordatorio-btn" @click="crearRecordatorio">
              <i class="fas fa-bell"></i>
              <span>Crear Recordatorio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  
  export default {
    
    components: {
      FullCalendar,
    },
    props: ['events'],
    data() {
      return {
        showModal: false,
        showAlert: false,
        fechaSeleccionada: '',
        selectedDate: null,
        calendarOptions: {
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
          initialView: 'dayGridMonth',
          weekends: true,
          editable: true,
          selectable: true,
          selectMirror: true,
          dayMaxEvents: true,
          events: this.events,
          locale: 'es',
          // Manejador para detectar clics en fechas
          dateClick: this.handleDateClick,
          buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            list: 'Lista'
          },
          // Nombres de los días
          dayHeaderFormat: { weekday: 'short' },
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          },
          eventColor: 'var(--primary-color)',
          eventBorderColor: 'var(--primary-light)',
          eventTextColor: 'var(--neutral-100)',
          // Asegurarnos de que se muestre el título del evento en todas las vistas
          displayEventTime: true,
          displayEventEnd: true,
          eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false
          },
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          },
          // Personalización de eventos
          eventContent: function(arg) {
            let titleEl = document.createElement('div');
            titleEl.innerHTML = '<strong>' + arg.event.title + '</strong>';
            titleEl.className = 'fc-event-title-custom';
            
            let timeEl = null;
            if (arg.event.start) {
              timeEl = document.createElement('div');
              let time = arg.event.start.getHours() + ':' + 
                (arg.event.start.getMinutes() < 10 ? '0' : '') + 
                arg.event.start.getMinutes();
              timeEl.innerHTML = time;
              timeEl.className = 'fc-event-time-custom';
            }
            
            let arrayOfDomNodes = [ titleEl ];
            if (timeEl) arrayOfDomNodes.push(timeEl);
            
            return { domNodes: arrayOfDomNodes };
          },
          
        },
      };
    },
    methods: {
      // Maneja el clic en una fecha del calendario
      handleDateClick(info) {
        const fechaSeleccionada = new Date(info.date);
        const fechaActual = new Date();
        
        // Verificar si la fecha seleccionada es anterior a la fecha actual
        // Crear copias de las fechas solo para comparar las partes de la fecha (sin hora)
        const soloFechaSeleccionada = new Date(fechaSeleccionada);
        const soloFechaActual = new Date(fechaActual);
        
        // Eliminar las horas, minutos, segundos y milisegundos para comparar solo las fechas
        soloFechaSeleccionada.setHours(0, 0, 0, 0);
        soloFechaActual.setHours(0, 0, 0, 0);
        
        // Verificar si la fecha seleccionada es anterior a la fecha actual
        if (soloFechaSeleccionada < soloFechaActual) {
          // Mostrar alerta personalizada si la fecha ya pasó
          this.showAlert = true;
          return;
        }
        
        // Si es el mismo día, verificar también la hora
        const esMismoDia = soloFechaSeleccionada.getTime() === soloFechaActual.getTime();
        
        if (esMismoDia) {
          // Verificar si la hora seleccionada es anterior a la hora actual
          const horaSeleccionada = fechaSeleccionada.getHours();
          const minutosSeleccionados = fechaSeleccionada.getMinutes();
          const horaActual = fechaActual.getHours();
          const minutosActuales = fechaActual.getMinutes();
          
          // Convertir a minutos totales para una comparación más sencilla
          const minutosSeleccionadosTotales = (horaSeleccionada * 60) + minutosSeleccionados;
          const minutosActualesTotales = (horaActual * 60) + minutosActuales;
          
          // Si la hora seleccionada ya pasó, mostrar alerta
          if (minutosSeleccionadosTotales < minutosActualesTotales) {
            this.showAlert = true;
            return;
          }
        }
        
        this.selectedDate = info.date;
        
        // Formatear la fecha en formato legible (día/mes/año)
        const dia = fechaSeleccionada.getDate();
        const mes = fechaSeleccionada.toLocaleString('es', { month: 'long' });
        const año = fechaSeleccionada.getFullYear();
        this.fechaSeleccionada = `${dia} de ${mes} de ${año}`;
        
        // Mostrar el modal
        this.showModal = true;
      },
      
      // Cierra el modal
      closeModal() {
        this.showModal = false;
      },
      
      // Cierra la alerta personalizada
      closeAlert() {
        this.showAlert = false;
      },
      
      // Emite evento para crear un evento en la fecha seleccionada
      crearEvento() {
        this.$emit('crear-evento', this.selectedDate);
        this.closeModal();
      },
      
      // Emite evento para crear un recordatorio en la fecha seleccionada
      crearRecordatorio() {
        this.$emit('crear-recordatorio', this.selectedDate);
        this.closeModal();
      }
    },
    
    watch: {
      events: {
        handler(newEvents) {
          this.calendarOptions.events = newEvents;
        },
        deep: true,
      },
    },
    emits: ['crearEvento', 'crearRecordatorio'] // ✅ Agrega esto
  };
  </script>
  
  <style scoped>
  .calendar-interactive-container {
    margin-top: 20px;
    margin-bottom: 50px; /* Menor espacio para evitar superposición con el footer */
    width: 100%;
    max-width: 1050px; /* Ligeramente más ancho */
    height: auto; /* Altura automática */
    min-height: 650px; /* Más alto para mejor visualización */
    padding: 20px; /* Padding alrededor del calendario */
    position: relative;
    z-index: 1; /* Asegura que el calendario esté por debajo del footer */
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(13, 27, 42, 0.1);
    border: 1px solid #e0e1dd;
  }

  /* Estilos para el modal de acciones del calendario */
  .calendar-action-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(13, 27, 42, 0.7); /* Rich Black con transparencia */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }

  .calendar-action-content {
    background-color: #e0e1dd; /* Platinum */
    border-radius: 10px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 4px 20px rgba(13, 27, 42, 0.25);
    overflow: hidden;
    animation: slideUp 0.3s ease;
  }

  .modal-header {
    background-color: #1b263b; /* Oxford Blue */
    color: #e0e1dd; /* Platinum */
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
  }

  .btn-cerrar {
    background-color: #415a77; /* Yinmn Blue */
    border: none;
    color: #e0e1dd; /* Platinum */
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: all 0.2s ease;
  }
  
  .btn-cerrar:hover {
    background-color: #778da9; /* Silver Lake Blue */
    transform: scale(1.1);
  }

  /* Estilos para la alerta personalizada */
  .custom-alert-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(13, 27, 42, 0.75); /* Rich Black con transparencia */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    animation: fadeIn 0.2s ease;
  }
  
  .custom-alert {
    background-color: #e0e1dd; /* Platinum */
    border-radius: 10px;
    width: 90%;
    max-width: 350px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(13, 27, 42, 0.4);
    animation: scaleIn 0.3s ease;
  }
  
  .alert-header {
    background-color: #1b263b; /* Oxford Blue */
    color: #e0e1dd; /* Platinum */
    padding: 15px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .alert-icon {
    color: #ff6b6b; /* Rojo con tono que combina con la paleta */
    font-size: 1.5rem;
  }
  
  .alert-header h4 {
    margin: 0;
    font-weight: 500;
  }
  
  .alert-body {
    padding: 20px;
    color: #0d1b2a; /* Rich Black */
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  .alert-footer {
    padding: 10px 20px 20px;
    display: flex;
    justify-content: center;
  }
  
  .alert-button {
    background-color: #415a77; /* Yinmn Blue */
    color: #e0e1dd; /* Platinum */
    border: none;
    padding: 10px 25px;
    border-radius: 5px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(13, 27, 42, 0.2);
  }
  
  .alert-button:hover {
    background-color: #778da9; /* Silver Lake Blue */
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(13, 27, 42, 0.3);
  }
  
  @keyframes scaleIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  .modal-body {
    padding: 20px;
  }

  .action-buttons {
    display: flex;
    gap: 15px;
    flex-direction: column;
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    border: none;
    border-radius: 8px;
    padding: 15px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    justify-content: center;
  }

  .evento-btn {
    background-color: #415a77; /* Yinmn Blue */
    color: #e0e1dd; /* Platinum */
  }

  .evento-btn:hover {
    background-color: #778da9; /* Silver Lake Blue */
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(65, 90, 119, 0.2);
  }

  .recordatorio-btn {
    background-color: #1b263b; /* Oxford Blue */
    color: #e0e1dd; /* Platinum */
  }

  .recordatorio-btn:hover {
    background-color: #0d1b2a; /* Rich Black */
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(13, 27, 42, 0.2);
  }

  /* Animaciones */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  /* Estilo de calendario físico */
  :deep(.fc) {
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--neutral-100);
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    font-size: 1.02em; /* Aumenta ligeramente el tamaño de fuente */
  }
  
  /* Mejora las celdas de los días */
  :deep(.fc-daygrid-day) {
    min-height: 90px; /* Celdas más altas */
  }
  
  /* Números de día más visibles */
  :deep(.fc-daygrid-day-number) {
    font-size: 1.05em;
    font-weight: 500;
    padding: 5px 8px;
  }
  
  /* Dar aspecto de página de papel */
  :deep(.fc-view-harness) {
    background-color: var(--neutral-100);
    border: 1px solid var(--neutral-300) !important;
    border-radius: 0 0 8px 8px;
  }
  
  /* Cabecera del calendario con aspecto 3D */
  :deep(.fc-header-toolbar) {
    background-color: var(--primary-dark) !important;
    margin: 0 !important;
    padding: 15px !important;
    border-radius: 8px 8px 0 0 !important;
    border-bottom: 3px solid var(--primary-color) !important;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
  }
  
  /* Utilizando nuestra paleta de colores unificada */
  :deep(.fc-button-primary) {
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
    color: var(--neutral-100) !important;
    transition: all 0.3s ease !important;
    border-radius: 4px !important;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
  }
  
  :deep(.fc-button-primary:hover) {
    background-color: var(--primary-dark) !important;
    border-color: var(--primary-dark) !important;
    box-shadow: var(--shadow-sm) !important;
  }
  
  :deep(.fc-button-primary:not(:disabled).fc-button-active) {
    background-color: var(--secondary-color) !important;
    border-color: var(--secondary-color) !important;
    color: var(--neutral-100) !important;
  }
  
  :deep(.fc-today-button) {
    background-color: var(--accent-color) !important;
    border-color: var(--accent-color) !important;
    color: var(--neutral-100) !important;
  }
  
  :deep(.fc-today-button:hover) {
    background-color: var(--accent-dark) !important;
    border-color: var(--accent-dark) !important;
    box-shadow: var(--shadow-sm) !important;
  }
  
  :deep(.fc-daygrid-day.fc-day-today) {
    background-color: rgba(0, 188, 212, 0.1) !important; /* secondary-color con opacidad */
  }
  
  /* Estilo para las celdas de días */
  :deep(.fc-daygrid-day) {
    border: 1px solid var(--neutral-300) !important;
    transition: background-color 0.2s ease;
  }
  
  :deep(.fc-daygrid-day:hover) {
    background-color: var(--neutral-200);
  }
  
  /* Estilo para números de día */
  :deep(.fc-daygrid-day-number) {
    font-weight: 500;
    padding: 8px !important;
  }
  
  /* Estilo para días de fin de semana */
  :deep(.fc-day-sat), :deep(.fc-day-sun) {
    background-color: var(--neutral-200);
  }
  
  /* Efecto de espiral en la parte superior del calendario */
  .calendar-interactive-container::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    height: 8px;
    background: repeating-linear-gradient(
      90deg,
      var(--neutral-400),
      var(--neutral-400) 6px,
      transparent 6px,
      transparent 20px
    );
    z-index: 2;
  }
  
  :deep(.fc-col-header-cell) {
    background-color: var(--primary-dark) !important;
    color: var(--neutral-100) !important;
  }
  
  :deep(.fc-scrollgrid-section-header th) {
    color: white !important;
    padding: 10px 0 !important;
    font-weight: 600 !important;
  }
  
  :deep(.fc-col-header-cell-cushion) {
    color: white !important;
  }
  
  :deep(.fc-toolbar-title) {
    color: white !important;
    font-weight: 700 !important;
    text-transform: capitalize !important;
  }

  /* Estilos para asegurar que los títulos de eventos se muestren correctamente */
  :deep(.fc-event-title) {
    font-weight: bold !important;
    font-size: 0.95em !important;
    padding: 2px 0 !important;
    display: block !important;
    white-space: normal !important;
    overflow: visible !important;
    line-height: 1.3 !important;
  }

  /* Mejorar visibilidad en vista mensual */
  :deep(.fc-daygrid-event .fc-event-title) {
    font-weight: bold !important;
    padding: 2px 4px !important;
    color: var(--neutral-100) !important;
  }

  /* Mejorar visibilidad en vista semanal y diaria */
  :deep(.fc-timegrid-event .fc-event-title) {
    font-size: 0.9em !important;
    font-weight: bold !important;
    color: var(--neutral-100) !important;
  }

  /* Contenedor del título */
  :deep(.fc-event-title-container) {
    padding: 1px 2px !important;
  }
  </style>