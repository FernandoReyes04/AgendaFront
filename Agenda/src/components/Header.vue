<template>
    <header class="header">
      <h1 class="title">Agenda</h1>
    </header>
  </template>
  
  <style scoped>
  .header {
    width: 100%;
    padding: 15px 20px;
    background-color: #1d3c5c;
    color: rgb(255, 255, 255);
    display: flex;
    justify-content: left;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  
  /* Responsivo */
  @media (max-width: 768px) {
    .title {
      font-size: 20px;
    }
  }
  
  @media (max-width: 480px) {
    .title {
      font-size: 18px;
    }
  }
  </style>