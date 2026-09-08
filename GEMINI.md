# GEMINI.md — Reglas del proyecto

## Contexto
Sistema de apoyo a la decisión socioambiental para el oriente boliviano, enfocado en
**Trazabilidad de Trámites Municipales**. Se desarrolla aplicando el ciclo de vida
**AI-DLC** (AI-Development Life Cycle): las specs en `specs/` son la fuente de verdad
de cada feature; este archivo son las reglas que aplican a TODO el proyecto.

Antes de implementar cualquier feature, lee la spec correspondiente en `specs/`.
Si no existe una spec para lo que se pide, dilo explícitamente en vez de improvisar
el diseño de la solución.

---

## Stack tecnológico (no te desvíes de esto sin que se indique en una spec)

| Capa | Tecnología |
|---|---|
| Framework | Next.js (App Router) |
| Lenguaje | TypeScript — tipado estático de extremo a extremo, `strict: true` |
| Estilos | Tailwind CSS (utilitario, sin CSS-in-JS ni módulos CSS aparte) |
| Formularios | React Hook Form |
| Lógica de servidor | Server Actions de Next.js (no crear API routes salvo que se justifique en una spec) |
| ORM | Prisma |
| Base de datos | PostgreSQL vía Supabase |
| Auth | Supabase Auth (roles: ciudadano / funcionario municipal) |
| Archivos | Supabase Storage (buckets S3-compatibles, PDFs e imágenes de requisitos) |
| Tiempo real | Supabase Realtime (tableros y seguimiento de estado de trámites) |
| Hosting / CI-CD | Vercel, desplegado automáticamente desde GitHub |

---

## Convenciones de código

- Componentes en PascalCase (`TramiteCard.tsx`), funciones y variables en camelCase.
- Toda mutación de datos pasa por Server Actions, nunca fetch directo desde el cliente
  a Supabase para escritura.
- Los tipos de datos viven en el schema de Prisma; no dupliques interfaces manuales
  para modelos que ya existen ahí — impórtalos desde el cliente generado.
- Componentes de servidor por defecto; usa `"use client"` solo cuando haya
  interactividad real (formularios, estado local).
- Archivos de validación de formularios junto al componente que los usa
  (`TramiteForm.tsx` + `TramiteForm.schema.ts`).

## Reglas de seguridad (no negociables)

- Row Level Security (RLS) activo en toda tabla de Supabase que contenga datos
  de trámites o de usuarios. Ninguna tabla nueva se crea sin política RLS definida.
- El rol del usuario (ciudadano / funcionario) se valida siempre en el servidor,
  nunca solo se oculta un botón en el cliente.
- Los documentos subidos a Storage se asocian a un trámite y a un usuario;
  nunca un bucket de acceso público para documentos de trámites.
- No expongas variables de entorno con la service role key de Supabase al cliente
  bajo ninguna circunstancia.

## Qué NO hacer

- No agregues librerías de gestión de estado global (Redux, Zustand, etc.) salvo
  que una spec lo justifique explícitamente — Server Actions + estado local alcanza
  para el alcance actual del proyecto.
- No escribas SQL crudo fuera de Prisma salvo excepción documentada en una spec
  (ej. una consulta compleja de reporting).
- No implementes autenticación propia; todo pasa por Supabase Auth.
- No mezcles lógica de negocio dentro de componentes de UI — va en Server Actions
  o en funciones utilitarias separadas.

## Arquitectura: Modular por dominio (no MVC)

Este proyecto usa arquitectura modular por dominio de negocio, no MVC. La regla
de oro: **si algo pertenece a un dominio específico (auth, tramites, usuarios),
va dentro de `src/modules/<dominio>/`, sin excepción.** Solo el código usado por
2+ módulos va a `src/shared/`. La carpeta `src/app/` es exclusivamente de
enrutamiento — nunca contiene lógica de negocio, solo importa desde `modules/`.

Cada módulo sigue la misma subestructura interna:
- `components/` — UI específica del dominio
- `actions/` — Server Actions del dominio
- `schemas/` — validación (zod u otro)
- `types/` — tipos específicos del dominio
- `services/` — lógica de negocio y acceso a datos
- `hooks/` — solo si el módulo necesita hooks de cliente

## Estructura de referencia

```
proyecto/
├── GEMINI.md
├── specs/                            # una spec por feature
│   ├── spec_login.md
│   └── spec_tramites.md
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/                          # Solo enrutamiento (capa delgada)
│   │   ├── (public)/
│   │   │   └── login/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── tramites/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   └── layout.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── modules/                      # Un módulo por dominio de negocio
│   │   ├── auth/
│   │   │   ├── components/LoginForm.tsx
│   │   │   ├── actions/login.action.ts
│   │   │   ├── schemas/login.schema.ts
│   │   │   ├── hooks/useSession.ts
│   │   │   └── services/auth.service.ts
│   │   │
│   │   ├── tramites/
│   │   │   ├── components/TramiteCard.tsx
│   │   │   ├── components/TramiteForm.tsx
│   │   │   ├── actions/crear-tramite.action.ts
│   │   │   ├── actions/actualizar-estado.action.ts
│   │   │   ├── schemas/tramite.schema.ts
│   │   │   ├── types/tramite.types.ts
│   │   │   └── services/tramites.service.ts
│   │   │
│   │   └── usuarios/
│   │       └── (misma subestructura: components/ actions/ schemas/ services/)
│   │
│   └── shared/                       # Código cruzado entre módulos
│       ├── components/ui/            # botones, inputs, cards genéricos
│       ├── lib/supabase/client.ts
│       ├── lib/supabase/server.ts
│       ├── lib/prisma.ts
│       ├── hooks/
│       └── utils/
│
├── .env.local
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## Al iniciar cualquier tarea

1. Lee este archivo y la spec relevante en `specs/`.
2. Si la spec no cubre un caso, pregunta antes de asumir — sobre todo en reglas
   de seguridad o de roles.
3. Verifica que el resultado cumple los criterios de aceptación de la spec antes
   de darla por terminada.