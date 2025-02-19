<template>
    <div class="contactos-container">
      <h2>Gestión de Contactos</h2>
      <button @click="mostrarFormularioContacto = true">Agregar Contacto</button>
  
      <FormularioContacto
        v-if="mostrarFormularioContacto"
        :contacto="contactoSeleccionado"
        @guardar="guardarContacto"
        @cerrar="mostrarFormularioContacto = false"
      />
  
      <ul>
        <li v-for="contacto in contactos" :key="contacto.id">
          {{ contacto.nombre }} - {{ contacto.correo }} - {{ contacto.telefono }}
          <button @click="editarContacto(contacto)">Editar</button>
          <button @click="eliminarContacto(contacto)">Eliminar</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import FormularioContacto from './FormularioContacto.vue';
  
  export default {
    components: {
      FormularioContacto
    },
    data() {
      return {
        contactos: [],
        contactoSeleccionado: null,
        mostrarFormularioContacto: false
      };
    },
    methods: {
      guardarContacto(contacto) {
        if (contacto.id) {
          // Actualizar contacto existente
          const index = this.contactos.findIndex(c => c.id === contacto.id);
          if (index !== -1) {
            this.contactos.splice(index, 1, contacto);
          }
        } else {
          // Crear nuevo contacto
          contacto.id = Date.now(); // Generar ID único
          this.contactos.push(contacto);
        }
        this.mostrarFormularioContacto = false;
        this.contactoSeleccionado = null;
      },
      editarContacto(contacto) {
        this.contactoSeleccionado = { ...contacto }; // Crear copia para editar
        this.mostrarFormularioContacto = true;
      },
      eliminarContacto(contacto) {
        this.contactos = this.contactos.filter(c => c.id !== contacto.id);
      }
    }
  };
  </script>