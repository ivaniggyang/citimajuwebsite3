// Supabase configuration — replace with your project values
// Supabase Dashboard → Settings → API
const SUPABASE_URL  = 'https://YOUR_PROJECT_REF.supabase.co';
const SUPABASE_ANON = 'YOUR_ANON_PUBLIC_KEY';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

const ROLES = { ADMIN: 'admin', PM: 'project_manager', SUPER: 'site_supervisor' };

const fmtCurrency = (v) =>
  'RM ' + Number(v || 0).toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtPct  = (v) => Number(v || 0).toFixed(1) + '%';
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-MY', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

function statusLabel(s) {
  return { active: 'Active', on_hold: 'On Hold', completed: 'Completed', tender: 'Tender', cancelled: 'Cancelled' }[s] || s;
}
function roleName(r) {
  return { admin: 'Admin', project_manager: 'Project Manager', site_supervisor: 'Site Supervisor' }[r] || r;
}
function initials(name = '') {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function showToast(msg, type = 'default', duration = 3000) {
  const icons = {
    success: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"/></svg>`,
    error:   `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/></svg>`,
    default: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/></svg>`,
  };
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = (icons[type] || icons.default) + `<span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => { el.classList.add('fade-out'); setTimeout(() => el.remove(), 310); }, duration);
}

async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { window.location.href = 'index.html'; return null; }
  const { data: profile } = await supabase.from('users').select('*').eq('id', session.user.id).single();
  if (!profile) { window.location.href = 'index.html'; return null; }
  return profile;
}

async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}

function renderHeaderUser(profile) {
  const el = document.getElementById('header-user');
  if (el) el.innerHTML = `<strong>${profile.full_name}</strong>${roleName(profile.role)}`;
}