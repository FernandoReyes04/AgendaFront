<template>
  <div class="formulario-evento">
    <h2>Agregar Evento</h2>
    <form @submit.prevent="guardar">
      <input type="text" v-model="evento.descripcion" placeholder="Descripción" required>
      <input type="datetime-local" v-model="evento.fechaHora" required>
      <button type="submit">Guardar</button>
      <button @click="$emit('cerrar')">Cancelar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      evento: { descripcion: '', fechaHora: '' }
    };
  },
  methods: {
    guardar() {
      this.$emit('guardar', { ...this.evento });
      this.evento = { descripcion: '', fechaHora: '' }; // Limpiar formulario
    }
  }
};
</script>