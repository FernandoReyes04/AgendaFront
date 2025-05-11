<template>
  <div class="modal fade show" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="eventosModalLabel">Mis Eventos</h5>
        </div>
        <div class="modal-body">
          <div v-if="eventos.length > 0" class="eventos-list">
            <div v-for="evento in eventos" :key="evento.id" class="evento-card">
              <div class="evento-info">
                <div class="evento-title">{{ evento.name }}</div>
                <div class="evento-datetime">
                  <span class="evento-date"><i class="far fa-calendar-alt"></i> {{ evento.date }}</span>
                  <span class="evento-time" v-if="evento.hour"><i class="far fa-clock"></i> {{ evento.hour }}</span>
                </div>
                <div class="evento-contact" v-if="evento.email">
                  <i class="far fa-envelope"></i> {{ evento.email }}
                </div>
                <div class="evento-description">{{ evento.description }}</div>
                <!-- Mostrar cualquier otro dato disponible -->
                <div class="evento-additional" v-if="evento.location">
                  <i class="fas fa-map-marker-alt"></i> {{ evento.location }}
                </div>
                <div class="evento-category" v-if="evento.category">
                  <span class="category-tag">{{ evento.category }}</span>
                </div>
              </div>
              <div class="evento-actions">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>

            </div>
          </div>
          <div v-else class="empty-list">
            <p>No hay eventos disponibles</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('cerrar')">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
      eventos: {
        type: Array,
        required: true
      }
    },
    data() {
      return {};
    },
    methods: {
      cerrarModal() {
        this.$emit('cerrar');
      }
    }
  };
</script>

<style scoped>
.evento-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-left: 4px solid #778da9; /* Silver Lake Blue */
}

.evento-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: #1b263b; /* Oxford Blue */
  margin-bottom: 8px;
}

.evento-datetime {
  display: flex;
  gap: 15px;
  margin-bottom: 6px;
}

.evento-date, .evento-time {
  color: #415a77; /* Yinmn Blue */
  font-size: 0.9rem;
}

.evento-description, .evento-contact, .evento-additional {
  margin-top: 5px;
  font-size: 0.9rem;
  color: #555;
}

.evento-category {
  margin-top: 8px;
}

.category-tag {
  display: inline-block;
  background-color: #e0e1dd; /* Platinum */
  color: #1b263b; /* Oxford Blue */
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.evento-actions {
  display: flex;
  gap: 8px;
  margin: 10px 0;
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
}
</style>

<style scoped>
.modal-body {
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
  background-color: var(--neutral-200);
}

.eventos-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.evento-card {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  background-color: var(--neutral-100);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  border-left: 4px solid var(--secondary-color);
  transition: all 0.2s ease;
  margin-bottom: 10px;
}

.evento-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-left-color: var(--primary-color);
}

.evento-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.evento-title {
  font-weight: 600;
  font-size: 18px;
  color: var(--primary-color);
  margin-bottom: 4px;
  letter-spacing: 0.2px;
}

.evento-datetime {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  font-size: 14px;
  padding: 6px 0;
  border-bottom: 1px solid var(--neutral-300);
}

.evento-date {
  color: var(--accent-color);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
}

.evento-time {
  color: var(--secondary-color);
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 5px;
}

.evento-contact {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 5px;
}

.evento-additional {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.evento-category {
  margin-top: 10px;
}

.category-tag {
  display: inline-block;
  padding: 3px 8px;
  font-size: 12px;
  border-radius: 15px;
  background-color: var(--primary-light);
  color: var(--text-light);
}

.evento-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-top: 6px;
}

.empty-list {
  text-align: center;
  padding: 30px;
  color: var(--text-secondary);
}
</style>