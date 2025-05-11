<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">NotiQ</h3>
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

.footer-title {
  color: var(--secondary-light);
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 600;
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
