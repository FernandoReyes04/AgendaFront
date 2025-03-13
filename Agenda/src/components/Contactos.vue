<template>
  <div class="modal fade show" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="contactosModalLabel">Mis Contactos</h5>
        </div>
        <div class="modal-body">
          <ul v-if="contactos.length > 0">
            <li v-for="(contacto, index) in contactos" :key="contacto.id">
              {{ contacto.last_name }}, {{ contacto.first_name }} - {{ contacto.phone_number }}
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
export default {
    props: {
      contactos: {
        type: Array,
        required: true
      }
    },
    methods: {
      cerrarModal() {
        this.$emit('cerrar');
      }
    }
  };
</script>