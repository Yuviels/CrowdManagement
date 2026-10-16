"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./dashboard.module.css";

const ministries = [
  {
    id: "data",
    slug: "data-ministry",
    name: "Data Ministry",
    shortDesc: "Pengelolaan dan pencatatan data jemaat gereja secara akurat",
    color: "#FFFFFF",
    colorLight: "rgba(255,255,255,0.08)",
    members: "12 Anggota",
    tag: "Data & Admin",
    num: "01",
  },
  {
    id: "crowd",
    slug: "crowd-ministry",
    name: "Crowd Ministry",
    shortDesc: "Pelayanan pengaturan dan pengelolaan kerumunan jemaat",
    color: "#FFFFFF",
    colorLight: "rgba(255,255,255,0.08)",
    members: "25 Anggota",
    tag: "Crowd Control",
    num: "02",
  },
  {
    id: "usher",
    slug: "usher-ministry",
    name: "Usher Ministry",
    shortDesc: "Penyambutan dan pemanduan jemaat di dalam gereja",
    color: "#FFFFFF",
    colorLight: "rgba(255,255,255,0.08)",
    members: "18 Anggota",
    tag: "Penyambutan",
    num: "03",
  },
  {
    id: "firstaid",
    slug: "firstaid-ministry",
    name: "First Aid Ministry",
    shortDesc: "Pelayanan pertolongan pertama dan kesehatan jemaat",
    color: "#FFFFFF",
    colorLight: "rgba(255,255,255,0.08)",
    members: "8 Anggota",
    tag: "Kesehatan",
    num: "04",
  },
];

const icons: Record<string, React.ReactNode> = {
  data: (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <rect x="6" y="10" width="36" height="7" rx="3.5" fill="#FFFFFF" opacity="0.95"/>
      <rect x="6" y="22" width="36" height="7" rx="3.5" fill="#FFFFFF" opacity="0.6"/>
      <rect x="6" y="34" width="24" height="7" rx="3.5" fill="#FFFFFF" opacity="0.35"/>
    </svg>
  ),
  crowd: (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <circle cx="24" cy="14" r="7" fill="#FFFFFF" opacity="0.95"/>
      <circle cx="9" cy="18" r="5" fill="#FFFFFF" opacity="0.5"/>
      <circle cx="39" cy="18" r="5" fill="#FFFFFF" opacity="0.5"/>
      <path d="M10 40c0-8 5-13 14-13s14 5 14 13" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.95"/>
      <path d="M2 40c0-5 3-8 7-8" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M46 40c0-5-3-8-7-8" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
  usher: (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <circle cx="24" cy="13" r="7" fill="#FFFFFF" opacity="0.95"/>
      <path d="M9 40c0-9 6.5-14 15-14s15 5 15 14" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.85"/>
      <path d="M30 26l7 6-7 6" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.65"/>
      <line x1="37" y1="32" x2="22" y2="32" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.65"/>
    </svg>
  ),
  firstaid: (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <rect x="6" y="6" width="36" height="36" rx="8" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.5"/>
      <line x1="24" y1="14" x2="24" y2="34" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round"/>
      <line x1="14" y1="24" x2="34" y2="24" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  ),
};

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Pelayan");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const name = localStorage.getItem("userName");
    if (!loggedIn) { router.push("/"); return; }
    if (name) setUserName(name);
    setMounted(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    router.push("/");
  };

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <div className={styles.bgDecoration}>
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.bgGrid} />
      </div>

      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navBrand}>
          <Image src="/gms-logo-badge.png" alt="GMS Church" width={48} height={48} className={styles.navLogo} />
          <div className={styles.navDivider} />
          <div>
            <div className={styles.navTitle}>Crowd Ministry</div>
            <div className={styles.navSub}>GMS Church</div>
          </div>
        </div>
        <div className={styles.navRight}>
          <div className={styles.userBadge}>
            <div className={styles.userAvatar}>{userName.charAt(0).toUpperCase()}</div>
            <span className={styles.userName}>{userName}</span>
          </div>
          <button id="logoutBtn" onClick={handleLogout} className={styles.logoutBtn}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="15" height="15">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Keluar
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeDot}/>
          Portal Pelayanan Aktif
        </div>
        <h1 className={styles.heroTitle}>
          Selamat Datang,<br />
          <span className={styles.heroTitleGold}>{userName}!</span>
        </h1>
        <p className={styles.heroDesc}>
          Pilih divisi pelayanan yang ingin Anda kelola. Setiap ministry memiliki SOP dan panduan lengkap untuk melayani jemaat GMS.
        </p>
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>4</span>
            <span className={styles.statLabel}>Ministry</span>
          </div>
          <div className={styles.statDivider}/>
          <div className={styles.stat}>
            <span className={styles.statNum}>63</span>
            <span className={styles.statLabel}>Anggota</span>
          </div>
          <div className={styles.statDivider}/>
          <div className={styles.stat}>
            <span className={styles.statNum}>∞</span>
            <span className={styles.statLabel}>Berkat</span>
          </div>
        </div>
      </div>

      {/* Ministry Cards */}
      <div className={styles.cardsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLine}/>
          <h2 className={styles.sectionTitle}>Ministry Pelayanan</h2>
          <div className={styles.sectionLine}/>
        </div>
        <p className={styles.sectionDesc}>Klik card untuk melihat detail dan SOP ministry</p>

        <div className={styles.cardsGrid}>
          {ministries.map((m, idx) => (
            <div
              key={m.id}
              id={`card-${m.id}`}
              className={styles.card}
              style={{ animationDelay: `${idx * 0.12}s` }}
              onClick={() => router.push(`/ministry/${m.slug}`)}
            >
              <div className={styles.cardTopBar} />
              <div className={styles.cardTop}>
                <div className={styles.cardNum}>{m.num}</div>
                <div className={styles.cardTag}>{m.tag}</div>
              </div>
              <div className={styles.cardIcon}>
                {icons[m.id]}
              </div>
              <h3 className={styles.cardTitle}>{m.name}</h3>
              <p className={styles.cardDesc}>{m.shortDesc}</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardMembers}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  {m.members}
                </span>
                <span className={styles.cardLink}>
                  Lihat Detail
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerDivider}/>
        <div className={styles.footerContent}>
          <Image src="/gms-logo-badge.png" alt="GMS Church" width={38} height={38} className={styles.footerLogo}/>
          <p>© 2024 GMS Church · Crowd Ministry · Melayani dengan Kasih dan Kesetiaan</p>
        </div>
      </footer>
    </div>
  );
}