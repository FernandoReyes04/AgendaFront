<template>
  <header class="header custom-header">
    <div class="container">
      <div class="header-left">
        <div class="brand-container">
          <!-- SVG inline del logo NotiQ en color Platinum #e0e1dd -->
          <svg class="header-icon" width="46" height="46" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M353.38 157.59c-0.2-23.916-9.535-46.711-26.010-63.864C310.894 76.574 284.259 68.142 256 68.142s-54.895 8.432-71.369 25.584c-16.476 17.153-25.811 39.948-26.010 63.864-13.215 37.773-41.915 197.752-41.915 197.752h146.502l-58.408 30.115c-6.626 4.647-10.612 12.248-10.798 20.489-0.187 8.241 3.442 16.008 9.856 20.949 6.414 4.941 14.747 6.481 22.538 4.163 7.791-2.318 13.942-8.169 16.633-15.867l13.219-38.394 13.219 38.394c2.691 7.698 8.842 13.549 16.633 15.867 7.791 2.318 16.124 0.778 22.538-4.163 6.414-4.941 10.044-12.708 9.856-20.949-0.187-8.241-4.172-15.842-10.798-20.489l-58.408-30.115h146.502c0 0-28.7-159.979-41.915-197.752z" fill="#e0e1dd"/>
            <circle cx="365" cy="120" r="40" fill="#e0e1dd"/>
          </svg>
          <h1 class="title custom-title">NotiQ</h1>
        </div>
      </div>
      <div class="header-actions">
        <button v-if="enPerfil" class="btn-volver custom-btn-volver" @click="volverAAgenda" title="Volver a Agenda">
          <i class="fas fa-arrow-left"></i>
        </button>
        <button class="login-btn custom-login-btn" @click="goToLogin">Iniciar Sesión</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    enPerfil: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goToLogin() {
      // Emitir evento para mostrar la pantalla de login
      this.$emit('show-login');
    },
    volverAAgenda() {
      // Emitir evento para volver a la agenda principal
      this.$emit('volver-agenda');
    }
  }
}
</script>

<style scoped>
/* importar fuentes de google*/
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Poppins:wght@500;600;700&family=Roboto:wght@300;400;500&family=Libre+Caslon+Display&display=swap');

.header {
  width: 100%;
  padding: 12px 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  min-height: 70px;
  display: flex;
  align-items: center;
}

.custom-header {
  background-color: #0d1b2a !important; /* Rich Black hardcoded */
  background-image: none !important;
  color: #e0e1dd !important; /* Platinum hardcoded */
  box-shadow: 0 3px 6px rgba(13, 27, 42, 0.15), 0 2px 4px rgba(13, 27, 42, 0.12) !important;
  border-bottom: 1px solid #415a77 !important; /* Yinmn Blue hardcoded */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.title {
  font-family: 'Libre Caslon Display', serif;
  font-size: 42px;
  font-weight: 400;
  font-style: normal;
  margin: 0;
  text-align: left;
  letter-spacing: 2px;
  text-transform: none;
  line-height: 1;
}

.custom-title {
  color: #e0e1dd !important; /* Platinum hardcoded */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
}

/* Responsivo */
@media (max-width: 768px) {
  .title {
    font-size: 34px;
  }
  .header-icon {
    width: 38px;
    height: 38px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 28px;
  }
  .header-icon {
    width: 32px;
    height: 32px;
  }
}

/* Estilos para la parte izquierda del header */
.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Estilos para el contenedor de la marca y el icono */
.brand-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  width: 46px;
  height: 46px;
  margin-right: 8px;
}

/* Estilos para el botón de volver */
.btn-volver {
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-btn-volver {
  background-color: #415a77 !important; /* Yinmn Blue */
  color: #e0e1dd !important; /* Platinum */
  box-shadow: 0 1px 3px rgba(13, 27, 42, 0.12), 0 1px 2px rgba(13, 27, 42, 0.14) !important;
}

.btn-volver:hover {
  background-color: #778da9 !important; /* Silver Lake Blue */
  transform: translateX(-2px);
  box-shadow: 0 2px 5px rgba(13, 27, 42, 0.2) !important;
}

/* Estilos para el botón de iniciar sesión */
.login-btn {
  background-color: transparent;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.custom-login-btn {
  border: 2px solid #e0e1dd !important; /* Platinum hardcoded */
  color: #e0e1dd !important; /* Platinum hardcoded */
}

.login-btn:hover {
  transform: translateY(-2px);
}

.custom-login-btn:hover {
  background-color: #e0e1dd !important; /* Platinum hardcoded */
  color: #0d1b2a !important; /* Rich Black hardcoded */
  box-shadow: 0 1px 3px rgba(13, 27, 42, 0.12), 0 1px 2px rgba(13, 27, 42, 0.14) !important;
}
</style>