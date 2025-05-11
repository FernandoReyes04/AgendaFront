<template>
  <transition name="fade">
    <div v-if="mostrar" 
         :class="['notificacion', `notificacion-${tipo}`]"
         role="alert">
      <div class="notificacion-contenido">
        <div class="notificacion-icono">
          <i :class="iconoClase"></i>
        </div>
        <div class="notificacion-mensaje">
          <div class="notificacion-titulo">{{ titulo }}</div>
          <div class="notificacion-descripcion">{{ mensaje }}</div>
        </div>
        <button class="notificacion-cerrar" @click="cerrar">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    titulo: {
      type: String,
      default: 'Notificación'
    },
    mensaje: {
      type: String,
      required: true
    },
    tipo: {
      type: String,
      default: 'exito',
      validator: (value) => ['exito', 'error', 'info', 'advertencia'].includes(value)
    },
    duracion: {
      type: Number,
      default: 4000
    },
    mostrar: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconoClase() {
      const iconos = {
        exito: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        advertencia: 'fas fa-exclamation-triangle'
      };
      return iconos[this.tipo] || iconos.info;
    }
  },
  methods: {
    cerrar() {
      this.$emit('cerrar');
    }
  },
  watch: {
    mostrar(nuevo) {
      if (nuevo && this.duracion > 0) {
        setTimeout(() => {
          this.cerrar();
        }, this.duracion);
      }
    }
  }
};
</script>

<style scoped>
.notificacion {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  min-width: 320px;
  max-width: 450px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
}

.notificacion-contenido {
  display: flex;
  align-items: flex-start;
  padding: 16px;
}

.notificacion-icono {
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.notificacion-mensaje {
  flex: 1;
}

.notificacion-titulo {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
}

.notificacion-descripcion {
  font-size: 14px;
  line-height: 1.4;
}

.notificacion-cerrar {
  background: transparent;
  border: none;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
  font-size: 14px;
  padding: 4px;
  margin-left: 8px;
  transition: opacity 0.2s;
}

.notificacion-cerrar:hover {
  opacity: 1;
}

/* Tipos de notificación */
.notificacion-exito {
  background-color: #f0f9ef;
  border-left: 4px solid #4caf50;
  color: #2e7d32;
}

.notificacion-error {
  background-color: #fef1f0;
  border-left: 4px solid #f44336;
  color: #c62828;
}

.notificacion-info {
  background-color: #e8f4fd;
  border-left: 4px solid #3d9cdd;
  color: #0277bd;
}

.notificacion-advertencia {
  background-color: #fff8e6;
  border-left: 4px solid #ffc107;
  color: #b78103;
}

/* Animaciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
