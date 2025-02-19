<template>
  <div class="eventos-container">
    <h2>Eventos</h2>
    <button @click="mostrarFormularioEvento = true">Agregar Evento</button>

    <FormularioEvento
      v-if="mostrarFormularioEvento"
      @guardar="guardarEvento"
      @cerrar="mostrarFormularioEvento = false"
    />

    <div class="calendar-container">
      <v-calendar is-expanded :events="eventos" />
    </div>
  </div>
</template>

<script>
import FormularioEvento from './FormularioEvento.vue';

export default {
  components: {
    FormularioEvento
  },
  data() {
    return {
      eventos: [],
      mostrarFormularioEvento: false
    };
  },
  methods: {
    guardarEvento(evento) {
      this.eventos.push(evento);
      this.mostrarFormularioEvento = false;
    }
  }
};
</script>