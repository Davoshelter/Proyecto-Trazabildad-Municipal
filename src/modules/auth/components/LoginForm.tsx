'use client'

export function LoginForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input type="email" className="mt-1 block w-full border rounded-md p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Contraseña</label>
        <input type="password" className="mt-1 block w-full border rounded-md p-2" />
      </div>
      <button type="button" className="w-full bg-blue-600 text-white p-2 rounded-md">
        Ingresar
      </button>
    </form>
  )
}
