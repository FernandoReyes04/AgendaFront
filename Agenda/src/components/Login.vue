<template>
    <div class="login-container">
      <div class="login-box">
        <h2>Agenda</h2>
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
        <button class="create-user-button" @click="mostrarModalCrearUsuario">Crear Usuario</button>
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
        usuarios: [] // almacenamiento temporal de usuarios en lo que se conecta al back
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
      login() {
        // esta en comentario pq si no se deberia de iniciar sesiona cada rato y da flojera
        // const usuario = this.usuarios.find(u => u.username === this.username && u.password === this.password);
        // if (usuario) {
          console.log('Inicio de sesión exitoso');
          this.$emit('login-success');
        // } else {
        //   console.log('Usuario o contraseña incorrectos');
        //   alert('Usuario o contraseña incorrectos');
        // }
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
    /*background-color: #f0f0f0;*/
  }
  
  .login-box {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 300px;
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
  
  .login-button, .create-user-button, .create-button, .cancel-button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .login-button {
    background-color: #673ab7;
    color: white;
  }
  
  .create-user-button {
    background-color: #e0e0e0;
    color: #333;
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
    background-color: #4caf50;
    color: white;
  }
  
  .cancel-button {
    background-color: #f44336;
    color: white;
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