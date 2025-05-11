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
                <div class="contacto-number">{{ contacto.phone_number }}</div>
                <div class="contacto-email">{{ contacto.email }}</div>
              </div>
              <div class="contacto-notes-section">
                <button @click="toggleNotes(contacto.id)" class="notes-toggle" :class="{'expanded': isExpanded(contacto.id)}">
                  <span v-if="!isExpanded(contacto.id)">Ver notas</span>
                  <span v-else>Ocultar</span>
                </button>
                <div v-if="isExpanded(contacto.id)" class="contacto-notes">
                  <p v-if="contacto.notes">{{ contacto.notes }}</p>
                  <p v-else class="empty-notes">No hay notas para este contacto</p>
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