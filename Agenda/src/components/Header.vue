<template>
  <header class="header">
    <div class="container">
      <h1 class="title">Agenda</h1>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  padding: 15px 0;
  background-color: #2a16fd; /* color2 */
  color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.title {
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  text-align: left;
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
</style>