import React, { useState, useEffect } from 'react';
import {
  Lock, Shield, Users, Calendar, Mail, Phone,
  ChevronDown, ChevronUp, MapPin, Briefcase,
  Eye, EyeOff, LogOut, RefreshCw, TrendingUp, Star
} from 'lucide-react';

// En production VITE_API_URL = "https://dmplus-investment-back.onrender.com"
// En dev local, le proxy Vite redirige /api/* → localhost:3002/api/*
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');


// ─── Identifiants Admin (à sécuriser côté backend en production) ───────────
const ADMIN_CREDENTIALS = {
  email: 'admin@dmplus-group.com',
  password: 'dmplus2026',
};

// ─── Composant Login ────────────────────────────────────────────────────────
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation d'un délai de vérification (UX)
    setTimeout(() => {
      if (
        email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
        password === ADMIN_CREDENTIALS.password
      ) {
        onLogin();
      } else {
        setError('Email ou mot de passe incorrect. Veuillez réessayer.');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      overflow: 'hidden',
      backgroundColor: '#ffffff',
      boxSizing: 'border-box',
    }}>
      {/* ================= GAUCHE : Panneau Branding (Masqué sur mobile) ================= */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(160deg, #3d3731 0%, #332E32 50%, #231f22 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px',
        color: 'white',
        overflow: 'hidden',
      }} className="hidden lg:flex">
        
        {/* Motif d'arrière-plan subtil (Grid) */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.1,
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Logo DM+ Invest */}
          <div style={{ marginBottom: '80px' }}>
            <div style={{
              display: 'inline-block',
              background: '#ffffff',
              borderRadius: '16px',
              padding: '10px 18px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}>
              <img
                src="/LOGOTYPE 10.png"
                alt="Digital Mind+ Investment"
                style={{ height: '55px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 14px', background: 'rgba(222,184,51,0.12)',
            border: '1px solid rgba(222,184,51,0.3)', borderRadius: '30px',
            marginBottom: '24px',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#DEB833', boxShadow: '0 0 10px #DEB833' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#DEB833' }}>Espace Administration Sécurisé</span>
          </div>

          {/* Titre & Sous-titre */}
          <h1 style={{
            fontSize: '48px', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px',
            letterSpacing: '-1px'
          }}>
            Gérez vos dossiers<br/>
            <span style={{ color: '#DEB833' }}>avec excellence.</span>
          </h1>
          <p style={{
            fontSize: '18px', color: '#9ca3af', lineHeight: 1.6, maxWidth: '80%', fontWeight: 400
          }}>
            Pilotez les inscriptions clients, analysez les profils d'investissement et gérez votre activité financière depuis un tableau de bord unique et sécurisé.
          </p>
        </div>

        {/* Statistiques en bas */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', gap: '40px', borderTop: '1px solid rgba(222,184,51,0.2)',
          paddingTop: '30px', marginTop: '40px'
        }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#DEB833' }}>100%</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Sécurisé</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#DEB833' }}>24/7</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Disponible</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#DEB833' }}>∞</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Dossiers</div>
          </div>
        </div>
      </div>

      {/* ================= DROITE : Formulaire ================= */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px',
        backgroundColor: '#ffffff',
        position: 'relative',
      }}>
        
        {/* Conteneur central du formulaire */}
        <div style={{
          width: '100%',
          maxWidth: '420px',
          margin: '0 auto',
          animation: shake ? 'shake 0.5s ease-in-out' : 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          
          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
              Back-Office
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#111827', margin: '0 0 12px', letterSpacing: '-1px' }}>
              Connexion
            </h2>
            <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.5, margin: 0 }}>
              Entrez vos identifiants administrateur pour accéder à votre espace de gestion DM+ Invest.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Champ Email */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, left: '16px', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                  <Mail style={{ width: '18px', height: '18px', color: '#9ca3af' }} />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="admin@dmplus-group.com"
                  required
                  autoComplete="username"
                  style={{
                    width: '100%',
                    paddingLeft: '48px', paddingRight: '16px', paddingTop: '14px', paddingBottom: '14px',
                    background: '#ffffff',
                    border: `1px solid ${error ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    color: '#111827', fontSize: '15px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#DEB833';
                    e.target.style.boxShadow = '0 0 0 3px rgba(222,184,51,0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = error ? '#ef4444' : '#e5e7eb';
                    e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                  }}
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                Mot de passe
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, left: '16px', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                  <Lock style={{ width: '18px', height: '18px', color: '#9ca3af' }} />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    paddingLeft: '48px', paddingRight: '48px', paddingTop: '14px', paddingBottom: '14px',
                    background: '#ffffff',
                    border: `1px solid ${error ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    color: '#111827', fontSize: '15px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box',
                    letterSpacing: showPassword ? 'normal' : '2px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#DEB833';
                    e.target.style.boxShadow = '0 0 0 3px rgba(222,184,51,0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = error ? '#ef4444' : '#e5e7eb';
                    e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#9ca3af',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', borderRadius: '8px',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#111827'; e.currentTarget.style.background = '#f3f4f6'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.background = 'none'; }}
                >
                  {showPassword ? <EyeOff style={{ width: '18px', height: '18px' }} /> : <Eye style={{ width: '18px', height: '18px' }} />}
                </button>
              </div>

              {/* Message d'erreur */}
              {error && (
                <div style={{
                  marginTop: '12px', padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca',
                  borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', animation: 'fadeIn 0.3s ease-out',
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />
                  <p style={{ color: '#b91c1c', fontSize: '13px', margin: 0, fontWeight: 500 }}>{error}</p>
                </div>
              )}
            </div>

            {/* Bouton de connexion — Couleurs charte DM+ Invest */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%', padding: '16px',
                background: isLoading ? '#f3f4f6' : 'linear-gradient(135deg, #DEB833 0%, #c9a62c 100%)',
                border: 'none', borderRadius: '12px',
                color: isLoading ? '#9ca3af' : '#332E32',
                fontSize: '16px', fontWeight: 700, cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: isLoading ? 'none' : '0 4px 15px rgba(222,184,51,0.35)',
                letterSpacing: '0.3px',
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #e6c547 0%, #d4b030 100%)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(222,184,51,0.45)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #DEB833 0%, #c9a62c 100%)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(222,184,51,0.35)';
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '18px', height: '18px', border: '2px solid #d1d5db', borderTopColor: '#6b7280',
                    borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                  }} />
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div style={{ position: 'absolute', bottom: '30px', left: 0, right: 0, textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
            © 2026 DM+ Invest — Tous droits réservés
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%, 45%, 75% { transform: translateX(-10px); }
          30%, 60%, 90% { transform: translateX(10px); }
        }
        input::placeholder { color: #9ca3af !important; }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px #ffffff inset !important;
            -webkit-text-fill-color: #111827 !important;
            transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
};

// ─── Composant Dashboard ────────────────────────────────────────────────────
const Dashboard = ({ onLogout }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const fetchSubmissions = async (page = 0) => {
    setLoading(true);
    setFetchError('');
    try {
      const baseUrl = API_BASE;
      const url = `${baseUrl}/api/v1/submissions?page=${page}&size=${pageSize}&sort=createdAt,desc`;
      console.log('[Admin] Fetch URL:', url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status} - ${response.statusText}`);
      }
      const result = await response.json();
      
      if (result && result.content !== undefined) {
        setSubmissions(result.content);
        setCurrentPage(result.currentPage);
        setTotalPages(result.totalPages);
        setTotalElements(result.totalElements);
        setHasNext(result.hasNext);
        setHasPrevious(result.hasPrevious);
      } else if (Array.isArray(result)) {
        // Fallback for older API format
        setSubmissions(result);
        setTotalElements(result.length);
        setTotalPages(1);
      } else if (result && result.success !== undefined) {
        if (result.success) {
          setSubmissions(result.data);
          setTotalElements(result.data.length);
          setTotalPages(1);
        } else {
          setFetchError('Le serveur a retourné une erreur : ' + (result.message || 'inconnue'));
        }
      } else {
        setFetchError('Format de réponse invalide');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des données:', err);
      const baseUrl = API_BASE;
      setFetchError(`Impossible de contacter le serveur.\n\nDétail : ${err.message}\n\nURL appelée : ${baseUrl}/api/v1/submissions`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions(currentPage);
  }, [currentPage]);

  const updateStatus = async (id, newStatus) => {
    try {
      const baseUrl = API_BASE;
      const url = `${baseUrl}/api/v1/submissions/${id}/status`;
      
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }
      
      setSubmissions(submissions.map(sub => 
        sub.id === id ? { ...sub, status: newStatus } : sub
      ));
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getOfferLabel = (offer) => {
    const map = {
      elite_light: 'Elite Light',
      elite_premium: 'Elite Premium',
      elite_vip: 'Elite VIP',
    };
    return map[offer] || offer || '—';
  };

  const getOfferColor = (offer) => {
    const o = (offer || '').toLowerCase();
    if (o.includes('corporate') || o.includes('premium')) {
      return { bg: '#fefce8', color: '#b48600', border: '#fef08a' }; // Gold
    }
    if (o.includes('marche') || o.includes('vip')) {
      return { bg: '#111827', color: '#ffffff', border: '#111827' }; // Dark
    }
    return { bg: '#f3f4f6', color: '#4b5563', border: '#d1d5db' };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'EN COURS':
        return { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' }; // Blue
      case 'VALIDÉ':
        return { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' }; // Green
      case 'REJETÉ':
        return { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca' }; // Red
      case 'NOUVEAU':
      default:
        return { bg: '#f3f4f6', color: '#4b5563', border: '#d1d5db' }; // Gray
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      position: 'relative',
      color: '#111827',
      backgroundColor: '#f9fafb',
    }}>
      {/* Background (Light Luxury) */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: '#f9fafb',
        zIndex: 0,
      }}>
      </div>

      {/* ── Header ── */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 40px', height: '80px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img
            src="/LOGOTYPE 10.png"
            alt="Digital Mind+ Investment"
            style={{ height: '36px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
          <div style={{ width: '1px', height: '32px', background: '#e5e7eb' }} />
          <span style={{
            fontSize: '12px', color: '#b48600',
            letterSpacing: '1.5px', fontWeight: 600, textTransform: 'uppercase'
          }}>Private Portal</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => fetchSubmissions(currentPage)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              color: '#4b5563', padding: '10px 20px',
              borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#111827'; e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.backgroundColor = '#f9fafb'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#4b5563'; e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.backgroundColor = '#ffffff'; }}
          >
            <RefreshCw style={{ width: '14px', height: '14px' }} />
            Actualiser
          </button>

          <button
            onClick={onLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#111827',
              border: '1px solid #111827',
              color: '#ffffff', padding: '10px 20px',
              borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#374151'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#111827'; }}
          >
            <LogOut style={{ width: '14px', height: '14px' }} />
            Déconnexion
          </button>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '48px 24px', animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 400, color: '#111827', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
            Portefeuille <span style={{ fontWeight: 700 }}>Clients</span>
          </h1>
          <p style={{ fontSize: '15px', color: '#6b7280', margin: 0, letterSpacing: '0.2px' }}>
            Supervision des nouvelles demandes de souscription DM+ Invest.
          </p>
        </div>

        {/* ── Stats ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px', marginBottom: '48px',
        }}>
          {[
            { 
              icon: <Users style={{ width: '28px', height: '28px', color: '#111827' }} />, 
              iconBg: '#f3f4f6',
              label: 'Total Demandes', 
              value: totalElements > 0 ? totalElements : submissions.length, 
              accent: '#111827' 
            },
            { 
              icon: <TrendingUp style={{ width: '28px', height: '28px', color: '#b48600' }} />, 
              iconBg: '#fefce8',
              label: 'Comptes Premium', 
              value: submissions.filter(s => s.selectedOffer?.includes('premium') || s.selectedOffer?.includes('corporate')).length, 
              accent: '#b48600' 
            },
            { 
              icon: <Star style={{ width: '28px', height: '28px', color: '#92400e' }} />, 
              iconBg: '#fffbeb',
              label: 'Comptes Elite', 
              value: submissions.filter(s => s.selectedOffer?.includes('vip') || s.selectedOffer?.includes('marche')).length, 
              accent: '#92400e' 
            },
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '20px', padding: '32px',
              display: 'flex', alignItems: 'center', gap: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), boxShadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative', overflow: 'hidden'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.transform = 'translateY(-6px)'; 
              e.currentTarget.style.boxShadow = '0 25px 30px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'; 
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.transform = 'translateY(0)'; 
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'; 
            }}
            >
              {/* Ligne d'accent sur la gauche */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: stat.accent }} />
              
              <div style={{
                background: stat.iconBg,
                width: '64px', height: '64px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.03)',
              }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</p>
                <p style={{ margin: '8px 0 0', fontSize: '42px', fontWeight: 800, color: '#111827', lineHeight: 1, letterSpacing: '-1.5px' }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tableau Soumissions ── */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb', borderRadius: '16px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.03), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '24px 32px', borderBottom: '1px solid #f3f4f6',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: '#ffffff',
          }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#111827', letterSpacing: '0.2px' }}>
                Registre des Souscriptions
              </h2>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '100px', textAlign: 'center' }}>
              <div style={{
                width: '40px', height: '40px', border: '2px solid #e5e7eb',
                borderTopColor: '#DEB833', borderRadius: '50%',
                animation: 'spin 1s linear infinite', margin: '0 auto 24px',
              }} />
              <p style={{ color: '#6b7280', fontSize: '14px', margin: 0, letterSpacing: '1px' }}>SYNCHRONISATION...</p>
            </div>
          ) : fetchError ? (
            <div style={{ padding: '80px 24px', textAlign: 'center' }}>
              <div style={{
                background: '#fef2f2', border: '1px solid #fecaca',
                borderRadius: '8px', padding: '40px', maxWidth: '560px', margin: '0 auto',
              }}>
                <p style={{ color: '#991b1b', fontWeight: 600, margin: '0 0 12px', fontSize: '16px' }}>ERREUR DE CONNEXION</p>
                <pre style={{
                  color: '#7f1d1d', fontSize: '13px', margin: '0 0 28px',
                  whiteSpace: 'pre-wrap', wordBreak: 'break-all', textAlign: 'left',
                  background: '#ffffff', border: '1px solid #fecaca',
                  borderRadius: '6px', padding: '16px',
                }}>
                  {fetchError}
                </pre>
                <button
                  onClick={() => fetchSubmissions(currentPage)}
                  style={{
                    background: '#111827', color: '#ffffff', border: 'none',
                    padding: '10px 24px', borderRadius: '6px', cursor: 'pointer',
                    fontWeight: 500, fontSize: '13px', transition: 'all 0.2s'
                  }}
                >
                  Réessayer
                </button>
              </div>
            </div>
          ) : submissions.length === 0 ? (
            <div style={{ padding: '100px', textAlign: 'center' }}>
              <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0, letterSpacing: '1px' }}>AUCUNE DONNÉE DISPONIBLE</p>
            </div>
          ) : (
            <div>
              {submissions.map((sub, index) => {
                const offerStyle = getOfferColor(sub.selectedOffer);
                const isExpanded = expandedId === sub.id;
                
                const rawDate = sub.createdAt || sub.date;
                let dateObj = new Date();
                if (rawDate) {
                  if (Array.isArray(rawDate)) {
                    const [y, m, d, h=0, min=0, s=0] = rawDate;
                    dateObj = new Date(y, m - 1, d, h, min, s);
                  } else {
                    dateObj = new Date(rawDate);
                  }
                }

                return (
                  <div key={sub.id} style={{
                    borderBottom: index < submissions.length - 1 ? '1px solid #f3f4f6' : 'none',
                  }}>
                    {/* ── Ligne principale ── */}
                    <div
                      onClick={() => toggleExpand(sub.id)}
                      style={{
                        padding: '24px 32px', display: 'flex', alignItems: 'center',
                        gap: '24px', cursor: 'pointer',
                        background: isExpanded ? '#fafafa' : '#ffffff',
                        borderLeft: '4px solid',
                        borderLeftColor: isExpanded ? '#DEB833' : 'transparent',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => { 
                        if (!isExpanded) {
                          e.currentTarget.style.background = '#fafafa';
                          e.currentTarget.style.borderLeftColor = '#DEB833';
                        }
                      }}
                      onMouseLeave={(e) => { 
                        if (!isExpanded) {
                          e.currentTarget.style.background = '#ffffff';
                          e.currentTarget.style.borderLeftColor = 'transparent';
                        }
                      }}
                    >
                      {/* Avatar initiales */}
                      <div style={{
                        width: '52px', height: '52px', flexShrink: 0,
                        background: 'linear-gradient(135deg, #fefce8 0%, #fef08a 100%)',
                        border: '1px solid #fde047',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '15px', fontWeight: 700, color: '#9a6800',
                        letterSpacing: '1px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                      }}>
                        {(sub.nom?.[0] || '?').toUpperCase()}{(sub.prenoms?.[0] || '').toUpperCase()}
                      </div>

                      {/* Nom + email */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          margin: 0, fontWeight: 700, color: '#111827',
                          fontSize: '17px', letterSpacing: '-0.2px',
                        }}>
                          {(sub.nom || '').toUpperCase()} <span style={{ color: '#6b7280', fontWeight: 500 }}>{sub.prenoms}</span>
                        </p>
                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563', fontWeight: 500 }}>
                            <Mail style={{ width: '14px', height: '14px', color: '#b48600' }} />
                            {sub.email}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563', fontWeight: 500 }}>
                            <Phone style={{ width: '14px', height: '14px', color: '#b48600' }} />
                            {sub.telephonePrincipal}
                          </span>
                        </div>
                      </div>

                      {/* Date */}
                      <div style={{ textAlign: 'right', flexShrink: 0, display: 'none', paddingRight: '20px' }} className="md-visible">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151', fontWeight: 600 }}>
                          <Calendar style={{ width: '14px', height: '14px', color: '#9ca3af' }} />
                          {dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </span>
                        <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>
                          {dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      {/* Offre */}
                      <span style={{
                        flexShrink: 0, padding: '8px 16px',
                        background: offerStyle.bg, border: `1px solid ${offerStyle.border}`,
                        borderRadius: '24px', fontSize: '12px', fontWeight: 700,
                        color: offerStyle.color, letterSpacing: '0.5px', textTransform: 'uppercase',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                      }}>
                        {getOfferLabel(sub.selectedOffer)}
                      </span>

                      {/* Statut */}
                      <select
                        value={sub.status || 'NOUVEAU'}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateStatus(sub.id, e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          flexShrink: 0, padding: '8px 32px 8px 16px', marginLeft: '12px',
                          background: getStatusColor(sub.status || 'NOUVEAU').bg,
                          border: `1px solid ${getStatusColor(sub.status || 'NOUVEAU').border}`,
                          borderRadius: '24px', fontSize: '12px', fontWeight: 700,
                          color: getStatusColor(sub.status || 'NOUVEAU').color,
                          letterSpacing: '0.5px', textTransform: 'uppercase',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                          cursor: 'pointer', appearance: 'none',
                          outline: 'none',
                          backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${getStatusColor(sub.status || 'NOUVEAU').color.replace('#', '')}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px top 50%',
                          backgroundSize: '10px auto',
                        }}
                      >
                        <option value="NOUVEAU">Nouveau</option>
                        <option value="EN COURS">En cours</option>
                        <option value="VALIDÉ">Validé</option>
                        <option value="REJETÉ">Rejeté</option>
                      </select>

                      {/* Chevron */}
                      <div style={{ flexShrink: 0, marginLeft: '12px', color: '#9ca3af', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>
                        <ChevronDown style={{ width: '22px', height: '22px' }} />
                      </div>
                    </div>

                    {/* ── Détails dépliés ── */}
                    {isExpanded && (
                      <div style={{
                        padding: '40px', background: '#fafafa',
                        borderTop: '1px solid #f3f4f6', borderLeft: '4px solid #DEB833',
                        animation: 'fadeIn 0.3s ease-out',
                      }}>
                        <div style={{
                          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px',
                        }}>
                          {/* Identité */}
                          <DetailCard
                            title="Identité & Contact"
                            items={[
                              ['Date de Naissance', `${sub.dateNaissance || '—'} à ${sub.lieuNaissance || '—'}`],
                              ['Nationalité', sub.nationalite || '—'],
                              ['Pièce d\'identité', `${sub.typePiece || '—'} (${sub.numeroPiece || '—'})`],
                              ['Tél. Secondaire', sub.telephoneSecondaire || 'N/A'],
                              ['WhatsApp', sub.whatsapp || 'N/A'],
                            ]}
                          />
                          {/* Résidence */}
                          <DetailCard
                            title="Résidence"
                            items={[
                              ['Pays', sub.paysResidence || '—'],
                              ['Ville', sub.ville === 'Autre' ? sub.villeCustom : sub.ville || '—'],
                              ['Code Postal', sub.codePostal === 'Autre' ? sub.codePostalCustom : sub.codePostal || '—'],
                              ['Adresse', sub.adresse || '—'],
                            ]}
                          />
                          {/* Profil & Capital */}
                          <DetailCard
                            title="Profil & Capital"
                            items={[
                              ['Statut Pro.', sub.statutPro || '—'],
                              ['Secteur', sub.professionSecActivite || '—'],
                              ['Capital à Investir', sub.capitalInvestir ? `${new Intl.NumberFormat('fr-FR').format(sub.capitalInvestir)} FCFA` : 'N/A'],
                              ['Horizon', sub.horizonInvestissement || '—'],
                              ['Expérience', sub.experienceInvestissement || '—'],
                              ['Tolérance au Risque', sub.toleranceRisque || '—'],
                            ]}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Controls de pagination */}
              {totalPages > 1 && (
                <div style={{
                  padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderTop: '1px solid #f3f4f6', background: '#ffffff',
                }}>
                  <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>
                    Affichage {currentPage * pageSize + 1} - {Math.min((currentPage + 1) * pageSize, totalElements)} sur {totalElements}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      disabled={!hasPrevious}
                      onClick={() => setCurrentPage(p => p - 1)}
                      style={{
                        padding: '8px 16px', background: hasPrevious ? '#ffffff' : '#f9fafb',
                        border: '1px solid #e5e7eb', borderRadius: '6px', cursor: hasPrevious ? 'pointer' : 'not-allowed',
                        color: hasPrevious ? '#374151' : '#9ca3af', fontSize: '13px', fontWeight: 500,
                      }}
                    >
                      Précédent
                    </button>
                    <button
                      disabled={!hasNext}
                      onClick={() => setCurrentPage(p => p + 1)}
                      style={{
                        padding: '8px 16px', background: hasNext ? '#ffffff' : '#f9fafb',
                        border: '1px solid #e5e7eb', borderRadius: '6px', cursor: hasNext ? 'pointer' : 'not-allowed',
                        color: hasNext ? '#374151' : '#9ca3af', fontSize: '13px', fontWeight: 500,
                      }}
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (min-width: 768px) {
          .md-visible { display: block !important; }
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f9fafb; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}</style>
    </div>
  );
};

// ─── Petit composant carte de détails ───────────────────────────────────────
const DetailCard = ({ title, items }) => (
  <div>
    <h4 style={{
      margin: '0 0 24px', fontSize: '11px', fontWeight: 600,
      color: '#4b5563', textTransform: 'uppercase', letterSpacing: '2px',
      paddingBottom: '12px', borderBottom: '1px solid #e5e7eb',
    }}>
      {title}
    </h4>
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {items.map(([label, value], i) => (
        <li key={i} style={{
          display: 'flex', flexDirection: 'column',
          marginBottom: i < items.length - 1 ? '16px' : 0,
        }}>
          <span style={{ fontSize: '12px', color: '#9ca3af', letterSpacing: '0.5px' }}>{label}</span>
          <span style={{ fontSize: '14px', color: '#111827', marginTop: '4px', fontWeight: 500 }}>{value}</span>
        </li>
      ))}
    </ul>
  </div>
);


const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }
  return <Dashboard onLogout={() => setIsAuthenticated(false)} />;
};

export default AdminPage;
