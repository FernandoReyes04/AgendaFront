<template>
  <div class="formulario-contacto">
    <h2>{{ contacto.id ? 'Editar' : 'Agregar' }} Contacto</h2>
    <form @submit.prevent="guardar">
      <div class="campo">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="contacto.nombre" placeholder="Nombre" required>
      </div>
      <div class="campo">
        <label for="correo">Correo:</label>
        <input type="email" id="correo" v-model="contacto.correo" placeholder="Correo" required>
      </div>
      <div class="campo">
        <label for="telefono">Teléfono:</label>
        <input type="tel" id="telefono" v-model="contacto.telefono" placeholder="Teléfono" required>
      </div>
      <div class="campo">
        <label for="notas">Notas:</label>
        <textarea id="notas" v-model="contacto.notas" placeholder="Notas"></textarea>
      </div>
      <button type="submit">Guardar</button>
      <button @click="$emit('cerrar')">Cancelar</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['contacto'],
  data() {
    return {
      contacto: this.contacto ? { ...this.contacto } : { nombre: '', correo: '', telefono: '', notas: '' }
    };
  },
  methods: {
    guardar() {
      this.$emit('guardar', this.contacto);
    }
  }
};
</script>

<style scoped>
.formulario-contacto {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.campo {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea { /* Estilos para input y textarea */
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box; /* Para que el padding no afecte el ancho */
}

textarea { /* Estilos específicos para textarea */
  height: 100px; /* Altura fija para el textarea */
  resize: vertical; /* Permite cambiar la altura verticalmente */
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px; /* Espacio entre botones */
}

button:hover {
  background-color: #0056b3;
}
</style>