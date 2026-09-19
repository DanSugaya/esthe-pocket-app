<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>アロマリラクゼーション ベルエポック 渋谷店 | 渋谷のメンズエステ | マガポケ風デザインシステム</title>
  <meta name="theme-color" content="#1B2F8F">
  <style>
    /* ==========================================
       2.5 CSS変数 (デザイントークン)
       ========================================== */
    :root {
      --color-primary: #1B2F8F;
      --color-primary-dark: #12206A;
      --color-primary-light: #E8ECFA;
      --color-accent-promo: #E0407F;
      --color-accent-like: #D93025;
      --color-accent-star: #F5A623;
      --color-accent-point: #FFE234;
      --color-success: #2E9E5B;
      --color-text: #222222;
      --color-text-sub: #888888;
      --color-border: #E0E0E0;
      --color-divider-strong: #DADADA;
      --color-bg: #FFFFFF;
      --color-bg-sub: #F4F4F4;
      --color-overlay: rgba(18, 32, 106, 0.85);
      --color-scrim: rgba(0, 0, 0, 0.35);

      --font-h1: 20px/1.4;
      --font-h2: 17px/1.4;
      --font-stat: 18px/1.0;
      --font-title: 14px/1.4;
      --font-btn: 16px/1.0;
      --font-body: 13px/1.6;
      --font-caption: 12px/1.4;
      --font-tab: 11px/1.2;
      --font-badge: 11px/1.0;
      --font-num: 14px/1.0;

      --space-1: 4px;
      --space-2: 8px;
      --space-3: 12px;
      --space-4: 16px;
      --space-5: 24px;
      --space-6: 32px;

      --radius-sm: 4px;
      --radius-md: 8px;
      --radius-lg: 12px;
      --radius-pill: 999px;
      --radius-circle: 50%;

      --border-card: 1px solid var(--color-border);
      --border-outline: 2px solid var(--color-primary);
      --border-section: 2px solid var(--color-divider-strong);
      --shadow-float: 0 2px 8px rgba(0, 0, 0, .25);
      --shadow-action: 0 2px 6px rgba(0, 0, 0, .15);

      --size-action: 54px;
      --size-status: 52px;
      --btn-h-lg: 52px;

      --header-h: 56px;
      --tabbar-h: 64px;
      --sticky-cta-h: 56px;
    }

    /* ==========================================
       ベースリセット & レイクアウト構造
       ========================================== */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", system-ui, sans-serif;
      background-color: #EFEFEF;
      color: var(--color-text);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      display: flex;
      justify-content: center;
    }

    .app-viewport {
      width: 100%;
      max-width: 390px;
      background-color: var(--color-bg);
      min-height: 100vh;
      position: relative;
      padding-bottom: calc(var(--tabbar-h) + env(safe-area-inset-bottom) + 20px);
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      overflow-x: hidden;
    }

    @media (min-width: 1024px) {
      .app-viewport {
        max-width: 720px;
      }
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button {
      font-family: inherit;
      border: none;
      background: none;
      cursor: pointer;
      color: inherit;
    }

    ul, ol {
      list-style: none;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
    }

    /* ==========================================
       4.13 Detail App Bar (詳細ヘッダー)
       ========================================== */
    .detail-app-bar {
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 390px;
      height: var(--header-h);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--space-4);
      transition: background-color 150ms ease;
      background-color: transparent;
    }

    @media (min-width: 1024px) {
      .detail-app-bar {
        max-width: 720px;
      }
    }

    .detail-app-bar.scrolled {
      background-color: var(--color-primary);
    }

    .app-bar-icon-btn {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-circle);
      background-color: var(--color-scrim);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      transition: background-color 150ms ease;
    }

    .detail-app-bar.scrolled .app-bar-icon-btn {
      background-color: transparent;
    }

    .app-bar-title {
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 700;
      line-height: 1.4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 220px;
      opacity: 0;
      transition: opacity 150ms ease;
    }

    .detail-app-bar.scrolled .app-bar-title {
      opacity: 1;
    }

    /* ==========================================
       6.3 #1 ヒーローカルーセル
       ========================================== */
    .hero-container {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background-color: var(--color-bg-sub);
    }

    .hero-slide {
      width: 100%;
      height: 100%;
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }

    .hero-slide::-webkit-scrollbar {
      display: none;
    }

    .hero-slide-item {
      flex: 0 0 100%;
      width: 100%;
      height: 100%;
      scroll-snap-align: start;
    }

    .hero-slide-item img {
      width: 100%;
      height: 100%;
    }

    .hero-dots {
      position: absolute;
      bottom: var(--space-2);
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 6px;
      pointer-events: none;
    }

    .hero-dot {
      width: 8px;
      height: 8px;
      border-radius: var(--radius-circle);
      background-color: rgba(255, 255, 255, 0.5);
    }

    .hero-dot.active {
      background-color: #FFFFFF;
    }

    .sentinel-hero {
      position: absolute;
      bottom: 0;
      height: 1px;
      width: 100%;
      pointer-events: none;
    }

    /* ==========================================
       4.14 Notice Strip (お知らせ帯)
       ========================================== */
    .notice-strip {
      height: 40px;
      padding: 0 var(--space-4);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--color-border);
      background-color: var(--color-bg);
      cursor: pointer;
    }

    .notice-strip-left {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      overflow: hidden;
    }

    .badge-update {
      background-color: var(--color-accent-promo);
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: var(--radius-pill);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .notice-strip-text {
      font-size: var(--font-body);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .notice-strip-chevron {
      color: var(--color-text-sub);
      flex-shrink: 0;
      margin-left: var(--space-1);
    }

    /* ==========================================
       メインコンテンツ設定 & 主CTA
       ========================================== */
    .section-padding {
      padding: var(--space-4);
    }

    .btn-primary-lg {
      width: 100%;
      height: var(--btn-h-lg);
      background-color: var(--color-primary);
      color: #FFFFFF;
      font-size: 16px;
      font-weight: 700;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      transition: background-color 100ms ease;
    }

    .btn-primary-lg:active {
      background-color: var(--color-primary-dark);
    }

    /* ==========================================
       4.15 Stat & Action Row (指標とアクション)
       ========================================== */
    .stat-action-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: var(--space-4);
    }

    .stat-info-left {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }

    .stat-counters {
      display: flex;
      align-items: center;
      gap: var(--space-4);
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: var(--space-1);
      font-size: 18px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }

    .stat-item--like {
      color: var(--color-accent-like);
    }

    .stat-item--star {
      color: var(--color-accent-star);
    }

    .stat-subtext {
      font-size: 13px;
      color: var(--color-text-sub);
      line-height: 1.4;
      margin-top: 2px;
    }

    .action-buttons-right {
      display: flex;
      gap: var(--space-2);
    }

    .btn-action-circle {
      width: var(--size-action);
      height: var(--size-action);
      border-radius: var(--radius-circle);
      background-color: #FFFFFF;
      box-shadow: var(--shadow-action);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 200ms ease-out;
    }

    .btn-action-circle:active {
      transform: scale(0.95);
    }

    .btn-action-circle.active {
      animation: bounce 200ms ease-out;
    }

    @keyframes bounce {
      0% { transform: scale(1); }
      50% { transform: scale(1.15); }
      100% { transform: scale(1); }
    }

    /* ==========================================
       4.16 Detail Title Block (店舗名・メタ)
       ========================================== */
    .detail-title-block {
      margin-top: var(--space-4);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .shop-title {
      font-size: 20px;
      line-height: 1.4;
      font-weight: 700;
      color: var(--color-primary);
    }

    .shop-meta {
      font-size: 14px;
      font-weight: 700;
      color: var(--color-text);
      line-height: 1.4;
    }

    .shop-info-link {
      font-size: 14px;
      color: var(--color-text-sub);
      display: inline-flex;
      align-items: center;
      gap: 2px;
    }

    /* ==========================================
       4.17 Outline Chip (特徴タグ)
       ========================================== */
    .chip-container {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      margin-top: var(--space-4);
    }

    .chip {
      display: inline-flex;
      align-items: center;
      padding: 6px 14px;
      border-radius: var(--radius-md);
      border: 2px solid #888888;
      color: var(--color-text-sub);
      font-size: 14px;
      line-height: 1.2;
    }

    .chip--brand {
      border-color: var(--color-primary);
      color: var(--color-primary);
      font-weight: 700;
    }

    /* ==========================================
       区切り線
       ========================================== */
    .divider-strong {
      height: 0;
      border: none;
      border-bottom: var(--border-section);
      margin: var(--space-5) 0;
    }

    .divider-primary-thick {
      height: 4px;
      background-color: var(--color-primary);
      border: none;
      margin: var(--space-5) 0;
    }

    /* ==========================================
       4.18 List Row & 4.19 Status Circle (セラピスト一覧)
       ========================================== */
    .section-header-row {
      display: flex;
      align-items: baseline;
      gap: var(--space-2);
      padding: 0 var(--space-4);
      margin-bottom: var(--space-3);
    }

    .section-header-title {
      font-size: 17px;
      font-weight: 700;
    }

    .section-header-sub {
      font-size: 13px;
      color: var(--color-text-sub);
    }

    .therapist-list {
      padding: 0 var(--space-2);
    }

    .list-row {
      height: 104px;
      padding: 8px;
      display: flex;
      align-items: center;
      gap: var(--space-3);
      border-bottom: 1px solid var(--color-border);
    }

    .list-row-thumb-wrap {
      position: relative;
      width: 72px;
      height: 88px;
      flex-shrink: 0;
      border-radius: var(--radius-sm);
      overflow: hidden;
      border: var(--border-card);
    }

    .list-row-thumb-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .up-ribbon {
      position: absolute;
      top: 0;
      left: 0;
      background-color: var(--color-accent-like);
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-bottom-right-radius: var(--radius-sm);
    }

    .coupon-strip {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 20px;
      background-color: var(--color-accent-point);
      color: var(--color-text);
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .list-row-center {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: var(--space-1);
      overflow: hidden;
    }

    .list-row-name {
      font-size: 14px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .list-row-reviews {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 16px;
      font-weight: 700;
      color: var(--color-text-sub);
    }

    .status {
      width: var(--size-status);
      height: var(--size-status);
      border-radius: var(--radius-circle);
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      color: #FFFFFF;
      text-align: center;
      flex-shrink: 0;
      line-height: 1.1;
    }

    .status--working { background: var(--color-primary); }
    .status--available { background: var(--color-success); }
    .status--coupon { background: var(--color-accent-point); color: var(--color-text); }
    .status--off { background: #BDBDBD; }

    /* 4.9 Outline Large */
    .btn-outline-lg {
      width: 100%;
      height: var(--btn-h-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background: #FFFFFF;
      color: var(--color-primary);
      border: var(--border-outline);
      border-radius: var(--radius-md);
      font-size: 16px;
      font-weight: 700;
    }

    .btn-outline-lg > svg {
      position: absolute;
      right: 12px;
    }

    .list-actions {
      padding: var(--space-4);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    /* ==========================================
       4.24 Price Table (料金表)
       ========================================== */
    .price-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: var(--space-3);
    }

    .price-table tr {
      border-bottom: 1px solid var(--color-border);
    }

    .price-table td {
      padding: 12px 0;
      font-size: 13px;
    }

    .price-course-name {
      font-weight: 700;
      color: var(--color-text);
    }

    .price-course-note {
      font-size: 12px;
      color: var(--color-text-sub);
      margin-top: 2px;
    }

    .price-time {
      color: var(--color-text-sub);
      text-align: center;
      width: 70px;
    }

    .price-val {
      text-align: right;
      font-weight: 700;
      font-size: 14px;
      font-variant-numeric: tabular-nums;
      width: 110px;
    }

    .price-discounted {
      color: var(--color-accent-promo);
      display: block;
    }

    .price-original {
      text-decoration: line-through;
      color: var(--color-text-sub);
      font-size: 11px;
      font-weight: 400;
      margin-right: 4px;
    }

    .price-annotation {
      font-size: 12px;
      color: var(--color-text-sub);
      margin-top: var(--space-2);
    }

    /* ==========================================
       口コミセクション
       ========================================== */
    .review-summary {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-3);
    }

    .review-score-num {
      font-size: 24px;
      font-weight: 700;
      color: var(--color-accent-star);
    }

    .review-stars {
      color: var(--color-accent-star);
      display: flex;
      gap: 2px;
    }

    .review-count-text {
      font-size: 13px;
      color: var(--color-text-sub);
    }

    .review-card {
      padding: var(--space-3) 0;
      border-bottom: 1px solid var(--color-border);
    }

    .review-card-head {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-1);
    }

    .review-card-stars {
      color: var(--color-accent-star);
      font-size: 12px;
    }

    .review-card-date {
      font-size: 12px;
      color: var(--color-text-sub);
    }

    .review-card-body {
      font-size: 13px;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* ==========================================
       4.23 Info Table (店舗情報)
       ========================================== */
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: var(--space-3);
    }

    .info-table tr {
      border-bottom: 1px solid var(--color-border);
    }

    .info-table th {
      width: 96px;
      padding: 12px 0;
      font-size: 13px;
      font-weight: 400;
      color: var(--color-text-sub);
      text-align: left;
      vertical-align: top;
    }

    .info-table td {
      padding: 12px 0;
      font-size: 13px;
      color: var(--color-text);
      vertical-align: top;
    }

    .info-table-link {
      color: var(--color-primary);
      font-weight: 700;
    }

    .map-dummy {
      width: 100%;
      aspect-ratio: 16 / 9;
      background-color: #E2E8F0;
      border-radius: var(--radius-md);
      margin-top: var(--space-3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-sub);
      font-size: 13px;
      gap: 4px;
    }

    /* ==========================================
       4.21 Recommend Row (おすすめ横スクロール)
       ========================================== */
    .recommend-scroll-wrap {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      scrollbar-width: none;
      padding: 0 var(--space-4);
      margin-top: var(--space-3);
      scroll-snap-type: x proximity;
    }

    .recommend-scroll-wrap::-webkit-scrollbar {
      display: none;
    }

    .recommend-card {
      width: 134px;
      flex-shrink: 0;
      scroll-snap-align: start;
    }

    .recommend-thumb {
      width: 134px;
      height: 134px;
      border-radius: var(--radius-lg);
      border: var(--border-card);
      overflow: hidden;
      margin-bottom: var(--space-1);
    }

    .recommend-thumb img {
      width: 100%;
      height: 100%;
    }

    .recommend-title {
      font-size: 14px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .recommend-promo {
      font-size: 12px;
      font-weight: 700;
      color: var(--color-accent-promo);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* ==========================================
       4.11 Footer (フッター)
       ========================================== */
    .footer {
      background-color: var(--color-primary-dark);
      color: #FFFFFF;
      padding: var(--space-5) var(--space-4);
      margin-top: var(--space-6);
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-2);
      margin-bottom: var(--space-5);
    }

    .footer-btn-card {
      height: 60px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-1);
      font-size: 13px;
      font-weight: 700;
    }

    .footer-legal {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
      margin-bottom: var(--space-4);
    }

    .footer-logo {
      font-size: 18px;
      font-weight: 700;
      text-align: center;
      letter-spacing: 1px;
    }

    /* ==========================================
       固定・フローティング要素 (Sticky CTA, FAB, TabBar)
       ========================================== */
    /* 4.20 Sticky CTA Bar */
    .sticky-cta-bar {
      position: fixed;
      bottom: calc(var(--tabbar-h) + env(safe-area-inset-bottom));
      left: 50%;
      transform: translateX(-50%) translateY(100%);
      width: 100%;
      max-width: 390px;
      height: var(--sticky-cta-h);
      background-color: #FFFFFF;
      border-top: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      padding: 0 var(--space-4);
      gap: var(--space-2);
      z-index: 90;
      transition: transform 150ms ease;
    }

    @media (min-width: 1024px) {
      .sticky-cta-bar {
        max-width: 720px;
      }
    }

    .sticky-cta-bar.visible {
      transform: translateX(-50%) translateY(0);
    }

    .sticky-fav-btn {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-accent-star);
    }

    /* 4.22 Coupon FAB */
    .coupon-fab {
      position: fixed;
      right: calc(50% - 195px - 8px);
      bottom: calc(var(--tabbar-h) + 16px + env(safe-area-inset-bottom));
      width: 88px;
      height: 72px;
      padding-right: 8px;
      border-radius: 36px 0 0 36px;
      background-color: var(--color-accent-point);
      color: var(--color-text);
      box-shadow: var(--shadow-float);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      z-index: 80;
      transition: bottom 150ms ease;
    }

    @media (max-width: 390px) {
      .coupon-fab { right: -8px; }
    }

    @media (min-width: 1024px) {
      .coupon-fab {
        right: calc(50% - 360px - 8px);
      }
    }

    .coupon-fab.shifted {
      bottom: calc(var(--tabbar-h) + 16px + 56px + env(safe-area-inset-bottom));
    }

    /* Top FAB */
    .fab-top {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      bottom: calc(var(--tabbar-h) + 16px + env(safe-area-inset-bottom));
      width: 48px;
      height: 48px;
      border-radius: var(--radius-circle);
      background-color: var(--color-overlay);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-float);
      z-index: 80;
      opacity: 0;
      pointer-events: none;
      transition: opacity 150ms ease, bottom 150ms ease;
    }

    .fab-top.visible {
      opacity: 1;
      pointer-events: auto;
    }

    .fab-top.shifted {
      bottom: calc(var(--tabbar-h) + 16px + 56px + env(safe-area-inset-bottom));
    }

    /* 4.2 Bottom Tab Bar */
    .bottom-tab-bar {
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 390px;
      height: calc(var(--tabbar-h) + env(safe-area-inset-bottom));
      padding-bottom: env(safe-area-inset-bottom);
      background-color: #FFFFFF;
      border-top: 1px solid var(--color-border);
      display: flex;
      justify-content: space-around;
      align-items: center;
      z-index: 100;
    }

    @media (min-width: 1024px) {
      .bottom-tab-bar {
        max-width: 720px;
      }
    }

    .tab-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      color: var(--color-text-sub);
      font-size: 11px;
      font-weight: 500;
      width: 20%;
    }

    .tab-item.active {
      color: var(--color-primary);
    }
  </style>
</head>
<body>

  <div class="app-viewport">

    <!-- 4.13 Detail App Bar (スクロール監視で切替) -->
    <header class="detail-app-bar" id="appBar">
      <button class="app-bar-icon-btn" aria-label="戻る">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="app-bar-title">アロマリラクゼーション ベルエポック 渋谷店</div>
      <button class="app-bar-icon-btn" aria-label="シェア" onclick="handleShare()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
      </button>
    </header>

    <!-- 6.3 #1 ヒーローカルーセル (16:9) -->
    <section class="hero-container">
      <div class="hero-slide" id="heroSlide">
        <div class="hero-slide-item">
          <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80" alt="ベルエポック 渋谷店 内観1" fetchpriority="high">
        </div>
        <div class="hero-slide-item">
          <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80" alt="ベルエポック 渋谷店 施術ルーム" loading="lazy">
        </div>
        <div class="hero-slide-item">
          <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80" alt="ベルエポック 渋谷店 アロマ" loading="lazy">
        </div>
      </div>
      <div class="hero-dots">
        <span class="hero-dot active"></span>
        <span class="hero-dot"></span>
        <span class="hero-dot"></span>
      </div>
      <!-- IntersectionObserver 用の番兵要素 -->
      <div class="sentinel-hero" id="heroSentinel"></div>
    </section>

    <!-- 4.14 Notice Strip (お知らせ帯) -->
    <div class="notice-strip" onclick="scrollToSection('therapists')">
      <div class="notice-strip-left">
        <span class="badge-update">更新</span>
        <span class="notice-strip-text">本日 12:00〜翌5:00 営業中 ／ 出勤情報を14:30に更新</span>
      </div>
      <svg class="notice-strip-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>

    <!-- 6.3 #3 主CTA ～ #6 特徴タグ -->
    <div class="section-padding">
      <!-- 主CTA (監視対象) -->
      <button class="btn-primary-lg" id="mainCta" onclick="alert('お電話ありがとうございます。発信します。')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        <span>電話で予約する</span>
      </button>

      <!-- 4.15 Stat & Action Row -->
      <div class="stat-action-row">
        <div class="stat-info-left">
          <div class="stat-counters">
            <div class="stat-item stat-item--like">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              <span id="likeCount">20,527</span>
            </div>
            <div class="stat-item stat-item--star">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span id="starCount">9,116</span>
            </div>
          </div>
          <div class="stat-subtext">営業時間:12:00〜翌5:00<br>定休日:年中無休</div>
        </div>
        <div class="action-buttons-right">
          <button class="btn-action-circle" id="likeBtn" aria-pressed="false" onclick="toggleLike()" aria-label="いいね">
            <svg id="likeIcon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-like)" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
          </button>
          <button class="btn-action-circle" id="starBtn" aria-pressed="false" onclick="toggleStar()" aria-label="お気に入り">
            <svg id="starIcon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-star)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </button>
        </div>
      </div>

      <!-- 4.16 Detail Title Block -->
      <div class="detail-title-block">
        <h1 class="shop-title">アロマリラクゼーション ベルエポック 渋谷店</h1>
        <div class="shop-meta">渋谷 ／ 渋谷駅 徒歩3分 &nbsp; 運営:ベルエポックグループ</div>
        <a href="#infoTableSection" class="shop-info-link" onclick="scrollToSection('infoTableSection'); return false;">
          <span>店舗詳細情報</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>
      </div>

      <!-- 4.17 Outline Chip -->
      <div class="chip-container">
        <span class="chip chip--brand">ポータル限定</span>
        <span class="chip chip--brand">新店</span>
        <span class="chip">完全個室</span>
        <span class="chip">駅近</span>
        <span class="chip">深夜営業</span>
      </div>
    </div>

    <!-- 区切り: 強 (4px primary) -->
    <hr class="divider-primary-thick">

    <!-- 6.3 #7 セラピスト一覧 -->
    <section id="therapists">
      <div class="section-header-row">
        <h2 class="section-header-title">セラピスト全12名</h2>
        <span class="section-header-sub">本日出勤5名</span>
      </div>

      <div class="therapist-list">
        <!-- 4.18 List Row (出勤中) -->
        <div class="list-row">
          <div class="list-row-thumb-wrap">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="美月" loading="lazy">
            <span class="up-ribbon">NEW</span>
          </div>
          <div class="list-row-center">
            <div class="list-row-name">美月 (みづき)</div>
            <div class="list-row-reviews">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>194</span>
            </div>
          </div>
          <div class="status status--working">出勤中</div>
        </div>

        <!-- 4.18 List Row (空きあり) -->
        <div class="list-row">
          <div class="list-row-thumb-wrap">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80" alt="七海" loading="lazy">
          </div>
          <div class="list-row-center">
            <div class="list-row-name">七海 (ななみ)</div>
            <div class="list-row-reviews">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>88</span>
            </div>
          </div>
          <div class="status status--available">空き<br>17:30</div>
        </div>

        <!-- 4.18 List Row (クーポンあり) -->
        <div class="list-row">
          <div class="list-row-thumb-wrap">
            <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80" alt="愛梨" loading="lazy">
            <div class="coupon-strip">クーポンあり</div>
          </div>
          <div class="list-row-center">
            <div class="list-row-name">愛梨 (あいり)</div>
            <div class="list-row-reviews">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>312</span>
            </div>
          </div>
          <div class="status status--coupon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
            <span>クーポン</span>
          </div>
        </div>

        <!-- 4.18 List Row (休み) -->
        <div class="list-row">
          <div class="list-row-thumb-wrap">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" alt="早紀" loading="lazy">
          </div>
          <div class="list-row-center">
            <div class="list-row-name">早紀 (さき)</div>
            <div class="list-row-reviews">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>45</span>
            </div>
          </div>
          <div class="status status--off">休み</div>
        </div>
      </div>

      <div class="list-actions">
        <!-- 4.9 Outline Large -->
        <button class="btn-outline-lg">
          <span>全12名を表示する</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
        <!-- 4.9 Primary Large -->
        <button class="btn-primary-lg" onclick="scrollToSection('priceSection')">
          <span>コース・料金を見る</span>
        </button>
      </div>
    </section>

    <!-- 区切り: 中 (2px gray) -->
    <hr class="divider-strong">

    <!-- 6.3 #8 料金・コース (Price Table) -->
    <section class="section-padding" id="priceSection">
      <h2 style="font-size: 17px; font-weight: 700;">料金・コース</h2>
      <table class="price-table">
        <tbody>
          <tr>
            <td>
              <div class="price-course-name">スタンダードアロマ</div>
              <div class="price-course-note">基本の全身リラクゼーションコース</div>
            </td>
            <td class="price-time">60分</td>
            <td class="price-val">10,000円</td>
          </tr>
          <tr>
            <td>
              <div class="price-course-name">ディープディライトコース</div>
              <div class="price-course-note">看板人気メニュー / パウダー＆アロマ</div>
            </td>
            <td class="price-time">90分</td>
            <td class="price-val">
              <span class="price-discounted">13,000円</span>
              <span class="price-original">15,000円</span>
            </td>
          </tr>
          <tr>
            <td>
              <div class="price-course-name">プレミアムラグジュアリー</div>
              <div class="price-course-note">極上密着＆フルアロマロングコース</div>
            </td>
            <td class="price-time">120分</td>
            <td class="price-val">19,000円</td>
          </tr>
        </tbody>
      </table>
      <div class="price-annotation">※表示価格はすべて税込です。<br>※指名料（2,000円）は別途頂戴いたします。</div>
    </section>

    <!-- 区切り: 中 (2px gray) -->
    <hr class="divider-strong">

    <!-- 6.3 #9 口コミ -->
    <section class="section-padding">
      <h2 style="font-size: 17px; font-weight: 700; margin-bottom: var(--space-2);">口コミ・評価</h2>
      <div class="review-summary">
        <span class="review-score-num">4.8</span>
        <div>
          <div class="review-stars">★★★★★</div>
          <div class="review-count-text">全142件の評価</div>
        </div>
      </div>

      <div class="review-card">
        <div class="review-card-head">
          <span class="review-card-stars">★★★★★</span>
          <span class="review-card-date">2026/09/15</span>
        </div>
        <div class="review-card-body">
          美月さんを指名しました。部屋の清潔感が高く、接客も丁寧で非常にリラックスできました。また渋谷に来た際は利用したいと思います。
        </div>
      </div>

      <div class="review-card">
        <div class="review-card-head">
          <span class="review-card-stars">★★★★☆</span>
          <span class="review-card-date">2026/09/10</span>
        </div>
        <div class="review-card-body">
          90分コースを選択。アロマの香りが選べるのが良かったです。施術も力加減が絶妙で疲れが吹き飛びました。
        </div>
      </div>

      <div style="margin-top: var(--space-4);">
        <button class="btn-outline-lg">
          <span>口コミをすべて見る (142件)</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </section>

    <!-- 区切り: 中 (2px gray) -->
    <hr class="divider-strong">

    <!-- 6.3 #10 店舗情報 (Info Table & 地図) -->
    <section class="section-padding" id="infoTableSection">
      <h2 style="font-size: 17px; font-weight: 700;">店舗情報</h2>
      <table class="info-table">
        <tbody>
          <tr>
            <th>住所</th>
            <td>東京都渋谷区道玄坂2-XX-XX 渋谷ビル3F</td>
          </tr>
          <tr>
            <th>アクセス</th>
            <td>JR渋谷駅 ハチ公口より徒歩3分 / 井の頭線渋谷駅より徒歩2分</td>
          </tr>
          <tr>
            <th>営業時間</th>
            <td>12:00 〜 翌 5:00 (最終受付 翌 3:30)</td>
          </tr>
          <tr>
            <th>定休日</th>
            <td>年中無休</td>
          </tr>
          <tr>
            <th>電話番号</th>
            <td><a href="tel:0312345678" class="info-table-link">03-1234-5678</a></td>
          </tr>
          <tr>
            <th>支払方法</th>
            <td>現金 / クレジットカード (VISA, Master, JCB, AMEX)</td>
          </tr>
          <tr>
            <th>届出情報</th>
            <td>届出確認済み (渋谷警察署届出済)</td>
          </tr>
        </tbody>
      </table>

      <!-- 地図エリア -->
      <div class="map-dummy">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        <span>Google Mapsで地図を開く</span>
      </div>
    </section>

    <!-- 区切り: 中 (2px gray) -->
    <hr class="divider-strong">

    <!-- 6.3 #11 おすすめ (Recommend Row) -->
    <section style="padding: var(--space-4) 0;">
      <h2 style="font-size: 17px; font-weight: 700; padding: 0 var(--space-4);">この店舗を見た人はこちらも</h2>
      <div class="recommend-scroll-wrap">
        <div class="recommend-card">
          <div class="recommend-thumb">
            <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=300&q=80" alt="スパ エルメス" loading="lazy">
          </div>
          <div class="recommend-title">スパ エルメス 恵比寿</div>
          <div class="recommend-promo">ご新規様2,000円OFF</div>
        </div>
        <div class="recommend-card">
          <div class="recommend-thumb">
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80" alt="アロマレディ" loading="lazy">
          </div>
          <div class="recommend-title">アロマレディ 新宿</div>
          <div class="recommend-promo">90分 11,000円〜</div>
        </div>
        <div class="recommend-card">
          <div class="recommend-thumb">
            <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=300&q=80" alt="リラクゼーションスイート" loading="lazy">
          </div>
          <div class="recommend-title">スイート 六本木</div>
          <div class="recommend-promo">ポータル限定特典</div>
        </div>
      </div>
    </section>

    <!-- 6.3 #12 同じエリアの店舗 -->
    <section style="padding: var(--space-2) 0 var(--space-4) 0;">
      <h2 style="font-size: 17px; font-weight: 700; padding: 0 var(--space-4);">同じエリアの店舗</h2>
      <div class="recommend-scroll-wrap">
        <div class="recommend-card">
          <div class="recommend-thumb">
            <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=300&q=80" alt="アロマガーデン" loading="lazy">
          </div>
          <div class="recommend-title">アロマガーデン 渋谷</div>
          <div class="recommend-promo">本日の空きあり</div>
        </div>
        <div class="recommend-card">
          <div class="recommend-thumb">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="ラ・ペール" loading="lazy">
          </div>
          <div class="recommend-title">ラ・ペール 渋谷本店</div>
          <div class="recommend-promo">口コミ高評価</div>
        </div>
        <div class="recommend-card">
          <div class="recommend-thumb">
            <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80" alt="ヴィーナス" loading="lazy">
          </div>
          <div class="recommend-title">ヴィーナス 渋谷</div>
          <div class="recommend-promo">深夜も営業中</div>
        </div>
      </div>
    </section>

    <!-- 4.11 Footer -->
    <footer class="footer">
      <div class="footer-grid">
        <div class="footer-btn-card">公式SNS</div>
        <div class="footer-btn-card">ご利用ガイド</div>
        <div class="footer-btn-card">ヘルプ</div>
        <div class="footer-btn-card">お問い合わせ</div>
      </div>
      <div class="footer-legal">
        ※当サイトは18歳未満の方のご利用を硬くお断りしております。<br>
        掲載店舗は法令を遵守し健全な運営を行っております。<br>
        © 2026 MENT-ESTHE PORTAL SYSTEM All Rights Reserved.
      </div>
      <div class="footer-logo">MEN'S ESTHE PORTAL</div>
    </footer>

    <!-- 4.20 Sticky CTA Bar (主CTA画面外で下部出現) -->
    <div class="sticky-cta-bar" id="stickyCtaBar">
      <button class="sticky-fav-btn" onclick="toggleStar()" aria-label="お気に入り">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      </button>
      <button class="btn-primary-lg" style="flex:1;" onclick="alert('お電話ありがとうございます。発信します。')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        <span>電話で予約する</span>
      </button>
    </div>

    <!-- 4.22 Coupon FAB (右端固定) -->
    <div class="coupon-fab" id="couponFab" onclick="alert('利用可能なクーポン: 【初来店限定】コース料金2,000円引き！')">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom:2px;"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
      <span>クーポン<br>GET!!</span>
    </div>

    <!-- トップへ戻る FAB (中央) -->
    <button class="fab-top" id="fabTop" onclick="scrollToTop()" aria-label="トップへ戻る">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
    </button>

    <!-- 4.2 Bottom Tab Bar (最下部固定) -->
    <nav class="bottom-tab-bar">
      <a href="#" class="tab-item active">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        <span>TOP</span>
      </a>
      <a href="#" class="tab-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <span>店舗を探す</span>
      </a>
      <a href="#" class="tab-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        <span>ランキング</span>
      </a>
      <a href="#" class="tab-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
        <span>お気に入り</span>
      </a>
      <a href="#" class="tab-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <span>マイページ</span>
      </a>
    </nav>

  </div>

  <!-- ==========================================
     インタラクション制御 JS
     ========================================== -->
  <script>
    // 状態管理
    let isLiked = false;
    let isStarred = false;
    let likes = 20527;
    let stars = 9116;

    // ヘッダーフェード＆Sticky CTA監視 (IntersectionObserver)
    document.addEventListener('DOMContentLoaded', () => {
      const appBar = document.getElementById('appBar');
      const heroSentinel = document.getElementById('heroSentinel');
      const mainCta = document.getElementById('mainCta');
      const stickyCtaBar = document.getElementById('stickyCtaBar');
      const couponFab = document.getElementById('couponFab');
      const fabTop = document.getElementById('fabTop');

      // 1. ヘッダー背景切り替えObserver
      const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            appBar.classList.add('scrolled');
          } else {
            appBar.classList.remove('scrolled');
          }
        });
      }, { threshold: 0 });

      if (heroSentinel) headerObserver.observe(heroSentinel);

      // 2. Sticky CTA Bar 表示制御Observer
      const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            stickyCtaBar.classList.add('visible');
            couponFab.classList.add('shifted');
            fabTop.classList.add('shifted');
          } else {
            stickyCtaBar.classList.remove('visible');
            couponFab.classList.remove('shifted');
            fabTop.classList.remove('shifted');
          }
        });
      }, { threshold: 0 });

      if (mainCta) ctaObserver.observe(mainCta);

      // 3. トップへ戻るFABのスクロール監視
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          fabTop.classList.add('visible');
        } else {
          fabTop.classList.remove('visible');
        }
      });

      // 4. カルーセルのドットインジケーター連動
      const heroSlide = document.getElementById('heroSlide');
      const dots = document.querySelectorAll('.hero-dot');
      if (heroSlide) {
        heroSlide.addEventListener('scroll', () => {
          const index = Math.round(heroSlide.scrollLeft / heroSlide.clientWidth);
          dots.forEach((dot, i) => {
            if (i === index) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        });
      }
    });

    // いいねトグル
    function toggleLike() {
      const btn = document.getElementById('likeBtn');
      const icon = document.getElementById('likeIcon');
      const countEl = document.getElementById('likeCount');

      isLiked = !isLiked;
      btn.setAttribute('aria-pressed', isLiked.toString());

      if (isLiked) {
        likes += 1;
        btn.classList.add('active');
        icon.setAttribute('fill', 'var(--color-accent-like)');
      } else {
        likes -= 1;
        btn.classList.remove('active');
        icon.setAttribute('fill', 'none');
      }
      countEl.textContent = likes.toLocaleString();
    }

    // お気に入りトグル
    function toggleStar() {
      const btn = document.getElementById('starBtn');
      const icon = document.getElementById('starIcon');
      const countEl = document.getElementById('starCount');

      isStarred = !isStarred;
      btn.setAttribute('aria-pressed', isStarred.toString());

      if (isStarred) {
        stars += 1;
        btn.classList.add('active');
        icon.setAttribute('fill', 'var(--color-accent-star)');
      } else {
        stars -= 1;
        btn.classList.remove('active');
        icon.setAttribute('fill', 'none');
      }
      countEl.textContent = stars.toLocaleString();
    }

    // スムーススクロール
    function scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) {
        const offset = 60;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }

    // トップへ戻る
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    // シェア機能フォールバック
    function handleShare() {
      if (navigator.share) {
        navigator.share({
          title: 'アロマリラクゼーション ベルエポック 渋谷店',
          url: window.location.href
        }).catch(() => {});
      } else {
        alert('店舗ページのURLをコピーしました！');
      }
    }
  </script>
</body>
</html>