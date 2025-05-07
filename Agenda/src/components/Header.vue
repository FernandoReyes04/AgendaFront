<template>
  <header class="header">
    <div class="container">
      <div class="header-left">
        <button v-if="enPerfil" class="btn-volver" @click="volverAAgenda">
          <i class="fas fa-arrow-left"></i> Volver a Agenda
        </button>
        <h1 class="title">Agenda Personal</h1>
      </div>
      <button class="login-btn" @click="goToLogin">Iniciar Sesión</button>
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
/* Importar fuentes de Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Poppins:wght@500;600;700&display=swap');

.header {
  width: 100%;
  padding: 15px 0;
  background-color: var(--primary-color);
  color: var(--neutral-100);
  box-shadow: var(--shadow-md);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-family: 'Poppins', sans-serif;
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  text-align: left;
  letter-spacing: 0.5px;
  text-transform: none;
  /* Efecto de sombra suave para dar profundidad */
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
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
  background-color: var(--accent-color);
  border: none;
  color: var(--neutral-100);
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-volver:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Estilos para el botón de iniciar sesión */
.login-btn {
  background-color: transparent;
  border: 2px solid var(--neutral-100);
  color: var(--neutral-100);
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background-color: var(--neutral-100);
  color: var(--primary-color);
}
</style>