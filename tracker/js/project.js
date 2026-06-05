// project.js
let currentUser = null, projectId = null, projectData = null;

document.addEventListener('DOMContentLoaded', async () => {
  currentUser = await requireAuth();
  if (!currentUser) return;
  const params = new URLSearchParams(window.location.search);
  projectId = params.get('id');
  if (!projectId) { window.location.href = 'dashboard.html'; return; }
  renderHeaderUser(currentUser);
  document.getElementById('btn-logout').addEventListener('click', logout);
  document.getElementById('btn-back').addEventListener('click', () => window.location.href = 'dashboard.html');
  await loadProject();
  if (currentUser.role === ROLES.ADMIN) {
    document.querySelectorAll('.admin-only').forEach(el => el.classList.remove('hidden'));
    document.getElementById('btn-edit-project').addEventListener('click', () => openProjectModal(projectData));
    document.getElementById('btn-add-item').addEventListener('click', () => openItemModal());
    document.getElementById('btn-assign-users').addEventListener('click', () => openAssignModal());
  }
  if (currentUser.role === ROLES.PM || currentUser.role === ROLES.ADMIN) {
    document.querySelectorAll('.pm-only').forEach(el => el.classList.remove('hidden'));
    if (currentUser.role === ROLES.PM) document.getElementById('btn-add-item').addEventListener('click', () => openItemModal());
  }
  setupItemModal(); setupAssignModal(); setupProjectEditModal();
});

async function loadProject() {
  const { data: p, error } = await supabase.from('projects').select('*').eq('id', projectId).single();
  if (error || !p) { showToast('Project not found', 'error'); return; }
  projectData = p;
  document.getElementById('project-title').textContent  = p.name;
  document.getElementById('project-no').textContent     = p.project_no || '';
  document.getElementById('project-status').className   = `badge badge-${p.status}`;
  document.getElementById('project-status').textContent = statusLabel(p.status);
  document.getElementById('meta-client').textContent    = p.client || '—';
  document.getElementById('meta-location').textContent  = p.location || '—';
  document.getElementById('meta-start').textContent     = fmtDate(p.start_date);
  document.getElementById('meta-end').textContent       = fmtDate(p.end_date);
  if (currentUser.role === ROLES.SUPER) {
    document.querySelectorAll('.financial-row').forEach(el => el.classList.add('hidden'));
  } else {
    document.getElementById('meta-contract').textContent = fmtCurrency(p.contract_value);
  }
  await loadWorkItems();
}

async function loadWorkItems() {
  const { data: items, error } = await supabase.from('work_items').select('*').eq('project_id', projectId).eq('is_active', true).order('sequence');
  if (error) { showToast('Failed to load work items', 'error'); return; }
  renderSummary(items || []); renderWorkItems(items || []);
}

function renderSummary(items) {
  const totalContract = items.reduce((s, i) => s + Number(i.contract_amount || 0), 0);
  const totalClaimed  = items.reduce((s, i) => s + Number(i.amount_claimed  || 0), 0);
  let pctPhysical = 0;
  if (totalContract > 0) pctPhysical = items.reduce((s, i) => s + Number(i.pct_physical || 0) * Number(i.contract_amount || 0), 0) / totalContract;
  const pctClaimed = totalContract > 0 ? (totalClaimed / totalContract) * 100 : 0;
  if (currentUser.role !== ROLES.SUPER) {
    document.getElementById('sum-contract').textContent = fmtCurrency(totalContract);
    document.getElementById('sum-claimed').textContent  = fmtCurrency(totalClaimed);
  }
  document.getElementById('sum-physical').textContent = fmtPct(pctPhysical);
  document.getElementById('bar-physical').style.width = Math.min(pctPhysical, 100) + '%';
  if (currentUser.role !== ROLES.SUPER) document.getElementById('bar-claimed').style.width = Math.min(pctClaimed, 100) + '%';
}

function renderWorkItems(items) {
  const list = document.getElementById('work-item-list');
  const empty = document.getElementById('wi-empty');
  list.innerHTML = '';
  if (items.length === 0) { empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  items.forEach((item, idx) => list.appendChild(buildWorkItemCard(item, idx + 1)));
}

function buildWorkItemCard(item, seq) {
  const isSuper = currentUser.role === ROLES.SUPER;
  const card = document.createElement('div');
  card.className = 'work-item-card'; card.id = `wi-${item.id}`;
  card.innerHTML = `
    <div class="work-item-header">
      <div class="work-item-seq">${seq}</div>
      <div style="flex:1;margin-left:.5rem;">
        <div class="work-item-name">${item.name}</div>
        ${item.description ? `<div class="work-item-desc">${item.description}</div>` : ''}
      </div>
      ${currentUser.role === ROLES.ADMIN ? `<button class="btn-icon" title="Edit item" onclick="openItemModal(${JSON.stringify(item).replace(/"/g,'&quot;')})"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"/></svg></button>` : ''}
    </div>
    <div class="work-item-body">
      <div class="wi-amounts">
        <div class="wi-amount-box"><div class="wi-amount-label">Contract Amt</div><div class="wi-amount-value ${isSuper ? 'hide-financial' : ''}">${fmtCurrency(item.contract_amount)}</div></div>
        <div class="wi-amount-box"><div class="wi-amount-label">Amount Claimed</div><div class="wi-amount-value ${isSuper ? 'hide-financial' : ''}" id="wi-claimed-${item.id}">${fmtCurrency(item.amount_claimed)}</div></div>
      </div>
      <div class="wi-progress">
        <div class="progress-labels">
          <span>Physical: <strong id="wi-pct-label-${item.id}">${fmtPct(item.pct_physical)}</strong></span>
          ${!isSuper ? `<span>Claimed: <strong id="wi-cpct-label-${item.id}">${item.contract_amount > 0 ? fmtPct(Number(item.amount_claimed)/Number(item.contract_amount)*100) : '0.0%'}</strong></span>` : ''}
        </div>
        <div class="dual-progress">
          <div class="progress-track"><div class="progress-bar physical" id="wi-bar-p-${item.id}" style="width:${item.pct_physical}%"></div></div>
          ${!isSuper ? `<div class="progress-track"><div class="progress-bar claimed" id="wi-bar-c-${item.id}" style="width:${item.contract_amount > 0 ? Math.min(Number(item.amount_claimed)/Number(item.contract_amount)*100,100) : 0}%"></div></div>` : ''}
        </div>
      </div>
      <div class="wi-inputs">
        <div class="wi-input-row">
          <label for="pct-${item.id}">% Physical</label>
          <input class="form-control" type="number" id="pct-${item.id}" min="0" max="100" step="0.1" value="${item.pct_physical}">
          <span class="pct-suffix">%</span>
        </div>
        ${!isSuper ? `<div class="wi-input-row"><label for="claimed-${item.id}">Amount Claimed</label><input class="form-control" type="number" id="claimed-${item.id}" min="0" step="0.01" value="${item.amount_claimed}"></div>` : ''}
      </div>
      <button class="btn btn-primary wi-save-btn" id="save-btn-${item.id}" onclick="saveWorkItem('${item.id}')">Save</button>
    </div>
  `;
  return card;
}

async function saveWorkItem(itemId) {
  const btn     = document.getElementById(`save-btn-${itemId}`);
  const pctEl   = document.getElementById(`pct-${itemId}`);
  const claimEl = document.getElementById(`claimed-${itemId}`);
  const pctPhysical = Math.min(100, Math.max(0, parseFloat(pctEl?.value) || 0));
  const amtClaimed  = claimEl ? Math.max(0, parseFloat(claimEl.value) || 0) : undefined;
  btn.disabled = true; btn.className = 'btn btn-primary wi-save-btn saving'; btn.textContent = 'Saving…';
  const { data: prev } = await supabase.from('work_items').select('pct_physical, amount_claimed').eq('id', itemId).single();
  const update = { pct_physical: pctPhysical, updated_by: currentUser.id };
  if (amtClaimed !== undefined) update.amount_claimed = amtClaimed;
  const { error } = await supabase.from('work_items').update(update).eq('id', itemId);
  if (error) {
    showToast('Save failed: ' + error.message, 'error');
    btn.disabled = false; btn.className = 'btn btn-primary wi-save-btn'; btn.textContent = 'Save'; return;
  }
  await supabase.from('claim_history').insert({
    work_item_id: itemId, project_id: projectId,
    pct_physical_prev: prev?.pct_physical, pct_physical_new: pctPhysical,
    amount_claimed_prev: prev?.amount_claimed, amount_claimed_new: amtClaimed ?? prev?.amount_claimed,
    updated_by: currentUser.id,
  });
  document.getElementById(`wi-pct-label-${itemId}`).textContent = fmtPct(pctPhysical);
  document.getElementById(`wi-bar-p-${itemId}`).style.width = pctPhysical + '%';
  if (amtClaimed !== undefined) {
    document.getElementById(`wi-claimed-${itemId}`).textContent = fmtCurrency(amtClaimed);
    const { data: wi } = await supabase.from('work_items').select('contract_amount').eq('id', itemId).single();
    const cPct = wi?.contract_amount > 0 ? (amtClaimed / wi.contract_amount) * 100 : 0;
    const barC = document.getElementById(`wi-bar-c-${itemId}`);
    const lblC = document.getElementById(`wi-cpct-label-${itemId}`);
    if (barC) barC.style.width = Math.min(cPct, 100) + '%';
    if (lblC) lblC.textContent = fmtPct(cPct);
  }
  const { data: items } = await supabase.from('work_items').select('*').eq('project_id', projectId).eq('is_active', true);
  renderSummary(items || []);
  btn.className = 'btn btn-primary wi-save-btn saved'; btn.textContent = '✓ Saved';
  setTimeout(() => { btn.disabled = false; btn.className = 'btn btn-primary wi-save-btn'; btn.textContent = 'Save'; }, 2000);
}

let editItemId = null;

function setupItemModal() {
  const overlay  = document.getElementById('modal-item');
  const form     = document.getElementById('form-item');
  const btnClose = document.getElementById('modal-item-close');
  btnClose.addEventListener('click', closeItemModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeItemModal(); });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    btn.disabled = true; btn.textContent = 'Saving…';
    const payload = {
      project_id: projectId, name: form.i_name.value.trim(),
      description: form.i_desc.value.trim() || null, unit: form.i_unit.value.trim() || null,
      quantity: parseFloat(form.i_qty.value) || null, unit_rate: parseFloat(form.i_rate.value) || null,
      contract_amount: parseFloat(form.i_amount.value) || 0, sequence: parseInt(form.i_seq.value) || 0,
    };
    let error;
    if (editItemId) { ({ error } = await supabase.from('work_items').update(payload).eq('id', editItemId)); }
    else { ({ error } = await supabase.from('work_items').insert(payload)); }
    btn.disabled = false; btn.textContent = 'Save Item';
    if (error) { showToast('Error: ' + error.message, 'error'); return; }
    showToast(editItemId ? 'Item updated' : 'Item added', 'success');
    closeItemModal(); loadWorkItems();
  });
  ['i_qty', 'i_rate'].forEach(id => {
    form[id]?.addEventListener('input', () => {
      const q = parseFloat(form.i_qty.value) || 0, r = parseFloat(form.i_rate.value) || 0;
      if (q && r) form.i_amount.value = (q * r).toFixed(2);
    });
  });
}

function openItemModal(item = null) {
  editItemId = item ? item.id : null;
  const form = document.getElementById('form-item');
  form.reset();
  document.getElementById('modal-item-title').textContent = item ? 'Edit Work Item' : 'Add Work Item';
  if (item) {
    form.i_name.value = item.name || ''; form.i_desc.value = item.description || '';
    form.i_unit.value = item.unit || ''; form.i_qty.value = item.quantity || '';
    form.i_rate.value = item.unit_rate || ''; form.i_amount.value = item.contract_amount || ''; form.i_seq.value = item.sequence || '';
  }
  document.getElementById('modal-item').classList.add('open');
}
function closeItemModal() { document.getElementById('modal-item').classList.remove('open'); }

function setupAssignModal() {
  const overlay  = document.getElementById('modal-assign');
  const btnClose = document.getElementById('modal-assign-close');
  btnClose.addEventListener('click', closeAssignModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeAssignModal(); });
}
async function openAssignModal() { document.getElementById('modal-assign').classList.add('open'); await loadAssignList(); }
function closeAssignModal() { document.getElementById('modal-assign').classList.remove('open'); }

async function loadAssignList() {
  const list = document.getElementById('assign-list');
  list.innerHTML = '<div class="spinner"></div>';
  const [{ data: allUsers }, { data: assigned }] = await Promise.all([
    supabase.from('users').select('id, full_name, email, role').eq('is_active', true).order('full_name'),
    supabase.from('project_users').select('user_id').eq('project_id', projectId),
  ]);
  const assignedIds = new Set((assigned || []).map(r => r.user_id));
  list.innerHTML = '';
  (allUsers || []).forEach(u => {
    const row = document.createElement('div'); row.className = 'user-chip';
    row.innerHTML = `
      <div class="user-chip-avatar">${initials(u.full_name)}</div>
      <div class="user-chip-info"><div class="user-chip-name">${u.full_name}</div><div class="user-chip-role">${roleName(u.role)}</div></div>
      <input type="checkbox" ${assignedIds.has(u.id) ? 'checked' : ''} data-uid="${u.id}" style="width:18px;height:18px;accent-color:var(--primary);">
    `;
    const cb = row.querySelector('input');
    cb.addEventListener('change', async () => {
      if (cb.checked) await supabase.from('project_users').upsert({ project_id: projectId, user_id: u.id });
      else await supabase.from('project_users').delete().eq('project_id', projectId).eq('user_id', u.id);
    });
    list.appendChild(row);
  });
}

function setupProjectEditModal() {
  const overlay  = document.getElementById('modal-edit-project');
  const form     = document.getElementById('form-edit-project');
  const btnClose = document.getElementById('modal-edit-close');
  btnClose.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    btn.disabled = true; btn.textContent = 'Saving…';
    const payload = {
      name: form.ep_name.value.trim(), project_no: form.ep_no.value.trim() || null,
      client: form.ep_client.value.trim() || null, location: form.ep_location.value.trim() || null,
      description: form.ep_desc.value.trim() || null, contract_value: parseFloat(form.ep_contract.value) || 0,
      status: form.ep_status.value, start_date: form.ep_start.value || null, end_date: form.ep_end.value || null,
    };
    const { error } = await supabase.from('projects').update(payload).eq('id', projectId);
    btn.disabled = false; btn.textContent = 'Save';
    if (error) { showToast('Error: ' + error.message, 'error'); return; }
    showToast('Project updated', 'success'); overlay.classList.remove('open'); loadProject();
  });
}

function openProjectModal(p) {
  const form = document.getElementById('form-edit-project');
  form.ep_name.value = p.name || ''; form.ep_no.value = p.project_no || '';
  form.ep_client.value = p.client || ''; form.ep_location.value = p.location || '';
  form.ep_desc.value = p.description || ''; form.ep_contract.value = p.contract_value || '';
  form.ep_status.value = p.status || 'active'; form.ep_start.value = p.start_date || ''; form.ep_end.value = p.end_date || '';
  document.getElementById('modal-edit-project').classList.add('open');
}