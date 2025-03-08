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
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          },
          eventColor: '#4728fe', // color3
          eventBorderColor: '#633afe', // color4
          eventTextColor: '#ffffff',
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
    width: 95%;
    max-width: 1200px;
    height: 80vh; /* Aumentamos la altura */
  }
  
  /* Paleta de colores azules */
  .fc-button {
    background-color: #4728fe; /* color3 */
    border-color: #4728fe;
  }
  
  .fc-button:hover {
    background-color: #633afe; /* color4 */
    border-color: #633afe;
  }
  
  .fc-today-button {
    background-color: #804cff; /* color5 */
    border-color: #804cff;
  }
  
  .fc-today-button:hover {
    background-color: #633afe; /* color4 */
    border-color: #633afe;
  }
  </style>