"use strict";

// 🎆 Sin Nombre - Main Application Entry Point
// Un proyecto fascinante que representa la esencia de la creatividad sin límites

// Importación de módulos principales
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// 🎯 Inicialización de la aplicación
const app = express();
const PORT = process.env.PORT || 3000;

// 🛡️ Middlewares de seguridad y utilidad
app.use(helmet()); // Seguridad con HTTP headers
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parsear JSON
app.use(express.urlencoded({ extended: true })); // Parsear URL encoded

// 📊 Rutas principales de la API
app.get('/', (req, res) => {
  res.json({
    message: '🎆 Sin Nombre API - Bienvenido a la creatividad sin límites',
    version: '1.0.0',
    description: 'Un proyecto fascinante que representa la esencia de la creatividad sin límites',
    timestamp: new Date().toISOString(),
    status: 'active'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

// 📝 Ruta de ejemplo para contenido creativo
app.get('/creative', (req, res) => {
  const creativeContent = {
    title: 'Sin Nombre - Creación sin límites',
    inspiration: 'Un lienzo en blanco lleno de posibilidades infinitas',
    features: [
      'Diseño minimalista y elegante',
      'Estructura versátil y adaptable',
      'Potencial para cualquier necesidad',
      'Experiencia de usuario optimizada'
    ],
    message: '¡Transformemos lo posible juntos! 🚀'
  };
  
  res.json(creativeContent);
});

// 🚀 Manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// 🔍 Ruta no encontrada
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe en este servidor`,
    available_routes: ['/', '/health', '/creative']
  });
});

// 🌟 Inicio del servidor
app.listen(PORT, () => {
  console.log(`🎆 Sin Nombre Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🎨 Creative endpoint: http://localhost:${PORT}/creative`);
  console.log(`✨ Description: ${app.get('env') === 'development' ? 'Modo desarrollo' : 'Modo producción'}`);
});

module.exports = app;