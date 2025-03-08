<template>
  <div class="modal fade" id="contactosModal" tabindex="-1" aria-labelledby="contactosModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="contactosModalLabel">Mis Contactos</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" @click.stop="$emit('cerrar')"></button> 
        </div>
        <div class="modal-body">
          <ul>
            <li v-for="contacto in contactos" :key="contacto.id">
              {{ contacto.nombre }} - {{ contacto.telefono }}
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('cerrar')">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      contactos: [
        { id: 1, nombre: 'fernando reyes', telefono: '123-456-7890' },
        { id: 2, nombre: 'justino', telefono: '987-654-3210' }
      ]
    };
  },
  methods: {
    showModal() {
      const modal = new Modal(document.getElementById('contactosModal'));
      modal.show();
    }
  },
  mounted() {
    this.showModal();
  }
};
</script>