<template>
    <div class="calendar-interactive-container">
      <FullCalendar :options="calendarOptions" />
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
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          },
        },
      };
    },
    watch: {
      events: {
        handler(newEvents) {
          this.calendarOptions.events = newEvents;
        },
        deep: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .calendar-interactive-container {
    margin-top: 20px;
    margin-bottom: 150px; /* Mayor espacio para evitar superposición con el footer */
    width: 100%;
    max-width: 1050px; /* Ligeramente más ancho */
    height: auto; /* Altura automática */
    min-height: 520px; /* Un poco más alto */
    padding: 20px; /* Padding alrededor del calendario */
    position: relative;
    z-index: 1; /* Asegura que el calendario esté por debajo del footer */
    background-color: var(--neutral-100);
    border-radius: 10px;
    box-shadow: var(--shadow-lg), 0 0 0 1px var(--neutral-300);
    border: 1px solid var(--neutral-300);
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
    color: var(--neutral-100) !important;
    padding: 10px 0 !important;
    font-weight: 600 !important;
  }
  
  :deep(.fc-toolbar-title) {
    color: var(--text-primary) !important;
    font-weight: 700 !important;
  }
  </style>