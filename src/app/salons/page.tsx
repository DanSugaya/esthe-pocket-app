import { createClient } from '@/lib/supabase/server'
import ShopCard from '@/components/ShopCard'

export default async function SalonsPage() {
  const supabase = await createClient()
  const { data: salons, error } = await supabase
    .from('salons')
    .select(`
      id, name, catchphrase, description, image_url, price_info, card_ok,
      business_hours, reception_hours, phone, access,
      therapists ( id, name, image_url )
    `)
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-6 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-xl font-black text-white">サロン一覧</h1>
        {error ? (
          <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-5 text-sm text-neutral-400">
            サロン情報を取得できませんでした。Supabaseのテーブル設定とRLSを確認してください。
          </p>
        ) : !salons?.length ? (
          <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-5 text-sm text-neutral-400">
            現在、掲載中のサロンはありません。
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {salons.map((salon: any) => (
              <ShopCard key={salon.id} salon={salon} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
