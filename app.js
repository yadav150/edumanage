// ============================================================
// DUMMY DATA
// ============================================================

let students = [
    { id: 1, name: 'Aarav Sharma', class: 10, section: 'A', roll: 12, feeStatus: 'paid' },
    { id: 2, name: 'Priya Patel', class: 9, section: 'B', roll: 5, feeStatus: 'pending' },
    { id: 3, name: 'Rohit Singh', class: 8, section: 'A', roll: 8, feeStatus: 'paid' },
    { id: 4, name: 'Sneha Reddy', class: 7, section: 'C', roll: 3, feeStatus: 'overdue' },
    { id: 5, name: 'Vikram Joshi', class: 6, section: 'B', roll: 15, feeStatus: 'paid' },
];

let teachers = [
    { id: 1, name: 'Dr. Anil Kumar', role: 'teacher', designation: 'Subject Teacher', subDepartment: 'Mathematics', email: 'anil@school.com' },
    { id: 2, name: 'Mrs. Sunita Rao', role: 'teacher', designation: 'Subject Teacher', subDepartment: 'Science', email: 'sunita@school.com' },
    { id: 3, name: 'Mr. Rajesh Gupta', role: 'staff', designation: 'Administration', subDepartment: 'N/A', email: 'rajesh@school.com' },
    { id: 4, name: 'Ms. Priya Menon', role: 'teacher', designation: 'Assistant Teacher', subDepartment: 'English', email: 'priya@school.com' },
    { id: 5, name: 'Mr. Suresh Patel', role: 'staff', designation: 'Staff', subDepartment: 'Accounts', email: 'suresh@school.com' },
];

let feeRecords = [
    { id: 1, studentId: 1, feeType: 'Tuition', amount: 5000, paid: 5000, pending: 0, status: 'paid' },
    { id: 2, studentId: 2, feeType: 'Tuition', amount: 5000, paid: 2000, pending: 3000, status: 'pending' },
    { id: 3, studentId: 3, feeType: 'Tuition', amount: 5000, paid: 5000, pending: 0, status: 'paid' },
    { id: 4, studentId: 4, feeType: 'Tuition', amount: 5000, paid: 1000, pending: 4000, status: 'overdue' },
    { id: 5, studentId: 5, feeType: 'Tuition', amount: 5000, paid: 5000, pending: 0, status: 'paid' },
    { id: 6, studentId: 2, feeType: 'Library', amount: 500, paid: 0, pending: 500, status: 'pending' },
];

let activities = [
    { id: 1, text: 'Aarav Sharma paid tuition fee', time: '2 hours ago' },
    { id: 2, text: 'New student Rohit Singh added', time: '5 hours ago' },
    { id: 3, text: 'Fee reminder sent to Priya Patel', time: '1 day ago' },
    { id: 4, text: 'Staff member Suresh Patel updated', time: '2 days ago' },
];

let idCounter = {
    student: 6,
    staff: 6,
    fee: 7,
};

// ============================================================
// DOM REFS
// ============================================================

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const sidebarClose = document.getElementById('sidebarClose');
const pageTitle = document.getElementById('pageTitle');
const pageContainer = document.getElementById('pageContainer');
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalFooter = document.getElementById('modalFooter');
const modalClose = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');
const modalConfirm = document.getElementById('modalConfirm');
const toastContainer = document.getElementById('toastContainer');
const loadingOverlay = document.getElementById('loadingOverlay');

let currentPage = 'dashboard';
let modalCallback = null;

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function showLoading(show = true) {
    loadingOverlay.classList.toggle('active', show);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function openModal(title, bodyHTML, confirmText = 'Confirm', callback) {
    modalTitle.textContent = title;
    modalBody.innerHTML = bodyHTML;
    modalConfirm.textContent = confirmText;
    modalCallback = callback;
    modalOverlay.classList.add('active');

    // If this is the add teacher form, set up conditional logic after DOM render
    if (title.includes('Teacher') || title.includes('Staff')) {
        setTimeout(() => setupTeacherConditionalLogic(), 50);
    }
}

function closeModal() {
    modalOverlay.classList.remove('active');
    modalCallback = null;
}

function getStudentName(id) {
    const s = students.find(st => st.id === id);
    return s ? s.name : 'Unknown';
}

function getStudentClass(id) {
    const s = students.find(st => st.id === id);
    return s ? `${s.class}${s.section}` : 'N/A';
}

// ============================================================
// TEACHER CONDITIONAL LOGIC
// ============================================================

function setupTeacherConditionalLogic() {
    // For Add form
    const addDesignation = document.getElementById('addStaffDesignation');
    const addSubjectGroup = document.getElementById('addSubjectGroup');
    if (addDesignation && addSubjectGroup) {
        addDesignation.addEventListener('change', function() {
            if (this.value === 'Subject Teacher') {
                addSubjectGroup.style.display = 'block';
                addSubjectGroup.style.animation = 'fadeIn 250ms ease';
            } else {
                addSubjectGroup.style.display = 'none';
            }
        });
        // Trigger initially based on default selection
        if (addDesignation.value === 'Subject Teacher') {
            addSubjectGroup.style.display = 'block';
        } else {
            addSubjectGroup.style.display = 'none';
        }
    }

    // For Edit form
    const editDesignation = document.getElementById('editStaffDesignation');
    const editSubjectGroup = document.getElementById('editSubjectGroup');
    if (editDesignation && editSubjectGroup) {
        editDesignation.addEventListener('change', function() {
            if (this.value === 'Subject Teacher') {
                editSubjectGroup.style.display = 'block';
                editSubjectGroup.style.animation = 'fadeIn 250ms ease';
            } else {
                editSubjectGroup.style.display = 'none';
            }
        });
        // Trigger on load based on current value
        if (editDesignation.value === 'Subject Teacher') {
            editSubjectGroup.style.display = 'block';
        } else {
            editSubjectGroup.style.display = 'none';
        }
    }
}

// ============================================================
// NAVIGATION
// ============================================================

function navigateTo(page) {
    currentPage = page;
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });

    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    const target = document.getElementById(`page-${page}`);
    if (target) target.classList.add('active');

    const titles = {
        dashboard: 'Dashboard',
        students: 'Students',
        teachers: 'Teachers & Staff',
        fees: 'Fee Management',
    };
    pageTitle.textContent = titles[page] || 'Dashboard';

    switch (page) {
        case 'dashboard': renderDashboard(); break;
        case 'students': renderStudents(); break;
        case 'teachers': renderStaff(); break;
        case 'fees': renderFees(); break;
    }

    if (window.innerWidth < 1024) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }
}

// ============================================================
// DASHBOARD
// ============================================================

function renderDashboard() {
    const totalStudents = students.length;
    const totalTeachers = teachers.filter(t => t.role === 'teacher').length;
    const totalStaff = teachers.filter(t => t.role === 'staff').length;
    const totalCollected = feeRecords.reduce((sum, f) => sum + f.paid, 0);
    const totalPending = feeRecords.reduce((sum, f) => sum + f.pending, 0);

    const statsGrid = document.getElementById('statsGrid');
    statsGrid.innerHTML = `
        <div class="stat-card">
            <span class="stat-label">Total Students</span>
            <span class="stat-value">${totalStudents}</span>
        </div>
        <div class="stat-card">
            <span class="stat-label">Total Teachers</span>
            <span class="stat-value">${totalTeachers}</span>
        </div>
        <div class="stat-card">
            <span class="stat-label">Total Staff</span>
            <span class="stat-value">${totalStaff}</span>
        </div>
        <div class="stat-card">
            <span class="stat-label">Fee Collected</span>
            <span class="stat-value">₹${totalCollected.toLocaleString()}</span>
        </div>
        <div class="stat-card">
            <span class="stat-label">Pending Fees</span>
            <span class="stat-value">₹${totalPending.toLocaleString()}</span>
        </div>
    `;

    const activityContainer = document.getElementById('recentActivities');
    activityContainer.innerHTML = activities.map(act => `
        <div class="activity-item">
            <div class="activity-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div class="activity-content">
                <div class="activity-text">${act.text}</div>
                <div class="activity-time">${act.time}</div>
            </div>
        </div>
    `).join('');
}

// ============================================================
// STUDENTS
// ============================================================

function renderStudents(filter = 'all', search = '') {
    const tbody = document.getElementById('studentTableBody');
    let list = students;
    if (filter !== 'all') {
        list = list.filter(s => s.class === parseInt(filter));
    }
    if (search.trim()) {
        const q = search.trim().toLowerCase();
        list = list.filter(s => s.name.toLowerCase().includes(q));
    }
    tbody.innerHTML = list.map((s, idx) => `
        <tr>
            <td>${idx + 1}</td>
            <td>${s.name}</td>
            <td>${s.class}</td>
            <td>${s.section}</td>
            <td>${s.roll}</td>
            <td><span class="status-badge status-${s.feeStatus}">${s.feeStatus}</span></td>
            <td>
                <div class="actions-cell">
                    <button class="btn-edit" data-id="${s.id}" data-action="editStudent">Edit</button>
                    <button class="btn-delete" data-id="${s.id}" data-action="deleteStudent">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');

    tbody.querySelectorAll('[data-action="editStudent"]').forEach(btn => {
        btn.addEventListener('click', () => editStudent(parseInt(btn.dataset.id)));
    });
    tbody.querySelectorAll('[data-action="deleteStudent"]').forEach(btn => {
        btn.addEventListener('click', () => deleteStudent(parseInt(btn.dataset.id)));
    });
}

function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    const classOptions = Array.from({ length: 12 }, (_, i) => i + 1)
        .map(c => `<option value="${c}" ${c === student.class ? 'selected' : ''}>Class ${c}</option>`).join('');

    const sectionOptions = ['A', 'B', 'C', 'NA']
        .map(sec => `<option value="${sec}" ${sec === student.section ? 'selected' : ''}>${sec}</option>`).join('');

    openModal('Edit Student', `
        <div class="form-group">
            <label>Name</label>
            <input type="text" id="editStudentName" value="${student.name}" />
        </div>
        <div class="form-group">
            <label>Class</label>
            <select id="editStudentClass">${classOptions}</select>
        </div>
        <div class="form-group">
            <label>Section</label>
            <select id="editStudentSection">${sectionOptions}</select>
        </div>
        <div class="form-group">
            <label>Roll No</label>
            <input type="number" id="editStudentRoll" value="${student.roll}" />
        </div>
        <div class="form-group">
            <label>Fee Status</label>
            <select id="editStudentFeeStatus">
                <option value="paid" ${student.feeStatus === 'paid' ? 'selected' : ''}>Paid</option>
                <option value="pending" ${student.feeStatus === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="overdue" ${student.feeStatus === 'overdue' ? 'selected' : ''}>Overdue</option>
            </select>
        </div>
    `, 'Update', () => {
        const name = document.getElementById('editStudentName').value.trim();
        const classVal = parseInt(document.getElementById('editStudentClass').value);
        const section = document.getElementById('editStudentSection').value;
        const roll = parseInt(document.getElementById('editStudentRoll').value);
        const feeStatus = document.getElementById('editStudentFeeStatus').value;
        if (!name || !classVal || !roll) {
            showToast('Please fill all fields', 'error');
            return;
        }
        const idx = students.findIndex(s => s.id === id);
        if (idx !== -1) {
            students[idx] = { ...students[idx], name, class: classVal, section, roll, feeStatus };
            showToast('Student updated successfully', 'success');
            renderStudents();
            renderDashboard();
            closeModal();
        }
    });
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== id);
        feeRecords = feeRecords.filter(f => f.studentId !== id);
        showToast('Student deleted', 'success');
        renderStudents();
        renderDashboard();
        renderFees();
    }
}

// ============================================================
// ADD STUDENT - UPDATED with dropdowns
// ============================================================

function showAddStudentModal() {
    const classOptions = Array.from({ length: 12 }, (_, i) => i + 1)
        .map(c => `<option value="${c}">Class ${c}</option>`).join('');

    const sectionOptions = ['A', 'B', 'C', 'NA']
        .map(sec => `<option value="${sec}">${sec}</option>`).join('');

    openModal('Add Student', `
        <div class="form-group">
            <label>Name</label>
            <input type="text" id="addStudentName" placeholder="Full name" />
        </div>
        <div class="form-group">
            <label>Class</label>
            <select id="addStudentClass">${classOptions}</select>
        </div>
        <div class="form-group">
            <label>Section</label>
            <select id="addStudentSection">${sectionOptions}</select>
        </div>
        <div class="form-group">
            <label>Roll No</label>
            <input type="number" id="addStudentRoll" placeholder="Roll number" />
        </div>
        <div class="form-group">
            <label>Fee Status</label>
            <select id="addStudentFeeStatus">
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
            </select>
        </div>
    `, 'Add Student', () => {
        const name = document.getElementById('addStudentName').value.trim();
        const classVal = parseInt(document.getElementById('addStudentClass').value);
        const section = document.getElementById('addStudentSection').value;
        const roll = parseInt(document.getElementById('addStudentRoll').value);
        const feeStatus = document.getElementById('addStudentFeeStatus').value;
        if (!name || !classVal || !roll) {
            showToast('Please fill all fields', 'error');
            return;
        }
        const newStudent = {
            id: idCounter.student++,
            name,
            class: classVal,
            section,
            roll,
            feeStatus,
        };
        students.push(newStudent);
        showToast('Student added successfully', 'success');
        renderStudents();
        renderDashboard();
        closeModal();
    });
}

// ============================================================
// TEACHERS & STAFF
// ============================================================

function renderStaff(filter = 'all', search = '') {
    const tbody = document.getElementById('staffTableBody');
    let list = teachers;
    if (filter !== 'all') {
        list = list.filter(t => t.role === filter);
    }
    if (search.trim()) {
        const q = search.trim().toLowerCase();
        list = list.filter(t => t.name.toLowerCase().includes(q) || t.subDepartment.toLowerCase().includes(q) || t.email.toLowerCase().includes(q));
    }
    tbody.innerHTML = list.map((t, idx) => `
        <tr>
            <td>${idx + 1}</td>
            <td>${t.name}</td>
            <td><span class="status-badge ${t.role === 'teacher' ? 'status-paid' : 'status-pending'}">${t.role}</span></td>
            <td>${t.designation}</td>
            <td>${t.subDepartment}</td>
            <td>${t.email}</td>
            <td>
                <div class="actions-cell">
                    <button class="btn-edit" data-id="${t.id}" data-action="editStaff">Edit</button>
                    <button class="btn-delete" data-id="${t.id}" data-action="deleteStaff">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');

    tbody.querySelectorAll('[data-action="editStaff"]').forEach(btn => {
        btn.addEventListener('click', () => editStaff(parseInt(btn.dataset.id)));
    });
    tbody.querySelectorAll('[data-action="deleteStaff"]').forEach(btn => {
        btn.addEventListener('click', () => deleteStaff(parseInt(btn.dataset.id)));
    });
}

function editStaff(id) {
    const staff = teachers.find(t => t.id === id);
    if (!staff) return;

    const designationOptions = ['Principal', 'Head Master', 'Assistant Teacher', 'Subject Teacher', 'Administration', 'Staff', 'Peon']
        .map(d => `<option value="${d}" ${d === staff.designation ? 'selected' : ''}>${d}</option>`).join('');

    const subjectOptions = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science', 'Physical Education', 'Arts', 'Music', 'N/A']
        .map(s => `<option value="${s}" ${s === staff.subDepartment ? 'selected' : ''}>${s}</option>`).join('');

    openModal('Edit Teacher / Staff', `
        <div class="form-group">
            <label>Name</label>
            <input type="text" id="editStaffName" value="${staff.name}" />
        </div>
        <div class="form-group">
            <label>Role</label>
            <select id="editStaffRole">
                <option value="teacher" ${staff.role === 'teacher' ? 'selected' : ''}>Teacher</option>
                <option value="staff" ${staff.role === 'staff' ? 'selected' : ''}>Staff</option>
            </select>
        </div>
        <div class="form-group">
            <label>Designation</label>
            <select id="editStaffDesignation">${designationOptions}</select>
        </div>
        <div class="form-group" id="editSubjectGroup" style="${staff.designation === 'Subject Teacher' ? 'display:block;' : 'display:none;'}">
            <label>Subject</label>
            <select id="editStaffSubject">${subjectOptions}</select>
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" id="editStaffEmail" value="${staff.email}" />
        </div>
    `, 'Update', () => {
        const name = document.getElementById('editStaffName').value.trim();
        const role = document.getElementById('editStaffRole').value;
        const designation = document.getElementById('editStaffDesignation').value;
        const subject = document.getElementById('editStaffSubject') ? document.getElementById('editStaffSubject').value : 'N/A';
        const email = document.getElementById('editStaffEmail').value.trim();
        if (!name || !email) {
            showToast('Please fill all fields', 'error');
            return;
        }
        const idx = teachers.findIndex(t => t.id === id);
        if (idx !== -1) {
            teachers[idx] = { ...teachers[idx], name, role, designation, subDepartment: subject, email };
            showToast('Updated successfully', 'success');
            renderStaff();
            renderDashboard();
            closeModal();
        }
    });

    // Set up conditional logic for edit form
    setTimeout(() => {
        const roleSelect = document.getElementById('editStaffDesignation');
        const subjectGroup = document.getElementById('editSubjectGroup');
        if (roleSelect && subjectGroup) {
            roleSelect.addEventListener('change', function() {
                if (this.value === 'Subject Teacher') {
                    subjectGroup.style.display = 'block';
                    subjectGroup.style.animation = 'fadeIn 250ms ease';
                } else {
                    subjectGroup.style.display = 'none';
                }
            });
        }
    }, 50);
}

function deleteStaff(id) {
    if (confirm('Delete this record?')) {
        teachers = teachers.filter(t => t.id !== id);
        showToast('Deleted', 'success');
        renderStaff();
        renderDashboard();
    }
}

// ============================================================
// ADD TEACHER / STAFF - UPDATED with dropdowns & conditional logic
// ============================================================

function showAddStaffModal() {
    const designationOptions = ['Principal', 'Head Master', 'Assistant Teacher', 'Subject Teacher', 'Administration', 'Staff', 'Peon']
        .map(d => `<option value="${d}">${d}</option>`).join('');

    const subjectOptions = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science', 'Physical Education', 'Arts', 'Music', 'N/A']
        .map(s => `<option value="${s}">${s}</option>`).join('');

    openModal('Add Teacher / Staff', `
        <div class="form-group">
            <label>Name</label>
            <input type="text" id="addStaffName" placeholder="Full name" />
        </div>
        <div class="form-group">
            <label>Role</label>
            <select id="addStaffRole">
                <option value="teacher">Teacher</option>
                <option value="staff">Staff</option>
            </select>
        </div>
        <div class="form-group">
            <label>Designation</label>
            <select id="addStaffDesignation">${designationOptions}</select>
        </div>
        <div class="form-group" id="addSubjectGroup" style="display:none;">
            <label>Subject</label>
            <select id="addStaffSubject">${subjectOptions}</select>
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" id="addStaffEmail" placeholder="email@school.com" />
        </div>
    `, 'Add', () => {
        const name = document.getElementById('addStaffName').value.trim();
        const role = document.getElementById('addStaffRole').value;
        const designation = document.getElementById('addStaffDesignation').value;
        const subjectEl = document.getElementById('addStaffSubject');
        const subject = subjectEl ? subjectEl.value : 'N/A';
        const email = document.getElementById('addStaffEmail').value.trim();
        if (!name || !email) {
            showToast('Please fill all fields', 'error');
            return;
        }
        const newStaff = {
            id: idCounter.staff++,
            name,
            role,
            designation,
            subDepartment: subject,
            email,
        };
        teachers.push(newStaff);
        showToast('Added successfully', 'success');
        renderStaff();
        renderDashboard();
        closeModal();
    });
}

// ============================================================
// FEE MANAGEMENT
// ============================================================

function renderFees(filter = 'all', search = '') {
    const tbody = document.getElementById('feeTableBody');
    let list = feeRecords;
    if (filter !== 'all') {
        list = list.filter(f => f.status === filter);
    }
    if (search.trim()) {
        const q = search.trim().toLowerCase();
        list = list.filter(f => getStudentName(f.studentId).toLowerCase().includes(q));
    }
    tbody.innerHTML = list.map((f, idx) => {
        const studentName = getStudentName(f.studentId);
        const studentClass = getStudentClass(f.studentId);
        return `
        <tr>
            <td>${idx + 1}</td>
            <td>${studentName}</td>
            <td>${studentClass}</td>
            <td>${f.feeType}</td>
            <td>₹${f.amount}</td>
            <td>₹${f.paid}</td>
            <td>₹${f.pending}</td>
            <td><span class="status-badge status-${f.status}">${f.status}</span></td>
            <td>
                <div class="actions-cell">
                    <button class="btn-receipt" data-id="${f.id}" data-action="receipt">Receipt</button>
                    <button class="btn-edit" data-id="${f.id}" data-action="editFee">Edit</button>
                    <button class="btn-delete" data-id="${f.id}" data-action="deleteFee">Delete</button>
                </div>
            </td>
        </tr>
    `}).join('');

    tbody.querySelectorAll('[data-action="receipt"]').forEach(btn => {
        btn.addEventListener('click', () => showReceipt(parseInt(btn.dataset.id)));
    });
    tbody.querySelectorAll('[data-action="editFee"]').forEach(btn => {
        btn.addEventListener('click', () => editFee(parseInt(btn.dataset.id)));
    });
    tbody.querySelectorAll('[data-action="deleteFee"]').forEach(btn => {
        btn.addEventListener('click', () => deleteFee(parseInt(btn.dataset.id)));
    });

    const totalCollected = feeRecords.reduce((sum, f) => sum + f.paid, 0);
    const totalPending = feeRecords.reduce((sum, f) => sum + f.pending, 0);
    const overdue = feeRecords.filter(f => f.status === 'overdue').length;
    document.getElementById('feeStatsGrid').innerHTML = `
        <div class="stat-card">
            <span class="stat-label">Total Collected</span>
            <span class="stat-value">₹${totalCollected.toLocaleString()}</span>
        </div>
        <div class="stat-card">
            <span class="stat-label">Pending Fees</span>
            <span class="stat-value">₹${totalPending.toLocaleString()}</span>
        </div>
        <div class="stat-card">
            <span class="stat-label">Overdue Records</span>
            <span class="stat-value">${overdue}</span>
        </div>
    `;
}

function showReceipt(id) {
    const fee = feeRecords.find(f => f.id === id);
    if (!fee) return;
    const student = students.find(s => s.id === fee.studentId);
    const name = student ? student.name : 'Unknown';
    openModal('Fee Receipt', `
        <div style="text-align:center; padding: 0.5rem 0;">
            <h3 style="margin-bottom: 0.25rem;">SchoolERP</h3>
            <p style="color: var(--gray-500); font-size: 0.875rem;">Fee Receipt</p>
            <hr style="margin: 1rem 0; border: 1px dashed var(--gray-300);" />
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; text-align:left; font-size:0.9rem;">
                <div><strong>Student:</strong> ${name}</div>
                <div><strong>Class:</strong> ${student ? student.class + student.section : 'N/A'}</div>
                <div><strong>Fee Type:</strong> ${fee.feeType}</div>
                <div><strong>Amount:</strong> ₹${fee.amount}</div>
                <div><strong>Paid:</strong> ₹${fee.paid}</div>
                <div><strong>Pending:</strong> ₹${fee.pending}</div>
                <div><strong>Status:</strong> <span class="status-badge status-${fee.status}">${fee.status}</span></div>
                <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
            </div>
            <hr style="margin: 1rem 0; border: 1px dashed var(--gray-300);" />
            <p style="font-size:0.75rem; color:var(--gray-400);">This is a system-generated receipt.</p>
        </div>
    `, 'Close', () => { closeModal(); });
    modalConfirm.textContent = 'Close';
    modalCallback = () => { closeModal(); };
}

function editFee(id) {
    const fee = feeRecords.find(f => f.id === id);
    if (!fee) return;
    const studentOptions = students.map(s => `<option value="${s.id}" ${s.id === fee.studentId ? 'selected' : ''}>${s.name}</option>`).join('');
    openModal('Edit Fee Record', `
        <div class="form-group">
            <label>Student</label>
            <select id="editFeeStudent">${studentOptions}</select>
        </div>
        <div class="form-group">
            <label>Fee Type</label>
            <input type="text" id="editFeeType" value="${fee.feeType}" />
        </div>
        <div class="form-group">
            <label>Amount (₹)</label>
            <input type="number" id="editFeeAmount" value="${fee.amount}" />
        </div>
        <div class="form-group">
            <label>Paid (₹)</label>
            <input type="number" id="editFeePaid" value="${fee.paid}" />
        </div>
        <div class="form-group">
            <label>Pending (₹)</label>
            <input type="number" id="editFeePending" value="${fee.pending}" />
        </div>
        <div class="form-group">
            <label>Status</label>
            <select id="editFeeStatus">
                <option value="paid" ${fee.status === 'paid' ? 'selected' : ''}>Paid</option>
                <option value="pending" ${fee.status === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="overdue" ${fee.status === 'overdue' ? 'selected' : ''}>Overdue</option>
            </select>
        </div>
    `, 'Update', () => {
        const studentId = parseInt(document.getElementById('editFeeStudent').value);
        const feeType = document.getElementById('editFeeType').value.trim();
        const amount = parseFloat(document.getElementById('editFeeAmount').value);
        const paid = parseFloat(document.getElementById('editFeePaid').value);
        const pending = parseFloat(document.getElementById('editFeePending').value);
        const status = document.getElementById('editFeeStatus').value;
        if (!feeType || isNaN(amount) || isNaN(paid) || isNaN(pending)) {
            showToast('Please fill all fields', 'error');
            return;
        }
        const idx = feeRecords.findIndex(f => f.id === id);
        if (idx !== -1) {
            feeRecords[idx] = { ...feeRecords[idx], studentId, feeType, amount, paid, pending, status };
            showToast('Fee record updated', 'success');
            renderFees();
            renderDashboard();
            closeModal();
        }
    });
}

function deleteFee(id) {
    if (confirm('Delete this fee record?')) {
        feeRecords = feeRecords.filter(f => f.id !== id);
        showToast('Fee record deleted', 'success');
        renderFees();
        renderDashboard();
    }
}

function showAddFeeModal() {
    const studentOptions = students.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    openModal('Add Fee Record', `
        <div class="form-group">
            <label>Student</label>
            <select id="addFeeStudent">${studentOptions}</select>
        </div>
        <div class="form-group">
            <label>Fee Type</label>
            <input type="text" id="addFeeType" placeholder="e.g., Tuition" />
        </div>
        <div class="form-group">
            <label>Amount (₹)</label>
            <input type="number" id="addFeeAmount" placeholder="5000" />
        </div>
        <div class="form-group">
            <label>Paid (₹)</label>
            <input type="number" id="addFeePaid" placeholder="0" />
        </div>
        <div class="form-group">
            <label>Pending (₹)</label>
            <input type="number" id="addFeePending" placeholder="0" />
        </div>
        <div class="form-group">
            <label>Status</label>
            <select id="addFeeStatus">
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
            </select>
        </div>
    `, 'Add Fee', () => {
        const studentId = parseInt(document.getElementById('addFeeStudent').value);
        const feeType = document.getElementById('addFeeType').value.trim();
        const amount = parseFloat(document.getElementById('addFeeAmount').value);
        const paid = parseFloat(document.getElementById('addFeePaid').value) || 0;
        const pending = parseFloat(document.getElementById('addFeePending').value) || 0;
        const status = document.getElementById('addFeeStatus').value;
        if (!feeType || isNaN(amount)) {
            showToast('Please fill all fields', 'error');
            return;
        }
        const newFee = {
            id: idCounter.fee++,
            studentId,
            feeType,
            amount,
            paid,
            pending,
            status,
        };
        feeRecords.push(newFee);
        showToast('Fee record added', 'success');
        renderFees();
        renderDashboard();
        closeModal();
    });
}

// ============================================================
// EVENT BINDINGS
// ============================================================

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
});

sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        navigateTo(page);
    });
});

modalClose.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});
modalConfirm.addEventListener('click', () => {
    if (modalCallback) modalCallback();
});

document.querySelectorAll('.quick-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        switch (action) {
            case 'addStudent': showAddStudentModal(); break;
            case 'addTeacher': showAddStaffModal(); break;
            case 'addStaff': showAddStaffModal(); break;
            case 'viewFees': navigateTo('fees'); break;
        }
    });
});

document.getElementById('addStudentBtn').addEventListener('click', showAddStudentModal);
document.getElementById('addStaffBtn').addEventListener('click', showAddStaffModal);
document.getElementById('addFeeBtn').addEventListener('click', showAddFeeModal);

document.getElementById('studentSearch').addEventListener('input', (e) => {
    const filter = document.getElementById('studentFilter').value;
    renderStudents(filter, e.target.value);
});
document.getElementById('studentFilter').addEventListener('change', (e) => {
    const search = document.getElementById('studentSearch').value;
    renderStudents(e.target.value, search);
});

document.getElementById('staffSearch').addEventListener('input', (e) => {
    const filter = document.getElementById('staffFilter').value;
    renderStaff(filter, e.target.value);
});
document.getElementById('staffFilter').addEventListener('change', (e) => {
    const search = document.getElementById('staffSearch').value;
    renderStaff(e.target.value, search);
});

document.getElementById('feeSearch').addEventListener('input', (e) => {
    const filter = document.getElementById('feeFilter').value;
    renderFees(filter, e.target.value);
});
document.getElementById('feeFilter').addEventListener('change', (e) => {
    const search = document.getElementById('feeSearch').value;
    renderFees(e.target.value, search);
});

// ============================================================
// INIT
// ============================================================

showLoading(true);
setTimeout(() => {
    showLoading(false);
    navigateTo('dashboard');
}, 400);

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }
});
