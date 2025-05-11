<template>
  <div class="modal fade show" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="contactosModalLabel">Mis Contactos</h5>
        </div>
        <div class="modal-body">
          <div v-if="contactos.length > 0" class="contactos-list">
            <div v-for="(contacto, index) in contactos" :key="contacto.id" class="contacto-card">
              <div class="contacto-info">
                <div class="contacto-name">{{ contacto.first_name }} {{ contacto.last_name }}</div>
                <div class="contacto-number"><i class="fas fa-phone"></i> {{ contacto.phone_number }}</div>
                <div class="contacto-email"><i class="fas fa-envelope"></i> {{ contacto.email }}</div>
              </div>
              <div class="contacto-actions">
                <button class="btn-accion editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-accion eliminar" @click="$emit('eliminar', contacto.id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
              <div class="contacto-notes-section">
                <div class="contacto-notes">
                  <p v-if="contacto.notes">{{ contacto.notes }}</p>
                  <p v-else class="empty-notes">Sin notas</p>
                </div>
              </div>

            </div>
          </div>
          <div v-else class="empty-list">
            <p>No hay contactos disponibles</p>
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
      contactos: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        expandedNotes: {}
      };
    },
    methods: {
      cerrarModal() {
        this.$emit('cerrar');
      },
      toggleNotes(contactId) {
        this.$set(this.expandedNotes, contactId, !this.expandedNotes[contactId]);
      },
      isExpanded(contactId) {
        return !!this.expandedNotes[contactId];
      }
    }
  };
</script>

<style scoped>
.contacto-card {
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

.contacto-info {
  margin-bottom: 10px;
}

.contacto-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #1b263b; /* Oxford Blue */
  margin-bottom: 5px;
}

.contacto-number, .contacto-email {
  color: #415a77; /* Yinmn Blue */
  margin-bottom: 3px;
  font-size: 0.9rem;
}

.contacto-actions {
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

.contacto-notes {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #555;
}

.empty-notes {
  color: #999;
  font-style: italic;
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
</style>

<style scoped>
.modal-body {
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
  background-color: var(--neutral-200);
}

.contactos-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contacto-card {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  background-color: var(--neutral-100);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  border-left: 4px solid var(--primary-color);
  transition: all 0.2s ease;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
}

.contacto-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-left-color: var(--accent-color);
}

.contacto-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 200px;
  max-width: 60%;
}

.contacto-name {
  font-weight: 600;
  font-size: 18px;
  color: var(--primary-color);
  margin-bottom: 4px;
  letter-spacing: 0.2px;
}

.contacto-number {
  font-size: 14px;
  color: var(--text-secondary);
  padding: 4px 0;
  border-bottom: 1px solid var(--neutral-300);
}

.contacto-email {
  font-size: 14px;
  color: var(--secondary-color);
  font-style: italic;
  padding-top: 4px;
}

.contacto-notes-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 120px;
}

.notes-toggle {
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

.notes-toggle:hover {
  background-color: var(--accent-color);
  color: var(--text-light);
}

.notes-toggle.expanded {
  background-color: var(--accent-color);
  color: var(--text-light);
}

.contacto-notes {
  padding: 10px;
  background-color: var(--neutral-200);
  border-radius: 6px;
  font-size: 13px;
  color: var(--text-secondary);
  width: 100%;
  margin-top: 4px;
  border-left: 3px solid var(--accent-color);
  animation: fadeIn 0.3s ease;
}

.empty-notes {
  font-style: italic;
  color: var(--text-tertiary);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.empty-list {
  text-align: center;
  padding: 30px;
  color: var(--text-secondary);
}
</style>