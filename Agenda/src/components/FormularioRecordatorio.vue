<template>
  <div class="modal fade" id="recordatorioModal" tabindex="-1" aria-labelledby="recordatorioModalLabel" aria-hidden="true">
    <div class="modal-dialog custom-dialog modal-dialog-centered">
      <div class="modal-content custom-modal">
        <div class="modal-header custom-header">
          <h5 class="modal-title" id="recordatorioModalLabel">Añadir Recordatorio</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" @click.stop="$emit('cerrar')"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input 
              type="text" 
              id="nombre" 
              v-model="recordatorio.name" 
              class="form-control custom-input"
              :class="{ 'is-invalid': nombreError }"
              @input="validarNombre"
              placeholder="Nombre del recordatorio"
            >
            <div class="invalid-feedback" v-if="nombreError">
              {{ nombreError }}
            </div>
          </div>
          <div class="mb-3">
            <label for="descripcion" class="form-label">Descripción</label>
            <textarea 
              id="descripcion" 
              v-model="recordatorio.description" 
              class="form-control custom-input custom-textarea"
              placeholder="Descripción detallada del recordatorio..."
              rows="3"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input 
              type="email" 
              id="email" 
              v-model="recordatorio.email" 
              class="form-control custom-input"
              :class="{ 'is-invalid': emailError, 'is-valid': recordatorio.email && !emailError }"
              @input="validarEmail"
              placeholder="ejemplo@correo.com"
            >
            <div class="invalid-feedback" v-if="emailError">
              {{ emailError }}
            </div>
          </div>
          <div class="mb-3">
            <label for="fecha" class="form-label">Fecha</label>
            <input 
              type="date" 
              id="fecha" 
              v-model="recordatorio.date" 
              class="form-control custom-input"
              :class="{ 'is-invalid': fechaError }"
              @change="validarFecha"
            >
            <div class="invalid-feedback" v-if="fechaError">
              {{ fechaError }}
            </div>
          </div>
          <div class="mb-3">
            <label for="hora" class="form-label">Hora</label>
            <input 
              type="time" 
              id="hora" 
              v-model="recordatorio.hour" 
              class="form-control custom-input"
              :class="{ 'is-invalid': horaError }"
              @change="validarHora"
            >
            <div class="invalid-feedback" v-if="horaError">
              {{ horaError }}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn custom-btn-cancel" data-bs-dismiss="modal" @click="$emit('cerrar')">Cancelar</button>
          <button type="button" class="btn custom-btn-save" @click="guardarRecordatorio">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import { createRecordatorio } from '@/services/recordatorioServices';

export default {
  data() {
    return {
      recordatorio: {
        name: '',
        description: '',
        email: '',
        date: '',
        hour: ''
      },
      nombreError: '',
      emailError: '',
      fechaError: '',
      horaError: '',
      editando: false,
      modal: null
    };
  },
  methods: {
    showModal() {
      this.modal = new Modal(document.getElementById('recordatorioModal'));
      this.modal.show();
    },
    
    validarNombre() {
      if (!this.recordatorio.name) {
        this.nombreError = 'El nombre del recordatorio es obligatorio';
      } else if (this.recordatorio.name.length < 3) {
        this.nombreError = 'El nombre debe tener al menos 3 caracteres';
      } else {
        this.nombreError = '';
      }
    },
    
    validarEmail() {
      if (!this.recordatorio.email) {
        this.emailError = 'El email es obligatorio';
        return;
      }
      
      // Expresión regular para validar correos electrónicos
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if (!emailRegex.test(this.recordatorio.email)) {
        this.emailError = 'Ingrese un correo electrónico válido';
      } else {
        this.emailError = '';
      }
    },
    
    validarFecha() {
      if (!this.recordatorio.date) {
        this.fechaError = 'Debe seleccionar una fecha';
      } else {
        // Verificar que la fecha no sea anterior a hoy
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Establecer a 00:00:00
        
        const fechaSeleccionada = new Date(this.recordatorio.date);
        fechaSeleccionada.setHours(0, 0, 0, 0);
        
        if (fechaSeleccionada < hoy) {
          this.fechaError = 'La fecha no puede ser anterior a hoy';
        } else {
          this.fechaError = '';
        }
      }
    },
    
    validarHora() {
      if (!this.recordatorio.hour) {
        this.horaError = 'Debe seleccionar una hora';
        return;
      }
      
      // Verificar si la fecha seleccionada es hoy
      const fechaActual = new Date();
      const fechaSeleccionada = new Date(this.recordatorio.date);
      
      // Verificar si las fechas son iguales (mismo día)
      const sonMismoDia = (
        fechaSeleccionada.getDate() === fechaActual.getDate() &&
        fechaSeleccionada.getMonth() === fechaActual.getMonth() &&
        fechaSeleccionada.getFullYear() === fechaActual.getFullYear()
      );
      
      // Si es el mismo día, verificar que la hora no sea anterior a la actual
      if (sonMismoDia) {
        const horaActual = fechaActual.getHours();
        const minutosActuales = fechaActual.getMinutes();
        
        // Obtener hora y minutos seleccionados
        const [horaSeleccionada, minutosSeleccionados] = this.recordatorio.hour.split(':').map(Number);
        
        // Convertir a minutos totales para comparación más fácil
        const minutosActualesTotales = (horaActual * 60) + minutosActuales;
        const minutosSeleccionadosTotales = (horaSeleccionada * 60) + minutosSeleccionados;
        
        if (minutosSeleccionadosTotales < minutosActualesTotales) {
          this.horaError = 'No es posible programar recordatorios en horas pasadas';
          return;
        }
      }
      
      this.horaError = '';
    },
    
    validarFormulario() {
      this.validarNombre();
      this.validarEmail();
      this.validarFecha();
      this.validarHora();
      
      return !this.nombreError && !this.emailError && !this.fechaError && !this.horaError;
    },
    
    async guardarRecordatorio() {
            if (!this.validarFormulario()) return;

            try {
                // ✅ Obtén el usuario desde localStorage
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user || !user.id) {
                  alert('Usuario no autenticado');
                  return;
                }

                // ✅ Crea el objeto recordatorio con userId
                const recordatorioParaGuardar = {
                    name: this.recordatorio.name,
                    description: this.recordatorio.description,
                    date: this.recordatorio.date,
                    hour: this.recordatorio.hour,
                    email: this.recordatorio.email,
                    userId: user.id // ✅ Enviando el ID del usuario logueado
                };

                await createRecordatorio(recordatorioParaGuardar); // Llamada al backend

                // Si es edición, también incluimos el ID del recordatorio
                if (this.editando && this.recordatorio.id) {
                    recordatorioParaGuardar.id = this.recordatorio.id;
                }

                // Llamada al servicio
                const recordatorioGuardado = await createRecordatorio(recordatorioParaGuardar);
                this.$emit('guardar', recordatorioGuardado);

                // Resetear modo edición
                this.editando = false;

                // Cerrar modal
                const modal = Modal.getInstance(document.getElementById('recordatorioModal'));
                modal.hide();
                this.$emit('cerrar');

            } catch (error) {
                console.error('Error al guardar recordatorio:', error);
                alert('No se pudo guardar el recordatorio. Asegúrate de estar autenticado.');
            }
        },
    
    // Método para inicializar y mostrar el modal
    showModal() {
      // Asegurarse de que el elemento existe antes de inicializar el modal
      const modalElement = document.getElementById('recordatorioModal');
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
      } else {
        console.error('El elemento recordatorioModal no se encontró en el DOM');
      }
    },
    
    // Método para preseleccionar una fecha cuando se viene desde el calendario
    preseleccionarFecha(fecha) {
      if (fecha) {
        // Establecer la fecha del recordatorio
        this.recordatorio.date = fecha;
        
        // Ahora vamos a configurar la hora predeterminada
        // Si la hora actual está entre 9 AM y 5 PM, usamos la hora actual
        // Si no, establecemos las 12:00 PM como hora predeterminada
        const ahora = new Date();
        let hora = ahora.getHours();
        let minutos = ahora.getMinutes();
        
        // Si estamos fuera del horario laboral, establecer a 12:00 PM
        if (hora < 9 || hora > 17) {
          hora = 12;
          minutos = 0;
        }
        
        // Formatear la hora para el input time (HH:MM)
        const horaFormateada = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
        this.recordatorio.hour = horaFormateada;
      }
    },
    
    // Método para establecer valores cuando editamos un recordatorio existente
    establecerValoresEdicion(recordatorio) {
      this.editando = true;
      
      // Cambiamos el título del modal
      const modalLabel = document.getElementById('recordatorioModalLabel');
      if (modalLabel) {
        modalLabel.innerText = 'Editar Recordatorio';
      }
      
      // Asignamos los valores del recordatorio a editar
      this.recordatorio = {
        id: recordatorio.id,
        name: recordatorio.name || '',
        description: recordatorio.description || '',
        date: recordatorio.date || '',
        hour: recordatorio.hour || '',
        email: recordatorio.email || ''
      };
    }
  },
  mounted() {
    // Inicializar el modal cuando el componente se monte
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
  background-color: var(--accent-color);
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
  padding: 8px 10px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.custom-input:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.2);
}

.custom-textarea {
  resize: none;
  min-height: 80px;
  font-size: 0.9rem;
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

/* Estilos personalizados para el selector de fecha */
.date-picker-container {
  position: relative;
  display: flex;
  align-items: center;
}

.date-input {
  padding-right: 40px;
  background-color: white;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}

.calendar-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent-color);
  pointer-events: none; /* para que no interfiera con los clicks */
}

/* Estilos personalizados para el selector de hora */
.time-picker-container {
  position: relative;
  display: flex;
  align-items: center;
}

.time-input {
  padding-right: 40px;
  background-color: white;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-align: center;
  font-size: 1.05em;
  letter-spacing: 0.5px;
}

.clock-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent-color);
  pointer-events: none;
}

.modal-footer {
  border-top: 1px solid var(--neutral-200);
  padding: 10px 20px;
}

.custom-btn-save {
  background-color: var(--accent-color);
  color: white;
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.custom-btn-save:hover {
  background-color: var(--accent-dark);
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