import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function TherapistsPage() {
  const supabase = await createClient()
  const { data: therapists, error } = await supabase
    .from('therapists')
    .select('id, name, age, image_url, salons(id, name)')
    .limit(40)

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-6 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-xl font-black">セラピスト一覧</h1>
        {error ? (
          <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-5 text-sm text-neutral-400">
            セラピスト情報を取得できませんでした。
          </p>
        ) : !therapists?.length ? (
          <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-5 text-sm text-neutral-400">
            現在、掲載中のセラピストはいません。
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {therapists.map((therapist: any) => (
              <Link key={therapist.id} href={`/therapists/${therapist.id}`} className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
                <div className="aspect-[3/4] bg-neutral-800">
                  <img src={therapist.image_url || '/images/no-avatar.svg'} alt={therapist.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-bold">{therapist.name}{therapist.age ? ` (${therapist.age})` : ''}</p>
                  <p className="mt-1 truncate text-[11px] text-neutral-500">{therapist.salons?.name || '店舗未設定'}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
