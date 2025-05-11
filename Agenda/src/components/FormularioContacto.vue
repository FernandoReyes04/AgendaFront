<template>
  <div class="modal fade" id="contactoModal" tabindex="-1" aria-labelledby="contactoModalLabel" aria-hidden="true">
    <div class="modal-dialog custom-dialog modal-dialog-centered">
      <div class="modal-content custom-modal">
        <div class="modal-header custom-header">
          <h5 class="modal-title" id="contactoModalLabel">Agregar Contacto</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" @click.stop="$emit('cerrar')"></button> 
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="first_name" class="form-label">Nombre <span class="text-danger">*</span></label>
            <input 
              type="text" 
              id="first_name" 
              v-model="contacto.first_name" 
              class="form-control custom-input"
              :class="{ 'is-invalid': nombreError, 'is-valid': contacto.first_name && !nombreError }"
              @input="validarNombre"
              placeholder="Nombre"
            >
            <div class="invalid-feedback" v-if="nombreError">
              {{ nombreError }}
            </div>
          </div>
          <div class="mb-3">
            <label for="last_name" class="form-label">Apellido <span class="text-danger">*</span></label>
            <input 
              type="text" 
              id="last_name" 
              v-model="contacto.last_name" 
              class="form-control custom-input"
              :class="{ 'is-invalid': apellidoError, 'is-valid': contacto.last_name && !apellidoError }"
              @input="validarApellido"
              placeholder="Apellido"
            >
            <div class="invalid-feedback" v-if="apellidoError">
              {{ apellidoError }}
            </div>
          </div>
          <div class="mb-3">
            <label for="phone_number" class="form-label">Teléfono <span class="text-danger">*</span></label>
            <input 
              type="tel" 
              id="phone_number" 
              v-model="contacto.phone_number" 
              class="form-control custom-input"
              :class="{ 'is-invalid': telefonoError, 'is-valid': contacto.phone_number && !telefonoError }"
              @input="validarTelefono"
              placeholder="Ej. 555-123-4567"
            >
            <div class="invalid-feedback" v-if="telefonoError">
              {{ telefonoError }}
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
            <input 
              type="email" 
              id="email" 
              v-model="contacto.email" 
              class="form-control custom-input"
              :class="{ 'is-invalid': emailError, 'is-valid': contacto.email && !emailError }"
              @input="validarEmail"
              placeholder="ejemplo@correo.com"
            >
            <div class="invalid-feedback" v-if="emailError">
              {{ emailError }}
            </div>
          </div>
          <div class="mb-3">
            <label for="notes" class="form-label">Notas</label>
            <input type="text" id="notes" v-model="contacto.notes" class="form-control custom-input">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn custom-btn-cancel" data-bs-dismiss="modal" @click="$emit('cerrar')">Cancelar</button>
          <button type="button" class="btn custom-btn-save" @click="guardarContacto">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import { createContacto } from '@/services/contactoServices'; // Importar el servicio

export default {
  data() {
    return {
      contacto: {
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        notes: ''
      },
      nombreError: '',
      apellidoError: '',
      telefonoError: '',
      emailError: ''
    };
  },
  methods: {
    validarNombre() {
      if (!this.contacto.first_name) {
        this.nombreError = 'El nombre es obligatorio';
      } else if (this.contacto.first_name.length < 2) {
        this.nombreError = 'El nombre debe tener al menos 2 caracteres';
      } else {
        this.nombreError = '';
      }
    },
    
    validarApellido() {
      if (!this.contacto.last_name) {
        this.apellidoError = 'El apellido es obligatorio';
      } else if (this.contacto.last_name.length < 2) {
        this.apellidoError = 'El apellido debe tener al menos 2 caracteres';
      } else {
        this.apellidoError = '';
      }
    },
    
    validarTelefono() {
      // Verificar si el campo está vacío (ahora es obligatorio)
      if (!this.contacto.phone_number) {
        this.telefonoError = 'El teléfono es obligatorio';
        return;
      }
      
      // Expresión regular para validar números de teléfono
      // Acepta formatos: 555-123-4567, (555) 123-4567, 5551234567, etc.
      const telefonoRegex = /^(\+\d{1,3}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
      
      if (!telefonoRegex.test(this.contacto.phone_number)) {
        this.telefonoError = 'Ingrese un número de teléfono válido';
      } else {
        this.telefonoError = '';
      }
    },
    
    validarEmail() {
      // Verificar si el campo está vacío (ahora es obligatorio)
      if (!this.contacto.email) {
        this.emailError = 'El email es obligatorio';
        return;
      }
      
      // Expresión regular para validar correos electrónicos
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if (!emailRegex.test(this.contacto.email)) {
        this.emailError = 'Ingrese un correo electrónico válido';
      } else {
        this.emailError = '';
      }
    },
    
    validarFormulario() {
      // Ejecutar validaciones
      this.validarNombre();
      this.validarApellido();
      this.validarTelefono();
      this.validarEmail();
      
      // Verificar si hay errores
      return !this.nombreError && !this.apellidoError && !this.telefonoError && !this.emailError;
    },
    
    async guardarContacto() {
      // Validar el formulario antes de guardar
      if (!this.validarFormulario()) {
        return; // No continuar si hay errores de validación
      }
      
      try {
        const contactoData = {
          first_name: this.contacto.first_name,
          last_name: this.contacto.last_name,
          phone_number: this.contacto.phone_number,
          email: this.contacto.email,
          notes: this.contacto.notes,
        };
        
        // Si estamos editando, incluimos el ID
        if (this.editando && this.contacto.id) {
          contactoData.id = this.contacto.id;
        }

        // Emitimos al componente padre para que él maneje la creación/actualización
        this.$emit('guardar', contactoData);

        // Reseteamos el modo de edición
        this.editando = false;

        // ✅ Cerrar el modal
        const modal = Modal.getInstance(document.getElementById('contactoModal'));
        modal.hide();
        this.$emit('cerrar');
      } catch (error) {
        console.error('Error al guardar contacto:', error);
      }
    },
    showModal() {
      const modalElement = document.getElementById('contactoModal');
      
      if (modalElement) {
        // Configuramos el modal para que se cierre al hacer clic fuera
        this.modal = new Modal(modalElement, {
          backdrop: true,    // true = cierra al hacer clic fuera
          keyboard: true     // true = cierra al presionar ESC
        });
        this.modal.show();
        
        // Agregar un listener para cerrar el modal al hacer clic fuera (adicional a backdrop)
        modalElement.addEventListener('click', (event) => {
          // Verificar si el clic fue en el fondo del modal y no en su contenido
          if (event.target === modalElement) {
            this.$emit('cerrar');
          }
        });
      }
    },
    
    // Método para establecer valores cuando editamos un contacto existente
    establecerValoresEdicion(contacto) {
      this.editando = true;
      
      // Cambiamos el título del modal
      const modalLabel = document.getElementById('contactoModalLabel');
      if (modalLabel) {
        modalLabel.innerText = 'Editar Contacto';
      }
      
      // Asignamos los valores del contacto a editar
      this.contacto = {
        id: contacto.id,
        first_name: contacto.first_name || '',
        last_name: contacto.last_name || '',
        phone_number: contacto.phone_number || '',
        email: contacto.email || '',
        notes: contacto.notes || ''
      };
    }
  },
  mounted() {
    this.showModal();
  }
};
</script>

<style scoped>
/* Estilos para el modal personalizado */
.custom-dialog {
  width: 90%;
  max-width: 500px;
}

.custom-modal {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--neutral-300);
}

.custom-header {
  background-color: var(--primary-color);
  color: white;
  padding: 15px 20px;
  border-bottom: none;
}

.modal-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.3px;
}

.modal-body {
  padding: 15px 20px;
}

.form-label {
  font-weight: 500;
  color: var(--neutral-800);
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.custom-input {
  border-radius: 8px;
  border: 1px solid var(--neutral-300);
  padding: 7px 10px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  line-height: 1.2;
}

.custom-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.2);
}

/* Estilos para campos válidos */
.custom-input.is-valid {
  border-color: var(--accent-color) !important;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

/* Estilos para campos inválidos */
.custom-input.is-invalid {
  border-color: var(--error-color, #dc3545) !important;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

/* Estilos para mensajes de error */
.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: var(--error-color, #dc3545);
}

.modal-footer {
  border-top: 1px solid var(--neutral-200);
  padding: 10px 20px;
}

.custom-btn-save {
  background-color: var(--primary-color);
  color: white;
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.custom-btn-save:hover {
  background-color: var(--primary-dark);
  transform: translateY(-1px);
}

.custom-btn-cancel {
  background-color: var(--neutral-200);
  color: var(--neutral-700);
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  margin-right: 10px;
  transition: all 0.3s ease;
}

.custom-btn-cancel:hover {
  background-color: var(--neutral-300);
}
</style>
