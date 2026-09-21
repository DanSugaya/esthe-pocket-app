/** §3.3 区切りの強さ。strong = 4px primary(主役コンテンツの開始位置) / medium = 2px グレー(大ブロック間) */
export function Divider({ level = 'medium' }: { level?: 'strong' | 'medium' }) {
  return (
    <div
      aria-hidden="true"
      className={level === 'strong' ? 'h-1 bg-esthe-primary' : 'border-t-2 border-esthe-divider'}
    />
  );
}
