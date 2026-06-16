# 🏫 Muro Escolar - Backend (Microservicios)

## 📝 Descripción del Proyecto
**Muro Escolar** es un sistema backend robusto diseñado para instituciones educativas. Está construido bajo una arquitectura de **Microservicios** utilizando **NestJS**, lo que garantiza alta escalabilidad y separación de responsabilidades. La orquestación central se realiza a través de un **API Gateway** que enruta las peticiones de forma eficiente mediante el protocolo **TCP**.

---

## 🏗️ Arquitectura y Servicios

| Servicio | Puerto | Funcionalidad Principal |
| :--- | :--- | :--- |
| **API Gateway** | `3000` | Punto de entrada único. Gestiona la autenticación y enruta las peticiones. |
| **ms-obras** | `3001` | Centraliza la lógica de negocio, almacenamiento de estado y gestión de obras. |
| **ms-feedback** | `3002` | Procesa las evaluaciones y la interacción continua entre docentes y alumnos. |
| **ms-reportes** | `3003` | Genera métricas estadísticas consumiendo datos consolidados de Obras. |

---

## 🔐 Seguridad y Tecnologías
* **JSON Web Tokens (JWT):** Implementación de sesiones seguras y persistentes para los usuarios.
* **Control por Roles (Guards):** Restricción de endpoints basada en la jerarquía institucional (Directivo, Docente, Alumno).
* **Comunicación Interna:** Uso de patrones de mensajería (`ClientProxy` y `MessagePattern`) para mantener los servicios desacoplados y libres de colisiones.

---

## 🚀 Guía de Instalación y Ejecución

1. Clonar el repositorio en el entorno local.
2. Ejecutar `npm install` en la raíz de cada microservicio para descargar las dependencias.
3. Configurar el archivo `.env` en el Gateway con la clave secreta `JWT_SECRET`.
4. Iniciar los servicios abriendo terminales independientes y ejecutando `npm run start:dev` en el siguiente orden:
   - API Gateway
   - ms-obras
   - ms-feedback
   - ms-reportes