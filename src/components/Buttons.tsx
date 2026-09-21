import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/* designsystem §4.9 Buttons */

type Variant = 'primary' | 'outline' | 'secondary';
type Size = 'md' | 'lg';

type Common = {
  variant?: Variant;
  size?: Size;
  /** 全幅(既定 true)。flex 内で伸縮させたいときは false + className="flex-1" */
  full?: boolean;
  /** 右端のシェブロン */
  chevron?: boolean;
  /** ラベルの左に置くアイコン */
  icon?: ReactNode;
};

const VARIANT: Record<Variant, string> = {
  primary: 'bg-esthe-primary text-white active:bg-esthe-primary-dark',
  outline: 'border-2 border-esthe-primary bg-white text-esthe-primary active:bg-esthe-primary-light',
  secondary: 'bg-esthe-sub text-esthe-text active:opacity-70',
};

const SIZE: Record<Size, string> = {
  md: 'h-12 text-title',
  lg: 'h-[var(--btn-h-lg)] text-btn',
};

const buttonClass = ({ variant = 'primary', size = 'lg', full = true }: Common, extra = '') =>
  `relative inline-flex items-center justify-center gap-2 rounded-esthe-md font-bold transition-colors disabled:pointer-events-none disabled:opacity-40 ${VARIANT[variant]} ${SIZE[size]} ${full ? 'w-full' : ''} ${extra}`;

function Content({ icon, chevron, children }: Pick<Common, 'icon' | 'chevron'> & { children: ReactNode }) {
  return (
    <>
      {icon}
      {children}
      {chevron && <ChevronRight size={20} aria-hidden="true" className="absolute right-3" />}
    </>
  );
}

export function Button({
  variant,
  size,
  full,
  chevron,
  icon,
  className,
  children,
  type = 'button',
  ...rest
}: Common & ComponentPropsWithoutRef<'button'>) {
  return (
    <button type={type} className={buttonClass({ variant, size, full }, className)} {...rest}>
      <Content icon={icon} chevron={chevron}>
        {children}
      </Content>
    </button>
  );
}

/** サイト内リンクは next/link、tel: や外部URLは通常の <a> で描画する */
export function ButtonLink({
  variant,
  size,
  full,
  chevron,
  icon,
  className,
  children,
  href,
  ...rest
}: Common & Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { href: string }) {
  const cls = buttonClass({ variant, size, full }, className);
  const content = (
    <Content icon={icon} chevron={chevron}>
      {children}
    </Content>
  );

  return href.startsWith('/') || href.startsWith('#') ? (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  ) : (
    <a href={href} className={cls} {...rest}>
      {content}
    </a>
  );
}
