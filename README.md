# Proyecto: Trazabilidad de Trámites Municipales

## Contexto del Proyecto

Desarrollo de un sistema de apoyo a la decisión socioambiental para el oriente boliviano enfocado en la **Trazabilidad de Trámites Municipales**, aplicando el ciclo de vida **AI-DLC** (*Artificial Intelligence - Development Life Cycle*).

---

## Stack Tecnológico

El proyecto está construido sobre una arquitectura full-stack moderna y desacoplada, utilizando **Next.js** como núcleo de aplicación y **Supabase** como plataforma de backend y persistencia.

### 1. Frontend & Framework Base
- **Framework:** [Next.js](https://nextjs.org/) (App Router).
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Tipado estático de extremo a extremo).
- **Diseño & UI:** [Tailwind CSS](https://tailwindcss.com/) (Estilos utilitarios responsivos y modulares).
- **Gestión de Formularios:** [React Hook Form](https://react-hook-form.com/) (Manejo eficiente y validación de formularios de trámites).

### 2. Backend & Lógica de Negocio
- **API & Mutaciones:** Server Actions de Next.js (Lógica de servidor integrada y segura).
- **ORM:** [Prisma](https://www.prisma.io/) (Modelado de datos, migraciones y tipado de consultas a base de datos).

### 3. Persistencia & Servicios Cloud (Supabase)
- **Base de Datos Relacional:** [PostgreSQL](https://www.postgresql.org/) (Alojado en Supabase; garantiza consistencia ACID e integridad referencial en trámites).
- **Autenticación & Autorización:** Supabase Auth (Control de acceso basado en roles para ciudadanos y funcionarios municipales vía email o proveedores OAuth).
- **Almacenamiento de Archivos (Storage):** Supabase Storage (Buckets compatibles con S3 para digitalización de requisitos y documentos adjuntos en PDF/imágenes).
- **Sincronización en Tiempo Real:** Supabase Realtime (Actualizaciones en vivo para tableros de control y seguimiento de estados de trámites).

---

## Infraestructura & Despliegue

- **Control de Versiones:** Git & [GitHub](https://github.com/) (Gestión de código fuente y flujo de trabajo colaborativo).
- **Alojamiento (Hosting & CI/CD):** [Vercel](https://vercel.com/) (Despliegue continuo automático integrado al repositorio de GitHub).