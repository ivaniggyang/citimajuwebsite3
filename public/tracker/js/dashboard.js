// dashboard.js
let currentUser = null;

document.addEventListener('DOMContentLoaded', async () => {
  currentUser = await requireAuth();
  if (!currentUser) return;
  renderHeaderUser(currentUser);
  document.getElementById('btn-logout').addEventListener('click', logout);
  if (currentUser.role === ROLES.ADMIN) {
    document.querySelectorAll('.admin-only').forEach(el => el.classList.remove('hidden'));
    document.getElementById('btn-new-project').addEventListener('click', () => openProjectModal());
    document.getElementById('btn-manage-users').addEventListener('click', () => openUsersModal());
  }
  document.getElementById('filter-status').addEventListener('change', loadProjects);
  document.getElementById('search-input').addEventListener('input', loadProjects);
  await loadProjects();
  setupProjectModal();
  setupUsersModal();
});

async function loadProjects() {
  const list   = document.getElementById('project-list');
  const empty  = document.getElementById('empty-state');
  const status = document.getElementById('filter-status').value;
  const search = document.getElementById('search-input').value.trim().toLowerCase();
  list.innerHTML = '<div class="page-loader"><div class="spinner"></div></div>';

  let query = supabase.from('projects').select(`
    id, name, project_no, client, location, contract_value, status, start_date, end_date,
    work_items ( contract_amount, pct_physical, amount_claimed )
  `).order('created_at', { ascending: false });

  if (currentUser.role !== ROLES.ADMIN) {
    const { data: pu } = await supabase.from('project_users').select('project_id').eq('user_id', currentUser.id);
    const ids = (pu || []).map(r => r.project_id);
    if (ids.length === 0) { list.innerHTML = ''; empty.classList.remove('hidden'); return; }
    query = query.in('id', ids);
  }
  if (status) query = query.eq('status', status);

  const { data: projects, error } = await query;
  if (error) { showToast('Failed to load projects', 'error'); return; }

  let filtered = projects || [];
  if (search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search) ||
      (p.project_no || '').toLowerCase().includes(search) ||
      (p.client || '').toLowerCase().includes(search)
    );
  }

  list.innerHTML = '';
  if (filtered.length === 0) { empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  filtered.forEach(p => list.appendChild(buildProjectCard(p)));
}

function buildProjectCard(p) {
  const items = p.work_items || [];
  const totalContract = items.reduce((s, i) => s + Number(i.contract_amount || 0), 0);
  const totalClaimed  = items.reduce((s, i) => s + Number(i.amount_claimed  || 0), 0);
  let pctPhysical = 0;
  if (totalContract > 0) pctPhysical = items.reduce((s, i) => s + Number(i.pct_physical || 0) * Number(i.contract_amount || 0), 0) / totalContract;
  const pctClaimed = totalContract > 0 ? (totalClaimed / totalContract) * 100 : 0;
  const showFinancials = currentUser.role !== ROLES.SUPER;

  const card = document.createElement('div');
  card.className = `project-card status-${p.status}`;
  card.setAttribute('role', 'button'); card.setAttribute('tabindex', '0');
  card.innerHTML = `
    <div class="project-card-top">
      <div>
        <div class="project-no">${p.project_no || '—'}</div>
        <div class="project-name">${p.name}</div>
        ${p.client ? `<div class="project-client">${p.client}</div>` : ''}
      </div>
      <span class="badge badge-${p.status}">${statusLabel(p.status)}</span>
    </div>
    <div class="project-card-stats">
      ${showFinancials ? `
        <div class="stat-box"><div class="stat-label">Contract</div><div class="stat-value">${fmtCurrency(p.contract_value)}</div></div>
        <div class="stat-box"><div class="stat-label">Physical</div><div class="stat-value green">${fmtPct(pctPhysical)}</div></div>
        <div class="stat-box"><div class="stat-label">Claimed</div><div class="stat-value amber">${fmtPct(pctClaimed)}</div></div>
      ` : `
        <div class="stat-box"><div class="stat-label">Items</div><div class="stat-value">${items.length}</div></div>
        <div class="stat-box" style="grid-column:span 2"><div class="stat-label">Physical Progress</div><div class="stat-value green">${fmtPct(pctPhysical)}</div></div>
      `}
    </div>
    <div class="progress-wrap dual-progress">
      <div class="progress-track"><div class="progress-bar physical" style="width:${Math.min(pctPhysical,100)}%"></div></div>
      ${showFinancials ? `<div class="progress-track"><div class="progress-bar claimed" style="width:${Math.min(pctClaimed,100)}%"></div></div>` : ''}
    </div>
  `;
  card.addEventListener('click', () => window.location.href = `project.html?id=${p.id}`);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') window.location.href = `project.html?id=${p.id}`; });
  return card;
}

let editProjectId = null;

function setupProjectModal() {
  const overlay  = document.getElementById('modal-project');
  const form     = document.getElementById('form-project');
  const btnClose = document.getElementById('modal-project-close');
  btnClose.addEventListener('click', closeProjectModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeProjectModal(); });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    btn.disabled = true; btn.textContent = 'Saving…';
    const payload = {
      name: form.p_name.value.trim(), project_no: form.p_no.value.trim() || null,
      client: form.p_client.value.trim() || null, location: form.p_location.value.trim() || null,
      description: form.p_desc.value.trim() || null, contract_value: parseFloat(form.p_contract.value) || 0,
      status: form.p_status.value, start_date: form.p_start.value || null, end_date: form.p_end.value || null,
    };
    let error;
    if (editProjectId) {
      ({ error } = await supabase.from('projects').update(payload).eq('id', editProjectId));
    } else {
      payload.created_by = currentUser.id;
      ({ error } = await supabase.from('projects').insert(payload));
    }
    btn.disabled = false; btn.textContent = 'Save Project';
    if (error) { showToast('Error: ' + error.message, 'error'); return; }
    showToast(editProjectId ? 'Project updated' : 'Project created', 'success');
    closeProjectModal(); loadProjects();
  });
}

function openProjectModal(project = null) {
  editProjectId = project ? project.id : null;
  const form = document.getElementById('form-project');
  form.reset();
  document.getElementById('modal-project-title').textContent = project ? 'Edit Project' : 'New Project';
  if (project) {
    form.p_name.value = project.name || ''; form.p_no.value = project.project_no || '';
    form.p_client.value = project.client || ''; form.p_location.value = project.location || '';
    form.p_desc.value = project.description || ''; form.p_contract.value = project.contract_value || '';
    form.p_status.value = project.status || 'active'; form.p_start.value = project.start_date || ''; form.p_end.value = project.end_date || '';
  }
  document.getElementById('modal-project').classList.add('open');
}
function closeProjectModal() { document.getElementById('modal-project').classList.remove('open'); }

function setupUsersModal() {
  const overlay  = document.getElementById('modal-users');
  const btnClose = document.getElementById('modal-users-close');
  btnClose.addEventListener('click', closeUsersModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeUsersModal(); });
}
async function openUsersModal() {
  document.getElementById('modal-users').classList.add('open');
  await loadUsersList();
}
function closeUsersModal() { document.getElementById('modal-users').classList.remove('open'); }

async function loadUsersList() {
  const list = document.getElementById('users-list');
  list.innerHTML = '<div class="spinner"></div>';
  const { data: users, error } = await supabase.from('users').select('id, full_name, email, role, is_active').order('full_name');
  if (error) { list.innerHTML = '<p class="text-sm text-muted">Failed to load users.</p>'; return; }
  list.innerHTML = '';
  (users || []).forEach(u => {
    const chip = document.createElement('div');
    chip.className = 'user-chip';
    chip.innerHTML = `
      <div class="user-chip-avatar">${initials(u.full_name)}</div>
      <div class="user-chip-info"><div class="user-chip-name">${u.full_name}</div><div class="user-chip-role">${u.email} · ${roleName(u.role)}</div></div>
      <select class="form-control" style="width:auto;padding:.3rem .5rem;font-size:.75rem;" data-uid="${u.id}">
        <option value="admin" ${u.role==='admin'?'selected':''}>Admin</option>
        <option value="project_manager" ${u.role==='project_manager'?'selected':''}>PM</option>
        <option value="site_supervisor" ${u.role==='site_supervisor'?'selected':''}>Supervisor</option>
      </select>
    `;
    const sel = chip.querySelector('select');
    sel.addEventListener('change', async () => {
      const { error } = await supabase.from('users').update({ role: sel.value }).eq('id', u.id);
      if (error) showToast('Update failed', 'error'); else showToast('Role updated', 'success');
    });
    list.appendChild(chip);
  });
}