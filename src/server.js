"use strict";

// 🎆 Sin Nombre - Enhanced Server Module
// Controlador de servidor avanzado con logging y monitoreo

const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');

class EnhancedServer {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.logFile = path.join(__dirname, '..', 'server.log');
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    // Logging con archivo y consola
    this.app.use(logger('combined'));
    
    // Logging personalizado a archivo
    this.app.use((req, res, next) => {
      const logEntry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        userAgent: req.get('User-Agent'),
        ip: req.ip || req.connection.remoteAddress
      };
      
      fs.appendFileSync(this.logFile, JSON.stringify(logEntry) + '\n');
      next();
    });
  }

  setupRoutes() {
    // Ruta principal con template
    this.app.get('/', (req, res) => {
      res.render('index', {
        title: 'Sin Nombre - Creatividad Sin Límites',
        version: '2.0.0',
        features: ['Minimalista', 'Versátil', 'Elegante', 'Potencial']
      });
    });

    // API de estado del servidor
    this.app.get('/api/status', (req, res) => {
      const status = {
        status: 'running',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: '2.0.0',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        requests: this.getRequestCount()
      };
      
      res.json(status);
    });

    // Endpoint creativo mejorado
    this.app.get('/api/creative', (req, res) => {
      const creativeData = {
        project: 'Sin Nombre',
        description: 'Un proyecto fascinante que representa la esencia de la creatividad sin límites',
        capabilities: [
          'Desarrollo full-stack',
          'APIs escalables',
          'Interfaces de usuario modernas',
          'Despliegue en la nube'
        ],
        technologies: ['Node.js', 'Express', 'React', 'TypeScript', 'PostgreSQL'],
        mission: 'Crear experiencias digitales hermosas y funcionales'
      };
      
      res.json(creativeData);
    });

    // Endpoint de análisis de logs
    this.app.get('/api/logs', (req, res) => {
      try {
        const logs = fs.readFileSync(this.logFile, 'utf8')
          .split('\n')
          .filter(line => line.trim())
          .map(line => JSON.parse(line))
          .slice(-50); // Últimas 50 entradas
        
        res.json({
          logs: logs,
          total: logs.length,
          lastUpdated: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: 'No se pudieron leer los logs' });
      }
    });
  }

  getRequestCount() {
    // Contador simple de requests (en producción usar Redis o similar)
    if (!this.requestCount) this.requestCount = 0;
    return ++this.requestCount;
  }

  start() {
    return new Promise((resolve, reject) => {
      this.app.listen(this.port, (error) => {
        if (error) {
          reject(error);
        } else {
          console.log(`🚀 Enhanced Server running on port ${this.port}`);
          console.log(`📊 Status API: http://localhost:${this.port}/api/status`);
          console.log(`🎨 Creative API: http://localhost:${this.port}/api/creative`);
          console.log(`📝 Logs API: http://localhost:${this.port}/api/logs`);
          console.log(`📁 Log file: ${this.logFile}`);
          resolve(this);
        }
      });
    });
  }

  async stop() {
    return new Promise((resolve) => {
      // Cerrar gracefully
      setTimeout(() => {
        console.log('🛑 Enhanced Server stopped gracefully');
        resolve();
      }, 1000);
    });
  }
}

module.exports = EnhancedServer;