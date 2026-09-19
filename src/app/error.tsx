'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-center">
        <h1 className="text-lg font-bold">ページの読み込みに失敗しました</h1>
        <p className="mt-3 text-sm text-neutral-400">
          Supabaseの設定や通信状態を確認して、もう一度お試しください。
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-5 rounded-xl bg-pink-600 px-5 py-3 text-sm font-bold text-white hover:bg-pink-500"
        >
          再読み込み
        </button>
      </div>
    </main>
  )
}
