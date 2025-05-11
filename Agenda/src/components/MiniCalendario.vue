<template>
  <div class="mini-calendar-container">
    <div class="mini-calendar-header">
      <button class="calendar-nav-btn" @click="mesAnterior">
        <i class="fas fa-chevron-left"></i>
      </button>
      <h3 class="month-title">{{ nombreMes }} {{ año }}</h3>
      <button class="calendar-nav-btn" @click="mesSiguiente">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    
    <div class="week-days">
      <span v-for="dia in diasSemana" :key="dia">{{ dia }}</span>
    </div>
    
    <div class="calendar-grid">
      <!-- Espacios en blanco para días antes del primer día del mes -->
      <div 
        class="calendar-day empty" 
        v-for="n in primerDiaMes" 
        :key="'empty-'+n"
      ></div>
      
      <!-- Días del mes actual -->
      <div 
        v-for="dia in diasEnMes" 
        :key="dia"
        class="calendar-day"
        :class="{
          'today': esHoy(dia),
          'has-event': tienePendientes(dia),
          'selected': diaSeleccionado === dia
        }"
        @click="seleccionarDia(dia)"
      >
        {{ dia }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
      mesActual: new Date().getMonth(),
      añoActual: new Date().getFullYear(),
      diaSeleccionado: new Date().getDate(),
      diasSemana: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    };
  },
  computed: {
    nombreMes() {
      const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
               'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      return meses[this.mesActual];
    },
    año() {
      return this.añoActual;
    },
    diasEnMes() {
      return new Date(this.añoActual, this.mesActual + 1, 0).getDate();
    },
    primerDiaMes() {
      // 0 es domingo, 1 es lunes, etc.
      return new Date(this.añoActual, this.mesActual, 1).getDay();
    }
  },
  methods: {
    mesAnterior() {
      if (this.mesActual === 0) {
        this.mesActual = 11;
        this.añoActual--;
      } else {
        this.mesActual--;
      }
    },
    mesSiguiente() {
      if (this.mesActual === 11) {
        this.mesActual = 0;
        this.añoActual++;
      } else {
        this.mesActual++;
      }
    },
    esHoy(dia) {
      const hoy = new Date();
      return dia === hoy.getDate() && 
             this.mesActual === hoy.getMonth() && 
             this.añoActual === hoy.getFullYear();
    },
    tienePendientes(dia) {
      // Verificar si hay eventos para este día
      return this.eventos.some(evento => {
        if (!evento.date) return false;
        
        const fechaEvento = new Date(evento.date);
        return fechaEvento.getDate() === dia &&
               fechaEvento.getMonth() === this.mesActual &&
               fechaEvento.getFullYear() === this.añoActual;
      }) || this.recordatorios.some(recordatorio => {
        if (!recordatorio.date) return false;
        
        const fechaRecordatorio = new Date(recordatorio.date);
        return fechaRecordatorio.getDate() === dia &&
               fechaRecordatorio.getMonth() === this.mesActual &&
               fechaRecordatorio.getFullYear() === this.añoActual;
      });
    },
    seleccionarDia(dia) {
      this.diaSeleccionado = dia;
      
      // Emitir evento con la fecha completa para permitir acciones en el componente padre
      const fechaSeleccionada = new Date(this.añoActual, this.mesActual, dia);
      this.$emit('seleccionar-fecha', fechaSeleccionada);
    }
  }
};
</script>

<style scoped>
.mini-calendar-container {
  background-color: var(--neutral-100);
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.85rem;
  margin-bottom: 20px;
  border: 1px solid var(--neutral-200);
}

.mini-calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.month-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
  color: var(--primary-color);
}

.calendar-nav-btn {
  background: none;
  border: none;
  color: var(--accent-color);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.calendar-nav-btn:hover {
  background-color: var(--accent-light);
  color: var(--accent-dark);
}

.week-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 600;
  color: var(--accent-dark);
  margin-bottom: 5px;
  font-size: 0.75rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  font-size: 0.8rem;
  transition: all 0.2s ease;
}

.calendar-day:hover {
  background-color: var(--neutral-200);
}

.calendar-day.empty {
  pointer-events: none;
}

.calendar-day.today {
  background-color: var(--primary-color);
  color: white;
  font-weight: 600;
}

.calendar-day.has-event {
  position: relative;
}

.calendar-day.has-event::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--accent-color);
}

.calendar-day.today.has-event::after {
  background-color: white;
}

.calendar-day.selected {
  background-color: var(--accent-color);
  color: white;
}
</style>
