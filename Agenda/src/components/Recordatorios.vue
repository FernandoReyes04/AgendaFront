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
              <div v-for="(recordatorio, index) in recordatorios" :key="recordatorio.id || index" class="recordatorio-card">
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
                <div class="recordatorio-actions">
                  <button class="btn-accion editar">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn-accion eliminar" @click="$emit('eliminar', recordatorio.id)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
                <div class="recordatorio-details-section">
                  <div class="recordatorio-description">
                    <p v-if="recordatorio.description">{{ recordatorio.description }}</p>
                    <p v-else class="empty-description">Sin descripción</p>
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
  .recordatorio-card {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    border-left: 4px solid #415a77; /* Yinmn Blue */
  }

  .recordatorio-info {
    margin-bottom: 10px;
  }

  .recordatorio-title {
    font-weight: 600;
    font-size: 1.1rem;
    color: #1b263b; /* Oxford Blue */
    margin-bottom: 8px;
    font-family: 'Roboto', sans-serif;
  }

  .recordatorio-datetime {
    display: flex;
    gap: 15px;
    margin-bottom: 6px;
  }

  .recordatorio-date, .recordatorio-time, .recordatorio-email {
    color: #415a77; /* Yinmn Blue */
    font-size: 0.9rem;
    margin-bottom: 3px;
  }

  .recordatorio-description {
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #555;
    margin-top: 10px;
    border-left: 3px solid #778da9; /* Silver Lake Blue */
  }

  .empty-description {
    color: #999;
    font-style: italic;
  }

  .recordatorio-actions {
    display: flex;
    gap: 8px;
    margin: 8px 0;
  }

  .btn-accion {
    border: none;
    border-radius: 6px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-accion.editar {
    background-color: #e3f2fd;
    color: #1565c0;
  }

  .btn-accion.eliminar {
    background-color: #ffebee;
    color: #c62828;
  }

  .btn-accion.editar:hover {
    background-color: #bbdefb;
  }

  .btn-accion.eliminar:hover {
    background-color: #ffcdd2;
  }

  /* Estilos para el modal de confirmación */
  .confirmacion-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(27, 38, 59, 0.9); /* Oxford Blue con opacidad */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    border-radius: 10px;
  }

  .confirmacion-modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 300px;
    text-align: center;
  }

  .confirmacion-modal p {
    margin-bottom: 15px;
  }

  .confirmacion-botones {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  .btn-confirmar {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
  }

  .btn-confirmar.confirmar {
    background-color: #c62828;
    color: white;
  }

  .btn-confirmar.cancelar {
    background-color: #e0e1dd; /* Platinum */
    color: #1b263b; /* Oxford Blue */
  }

  .btn-confirmar.confirmar:hover {
    background-color: #b71c1c;
  }

  .btn-confirmar.cancelar:hover {
    background-color: #c4c4c4;
  }

  .modal-body {
    padding: 20px;
    max-height: 500px;
    overflow-y: auto;
    background-color: #e0e1dd; /* Platinum de la paleta de NotiQ */
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
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(13, 27, 42, 0.12);
    border-left: 4px solid #415a77; /* Yinmn Blue */
    margin-bottom: 15px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
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