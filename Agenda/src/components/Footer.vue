<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-logo">
            <!-- SVG inline del logo NotiQ en color Platinum #e0e1dd -->
            <svg class="footer-icon" width="32" height="32" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M353.38 157.59c-0.2-23.916-9.535-46.711-26.010-63.864C310.894 76.574 284.259 68.142 256 68.142s-54.895 8.432-71.369 25.584c-16.476 17.153-25.811 39.948-26.010 63.864-13.215 37.773-41.915 197.752-41.915 197.752h146.502l-58.408 30.115c-6.626 4.647-10.612 12.248-10.798 20.489-0.187 8.241 3.442 16.008 9.856 20.949 6.414 4.941 14.747 6.481 22.538 4.163 7.791-2.318 13.942-8.169 16.633-15.867l13.219-38.394 13.219 38.394c2.691 7.698 8.842 13.549 16.633 15.867 7.791 2.318 16.124 0.778 22.538-4.163 6.414-4.941 10.044-12.708 9.856-20.949-0.187-8.241-4.172-15.842-10.798-20.489l-58.408-30.115h146.502c0 0-28.7-159.979-41.915-197.752z" fill="#e0e1dd"/>
              <circle cx="365" cy="120" r="40" fill="#e0e1dd"/>
            </svg>
            <h3 class="footer-title">NotiQ</h3>
          </div>
          <p class="footer-text">Organiza tus contactos, eventos y recordatorios en un sistema moderno y eficiente.</p>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Contacto</h3>
          <p class="footer-text">¿Preguntas o sugerencias? Contáctanos</p>
          <p class="footer-text">Email: contacto@notiq.com</p>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Enlaces Rápidos</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Inicio</a></li>
            <li><a href="#" class="footer-link">Ayuda</a></li>
            <li><a href="#" class="footer-link">Acerca de</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="copyright">© {{ new Date().getFullYear() }} NotiQ. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: var(--primary-dark);
  color: var(--neutral-100);
  padding: 40px 0 20px;
  margin-top: 40px;
  box-shadow: var(--shadow-md);
  position: relative;
  z-index: 100;
  width: 100%;
  left: 0;
  right: 0;
}

.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30px;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  margin-bottom: 20px;
  padding: 0 15px;
}

.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.footer-icon {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0;
  color: #e0e1dd; /* Platinum */
}

.footer-text {
  color: var(--neutral-300);
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.5;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  color: var(--neutral-300);
  text-decoration: none;
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--secondary-light);
  text-decoration: underline;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid var(--primary-light);
}

.copyright {
  color: var(--neutral-300);
  font-size: 14px;
  margin: 0;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }
  
  .footer-section {
    width: 100%;
    padding: 0;
    margin-bottom: 30px;
  }
}
</style>
