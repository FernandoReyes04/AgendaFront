<template>
  <div class="modal fade" id="eventoModal" tabindex="-1" aria-labelledby="eventoModalLabel" aria-hidden="true">
    <div class="modal-dialog custom-dialog modal-dialog-centered">
      <div class="modal-content custom-modal">
        <div class="modal-header custom-header">
          <h5 class="modal-title" id="eventoModalLabel">Añadir Evento</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" @click.stop="$emit('cerrar')"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input 
              type="text" 
              id="nombre" 
              v-model="evento.name" 
              class="form-control custom-input"
              :class="{ 'is-invalid': nombreError }"
              @input="validarNombre"
              placeholder="Nombre del evento"
            >
            <div class="invalid-feedback" v-if="nombreError">
              {{ nombreError }}
            </div>
          </div>
          <div class="mb-3">
            <label for="categoria" class="form-label">Categoría</label>
            <div class="categoria-selector">
              <select 
                id="categoria" 
                v-model="evento.categoria" 
                class="form-control custom-input"
                @change="actualizarColorCategoria"
              >
                <option v-for="cat in categorias" :key="cat.valor" :value="cat.valor">{{ cat.nombre }}</option>
              </select>
              <i :class="obtenerIconoCategoria" class="categoria-icon"></i>
            </div>
            <div class="categoria-preview mt-2">
              <div class="categoria-color-preview" :style="{ backgroundColor: evento.colorCategoria }"></div>
              <div class="categoria-badge" :style="{ backgroundColor: evento.colorCategoria }">
                <i :class="obtenerIconoCategoria"></i> {{ obtenerNombreCategoria }}
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="descripcion" class="form-label">Descripción</label>
            <textarea 
              id="descripcion" 
              v-model="evento.description" 
              class="form-control custom-input custom-textarea"
              placeholder="Descripción detallada del evento..."
              rows="3"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="fecha" class="form-label">Fecha</label>
            <input 
              type="date" 
              id="fecha" 
              v-model="evento.date" 
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
              v-model="evento.hour" 
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
          <button type="button" class="btn custom-btn-save" @click="guardarEvento">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import { createEvento, updateEvento } from '@/services/eventoServices';

export default {
    data() {
        return {
            evento: {
                name: '',
                description: '',
                date: '',
                hour: '',
                background_color: '#1b263b',
                categoria: 'general',
                colorCategoria: '#778da9' // Silver Lake Blue por defecto
            },
            categorias: [
                { nombre: 'General', valor: 'general', color: '#778da9', icono: 'fas fa-bookmark' }, // Silver Lake Blue
                { nombre: 'Trabajo', valor: 'trabajo', color: '#1b263b', icono: 'fas fa-briefcase' }, // Oxford Blue
                { nombre: 'Personal', valor: 'personal', color: '#0d1b2a', icono: 'fas fa-user' }, // Rich Black
                { nombre: 'Familia', valor: 'familia', color: '#415a77', icono: 'fas fa-home' }, // Yinmn Blue
                { nombre: 'Escuela', valor: 'escuela', color: '#e0e1dd', icono: 'fas fa-graduation-cap' }, // Platinum
                { nombre: 'Salud', valor: 'salud', color: '#90e0ef', icono: 'fas fa-heartbeat' }, // Non-Photo Blue
                { nombre: 'Finanzas', valor: 'finanzas', color: '#03045e', icono: 'fas fa-money-bill-wave' }, // Navy Blue
                { nombre: 'Social', valor: 'social', color: '#caf0f8', icono: 'fas fa-users' } // Light Cyan
            ],
            nombreError: '',
            fechaError: '',
            horaError: '',
            editando: false,
            modal: null,
            notificacion: {
                mostrar: false,
                tipo: '',
                titulo: '',
                mensaje: ''
            }
        };
    },
    computed: {
        obtenerIconoCategoria() {
            const categoriaSeleccionada = this.categorias.find(cat => cat.valor === this.evento.categoria);
            return categoriaSeleccionada ? categoriaSeleccionada.icono : 'fas fa-bookmark';
        },
        obtenerNombreCategoria() {
            const categoriaSeleccionada = this.categorias.find(cat => cat.valor === this.evento.categoria);
            return categoriaSeleccionada ? categoriaSeleccionada.nombre : 'General';
        }
    },
    methods: {
        // Validaciones de formulario
        validarNombre() {
            if (!this.evento.name) {
                this.nombreError = 'El nombre del evento es obligatorio';
            } else if (this.evento.name.length < 3) {
                this.nombreError = 'El nombre debe tener al menos 3 caracteres';
            } else {
                this.nombreError = '';
            }
        },
        validarFecha() {
            if (!this.evento.date) {
                this.fechaError = 'Debe seleccionar una fecha';
            } else {
                const hoy = new Date();
                hoy.setHours(0, 0, 0, 0);

                const fechaSeleccionada = new Date(this.evento.date);
                fechaSeleccionada.setHours(0, 0, 0, 0);

                if (fechaSeleccionada < hoy) {
                    this.fechaError = 'La fecha no puede ser anterior a hoy';
                } else {
                    this.fechaError = '';
                }
            }
        },
        validarHora() {
            if (!this.evento.hour) {
                this.horaError = 'Debe seleccionar una hora';
            } else {
                this.horaError = '';
            }
        },
        validarFormulario() {
            this.validarNombre();
            this.validarFecha();
            this.validarHora();
            return !this.nombreError && !this.fechaError && !this.horaError;
        },
        
        // Actualiza el color cuando se selecciona una categoría
        actualizarColorCategoria() {
            const categoriaSeleccionada = this.categorias.find(cat => cat.valor === this.evento.categoria);
            if (categoriaSeleccionada) {
                this.evento.colorCategoria = categoriaSeleccionada.color;
            }
        },

        // ✅ Método principal para guardar o actualizar evento
        async guardarEvento() {
    if (!this.validarFormulario()) return;

    try {
        // ✅ Obtenemos el usuario desde localStorage
        const user = JSON.parse(localStorage.getItem('user'));
console.log('Usuario logueado:', user); // Deberías ver { id: 3, username: "Fernando", ... }

if (!user || !user.id) {
    alert('Usuario no autenticado');
    return;
}

const eventoParaGuardar = {
    name: this.evento.name,
    description: this.evento.description,
    date: this.evento.date,
    hour: this.evento.hour,
    background_color: this.evento.background_color,
    userId: user.id, // ✅ Este es el campo clave
    categoria: this.evento.categoria || 'general',
    colorCategoria: this.evento.colorCategoria || '#778da9'
};

console.log('Enviando evento al backend:', eventoParaGuardar); // ❗ Revisa si aparece userId aquí

        // Si es edición, también incluimos el id del evento
        if (this.editando && this.evento.id) {
            eventoParaGuardar.id = this.evento.id;
        }
        await createEvento(eventoParaGuardar); // Llamada al backend Spring Boot

        // Llamada al servicio
        const eventoGuardado = await createEvento(eventoParaGuardar);
        this.$emit('guardar', eventoGuardado);

        // Cerrar modal
        const modal = Modal.getInstance(document.getElementById('eventoModal'));
        modal.hide();
        this.$emit('cerrar');

        // Mostrar notificación de éxito
        this.mostrarNotificacion({
            tipo: 'exito',
            titulo: this.editando ? 'Evento actualizado' : 'Evento creado',
            mensaje: this.editando 
                ? 'Tu evento ha sido actualizado correctamente.' 
                : 'Tu evento ha sido creado exitosamente.'
        });

    } catch (error) {
        console.error('Error al guardar evento:', error);
        this.mostrarNotificacion({
            tipo: 'error',
            titulo: 'Error al guardar evento',
            mensaje: 'No pudimos guardar el evento. Por favor, inténtalo de nuevo.'
        });
    }
},

        // Muestra notificación localmente
        mostrarNotificacion(noti) {
            this.notificacion = {
                mostrar: true,
                tipo: noti.tipo,
                titulo: noti.titulo,
                mensaje: noti.mensaje
            };

            setTimeout(() => {
                this.notificacion.mostrar = false;
            }, 5000);
        },

        // Preselecciona fecha (opcional)
        preseleccionarFecha(fecha) {
            this.evento.date = fecha;
        },

        // Establece valores cuando se está editando un evento existente
        establecerValoresEdicion(evento) {
            if (!evento) return;
            
            this.editando = true;
            
            // Determinar categoría y color basado en el evento existente
            let categoria = 'general';
            let colorCategoria = '#778da9';
            
            // Si el evento ya viene con categoría (procesado por el servicio)
            if (evento.categoria) {
                categoria = evento.categoria;
                colorCategoria = evento.colorCategoria || this.obtenerColorPorCategoria(categoria);
            }
            
            this.evento = {
                id: evento.id,
                name: evento.name || '',
                description: evento.description || '',
                date: evento.date || '',
                hour: evento.hour || '',
                background_color: evento.background_color || '#1b263b',
                created_at: evento.created_at || '',
                updated_at: evento.updated_at || '',
                userId: evento.userId || null,
                categoria: categoria,
                colorCategoria: colorCategoria
            };
            
            // Cambiar título del modal
            const modalTitle = document.getElementById('eventoModalLabel');
            if (modalTitle) modalTitle.textContent = 'Editar Evento';
        },
        
        // Método auxiliar para obtener color por nombre de categoría
        obtenerColorPorCategoria(nombreCategoria) {
            const categoriaEncontrada = this.categorias.find(cat => cat.valor === nombreCategoria);
            return categoriaEncontrada ? categoriaEncontrada.color : '#778da9';
        },
        
        // Muestra el modal
        showModal() {
            const modalElement = document.getElementById('eventoModal');
            if (modalElement) {
                this.modal = new Modal(modalElement);
                this.modal.show();
            } else {
                console.error('El elemento eventoModal no se encontró en el DOM');
            }
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
  background-color: var(--secondary-color);
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
  border-color: var(--secondary-color);
  box-shadow: 0 0 0 3px rgba(var(--secondary-rgb), 0.2);
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
  color: var(--secondary-color);
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
  color: var(--secondary-color);
  pointer-events: none;
}

.modal-footer {
  border-top: 1px solid var(--neutral-200);
  padding: 10px 20px;
}

.custom-btn-save {
  background-color: var(--secondary-color);
  color: white;
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.custom-btn-save:hover {
  background-color: var(--secondary-dark);
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

/* Estilos para selector de categorías mejorado */
.categoria-selector {
  position: relative;
}

.categoria-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #1b263b;
  pointer-events: none;
}

.categoria-preview {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

/* Estilos para vista previa de categorías */
.categoria-color-preview {
  height: 6px;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 5px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Estilos para etiquetas de categoría */
.categoria-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  width: fit-content;
  color: white;
  text-shadow: 0 1px 1px rgba(0,0,0,0.2);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.categoria-badge i {
  margin-right: 5px;
}
</style>
