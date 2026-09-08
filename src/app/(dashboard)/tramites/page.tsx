import { TramiteCard } from '@/modules/tramites/components/TramiteCard'

export default function TramitesPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Mis Trámites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TramiteCard />
      </div>
    </div>
  )
}
