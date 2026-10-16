"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Username dan password harus diisi");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", username);
    router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.bgDecoration}>
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.bgGrid} />
      </div>

      <div className={styles.loginWrapper}>
        {/* Logo GMS */}
        <div className={styles.logoSection}>
          <div className={styles.logoImgWrapper}>
            <Image
              src="/gms-logo-badge.png"
              alt="GMS Church Emblem"
              width={140}
              height={140}
              className={styles.logoImg}
              priority
            />
          </div>
          <h1 className={styles.churchTitle}>GMS CHURCH</h1>
          <p className={styles.logoSubtitle}>Crowd Ministry Portal</p>
          <div className={styles.logoDivider} />
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <h2 className={styles.cardTitle}>Selamat Datang</h2>
              <p className={styles.cardDesc}>Masuk ke portal pelayanan GMS</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Username</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="17" height="17">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  id="username"
                  type="text"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="17" height="17">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && <p className={styles.errorMsg}>{error}</p>}

            <button id="loginBtn" type="submit" className={styles.loginBtn} disabled={loading}>
              {loading ? (
                <span className={styles.spinner} />
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="17" height="17">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  Masuk
                </>
              )}
            </button>
          </form>

          <p className={styles.hint}>Gunakan username dan password apapun untuk masuk</p>
        </div>
      </div>
    </div>
  );
}