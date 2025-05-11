<template>
    <div class="login-container">
      <div class="login-box">
        <h2>NotiQ</h2>
        <h1>Bienvenido</h1>
        <div class="input-group">
          <label for="username">Nombre de usuario</label>
          <input type="text" id="username" v-model="username" placeholder="Nombre de usuario">
        </div>
        <div class="input-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" placeholder="Contraseña">
        </div>
        <button class="login-button" @click="login">Ingresar</button>
        <button class="google-login-button" @click="loginWithGoogle">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/640px-Google_Chrome_icon_%28February_2022%29.svg.png" alt="Google Chrome logo" class="google-icon">
          <span>Iniciar con Google</span>
        </button>
        <button class="create-user-button" @click="mostrarModalCrearUsuario">Crear Usuario</button>
        <button class="skip-login-button" @click="skipLogin">Continuar sin iniciar sesión</button>
      </div>
  
      <div v-if="mostrarCrearUsuario" class="modal-overlay">
        <div class="modal-content">
          <h2>Crear usuario</h2>
          <div class="input-group">
            <label for="nuevoUsername">Nombre de usuario</label>
            <input type="text" id="nuevoUsername" v-model="nuevoUsername" placeholder="Nombre de usuario">
          </div>
          <div class="input-group">
            <label for="nuevaPassword">Contraseña</label>
            <input type="password" id="nuevaPassword" v-model="nuevaPassword" placeholder="Contraseña">
            <div v-if="nuevaPassword" class="password-strength-bar">
              <div class="progress-bar" :style="{ width: passwordStrength + '%', backgroundColor: progressBarColor }"></div>
            </div>
          </div>
          <div class="input-group">
            <label for="confirmarPassword">Verificar contraseña</label>
            <input type="password" id="confirmarPassword" v-model="confirmarPassword" placeholder="Verificar contraseña">
          </div>
          <button class="create-button" @click="crearUsuario">Crear</button>
          <button class="cancel-button" @click="cerrarModalCrearUsuario">Cancelar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        mostrarCrearUsuario: false,
        nuevoUsername: '',
        nuevaPassword: '',
        confirmarPassword: '',
        usuarios: [] // almacenamiento temporal de usuarios en lo que se conecta al back    ---->PD: cuando se integre se tendra que hacer una confirmacion de estado 
      };
    },
    computed: {
      passwordStrength() {
        if (!this.nuevaPassword) return 0;
        const strength = this.calcularSeguridadContraseña(this.nuevaPassword);
        return strength;
      },
      progressBarColor() {
        if (this.passwordStrength < 30) return 'red';
        if (this.passwordStrength < 60) return 'orange';
        return 'green';
      }
    },
    methods: {
      skipLogin() {
        console.log('Saltando inicio de sesión');
        this.$emit('login-success');
      },
      login() {
        // metodo para autenticación estándar con usuario y contraseña
        this.$emit('login-success');
      },
      loginWithGoogle() {
        // este método iniciaría el flujo de autenticación con Google OAuth 2.0
        console.log('Iniciando sesión con Google...');
        this.$emit('login-success');
      },
      mostrarModalCrearUsuario() {
        this.mostrarCrearUsuario = true;
      },
      cerrarModalCrearUsuario() {
        this.mostrarCrearUsuario = false;
        this.nuevoUsername = '';
        this.nuevaPassword = '';
        this.confirmarPassword = '';
      },
      crearUsuario() {
        if (this.nuevaPassword !== this.confirmarPassword) {
          alert('Las contraseñas no coinciden');
          return;
        }
        const nuevoUsuario = {
          username: this.nuevoUsername,
          password: this.nuevaPassword
        };
        // aquí se deberia agregar la lógica para enviar el nuevo usuario al back
        this.usuarios.push(nuevoUsuario);
        console.log('Usuario creado:', nuevoUsuario);
        this.cerrarModalCrearUsuario();
      },
      calcularSeguridadContraseña(password) {
        let strength = 0;
        if (password.length >= 8) strength += 20;
        if (password.match(/[a-z]/)) strength += 20;
        if (password.match(/[A-Z]/)) strength += 20;
        if (password.match(/[0-9]/)) strength += 20;
        if (password.match(/[^a-zA-Z0-9]/)) strength += 20;
        return strength;
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #e0e1dd; /* Platinum de la paleta */
  }
  
  .login-box {
    background-color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(13, 27, 42, 0.15);
    width: 320px;
    border-left: 4px solid #415a77; /* Yinmn Blue */
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .login-button, .create-user-button, .create-button, .cancel-button, .skip-login-button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .login-button {
    width: 100%;
    background-color: #1b263b; /* Oxford Blue */
    color: #e0e1dd; /* Platinum */
    padding: 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    margin-bottom: 12px;
  }
  
  .login-button:hover {
    background-color: #415a77; /* Yinmn Blue */
    transform: translateY(-2px);
    box-shadow: 0 2px 10px rgba(27, 38, 59, 0.15);
  }

  .google-login-button {
    width: 100%;
    background-color: white;
    color: #444;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .google-login-button:hover {
    background-color: #f8f8f8;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .google-icon {
    width: 18px;
    height: 18px;
  }
  
  .create-user-button {
    width: 100%;
    background-color: #415a77; /* Yinmn Blue */
    color: #e0e1dd; /* Platinum */
    padding: 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 12px;
    transition: all 0.3s ease;
    font-weight: 500;
  }
  
  .create-user-button:hover {
    background-color: #778da9; /* Silver Lake Blue */
    transform: translateY(-2px);
    box-shadow: 0 2px 10px rgba(65, 90, 119, 0.15);
  }
  
  .skip-login-button {
    width: 100%;
    background-color: transparent;
    color: #415a77; /* Yinmn Blue */
    padding: 10px;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;
    text-decoration: underline;
  }

  .skip-login-button:hover {
    color: #778da9; /* Silver Lake Blue */
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
  }
  
  .create-button {
    background-color: var(--success-color);
    color: var(--neutral-100);
    transition: all 0.3s ease;
  }
  
  .create-button:hover {
    background-color: var(--accent-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
  
  .cancel-button {
    background-color: var(--error-color);
    color: var(--neutral-100);
    transition: all 0.3s ease;
  }
  
  .cancel-button:hover {
    background-color: #d32f2f;
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
  
  .password-strength-bar {
    height: 10px;
    border-radius: 3px;
    background-color: #ddd;
    margin-top: 5px;
  }
  
  .progress-bar {
    height: 100%;
    border-radius: 3px;
    width: 0%; 
    transition: width 0.3s ease, background-color 0.3s ease; 
  }
  </style>