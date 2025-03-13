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
            <label for="first_name" class="form-label">Nombre</label>
            <input type="text" id="first_name" v-model="contacto.first_name" class="form-control">
          </div>
          <div class="mb-3">
            <label for="last_name" class="form-label">Apellido</label>
            <input type="text" id="last_name" v-model="contacto.last_name" class="form-control">
          </div>
          <div class="mb-3">
            <label for="phone_number" class="form-label">Teléfono</label>
            <input type="tel" id="phone_number" v-model="contacto.phone_number" class="form-control">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" v-model="contacto.email" class="form-control">
          </div>
          <div class="mb-3">
            <label for="notes" class="form-label">Notas</label>
            <input type="text" id="notes" v-model="contacto.notes" class="form-control">
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
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        notes: ''
      }
    };
  },
  methods: {
    async guardarContacto() {
      try {
        const nuevoContacto = {
          first_name: this.contacto.first_name,
          last_name: this.contacto.last_name,
          phone_number: this.contacto.phone_number,
          email: this.contacto.email,
          notes: this.contacto.notes,
        }

        // ✅ Guardar contacto en el backend
        const contactoGuardado = await createContacto(nuevoContacto);
        console.log('Contacto guardado:', contactoGuardado);

        // ✅ Emitir el evento para actualizar la lista en el componente padre
        this.$emit('guardar', contactoGuardado);

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
