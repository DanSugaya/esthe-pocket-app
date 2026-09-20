'use client';

import { useState } from 'react';
import styles from './AuthModal.module.css';

type ModalMode = 'login' | 'register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: ModalMode;
}

export const AuthModal = ({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) => {
  const [mode, setMode] = useState<ModalMode>(defaultMode);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* 閉じるボタン */}
        <button className={styles.closeButton} onClick={onClose} aria-label="閉じる">
          ✕
        </button>

        {/* イラスト・メイングラフィック領域 */}
        <div className={styles.graphicArea}>
          <img
            src="/images/modal-character.png"
            alt="キャラクターイラスト"
            className={styles.graphicImage}
          />
        </div>

        {/* モーダルコンテンツヘッダー */}
        <h2 className={styles.title}>
          {mode === 'login' ? 'ログイン' : '新規会員登録'}
        </h2>
        
        <p className={styles.description}>
          既にアプリでご利用の方は、アプリでアカウント登録をお願いいたします
        </p>

        {/* フォーム領域 */}
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="メールアドレス"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="パスワード"
              className={styles.input}
              required
            />
          </div>

          {mode === 'register' && (
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" required />
                <a href="/terms" target="_blank" rel="noopener noreferrer">利用規約</a>に同意する
              </label>
            </div>
          )}

          <button type="submit" className={styles.submitButton}>
            {mode === 'login' ? 'ログイン' : '新規会員登録'}
          </button>
        </form>

        {/* フッター（モード切り替え導線） */}
        <div className={styles.footer}>
          {mode === 'login' ? (
            <>
              <a href="/reset-password" className={styles.subLink}>
                パスワードを忘れた方はこちら
              </a>
              <div className={styles.switchRow}>
                <span>新規ユーザー登録はこちら</span>
                <button
                  type="button"
                  className={styles.switchButton}
                  onClick={() => setMode('register')}
                >
                  新規会員登録
                </button>
              </div>
            </>
          ) : (
            <div className={styles.switchRow}>
              <span>アカウントをお持ちの方は</span>
              <button
                type="button"
                className={styles.switchButton}
                onClick={() => setMode('login')}
              >
                ログイン
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};