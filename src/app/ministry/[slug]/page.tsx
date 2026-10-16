"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import styles from "./ministry.module.css";

const ministryData: Record<string, {
  name: string;
  description: string;
  vision: string;
  mission: string[];
  color: string;
  colorLight: string;
  colorBorder: string;
  tag: string;
  members: { name: string; role: string }[];
  sops: { title: string; desc: string; link: string }[];
  icon: string;
}> = {
  "data-ministry": {
    name: "Data Ministry",
    description: "Divisi Data Ministry bertanggung jawab atas pengelolaan, pencatatan, dan pemeliharaan seluruh data jemaat gereja GMS. Kami memastikan setiap informasi tercatat dengan akurat dan terstruktur.",
    vision: "Menjadi pusat data yang andal dan terpercaya untuk mendukung seluruh pelayanan gereja GMS.",
    mission: ["Mengelola data jemaat secara akurat dan up-to-date","Menyediakan laporan pelayanan yang komprehensif","Memastikan keamanan dan kerahasiaan data jemaat","Mendukung pengambilan keputusan berbasis data"],
    color: "#FFFFFF", colorLight: "rgba(255,255,255,0.06)", colorBorder: "rgba(255,255,255,0.15)",
    tag: "Data & Admin",
    members: [{ name: "Koordinator Data", role: "Ketua Divisi" },{ name: "Admin Data 1", role: "Input Data" },{ name: "Admin Data 2", role: "Verifikasi Data" }],
    sops: [{ title: "SOP Input Data Jemaat", desc: "Panduan lengkap memasukkan data jemaat baru ke dalam sistem", link: "https://www.google.com" },{ title: "SOP Update Data Jemaat", desc: "Prosedur memperbarui informasi jemaat yang sudah ada", link: "https://www.google.com" },{ title: "SOP Laporan Mingguan", desc: "Cara membuat laporan data jemaat setiap minggu", link: "https://www.google.com" },{ title: "SOP Backup Data", desc: "Prosedur backup dan pemeliharaan data secara berkala", link: "https://www.google.com" }],
    icon: "data",
  },
  "crowd-ministry": {
    name: "Crowd Ministry",
    description: "Divisi Crowd Ministry bertanggung jawab dalam pengaturan dan pengelolaan arus jemaat selama ibadah berlangsung di GMS. Kami memastikan ketertiban dan kenyamanan seluruh jemaat.",
    vision: "Menciptakan lingkungan ibadah yang tertib, aman, dan nyaman bagi semua jemaat GMS.",
    mission: ["Mengatur arus keluar-masuk jemaat dengan tertib","Memastikan kapasitas ruangan terpenuhi secara optimal","Menangani situasi darurat dengan sigap dan profesional","Memberikan pelayanan yang ramah kepada seluruh jemaat"],
    color: "#FFFFFF", colorLight: "rgba(255,255,255,0.06)", colorBorder: "rgba(255,255,255,0.15)",
    tag: "Crowd Control",
    members: [{ name: "Koordinator Crowd", role: "Ketua Divisi" },{ name: "Tim Crowd A", role: "Pintu Masuk" },{ name: "Tim Crowd B", role: "Pintu Keluar" },{ name: "Tim Crowd C", role: "Area Ibadah" }],
    sops: [{ title: "SOP Pengaturan Pintu Masuk", desc: "Prosedur pengelolaan antrian dan arus masuk jemaat", link: "https://www.google.com" },{ title: "SOP Kapasitas Ruangan", desc: "Panduan mengatur kapasitas ruangan ibadah", link: "https://www.google.com" },{ title: "SOP Evakuasi Darurat", desc: "Prosedur evakuasi jemaat dalam situasi darurat", link: "https://www.google.com" },{ title: "SOP Koordinasi Tim", desc: "Panduan komunikasi dan koordinasi antar anggota tim", link: "https://www.google.com" }],
    icon: "crowd",
  },
  "usher-ministry": {
    name: "Usher Ministry",
    description: "Divisi Usher Ministry bertugas menyambut dan memandu setiap jemaat GMS dengan penuh kasih dan keramahan. Kami adalah wajah pertama yang dilihat setiap jemaat ketika memasuki gereja.",
    vision: "Menjadi tuan rumah yang hangat sehingga setiap jemaat GMS merasa diterima dan dihargai.",
    mission: ["Menyambut setiap jemaat dengan senyum dan keramahan","Memandu jemaat menuju tempat duduk yang tersedia","Mendistribusikan buletin dan materi ibadah","Membantu jemaat yang membutuhkan bantuan khusus"],
    color: "#FFFFFF", colorLight: "rgba(255,255,255,0.06)", colorBorder: "rgba(255,255,255,0.15)",
    tag: "Penyambutan",
    members: [{ name: "Koordinator Usher", role: "Ketua Divisi" },{ name: "Tim Usher Lobby", role: "Penyambutan" },{ name: "Tim Usher Hall", role: "Pemandu Tempat Duduk" }],
    sops: [{ title: "SOP Penyambutan Jemaat", desc: "Panduan menyambut jemaat di pintu masuk gereja", link: "https://www.google.com" },{ title: "SOP Pengaturan Tempat Duduk", desc: "Prosedur memandu jemaat ke tempat duduk yang sesuai", link: "https://www.google.com" },{ title: "SOP Distribusi Materi", desc: "Cara mendistribusikan buletin dan materi ibadah", link: "https://www.google.com" },{ title: "SOP Pelayanan Khusus", desc: "Panduan melayani jemaat dengan kebutuhan khusus", link: "https://www.google.com" }],
    icon: "usher",
  },
  "firstaid-ministry": {
    name: "First Aid Ministry",
    description: "Divisi First Aid Ministry bertanggung jawab memberikan pertolongan pertama dan memastikan kesehatan seluruh jemaat GMS selama kegiatan ibadah berlangsung.",
    vision: "Memastikan setiap jemaat GMS aman dan sehat selama mengikuti kegiatan ibadah di gereja.",
    mission: ["Menyediakan layanan pertolongan pertama bagi jemaat","Memantau kondisi kesehatan jemaat selama ibadah","Berkoordinasi dengan layanan medis jika diperlukan","Menyediakan peralatan P3K yang lengkap dan siap pakai"],
    color: "#FFFFFF", colorLight: "rgba(255,255,255,0.06)", colorBorder: "rgba(255,255,255,0.15)",
    tag: "Kesehatan",
    members: [{ name: "Koordinator First Aid", role: "Ketua Divisi" },{ name: "Tim Medis A", role: "Petugas P3K" },{ name: "Tim Medis B", role: "Monitoring Kesehatan" }],
    sops: [{ title: "SOP Pertolongan Pertama", desc: "Panduan memberikan pertolongan pertama pada jemaat", link: "https://www.google.com" },{ title: "SOP Penanganan Pingsan", desc: "Prosedur penanganan jemaat yang pingsan atau tidak sadar", link: "https://www.google.com" },{ title: "SOP Koordinasi Medis", desc: "Cara berkoordinasi dengan layanan medis eksternal", link: "https://www.google.com" },{ title: "SOP Pemeriksaan Peralatan", desc: "Jadwal dan prosedur pemeriksaan peralatan P3K", link: "https://www.google.com" }],
    icon: "firstaid",
  },
};

const iconMap: Record<string, React.ReactNode> = {
  data: (
    <svg viewBox="0 0 64 64" fill="none" width="56" height="56">
      <rect x="8" y="12" width="48" height="9" rx="4.5" fill="#FFFFFF" opacity="0.95"/>
      <rect x="8" y="27" width="48" height="9" rx="4.5" fill="#FFFFFF" opacity="0.6"/>
      <rect x="8" y="42" width="32" height="9" rx="4.5" fill="#FFFFFF" opacity="0.35"/>
    </svg>
  ),
  crowd: (
    <svg viewBox="0 0 64 64" fill="none" width="56" height="56">
      <circle cx="32" cy="17" r="10" fill="#FFFFFF" opacity="0.95"/>
      <circle cx="11" cy="23" r="7" fill="#FFFFFF" opacity="0.5"/>
      <circle cx="53" cy="23" r="7" fill="#FFFFFF" opacity="0.5"/>
      <path d="M13 54c0-10 8-16 19-16s19 6 19 16" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.95"/>
      <path d="M2 54c0-7 4-11 9-11" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
      <path d="M62 54c0-7-4-11-9-11" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
  usher: (
    <svg viewBox="0 0 64 64" fill="none" width="56" height="56">
      <circle cx="32" cy="15" r="10" fill="#FFFFFF" opacity="0.95"/>
      <path d="M11 57c0-12 9-19 21-19s21 7 21 19" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.85"/>
      <path d="M42 35l9 9-9 9" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.65"/>
      <line x1="51" y1="44" x2="29" y2="44" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.65"/>
    </svg>
  ),
  firstaid: (
    <svg viewBox="0 0 64 64" fill="none" width="56" height="56">
      <rect x="8" y="8" width="48" height="48" rx="12" stroke="#FFFFFF" strokeWidth="3" opacity="0.4"/>
      <line x1="32" y1="18" x2="32" y2="46" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round"/>
      <line x1="18" y1="32" x2="46" y2="32" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round"/>
    </svg>
  ),
};

function MinistryContent() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) { router.push("/"); return; }
    setMounted(true);
  }, [router]);

  if (!mounted) return null;

  const ministry = ministryData[slug];
  if (!ministry) {
    return (
      <div style={{ minHeight:"100vh",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"20px" }}>
        <p style={{ color:"rgba(255,255,255,0.6)",fontSize:"14px",letterSpacing:"2px",textTransform:"uppercase" }}>404 - Tidak Ditemukan</p>
        <h1 style={{ color:"white",fontSize:"28px",fontFamily:"Outfit" }}>Ministry tidak ditemukan</h1>
        <button onClick={() => router.push("/dashboard")} className={styles.backBtn}>Kembali ke Dashboard</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.bgDecoration}>
        <div className={styles.bgOrb1} />
        <div className={styles.bgGrid} />
      </div>

      {/* Navbar */}
      <nav className={styles.navbar}>
        <button id="backBtn" onClick={() => router.push("/dashboard")} className={styles.backNavBtn}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="15" height="15">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Kembali
        </button>
        <div className={styles.navBrand}>
          <Image src="/gms-logo-badge.png" alt="GMS Church" width={42} height={42} className={styles.navLogo} />
          <div className={styles.navTitle}>Crowd Ministry · GMS</div>
        </div>
        <div style={{ width:"100px" }} />
      </nav>

      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <div className={styles.heroGoldLine} />
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>{ministry.tag}</div>
            <h1 className={styles.heroTitle}>{ministry.name}</h1>
            <p className={styles.heroDesc}>{ministry.description}</p>
          </div>
          <div className={styles.heroIconWrap}>
            {iconMap[ministry.icon]}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className={styles.mainContent}>
        <div className={styles.grid}>
          {/* Left */}
          <div className={styles.leftCol}>
            <div className={styles.section}>
              <div className={styles.sectionHead}>
                <div className={styles.sectionDot}/>
                <h2 className={styles.sectionTitle}>Visi</h2>
              </div>
              <div className={styles.visionCard}>
                <div className={styles.visionQuote}>&ldquo;</div>
                <p className={styles.visionText}>{ministry.vision}</p>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHead}>
                <div className={styles.sectionDot}/>
                <h2 className={styles.sectionTitle}>Misi</h2>
              </div>
              <div className={styles.missionList}>
                {ministry.mission.map((m, i) => (
                  <div key={i} className={styles.missionItem}>
                    <div className={styles.missionNum}>{i + 1}</div>
                    <p className={styles.missionText}>{m}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHead}>
                <div className={styles.sectionDot}/>
                <h2 className={styles.sectionTitle}>Anggota Tim</h2>
              </div>
              <div className={styles.membersList}>
                {ministry.members.map((mem, i) => (
                  <div key={i} className={styles.memberCard}>
                    <div className={styles.memberAvatar}>{mem.name.charAt(0)}</div>
                    <div>
                      <div className={styles.memberName}>{mem.name}</div>
                      <div className={styles.memberRole}>{mem.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - SOPs */}
          <div className={styles.rightCol}>
            <div className={styles.section}>
              <div className={styles.sectionHead}>
                <div className={styles.sectionDot}/>
                <h2 className={styles.sectionTitle}>Dokumen SOP</h2>
              </div>
              <p className={styles.sopSubtitle}>Standard Operating Procedure — Google Drive</p>
              <div className={styles.sopList}>
                {ministry.sops.map((sop, i) => (
                  <a key={i} id={`sop-${i}`} href={sop.link} target="_blank" rel="noopener noreferrer" className={styles.sopCard}>
                    <div className={styles.sopNum}>{String(i + 1).padStart(2, '0')}</div>
                    <div className={styles.sopIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" width="20" height="20">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                      </svg>
                    </div>
                    <div className={styles.sopContent}>
                      <div className={styles.sopTitle}>{sop.title}</div>
                      <div className={styles.sopDesc}>{sop.desc}</div>
                    </div>
                    <div className={styles.sopArrow}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
              <div className={styles.driveNote}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Klik dokumen untuk membuka di Google Drive (tab baru)
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerLine} />
        <div className={styles.footerContent}>
          <Image src="/gms-logo-badge.png" alt="GMS Church" width={34} height={34} className={styles.footerLogo}/>
          <p>© 2024 GMS Church · Crowd Ministry · Semua dokumen SOP terhubung ke Google Drive</p>
        </div>
      </footer>
    </div>
  );
}

export default function MinistryDetailPage() {
  return (
    <Suspense fallback={<div style={{ minHeight:"100vh",background:"#000",display:"flex",alignItems:"center",justifyContent:"center" }}><div style={{ color:"#FFFFFF",fontSize:"14px",letterSpacing:"2px" }}>Loading...</div></div>}>
      <MinistryContent />
    </Suspense>
  );
}