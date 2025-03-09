<template>
  <div class="modal fade" id="contactoModal" tabindex="-1" aria-labelledby="contactoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="contactoModalLabel">Agregar Contacto</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" @click.stop="$emit('cerrar')"></button> 
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" id="nombre" v-model="contacto.nombre" class="form-control">
          </div>
          <div class="mb-3">
            <label for="telefono" class="form-label">Teléfono</label>
            <input type="tel" id="telefono" v-model="contacto.telefono" class="form-control">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" v-model="contacto.email" class="form-control">
          </div>
          <div class="mb-3">
            <label for="direccion" class="form-label">Dirección</label>
            <input type="text" id="direccion" v-model="contacto.direccion" class="form-control">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('cerrar')">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="guardarContacto">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import { createContacto } from '@/services/contactoServices'; // Importar el servicio

export default {
  data() {
    return {
      contacto: {
        nombre: '',
        telefono: '',
        email: '',
        direccion: ''
      }
    };
  },
  methods: {
    async guardarContacto() {
      try {
        // ✅ Guardar contacto en el backend
        const nuevoContacto = await createContacto(this.contacto);
        console.log('Contacto guardado:', nuevoContacto);

        // ✅ Emitir el evento para actualizar la lista en el componente padre
        this.$emit('guardar', nuevoContacto);

        // ✅ Cerrar el modal
        const modal = Modal.getInstance(document.getElementById('contactoModal'));
        modal.hide();
        this.$emit('cerrar');
      } catch (error) {
        console.error('Error al guardar contacto:', error);
      }
    },
    showModal() {
      const modal = new Modal(document.getElementById('contactoModal'));
      modal.show();
    }
  },
  mounted() {
    this.showModal();
  }
};
</script>
