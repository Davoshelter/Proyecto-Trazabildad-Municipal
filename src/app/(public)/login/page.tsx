import { LoginForm } from '@/modules/auth/components/LoginForm'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        <LoginForm />
      </div>
    </main>
  )
}
