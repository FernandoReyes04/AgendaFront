<template>
    <div class="modal fade show" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Mis Recordatorios</h5>
            <button type="button" class="btn-close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <div v-if="recordatorios.length > 0" class="recordatorios-list">
              <div v-for="(recordatorio, index) in recordatorios" :key="index" class="recordatorio-card">
                <div class="recordatorio-info">
                  <div class="recordatorio-title">{{ recordatorio.name }}</div>
                  <div class="recordatorio-datetime">
                    <span class="recordatorio-date"><i class="far fa-calendar-alt"></i> {{ recordatorio.date }}</span>
                    <span class="recordatorio-time" v-if="recordatorio.hour"><i class="far fa-clock"></i> {{ recordatorio.hour }}</span>
                  </div>
                  <div class="recordatorio-email" v-if="recordatorio.email">
                    <i class="far fa-envelope"></i> {{ recordatorio.email }}
                  </div>
                </div>
                <div class="recordatorio-details-section">
                  <button @click="toggleDescription(index)" class="details-toggle" :class="{'expanded': isExpanded(index)}">
                    <span v-if="!isExpanded(index)">Ver descripción</span>
                    <span v-else>Ocultar</span>
                  </button>
                  <div v-if="isExpanded(index)" class="recordatorio-description">
                    <p v-if="recordatorio.description">{{ recordatorio.description }}</p>
                    <p v-else class="empty-description">No hay descripción para este recordatorio</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="empty-list">
              <p>No tienes recordatorios.</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      recordatorios: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        expandedDescriptions: {}
      };
    },
    methods: {
      cerrarModal() {
        this.$emit('cerrar');
      },
      toggleDescription(index) {
        this.$set(this.expandedDescriptions, index, !this.expandedDescriptions[index]);
      },
      isExpanded(index) {
        return !!this.expandedDescriptions[index];
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-body {
    padding: 20px;
    max-height: 400px;
    overflow-y: auto;
    background-color: var(--neutral-200);
  }
  
  .recordatorios-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .recordatorio-card {
    display: flex;
    flex-direction: column;
    padding: 16px;
    background-color: var(--neutral-100);
    border-radius: 8px;
    box-shadow: var(--shadow-sm);
    border-left: 4px solid var(--primary-light);
    transition: all 0.2s ease;
    margin-bottom: 10px;
  }
  
  .recordatorio-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-left-color: var(--accent-color);
  }
  
  .recordatorio-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .recordatorio-title {
    font-weight: 600;
    font-size: 18px;
    color: var(--primary-color);
    margin-bottom: 4px;
    letter-spacing: 0.2px;
  }
  
  .recordatorio-datetime {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    align-items: center;
    font-size: 14px;
    padding: 6px 0;
    border-bottom: 1px solid var(--neutral-300);
  }
  
  .recordatorio-date {
    color: var(--accent-color);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .recordatorio-time {
    color: var(--secondary-color);
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .recordatorio-email {
    font-size: 14px;
    color: var(--text-secondary);
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .recordatorio-details-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 10px;
  }
  
  .details-toggle {
    background-color: transparent;
    color: var(--accent-color);
    border: none;
    font-size: 12px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s ease;
    margin-bottom: 6px;
    border: 1px solid var(--accent-color);
  }
  
  .details-toggle:hover {
    background-color: var(--accent-color);
    color: var(--text-light);
  }
  
  .details-toggle.expanded {
    background-color: var(--accent-color);
    color: var(--text-light);
  }
  
  .recordatorio-description {
    padding: 10px;
    background-color: var(--neutral-200);
    border-radius: 6px;
    font-size: 13px;
    color: var(--text-secondary);
    width: 100%;
    margin-top: 4px;
    border-left: 3px solid var(--accent-color);
    animation: fadeIn 0.3s ease;
    line-height: 1.5;
  }
  
  .empty-description {
    font-style: italic;
    color: var(--text-tertiary);
  }
  
  .empty-list {
    text-align: center;
    padding: 30px;
    color: var(--text-secondary);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  </style>