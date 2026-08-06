// ============================================================
// SALARY – CRUD + Render
// ============================================================

import { createData, updateData, deleteData } from './firebase.js';

function renderSalary(statusFilter = 'all', search = '') {
  const salary = window.SALARY_RECORDS || [];
  let list = salary;

  if (statusFilter !== 'all') {
    list = list.filter(s => s.status === statusFilter);
  }
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(s => s.employeeName.toLowerCase().includes(q));
  }

  const tbody = document.getElementById('salaryTableBody');
  tbody.innerHTML = list.map((s, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>${s.employeeName}</td>
      <td><span class="status-badge ${s.role === 'teacher' ? 'status-paid' : 'status-pending'}">${s.role}</span></td>
      <td>${s.month}</td>
      <td>${s.year}</td>
      <td>₹${s.amount.toLocaleString()}</td>
      <td><span class="status-badge status-${s.status}">${s.status}</span></td>
      <td>${s.paymentMethod || '—'}</td>
      <td>
        <div class="actions-cell">
          <button class="btn-edit" data-id="${s.id}" data-action="editSalary">Edit</button>
          <button class="btn-delete" data-id="${s.id}" data-action="deleteSalary">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('[data-action="editSalary"]').forEach(btn => {
    btn.addEventListener('click', () => editSalary(btn.dataset.id));
  });
  tbody.querySelectorAll('[data-action="deleteSalary"]').forEach(btn => {
    btn.addEventListener('click', () => deleteSalary(btn.dataset.id));
  });

  // Stats
  const totalPaid = salary.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.amount, 0);
  const totalPending = salary.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.amount, 0);
  const totalRecords = salary.length;
  document.getElementById('salaryStatsGrid').innerHTML = `
    <div class="stat-card"><span class="stat-label">Total Salary Paid</span><span class="stat-value">₹${totalPaid.toLocaleString()}</span></div>
    <div class="stat-card"><span class="stat-label">Total Salary Pending</span><span class="stat-value">₹${totalPending.toLocaleString()}</span></div>
    <div class="stat-card"><span class="stat-label">Total Records</span><span class="stat-value">${totalRecords}</span></div>
  `;
}

function showAddSalaryModal() {
  const employees = window.TEACHERS || [];
  const employeeOptions = employees.map(t => `<option value="${t.id}">${t.name} (${t.role})</option>`).join('');
  const monthOptions = ['January','February','March','April','May','June','July','August','September','October','November','December']
    .map(m => `<option value="${m}">${m}</option>`).join('');
  const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i)
    .map(y => `<option value="${y}">${y}</option>`).join('');
  const paymentMethodOptions = ['Bank Transfer','Cash','Cheque','Digital Wallet']
    .map(p => `<option value="${p}">${p}</option>`).join('');

  openModal('Add Salary', `
    <div class="form-group"><label>Employee</label><select id="addSalaryEmployee">${employeeOptions}</select></div>
    <div class="form-group"><label>Month</label><select id="addSalaryMonth">${monthOptions}</select></div>
    <div class="form-group"><label>Year</label><select id="addSalaryYear">${yearOptions}</select></div>
    <div class="form-group"><label>Amount (₹)</label><input type="number" id="addSalaryAmount" placeholder="Enter salary amount" /></div>
    <div class="form-group"><label>Status</label>
      <select id="addSalaryStatus">
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
      </select>
    </div>
    <div class="form-group"><label>Payment Method</label>
      <select id="addSalaryPaymentMethod">
        <option value="">— Select —</option>${paymentMethodOptions}
      </select>
    </div>
  `, 'Add Salary', async () => {
    const employeeId = parseInt(document.getElementById('addSalaryEmployee').value);
    const month = document.getElementById('addSalaryMonth').value;
    const year = parseInt(document.getElementById('addSalaryYear').value);
    const amount = parseFloat(document.getElementById('addSalaryAmount').value);
    const status = document.getElementById('addSalaryStatus').value;
    const paymentMethod = document.getElementById('addSalaryPaymentMethod').value;
    if (!employeeId || !month || !year || isNaN(amount) || amount <= 0) {
      showToast('Please fill all fields with valid values', 'error');
      return;
    }
    const employee = window.TEACHERS.find(t => t.id === employeeId);
    if (!employee) {
      showToast('Employee not found', 'error');
      return;
    }
    const newSalary = {
      employeeId,
      employeeName: employee.name,
      role: employee.role,
      month,
      year,
      amount,
      status,
      paymentMethod: status === 'paid' ? paymentMethod : ''
    };
    const result = await createData('salaryRecords', newSalary);
    window.SALARY_RECORDS.push(result);
    showToast('Salary record added successfully', 'success');
    renderSalary();
    renderDashboard();
    closeModal();
  });
}

async function editSalary(id) {
  const salary = window.SALARY_RECORDS.find(s => s.id === id);
  if (!salary) return;

  const employees = window.TEACHERS || [];
  const employeeOptions = employees.map(t => `<option value="${t.id}" ${t.id === salary.employeeId ? 'selected' : ''}>${t.name} (${t.role})</option>`).join('');
  const monthOptions = ['January','February','March','April','May','June','July','August','September','October','November','December']
    .map(m => `<option value="${m}" ${m === salary.month ? 'selected' : ''}>${m}</option>`).join('');
  const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i)
    .map(y => `<option value="${y}" ${y === salary.year ? 'selected' : ''}>${y}</option>`).join('');
  const paymentMethodOptions = ['Bank Transfer','Cash','Cheque','Digital Wallet']
    .map(p => `<option value="${p}" ${p === salary.paymentMethod ? 'selected' : ''}>${p}</option>`).join('');

  openModal('Edit Salary', `
    <div class="form-group"><label>Employee</label><select id="editSalaryEmployee">${employeeOptions}</select></div>
    <div class="form-group"><label>Month</label><select id="editSalaryMonth">${monthOptions}</select></div>
    <div class="form-group"><label>Year</label><select id="editSalaryYear">${yearOptions}</select></div>
    <div class="form-group"><label>Amount (₹)</label><input type="number" id="editSalaryAmount" value="${salary.amount}" /></div>
    <div class="form-group"><label>Status</label>
      <select id="editSalaryStatus">
        <option value="paid" ${salary.status === 'paid' ? 'selected' : ''}>Paid</option>
        <option value="pending" ${salary.status === 'pending' ? 'selected' : ''}>Pending</option>
      </select>
    </div>
    <div class="form-group"><label>Payment Method</label>
      <select id="editSalaryPaymentMethod">
        <option value="">— Select —</option>${paymentMethodOptions}
      </select>
    </div>
  `, 'Update', async () => {
    const employeeId = parseInt(document.getElementById('editSalaryEmployee').value);
    const month = document.getElementById('editSalaryMonth').value;
    const year = parseInt(document.getElementById('editSalaryYear').value);
    const amount = parseFloat(document.getElementById('editSalaryAmount').value);
    const status = document.getElementById('editSalaryStatus').value;
    const paymentMethod = document.getElementById('editSalaryPaymentMethod').value;
    if (!employeeId || !month || !year || isNaN(amount) || amount <= 0) {
      showToast('Please fill all fields with valid values', 'error');
      return;
    }
    const employee = window.TEACHERS.find(t => t.id === employeeId);
    if (!employee) {
      showToast('Employee not found', 'error');
      return;
    }
    const updated = {
      employeeId,
      employeeName: employee.name,
      role: employee.role,
      month,
      year,
      amount,
      status,
      paymentMethod: status === 'paid' ? paymentMethod : ''
    };
    await updateData('salaryRecords', id, updated);
    const idx = window.SALARY_RECORDS.findIndex(s => s.id === id);
    if (idx !== -1) window.SALARY_RECORDS[idx] = { ...window.SALARY_RECORDS[idx], ...updated };
    showToast('Salary record updated successfully', 'success');
    renderSalary();
    renderDashboard();
    closeModal();
  });
}

async function deleteSalary(id) {
  if (!confirm('Are you sure you want to delete this salary record?')) return;
  await deleteData('salaryRecords', id);
  window.SALARY_RECORDS = window.SALARY_RECORDS.filter(s => s.id !== id);
  showToast('Salary record deleted', 'success');
  renderSalary();
  renderDashboard();
}

// Event bindings
document.getElementById('addSalaryBtn').addEventListener('click', showAddSalaryModal);
document.getElementById('salarySearch').addEventListener('input', (e) => {
  const status = document.getElementById('salaryFilter').value;
  renderSalary(status, e.target.value);
});
document.getElementById('salaryFilter').addEventListener('change', (e) => {
  const search = document.getElementById('salarySearch').value;
  renderSalary(e.target.value, search);
});

// Expose
window.renderSalary = renderSalary;
window.showAddSalaryModal = showAddSalaryModal;
window.editSalary = editSalary;
window.deleteSalary = deleteSalary;
