<template>
  <header class="header custom-header">
    <div class="container">
      <div class="header-left">
        <h1 class="title custom-title">NotiQ</h1>
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Poppins:wght@500;600;700&family=Roboto:wght@300;400;500&display=swap');

.header {
  width: 100%;
  padding: 15px 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
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
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.title {
  font-family: 'Roboto', sans-serif;
  font-size: 28px;
  font-weight: 400;
  margin: 0;
  text-align: left;
  letter-spacing: 2px;
  text-transform: none;
}

.custom-title {
  color: #e0e1dd !important; /* Platinum hardcoded */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
}

/* Responsivo */
@media (max-width: 768px) {
  .title {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 20px;
  }
}

/* Estilos para la parte izquierda del header */
.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
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