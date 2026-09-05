# Proyecto-Trazabildad-Municipal
# Contexto del  Proyecto
Se me pide desarrollar un proyecto Aplicando AI-DLC de un sistema de apoyo a la decision socioambiental para el oriente boliviano(Tema: Trazabilidad de Tramites Municipales)

# Stack Tecnologico
- Frontend y FrameWork Base
  - Framework Next.js (App Router)
  - Lenguaje TypeScript
  - Utilizando UI: Tailwind CSS
  - Gestion de Formulario: React Hook Form
- Backend y Logico de Negocio (Integrado en Next.js)
  - Api y Logica: Server Actiones(Next.js) , Prisma (ORM)
  - Base de Datos: PostgreSQL(Supabase)
- Base de Datos & Backend-as-a-Service (Supabase)
    - Base de Datos Relacional: PostgreSQL (Proporcionado por Supabase). Perfecto para mantener la integridad de los datos de los trámites (evita registros huérfanos)
    - Autenticación: Supabase Auth. Gestiona el inicio de sesión de ciudadanos (vía email, Google) y de funcionarios municipales (con roles específicos)
    - Almacenamiento (Storage): Supabase Storage (Buckets S3). Aquí se guardarán los documentos adjuntos a los trámites (PDFs de identidad, formularios escaneados)
    - Tiempo Real (Opcional): Supabase Realtime. Útil si quieres que el tablero del funcionario se actualice automáticamente cuando un ciudadano envíe un nuevo trámite
# Despliegue 
  - Alojamiento (Hosting): Vercel. Despliegue continuo automático conectado a tu repositorio de GitHub
  - Control de Versiones: Git & GitHub