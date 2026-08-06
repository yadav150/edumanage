// ============================================================
// DUMMY DATA
// ============================================================

let students = [
    { id: 1, name: 'Aarav Sharma', class: 10, section: 'A', roll: 12, feeStatus: 'paid', admissionNo: 'ADM001', mobile: '9876543210', guardian: 'Mr. Sharma', photo: '' },
    { id: 2, name: 'Priya Patel', class: 9, section: 'B', roll: 5, feeStatus: 'pending', admissionNo: 'ADM002', mobile: '9876543211', guardian: 'Mrs. Patel', photo: '' },
    { id: 3, name: 'Rohit Singh', class: 8, section: 'A', roll: 8, feeStatus: 'paid', admissionNo: 'ADM003', mobile: '9876543212', guardian: 'Mr. Singh', photo: '' },
    { id: 4, name: 'Sneha Reddy', class: 7, section: 'C', roll: 3, feeStatus: 'overdue', admissionNo: 'ADM004', mobile: '9876543213', guardian: 'Mr. Reddy', photo: '' },
    { id: 5, name: 'Vikram Joshi', class: 6, section: 'B', roll: 15, feeStatus: 'paid', admissionNo: 'ADM005', mobile: '9876543214', guardian: 'Mrs. Joshi', photo: '' },
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

// ===== PAYMENT HISTORY =====
let feePayments = [
    { id: 1, studentId: 1, receiptNo: 'RCP-2025-0001', date: '2025-01-15', month: 'January', amount: 5000, method: 'Cash', status: 'paid', feeType: 'Tuition' },
    { id: 2, studentId: 2, receiptNo: 'RCP-2025-0002', date: '2025-01-20', month: 'January', amount: 2000, method: 'Bank Transfer', status: 'pending', feeType: 'Tuition' },
    { id: 3, studentId: 3, receiptNo: 'RCP-2025-0003', date: '2025-02-01', month: 'February', amount: 5000, method: 'Cash', status: 'paid', feeType: 'Tuition' },
];

// ===== SALARY DATA =====
let salaryRecords = [
    { id: 1, employeeId: 1, employeeName: 'Dr. Anil Kumar', role: 'teacher', month: 'January', year: 2025, amount: 45000, status: 'paid', paymentMethod: 'Bank Transfer' },
    { id: 2, employeeId: 2, employeeName: 'Mrs. Sunita Rao', role: 'teacher', month: 'January', year: 2025, amount: 42000, status: 'pending', paymentMethod: '' },
    { id: 3, employeeId: 3, employeeName: 'Mr. Rajesh Gupta', role: 'staff', month: 'January', year: 2025, amount: 28000, status: 'paid', paymentMethod: 'Cash' },
    { id: 4, employeeId: 4, employeeName: 'Ms. Priya Menon', role: 'teacher', month: 'February', year: 2025, amount: 40000, status: 'paid', paymentMethod: 'Bank Transfer' },
    { id: 5, employeeId: 5, employeeName: 'Mr. Suresh Patel', role: 'staff', month: 'February', year: 2025, amount: 25000, status: 'pending', paymentMethod: '' },
    { id: 6, employeeId: 1, employeeName: 'Dr. Anil Kumar', role: 'teacher', month: 'February', year: 2025, amount: 45000, status: 'paid', paymentMethod: 'Bank Transfer' },
];

let activities = [
    { id: 1, text: 'Aarav Sharma paid tuition fee', time: '2 hours ago' },
    { id: 2, text: 'New student Rohit Singh added', time: '5 hours ago' },
    { id: 3, text: 'Fee reminder sent to Priya Patel', time: '1 day ago' },
    { id: 4, text: 'Staff member Suresh Patel updated', time: '2 days ago' },
    { id: 5, text: 'Salary paid to Dr. Anil Kumar for January', time: '3 days ago' },
];

let idCounter = {
    student: 6,
    staff: 6,
    fee: 7,
    salary: 7,
};

// ===== SCHOOL INFORMATION (for receipts) =====
const SCHOOL_INFO = {
    name: 'Morning Glory English Academy',
    address: 'Dikhlem Nepali Subba Gaon, West Karbi Anglong, Assam – 782248',
    code: 'MGEA/2025/001',
    phone: '+91 98765 43210',
    email: 'info@mgea.edu.in',
    website: 'www.mgea.edu.in'
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

    // Set up conditional logic for fee form (Others)
    if (title.includes('Fee')) {
        setTimeout(() => setupFeeConditionalLogic(), 50);
    }
    // Set up conditional logic for teacher form
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

function getEmployeeName(id) {
    const emp = teachers.find(t => t.id === id);
    return emp ? emp.name : 'Unknown';
}

function getEmployeeRole(id) {
    const emp = teachers.find(t => t.id === id);
    return emp ? emp.role : 'N/A';
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
        if (addDesignation.value === 'Subject Teacher') {
            addSubjectGroup.style.display = 'block';
        } else {
            addSubjectGroup.style.display = 'none';
        }
    }

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
        if (editDesignation.value === 'Subject Teacher') {
            editSubjectGroup.style.display = 'block';
        } else {
            editSubjectGroup.style.display = 'none';
        }
    }
}

// ============================================================
// FEE CONDITIONAL LOGIC (Others)
// ============================================================

function setupFeeConditionalLogic() {
    const addFeeType = document.getElementById('addFeeType');
    const addCustomGroup = document.getElementById('addCustomFeeGroup');
    if (addFeeType && addCustomGroup) {
        addFeeType.addEventListener('change', function() {
            if (this.value === 'Others') {
                addCustomGroup.style.display = 'block';
                addCustomGroup.style.animation = 'fadeIn 250ms ease';
            } else {
                addCustomGroup.style.display = 'none';
            }
        });
        if (addFeeType.value === 'Others') {
            addCustomGroup.style.display = 'block';
        } else {
            addCustomGroup.style.display = 'none';
        }
    }

    const editFeeType = document.getElementById('editFeeType');
    const editCustomGroup = document.getElementById('editCustomFeeGroup');
    if (editFeeType && editCustomGroup) {
        editFeeType.addEventListener('change', function() {
            if (this.value === 'Others') {
                editCustomGroup.style.display = 'block';
                editCustomGroup.style.animation = 'fadeIn 250ms ease';
            } else {
                editCustomGroup.style.display = 'none';
            }
        });
        if (editFeeType.value === 'Others') {
            editCustomGroup.style.display = 'block';
        } else {
            editCustomGroup.style.display = 'none';
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
        salary: 'Salary',
        analytics: 'Reports & Analytics',
    };
    pageTitle.textContent = titles[page] || 'Dashboard';

    switch (page) {
        case 'dashboard': renderDashboard(); break;
        case 'students': renderStudents(); break;
        case 'teachers': renderStaff(); break;
        case 'fees': renderFees(); initFeeModule(); break;
        case 'salary': renderSalary(); break;
        case 'analytics': renderAnalytics(); break;
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
    const totalSalaryPaid = salaryRecords.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.amount, 0);
    const totalSalaryPending = salaryRecords.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.amount, 0);

    const statsGrid = document.getElementById('statsGrid');
    statsGrid.innerHTML = `
        <div class="stat-card"><span class="stat-label">Total Students</span><span class="stat-value">${totalStudents}</span></div>
        <div class="stat-card"><span class="stat-label">Total Teachers</span><span class="stat-value">${totalTeachers}</span></div>
        <div class="stat-card"><span class="stat-label">Total Staff</span><span class="stat-value">${totalStaff}</span></div>
        <div class="stat-card"><span class="stat-label">Fee Collected</span><span class="stat-value">₹${totalCollected.toLocaleString()}</span></div>
        <div class="stat-card"><span class="stat-label">Pending Fees</span><span class="stat-value">₹${totalPending.toLocaleString()}</span></div>
        <div class="stat-card"><span class="stat-label">Salary Paid</span><span class="stat-value">₹${totalSalaryPaid.toLocaleString()}</span></div>
        <div class="stat-card"><span class="stat-label">Salary Pending</span><span class="stat-value">₹${totalSalaryPending.toLocaleString()}</span></div>
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
    const totalStudents = students.length;
    const paidCount = students.filter(s => s.feeStatus === 'paid').length;
    const pendingCount = students.filter(s => s.feeStatus === 'pending').length;
    const overdueCount = students.filter(s => s.feeStatus === 'overdue').length;

    document.getElementById('studentStatsGrid').innerHTML = `
        <div class="stat-card"><span class="stat-label">Total Students</span><span class="stat-value">${totalStudents}</span></div>
        <div class="stat-card"><span class="stat-label">Fee Paid</span><span class="stat-value">${paidCount}</span></div>
        <div class="stat-card"><span class="stat-label">Fee Pending</span><span class="stat-value">${pendingCount}</span></div>
        <div class="stat-card"><span class="stat-label">Overdue</span><span class="stat-value">${overdueCount}</span></div>
    `;

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
        <div class="form-group"><label>Name</label><input type="text" id="editStudentName" value="${student.name}" /></div>
        <div class="form-group"><label>Class</label><select id="editStudentClass">${classOptions}</select></div>
        <div class="form-group"><label>Section</label><select id="editStudentSection">${sectionOptions}</select></div>
        <div class="form-group"><label>Roll No</label><input type="number" id="editStudentRoll" value="${student.roll}" /></div>
        <div class="form-group"><label>Fee Status</label>
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

function showAddStudentModal() {
    const classOptions = Array.from({ length: 12 }, (_, i) => i + 1)
        .map(c => `<option value="${c}">Class ${c}</option>`).join('');

    const sectionOptions = ['A', 'B', 'C', 'NA']
        .map(sec => `<option value="${sec}">${sec}</option>`).join('');

    openModal('Add Student', `
        <div class="form-group"><label>Name</label><input type="text" id="addStudentName" placeholder="Full name" /></div>
        <div class="form-group"><label>Class</label><select id="addStudentClass">${classOptions}</select></div>
        <div class="form-group"><label>Section</label><select id="addStudentSection">${sectionOptions}</select></div>
        <div class="form-group"><label>Roll No</label><input type="number" id="addStudentRoll" placeholder="Roll number" /></div>
        <div class="form-group"><label>Fee Status</label>
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
    const totalTeachers = teachers.filter(t => t.role === 'teacher').length;
    const totalStaff = teachers.filter(t => t.role === 'staff').length;
    const totalEmployees = teachers.length;

    document.getElementById('staffStatsGrid').innerHTML = `
        <div class="stat-card"><span class="stat-label">Total Teachers</span><span class="stat-value">${totalTeachers}</span></div>
        <div class="stat-card"><span class="stat-label">Total Staff</span><span class="stat-value">${totalStaff}</span></div>
        <div class="stat-card"><span class="stat-label">Total Employees</span><span class="stat-value">${totalEmployees}</span></div>
    `;

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
        <div class="form-group"><label>Name</label><input type="text" id="editStaffName" value="${staff.name}" /></div>
        <div class="form-group"><label>Role</label>
            <select id="editStaffRole">
                <option value="teacher" ${staff.role === 'teacher' ? 'selected' : ''}>Teacher</option>
                <option value="staff" ${staff.role === 'staff' ? 'selected' : ''}>Staff</option>
            </select>
        </div>
        <div class="form-group"><label>Designation</label><select id="editStaffDesignation">${designationOptions}</select></div>
        <div class="form-group" id="editSubjectGroup" style="${staff.designation === 'Subject Teacher' ? 'display:block;' : 'display:none;'}">
            <label>Subject</label><select id="editStaffSubject">${subjectOptions}</select>
        </div>
        <div class="form-group"><label>Email</label><input type="email" id="editStaffEmail" value="${staff.email}" /></div>
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

function showAddStaffModal() {
    const designationOptions = ['Principal', 'Head Master', 'Assistant Teacher', 'Subject Teacher', 'Administration', 'Staff', 'Peon']
        .map(d => `<option value="${d}">${d}</option>`).join('');

    const subjectOptions = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science', 'Physical Education', 'Arts', 'Music', 'N/A']
        .map(s => `<option value="${s}">${s}</option>`).join('');

    openModal('Add Teacher / Staff', `
        <div class="form-group"><label>Name</label><input type="text" id="addStaffName" placeholder="Full name" /></div>
        <div class="form-group"><label>Role</label>
            <select id="addStaffRole">
                <option value="teacher">Teacher</option>
                <option value="staff">Staff</option>
            </select>
        </div>
        <div class="form-group"><label>Designation</label><select id="addStaffDesignation">${designationOptions}</select></div>
        <div class="form-group" id="addSubjectGroup" style="display:none;">
            <label>Subject</label><select id="addStaffSubject">${subjectOptions}</select>
        </div>
        <div class="form-group"><label>Email</label><input type="email" id="addStaffEmail" placeholder="email@school.com" /></div>
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
// FEE MANAGEMENT (UPGRADED)
// ============================================================

function renderFees(statusFilter = 'all', search = '', studentId = null, classFilter = 'all', sectionFilter = 'all', monthFilter = 'all', methodFilter = 'all', startDate = '', endDate = '') {
    const tbody = document.getElementById('feeTableBody');
    let list = feeRecords;

    if (statusFilter !== 'all') {
        list = list.filter(f => f.status === statusFilter);
    }
    if (studentId) {
        list = list.filter(f => f.studentId === studentId);
    } else if (search.trim()) {
        const q = search.trim().toLowerCase();
        list = list.filter(f => {
            const student = students.find(s => s.id === f.studentId);
            if (!student) return false;
            return student.name.toLowerCase().includes(q) ||
                   (student.admissionNo && student.admissionNo.toLowerCase().includes(q)) ||
                   (student.roll && student.roll.toString().includes(q)) ||
                   (student.mobile && student.mobile.includes(q)) ||
                   (student.guardian && student.guardian.toLowerCase().includes(q));
        });
    }
    if (classFilter !== 'all') {
        const classNum = parseInt(classFilter);
        list = list.filter(f => {
            const s = students.find(st => st.id === f.studentId);
            return s && s.class === classNum;
        });
    }
    if (sectionFilter !== 'all') {
        list = list.filter(f => {
            const s = students.find(st => st.id === f.studentId);
            return s && s.section === sectionFilter;
        });
    }

    list.sort((a, b) => {
        const nameA = students.find(s => s.id === a.studentId)?.name || '';
        const nameB = students.find(s => s.id === b.studentId)?.name || '';
        return nameA.localeCompare(nameB);
    });

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
                    <button class="btn-edit" onclick="showStudentDetail(${f.studentId})">View</button>
                    <button class="btn-primary" onclick="openCollectFeeModal(${f.studentId})" style="background:var(--primary); color:white; padding:0.2rem 0.6rem; border-radius:var(--radius); border:none; font-size:0.75rem;">Collect</button>
                    <div class="dropdown" style="display:inline-block; position:relative;">
                        <button class="btn-edit" onclick="toggleDropdown(this)" style="background:transparent; border:none; font-size:1.2rem;">⋮</button>
                        <div class="dropdown-content" style="display:none; position:absolute; right:0; background:white; box-shadow:var(--shadow-lg); border-radius:var(--radius); min-width:160px; z-index:10;">
                            <div onclick="showPaymentHistory(${f.studentId})" style="padding:0.5rem 1rem; cursor:pointer;">Payment History</div>
                            <div onclick="viewReceipt(${f.id})" style="padding:0.5rem 1rem; cursor:pointer;">View Receipt</div>
                            <div onclick="reprintReceipt(${f.id})" style="padding:0.5rem 1rem; cursor:pointer;">Reprint Receipt</div>
                            <div onclick="downloadReceiptPDF(${f.id})" style="padding:0.5rem 1rem; cursor:pointer;">Download PDF</div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    `}).join('');

    document.querySelectorAll('.dropdown .btn-edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.closest('.dropdown');
            const content = dropdown.querySelector('.dropdown-content');
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-content').forEach(el => el.style.display = 'none');
    });

    renderFeeAnalytics();
}

function renderFeeAnalytics() {
    const grid = document.getElementById('feeAnalyticsGrid');
    if (!grid) return;
    const today = new Date().toDateString();
    const todayCollection = feePayments.filter(p => new Date(p.date).toDateString() === today).reduce((sum, p) => sum + p.amount, 0);
    const monthCollection = feePayments.filter(p => new Date(p.date).getMonth() === new Date().getMonth()).reduce((sum, p) => sum + p.amount, 0);
    const annualCollection = feePayments.filter(p => new Date(p.date).getFullYear() === new Date().getFullYear()).reduce((sum, p) => sum + p.amount, 0);
    const pendingFees = feeRecords.reduce((sum, f) => sum + f.pending, 0);
    const totalReceipts = feePayments.length;

    grid.innerHTML = `
        <div class="stat-card"><span class="stat-label">Today's Collection</span><span class="stat-value">₹${todayCollection.toLocaleString()}</span></div>
        <div class="stat-card"><span class="stat-label">Monthly Collection</span><span class="stat-value">₹${monthCollection.toLocaleString()}</span></div>
        <div class="stat-card"><span class="stat-label">Annual Collection</span><span class="stat-value">₹${annualCollection.toLocaleString()}</span></div>
        <div class="stat-card"><span class="stat-label">Pending Fees</span><span class="stat-value">₹${pendingFees.toLocaleString()}</span></div>
        <div class="stat-card"><span class="stat-label">Total Receipts</span><span class="stat-value">${totalReceipts}</span></div>
    `;
}

function setupFeeSearch() {
    const input = document.getElementById('feeUniversalSearch');
    const suggestions = document.getElementById('feeSearchSuggestions');
    if (!input || !suggestions) return;

    input.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        if (query.length < 1) {
            suggestions.style.display = 'none';
            return;
        }
        const matched = students.filter(s =>
            s.name.toLowerCase().includes(query) ||
            (s.admissionNo && s.admissionNo.toLowerCase().includes(query)) ||
            (s.roll && s.roll.toString().includes(query)) ||
            (s.mobile && s.mobile.includes(query)) ||
            (s.guardian && s.guardian.toLowerCase().includes(query))
        );
        if (matched.length === 0) {
            suggestions.innerHTML = '<div class="suggestion-item">No results</div>';
        } else {
            suggestions.innerHTML = matched.map(s => `
                <div class="suggestion-item" data-id="${s.id}">
                    <strong>${s.name}</strong> (${s.admissionNo || 'N/A'}) – ${s.class}${s.section}
                </div>
            `).join('');
            suggestions.querySelectorAll('.suggestion-item').forEach(el => {
                el.addEventListener('click', function() {
                    const id = parseInt(this.dataset.id);
                    showStudentDetail(id);
                    input.value = students.find(s => s.id === id).name;
                    suggestions.style.display = 'none';
                    renderFees('all', '', id);
                });
            });
        }
        suggestions.style.display = 'block';
    });

    input.addEventListener('blur', () => {
        setTimeout(() => { suggestions.style.display = 'none'; }, 200);
    });
}

function showStudentDetail(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;
    const panel = document.getElementById('feeStudentDetail');
    if (!panel) return;
    const payments = feePayments.filter(p => p.studentId === id);
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    const lastPayment = payments.length ? payments[payments.length-1] : null;
    const feeRecordsForStudent = feeRecords.filter(f => f.studentId === id);
    const pendingTotal = feeRecordsForStudent.reduce((sum, f) => sum + f.pending, 0);

    panel.style.display = 'block';
    panel.innerHTML = `
        <div style="display:flex; gap:1.5rem; flex-wrap:wrap;">
            <div style="display:flex; gap:1rem; align-items:center;">
                <div class="student-avatar">${student.name.charAt(0)}</div>
                <div>
                    <h3 style="margin:0;">${student.name}</h3>
                    <p style="margin:0; color:var(--gray-500); font-size:0.9rem;">${student.admissionNo || 'N/A'} | Roll: ${student.roll}</p>
                </div>
            </div>
            <div style="flex:1; min-width:200px;">
                <div class="detail-grid">
                    <div class="label">Class & Section</div><div class="value">${student.class}${student.section}</div>
                    <div class="label">Guardian</div><div class="value">${student.guardian || 'N/A'}</div>
                    <div class="label">Total Paid</div><div class="value">₹${totalPaid.toLocaleString()}</div>
                    <div class="label">Pending Amount</div><div class="value">₹${pendingTotal.toLocaleString()}</div>
                    <div class="label">Last Payment</div><div class="value">${lastPayment ? new Date(lastPayment.date).toLocaleDateString() : 'N/A'}</div>
                </div>
            </div>
            <div style="display:flex; gap:0.5rem; align-items:center; margin-left:auto;">
                <button class="btn btn-primary" onclick="openCollectFeeModal(${id})">Collect Fee</button>
                <button class="btn btn-secondary" onclick="showPaymentHistory(${id})">Payment History</button>
                <button class="btn btn-secondary" onclick="printLastReceipt(${id})">Print Last Receipt</button>
            </div>
        </div>
        <div style="margin-top:1rem; border-top:1px solid var(--gray-200); padding-top:1rem;">
            <h4 style="margin:0 0 0.5rem 0;">Fee Structure</h4>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px,1fr)); gap:0.5rem;">
                ${feeRecordsForStudent.map(f => `
                    <div style="background:var(--gray-50); padding:0.5rem; border-radius:var(--radius);">
                        <div style="font-weight:600; font-size:0.9rem;">${f.feeType}</div>
                        <div style="font-size:0.85rem; color:var(--gray-600);">Amount: ₹${f.amount} | Paid: ₹${f.paid} | Pending: ₹${f.pending}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function openCollectFeeModal(studentId) {
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    const studentFees = feeRecords.filter(f => f.studentId === studentId);
    const totalFee = studentFees.reduce((sum, f) => sum + f.amount, 0);
    const pending = studentFees.reduce((sum, f) => sum + f.pending, 0);

    const modalHTML = `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
            <div>
                <div class="form-group"><label>Student</label><input type="text" value="${student.name}" disabled /></div>
                <div class="form-group"><label>Total Fee</label><input type="number" id="calcTotalFee" value="${totalFee}" disabled /></div>
                <div class="form-group"><label>Previous Balance</label><input type="number" id="calcPrevBalance" value="${pending}" disabled /></div>
                <div class="form-group"><label>Discount (₹)</label><input type="number" id="calcDiscount" value="0" oninput="updateFeeCalculator()" /></div>
                <div class="form-group"><label>Late Fine (₹)</label><input type="number" id="calcLateFine" value="0" oninput="updateFeeCalculator()" /></div>
            </div>
            <div>
                <div class="form-group"><label>Amount Received (₹)</label><input type="number" id="calcAmountReceived" value="${totalFee - pending}" oninput="updateFeeCalculator()" /></div>
                <div class="form-group"><label>Payment Method</label>
                    <select id="calcPaymentMethod">
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Digital Wallet">Digital Wallet</option>
                    </select>
                </div>
                <div class="form-group"><label>Remaining Balance</label><input type="number" id="calcRemaining" value="${pending}" disabled /></div>
                <div style="background:var(--gray-50); padding:0.75rem; border-radius:var(--radius); margin-top:0.5rem;">
                    <p><strong>Total Fee:</strong> <span id="calcDisplayTotal">${totalFee}</span></p>
                    <p><strong>Previous Balance:</strong> <span id="calcDisplayPrev">${pending}</span></p>
                    <p><strong>Discount:</strong> <span id="calcDisplayDiscount">0</span></p>
                    <p><strong>Late Fine:</strong> <span id="calcDisplayFine">0</span></p>
                    <p><strong>Amount Received:</strong> <span id="calcDisplayReceived">${totalFee - pending}</span></p>
                    <p><strong>Remaining:</strong> <span id="calcDisplayRemaining">${pending}</span></p>
                </div>
            </div>
        </div>
        <div style="margin-top:1rem;">
            <button class="btn btn-primary" onclick="processFeePayment(${studentId})">Process Payment</button>
        </div>
    `;
    openModal('Collect Fee', modalHTML, 'Cancel', () => { closeModal(); });
    window.updateFeeCalculator = function() {
        const totalFee = parseFloat(document.getElementById('calcTotalFee').value) || 0;
        const prevBalance = parseFloat(document.getElementById('calcPrevBalance').value) || 0;
        const discount = parseFloat(document.getElementById('calcDiscount').value) || 0;
        const lateFine = parseFloat(document.getElementById('calcLateFine').value) || 0;
        const received = parseFloat(document.getElementById('calcAmountReceived').value) || 0;
        const remaining = prevBalance + lateFine - discount - received;
        document.getElementById('calcRemaining').value = remaining.toFixed(2);
        document.getElementById('calcDisplayTotal').textContent = totalFee;
        document.getElementById('calcDisplayPrev').textContent = prevBalance;
        document.getElementById('calcDisplayDiscount').textContent = discount;
        document.getElementById('calcDisplayFine').textContent = lateFine;
        document.getElementById('calcDisplayReceived').textContent = received;
        document.getElementById('calcDisplayRemaining').textContent = remaining.toFixed(2);
    };
}

function processFeePayment(studentId) {
    const received = parseFloat(document.getElementById('calcAmountReceived').value) || 0;
    const method = document.getElementById('calcPaymentMethod').value;
    if (received <= 0) {
        showToast('Please enter a valid amount', 'error');
        return;
    }
    const newPayment = {
        id: idCounter.fee++,
        studentId: studentId,
        feeType: 'Payment',
        amount: received,
        paid: received,
        pending: 0,
        status: 'paid'
    };
    feeRecords.push(newPayment);

    const receiptNo = `RCP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    feePayments.push({
        id: feePayments.length + 1,
        studentId: studentId,
        receiptNo: receiptNo,
        date: new Date().toISOString().split('T')[0],
        month: new Date().toLocaleString('default', { month: 'long' }),
        amount: received,
        method: method,
        status: 'paid',
        feeType: 'Fee Payment'
    });

    showToast('Payment processed successfully! Receipt: ' + receiptNo, 'success');
    closeModal();
    renderFees();
    renderFeeAnalytics();
    showStudentDetail(studentId);
}

function showPaymentHistory(studentId) {
    const payments = feePayments.filter(p => p.studentId === studentId);
    if (payments.length === 0) {
        showToast('No payment history found', 'info');
        return;
    }
    const student = students.find(s => s.id === studentId);
    const rows = payments.map(p => `
        <tr>
            <td>${p.receiptNo}</td>
            <td>${new Date(p.date).toLocaleDateString()}</td>
            <td>${p.month}</td>
            <td>₹${p.amount}</td>
            <td>${p.method}</td>
            <td><span class="status-badge status-${p.status}">${p.status}</span></td>
            <td>
                <button class="btn-edit" onclick="viewReceipt(${p.id})">View</button>
                <button class="btn-receipt" onclick="reprintReceipt(${p.id})">Reprint</button>
                <button class="btn-edit" onclick="downloadReceiptPDF(${p.id})">PDF</button>
            </td>
        </tr>
    `).join('');

    openModal(`Payment History – ${student.name}`, `
        <div style="overflow-x:auto;">
            <table class="data-table">
                <thead><tr><th>Receipt No</th><th>Date</th><th>Month</th><th>Amount</th><th>Method</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `, 'Close', () => { closeModal(); });
}

function openBulkCollectModal() {
    openModal('Bulk Fee Collection', `
        <div class="form-group"><label>Class</label>
            <select id="bulkClass" style="width:100%; padding:0.5rem; border:1px solid var(--gray-200); border-radius:var(--radius);">
                ${Array.from({length:12}, (_,i) => i+1).map(c => `<option value="${c}">Class ${c}</option>`).join('')}
            </select>
        </div>
        <div class="form-group"><label>Section</label>
            <select id="bulkSection" style="width:100%; padding:0.5rem; border:1px solid var(--gray-200); border-radius:var(--radius);">
                <option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="NA">NA</option>
            </select>
        </div>
        <div class="form-group"><label>Fee Type</label><input type="text" id="bulkFeeType" placeholder="e.g., Tuition" style="width:100%; padding:0.5rem; border:1px solid var(--gray-200); border-radius:var(--radius);" /></div>
        <div class="form-group"><label>Amount (₹)</label><input type="number" id="bulkAmount" placeholder="5000" style="width:100%; padding:0.5rem; border:1px solid var(--gray-200); border-radius:var(--radius);" /></div>
        <button class="btn btn-primary" onclick="processBulkCollection()">Collect for All</button>
    `, 'Cancel', () => { closeModal(); });
}

function processBulkCollection() {
    const classVal = parseInt(document.getElementById('bulkClass').value);
    const section = document.getElementById('bulkSection').value;
    const feeType = document.getElementById('bulkFeeType').value.trim();
    const amount = parseFloat(document.getElementById('bulkAmount').value);
    if (!feeType || isNaN(amount) || amount <= 0) {
        showToast('Please fill all fields correctly', 'error');
        return;
    }
    const targetStudents = students.filter(s => s.class === classVal && s.section === section);
    targetStudents.forEach(s => {
        feeRecords.push({
            id: idCounter.fee++,
            studentId: s.id,
            feeType: feeType,
            amount: amount,
            paid: 0,
            pending: amount,
            status: 'pending'
        });
    });
    showToast(`Fee records added for ${targetStudents.length} students`, 'success');
    closeModal();
    renderFees();
    renderFeeAnalytics();
}

function applyFeeFilters() {
    const classFilter = document.getElementById('feeClassFilter').value;
    const sectionFilter = document.getElementById('feeSectionFilter').value;
    const statusFilter = document.getElementById('feeStatusFilter').value;
    const search = document.getElementById('feeUniversalSearch').value;
    renderFees(statusFilter, search, null, classFilter, sectionFilter);
}

function initFeeModule() {
    renderFeeAnalytics();
    setupFeeSearch();
    const applyBtn = document.getElementById('feeApplyFilters');
    if (applyBtn) applyBtn.addEventListener('click', applyFeeFilters);
    const resetBtn = document.getElementById('feeResetFilters');
    if (resetBtn) resetBtn.addEventListener('click', function() {
        document.getElementById('feeClassFilter').value = 'all';
        document.getElementById('feeSectionFilter').value = 'all';
        document.getElementById('feeStatusFilter').value = 'all';
        document.getElementById('feeUniversalSearch').value = '';
        renderFees();
    });
    const bulkBtn = document.getElementById('feeCollectBulkBtn');
    if (bulkBtn) bulkBtn.addEventListener('click', openBulkCollectModal);
}

// ============================================================
// RECEIPT FUNCTIONS (FULLY IMPLEMENTED)
// ============================================================

function generatePaymentReceiptHTML(payment, student) {
    if (!payment || !student) return '';

    const receiptNumber = payment.receiptNo || `RCP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const date = new Date(payment.date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    const statusClass = payment.status === 'paid' ? 'status-paid' : 'status-pending';
    const amountInWords = numberToWords(payment.amount);

    return `
        <div class="receipt-wrapper" id="receiptContent">
            <div class="school-header">
                <h2 class="school-name">${SCHOOL_INFO.name}</h2>
                <p class="school-address">${SCHOOL_INFO.address}</p>
                <p class="school-contact">
                    <strong>School Code:</strong> ${SCHOOL_INFO.code} &nbsp;|&nbsp;
                    <strong>Phone:</strong> ${SCHOOL_INFO.phone} &nbsp;|&nbsp;
                    <strong>Email:</strong> ${SCHOOL_INFO.email} &nbsp;|&nbsp;
                    <strong>Web:</strong> ${SCHOOL_INFO.website}
                </p>
            </div>
            <div class="receipt-title">
                <h3>Fee Receipt</h3>
                <span class="receipt-number"># ${receiptNumber}</span>
            </div>
            <div class="receipt-details-grid">
                <div><strong>Student:</strong> ${student.name}</div>
                <div><strong>Class:</strong> ${student.class}${student.section}</div>
                <div><strong>Fee Type:</strong> ${payment.feeType || 'Fee Payment'}</div>
                <div><strong>Date:</strong> ${date}</div>
                <div><strong>Amount:</strong> ₹${payment.amount.toLocaleString()}</div>
                <div><strong>Payment Method:</strong> ${payment.method || 'N/A'}</div>
                <div><strong>Month:</strong> ${payment.month || 'N/A'}</div>
                <div><strong>Status:</strong> <span class="status-badge ${statusClass}">${payment.status}</span></div>
            </div>
            <div style="padding:0.5rem 0; font-size:0.9rem; color:var(--gray-600);">
                <strong>Amount in Words:</strong> ${amountInWords}
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:0.5rem; padding-top:0.5rem; border-top:1px solid var(--gray-200);">
                <div style="text-align:center; width:30%;">
                    <div style="height:30px; border-bottom:1px solid var(--gray-400); margin-bottom:0.2rem;"></div>
                    <span style="font-size:0.7rem; color:var(--gray-500);">Authorized Signature</span>
                </div>
                <div style="text-align:center; width:30%;">
                    <div style="height:30px; border-bottom:1px solid var(--gray-400); margin-bottom:0.2rem;"></div>
                    <span style="font-size:0.7rem; color:var(--gray-500);">School Seal</span>
                </div>
                <div style="text-align:center; width:30%;">
                    <div style="height:30px; border:1px dashed var(--gray-300); border-radius:4px; display:flex; align-items:center; justify-content:center; margin-bottom:0.2rem;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                    <span style="font-size:0.7rem; color:var(--gray-500);">QR Code</span>
                </div>
            </div>
            <div class="receipt-footer" style="margin-top:0.5rem;">
                This is a system‑generated receipt. No signature required.
                <br />Thank you for your payment.
            </div>
        </div>
    `;
}

function numberToWords(num) {
    if (num === 0) return 'Zero';
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
        'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const crore = Math.floor(num / 10000000);
    const lakh = Math.floor((num % 10000000) / 100000);
    const thousand = Math.floor((num % 100000) / 1000);
    const hundred = Math.floor((num % 1000) / 100);
    const remainder = num % 100;

    let words = '';
    if (crore > 0) words += ones[crore] + ' Crore ';
    if (lakh > 0) words += ones[lakh] + ' Lakh ';
    if (thousand > 0) words += ones[thousand] + ' Thousand ';
    if (hundred > 0) words += ones[hundred] + ' Hundred ';
    if (remainder > 0) {
        if (remainder < 20) words += ones[remainder];
        else words += tens[Math.floor(remainder / 10)] + (remainder % 10 > 0 ? ' ' + ones[remainder % 10] : '');
    }
    return words.trim() + ' Rupees Only';
}

function viewReceipt(id) {
    const payment = feePayments.find(p => p.id === id);
    if (!payment) {
        showToast('Payment not found', 'error');
        return;
    }
    const student = students.find(s => s.id === payment.studentId);
    if (!student) {
        showToast('Student not found', 'error');
        return;
    }

    const receiptHTML = generatePaymentReceiptHTML(payment, student);

    openModal('Fee Receipt', `
        ${receiptHTML}
        <div class="receipt-actions" style="display:flex; gap:0.75rem; justify-content:flex-end; margin-top:0.75rem; border-top:1px solid var(--gray-200); padding-top:0.75rem;">
            <button onclick="downloadReceiptPDF(${id})" class="btn btn-primary" style="font-size:0.85rem; padding:0.4rem 1rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-right:4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
                Download PDF
            </button>
            <button onclick="reprintReceipt(${id})" class="btn btn-secondary" style="font-size:0.85rem; padding:0.4rem 1rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-right:4px;"><polyline points="6 9 6 2 18 2 18 9"/><path d="M18 9H6"/><path d="M18 5v4H6V5"/><rect x="6" y="13" width="12" height="8"/><path d="M18 17h-4"/><path d="M10 17h-2"/></svg>
                Print
            </button>
            <button onclick="closeModal()" class="btn btn-secondary" style="font-size:0.85rem; padding:0.4rem 1rem;">Close</button>
        </div>
    `, 'Close', () => { closeModal(); });

    modalConfirm.textContent = 'Close';
    modalCallback = () => { closeModal(); };
}

function reprintReceipt(id) {
    const payment = feePayments.find(p => p.id === id);
    if (!payment) {
        showToast('Payment not found', 'error');
        return;
    }
    const student = students.find(s => s.id === payment.studentId);
    if (!student) {
        showToast('Student not found', 'error');
        return;
    }

    const receiptHTML = generatePaymentReceiptHTML(payment, student);
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
        showToast('Please allow popups to print', 'error');
        return;
    }
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Fee Receipt</title>
            <link rel="stylesheet" href="style.css">
            <style>
                body { margin: 0; padding: 20px; background: white; font-family: Inter, sans-serif; }
                .receipt-wrapper { max-width: 700px; margin: 0 auto; }
                .receipt-actions { display: none !important; }
                @media print {
                    body { padding: 0; }
                    .receipt-actions { display: none !important; }
                }
            </style>
        </head>
        <body>
            ${receiptHTML}
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                    }, 500);
                };
            <\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
    showToast('Printing receipt...', 'success');
}

function downloadReceiptPDF(id) {
    const payment = feePayments.find(p => p.id === id);
    if (!payment) {
        showToast('Payment not found', 'error');
        return;
    }
    const student = students.find(s => s.id === payment.studentId);
    if (!student) {
        showToast('Student not found', 'error');
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            showToast('jsPDF library not loaded.', 'error');
            return;
        }

        const doc = new jsPDF('p', 'mm', 'a4');
        const pageWidth = 210;
        const margin = 15;
        let y = 20;

        const receiptNumber = payment.receiptNo || `RCP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
        const date = new Date(payment.date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        const statusClass = payment.status === 'paid' ? 'Paid' : 'Pending';
        const amountInWords = numberToWords(payment.amount);

        // School Header
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 41, 59);
        doc.text(SCHOOL_INFO.name, pageWidth / 2, y, { align: 'center' });
        y += 7;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(71, 85, 105);
        doc.text(SCHOOL_INFO.address, pageWidth / 2, y, { align: 'center' });
        y += 5;

        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text(`School Code: ${SCHOOL_INFO.code}  |  Phone: ${SCHOOL_INFO.phone}  |  Email: ${SCHOOL_INFO.email}  |  Web: ${SCHOOL_INFO.website}`, pageWidth / 2, y, { align: 'center' });
        y += 8;

        doc.setDrawColor(59, 130, 246);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
        y += 6;

        // Receipt Title
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(51, 65, 85);
        doc.text('Fee Receipt', margin, y);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 116, 139);
        doc.text(`# ${receiptNumber}`, pageWidth - margin, y, { align: 'right' });
        y += 8;

        // Fee Details
        const rows = [
            ['Student', student.name],
            ['Class', `${student.class}${student.section}`],
            ['Fee Type', payment.feeType || 'Fee Payment'],
            ['Date', date],
            ['Amount', `₹${payment.amount.toLocaleString()}`],
            ['Payment Method', payment.method || 'N/A'],
            ['Month', payment.month || 'N/A'],
            ['Status', statusClass]
        ];

        const col1X = margin;
        const col2X = 70;
        const rowHeight = 7;
        let rowY = y;

        doc.setFillColor(248, 250, 252);
        doc.rect(margin, rowY - 2, pageWidth - 2 * margin, rows.length * rowHeight + 4, 'F');

        rows.forEach((row, idx) => {
            const currentY = rowY + idx * rowHeight;
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(30, 41, 59);
            doc.text(row[0], col1X + 2, currentY + 5);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(51, 65, 85);
            doc.text(row[1], col2X, currentY + 5);

            if (row[0] === 'Status') {
                const statusColor = payment.status === 'paid' ? [34, 197, 94] : [234, 179, 8];
                doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
                doc.setTextColor(255, 255, 255);
                const textWidth = doc.getTextWidth(row[1]) + 4;
                const rectX = col2X - 1;
                const rectY = currentY + 1;
                doc.roundedRect(rectX, rectY, textWidth + 6, 6, 1.5, 1.5, 'F');
                doc.text(row[1], rectX + 3, currentY + 5);
            }
        });

        y = rowY + rows.length * rowHeight + 8;

        // Amount in Words
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(51, 65, 85);
        doc.text('Amount in Words:', margin, y);
        doc.setFont('helvetica', 'normal');
        doc.text(amountInWords, margin + 45, y);
        y += 8;

        // Signature & Seal
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.3);

        const sigX = margin;
        const sigW = (pageWidth - 2 * margin) / 3;
        const sealY = y + 5;

        doc.line(sigX, sealY, sigX + sigW - 5, sealY);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 116, 139);
        doc.text('Authorized Signature', sigX + 5, sealY + 5);

        doc.line(sigX + sigW, sealY, sigX + 2 * sigW - 5, sealY);
        doc.text('School Seal', sigX + sigW + 5, sealY + 5);

        doc.line(sigX + 2 * sigW, sealY, sigX + 3 * sigW - 5, sealY);
        doc.text('QR Code', sigX + 2 * sigW + 5, sealY + 5);

        y = sealY + 12;

        // Footer
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.3);
        doc.line(margin, y, pageWidth - margin, y);
        y += 5;

        doc.setFontSize(7);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(148, 163, 184);
        doc.text('This is a system‑generated receipt. No signature required.', pageWidth / 2, y, { align: 'center' });
        y += 4;
        doc.text('Thank you for your payment.', pageWidth / 2, y, { align: 'center' });

        const fileName = `Receipt_${student.name.replace(/\s/g, '_')}_${new Date().toISOString().slice(0,10)}.pdf`;
        doc.save(fileName);
        showToast('Receipt PDF downloaded successfully', 'success');
    } catch (error) {
        console.error('PDF download error:', error);
        showToast('Error downloading PDF: ' + error.message, 'error');
    }
}

function printLastReceipt(studentId) {
    const payments = feePayments.filter(p => p.studentId === studentId);
    if (payments.length === 0) {
        showToast('No payment history found for this student', 'info');
        return;
    }
    const latestPayment = payments.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    reprintReceipt(latestPayment.id);
}

// ============================================================
// ORIGINAL FEE FUNCTIONS (Add, Edit, Delete) – kept for compatibility
// ============================================================

function editFee(id) {
    const fee = feeRecords.find(f => f.id === id);
    if (!fee) return;

    const studentOptions = students.map(s => `<option value="${s.id}" ${s.id === fee.studentId ? 'selected' : ''}>${s.name}</option>`).join('');

    const predefined = ['Admission Fee', 'Monthly Fee', 'Annual Fee', 'Examination Fee', 'Others'];
    let selectedType = fee.feeType;
    let showOthers = false;
    let customValue = '';
    if (predefined.includes(selectedType)) {
        if (selectedType === 'Others') {
            showOthers = true;
        }
    } else {
        selectedType = 'Others';
        customValue = fee.feeType;
        showOthers = true;
    }

    const feeTypeOptions = ['Admission Fee', 'Monthly Fee', 'Annual Fee', 'Examination Fee', 'Others']
        .map(opt => `<option value="${opt}" ${opt === selectedType ? 'selected' : ''}>${opt}</option>`).join('');

    openModal('Edit Fee Record', `
        <div class="form-group"><label>Student</label><select id="editFeeStudent">${studentOptions}</select></div>
        <div class="form-group"><label>Fee Type</label><select id="editFeeType">${feeTypeOptions}</select></div>
        <div class="form-group" id="editCustomFeeGroup" style="${showOthers ? 'display:block;' : 'display:none;'}">
            <label>Custom Fee Description</label><input type="text" id="editCustomFee" placeholder="Enter custom fee description" value="${customValue}" />
        </div>
        <div class="form-group"><label>Amount (₹)</label><input type="number" id="editFeeAmount" value="${fee.amount}" /></div>
        <div class="form-group"><label>Paid (₹)</label><input type="number" id="editFeePaid" value="${fee.paid}" /></div>
        <div class="form-group"><label>Pending (₹)</label><input type="number" id="editFeePending" value="${fee.pending}" /></div>
        <div class="form-group"><label>Status</label>
            <select id="editFeeStatus">
                <option value="paid" ${fee.status === 'paid' ? 'selected' : ''}>Paid</option>
                <option value="pending" ${fee.status === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="overdue" ${fee.status === 'overdue' ? 'selected' : ''}>Overdue</option>
            </select>
        </div>
    `, 'Update', () => {
        const studentId = parseInt(document.getElementById('editFeeStudent').value);
        const feeTypeSelect = document.getElementById('editFeeType');
        const feeType = feeTypeSelect.value;
        let finalFeeType = feeType;
        if (feeType === 'Others') {
            const custom = document.getElementById('editCustomFee').value.trim();
            if (!custom) {
                showToast('Please enter a custom fee description', 'error');
                return;
            }
            finalFeeType = custom;
        }
        const amount = parseFloat(document.getElementById('editFeeAmount').value);
        const paid = parseFloat(document.getElementById('editFeePaid').value);
        const pending = parseFloat(document.getElementById('editFeePending').value);
        const status = document.getElementById('editFeeStatus').value;
        if (isNaN(amount) || isNaN(paid) || isNaN(pending)) {
            showToast('Please fill all numeric fields', 'error');
            return;
        }
        const idx = feeRecords.findIndex(f => f.id === id);
        if (idx !== -1) {
            feeRecords[idx] = { ...feeRecords[idx], studentId, feeType: finalFeeType, amount, paid, pending, status };
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
    const feeTypeOptions = ['Admission Fee', 'Monthly Fee', 'Annual Fee', 'Examination Fee', 'Others']
        .map(opt => `<option value="${opt}">${opt}</option>`).join('');

    openModal('Add Fee Record', `
        <div class="form-group"><label>Student</label><select id="addFeeStudent">${studentOptions}</select></div>
        <div class="form-group"><label>Fee Type</label><select id="addFeeType">${feeTypeOptions}</select></div>
        <div class="form-group" id="addCustomFeeGroup" style="display:none;">
            <label>Custom Fee Description</label><input type="text" id="addCustomFee" placeholder="Enter custom fee description" />
        </div>
        <div class="form-group"><label>Amount (₹)</label><input type="number" id="addFeeAmount" placeholder="5000" /></div>
        <div class="form-group"><label>Paid (₹)</label><input type="number" id="addFeePaid" placeholder="0" /></div>
        <div class="form-group"><label>Pending (₹)</label><input type="number" id="addFeePending" placeholder="0" /></div>
        <div class="form-group"><label>Status</label>
            <select id="addFeeStatus">
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
            </select>
        </div>
    `, 'Add Fee', () => {
        const studentId = parseInt(document.getElementById('addFeeStudent').value);
        const feeTypeSelect = document.getElementById('addFeeType');
        const feeType = feeTypeSelect.value;
        let finalFeeType = feeType;
        if (feeType === 'Others') {
            const custom = document.getElementById('addCustomFee').value.trim();
            if (!custom) {
                showToast('Please enter a custom fee description', 'error');
                return;
            }
            finalFeeType = custom;
        }
        const amount = parseFloat(document.getElementById('addFeeAmount').value);
        const paid = parseFloat(document.getElementById('addFeePaid').value) || 0;
        const pending = parseFloat(document.getElementById('addFeePending').value) || 0;
        const status = document.getElementById('addFeeStatus').value;
        if (isNaN(amount)) {
            showToast('Please enter a valid amount', 'error');
            return;
        }
        const newFee = {
            id: idCounter.fee++,
            studentId,
            feeType: finalFeeType,
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
// SALARY MODULE
// ============================================================

function renderSalary(statusFilter = 'all', search = '') {
    const tbody = document.getElementById('salaryTableBody');
    let list = salaryRecords;

    if (statusFilter !== 'all') {
        list = list.filter(s => s.status === statusFilter);
    }
    if (search.trim()) {
        const q = search.trim().toLowerCase();
        list = list.filter(s => s.employeeName.toLowerCase().includes(q));
    }

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
        btn.addEventListener('click', () => editSalary(parseInt(btn.dataset.id)));
    });
    tbody.querySelectorAll('[data-action="deleteSalary"]').forEach(btn => {
        btn.addEventListener('click', () => deleteSalary(parseInt(btn.dataset.id)));
    });

    const totalPaid = salaryRecords.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.amount, 0);
    const totalPending = salaryRecords.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.amount, 0);
    const totalRecords = salaryRecords.length;

    document.getElementById('salaryStatsGrid').innerHTML = `
        <div class="stat-card"><span class="stat-label">Total Salary Paid</span><span class="stat-value">₹${totalPaid.toLocaleString()}</span></div>
        <div class="stat-card"><span class="stat-label">Total Salary Pending</span><span class="stat-value">₹${totalPending.toLocaleString()}</span></div>
        <div class="stat-card"><span class="stat-label">Total Records</span><span class="stat-value">${totalRecords}</span></div>
    `;
}

function showAddSalaryModal() {
    const employeeOptions = teachers.map(t =>
        `<option value="${t.id}">${t.name} (${t.role})</option>`
    ).join('');

    const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        .map(m => `<option value="${m}">${m}</option>`).join('');

    const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i)
        .map(y => `<option value="${y}">${y}</option>`).join('');

    const paymentMethodOptions = ['Bank Transfer', 'Cash', 'Cheque', 'Digital Wallet']
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
                <option value="">— Select —</option>
                ${paymentMethodOptions}
            </select>
        </div>
    `, 'Add Salary', () => {
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

        const employee = teachers.find(t => t.id === employeeId);
        if (!employee) {
            showToast('Employee not found', 'error');
            return;
        }

        const newSalary = {
            id: idCounter.salary++,
            employeeId,
            employeeName: employee.name,
            role: employee.role,
            month,
            year,
            amount,
            status,
            paymentMethod: status === 'paid' ? paymentMethod : '',
        };
        salaryRecords.push(newSalary);
        showToast('Salary record added successfully', 'success');
        renderSalary();
        renderDashboard();
        closeModal();
    });
}

function editSalary(id) {
    const salary = salaryRecords.find(s => s.id === id);
    if (!salary) return;

    const employeeOptions = teachers.map(t =>
        `<option value="${t.id}" ${t.id === salary.employeeId ? 'selected' : ''}>${t.name} (${t.role})</option>`
    ).join('');

    const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        .map(m => `<option value="${m}" ${m === salary.month ? 'selected' : ''}>${m}</option>`).join('');

    const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i)
        .map(y => `<option value="${y}" ${y === salary.year ? 'selected' : ''}>${y}</option>`).join('');

    const paymentMethodOptions = ['Bank Transfer', 'Cash', 'Cheque', 'Digital Wallet']
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
                <option value="">— Select —</option>
                ${paymentMethodOptions}
            </select>
        </div>
    `, 'Update', () => {
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

        const employee = teachers.find(t => t.id === employeeId);
        if (!employee) {
            showToast('Employee not found', 'error');
            return;
        }

        const idx = salaryRecords.findIndex(s => s.id === id);
        if (idx !== -1) {
            salaryRecords[idx] = {
                ...salaryRecords[idx],
                employeeId,
                employeeName: employee.name,
                role: employee.role,
                month,
                year,
                amount,
                status,
                paymentMethod: status === 'paid' ? paymentMethod : '',
            };
            showToast('Salary record updated successfully', 'success');
            renderSalary();
            renderDashboard();
            closeModal();
        }
    });
}

function deleteSalary(id) {
    if (confirm('Are you sure you want to delete this salary record?')) {
        salaryRecords = salaryRecords.filter(s => s.id !== id);
        showToast('Salary record deleted', 'success');
        renderSalary();
        renderDashboard();
    }
}

// ============================================================
// REPORTS & ANALYTICS
// ============================================================

let chartInstances = {};

function renderAnalytics() {
    const totalStudents = students.length;
    const totalTeachers = teachers.filter(t => t.role === 'teacher').length;
    const totalStaff = teachers.filter(t => t.role === 'staff').length;
    const totalCollected = feeRecords.reduce((sum, f) => sum + f.paid, 0);
    const totalPending = feeRecords.reduce((sum, f) => sum + f.pending, 0);
    const overdue = feeRecords.filter(f => f.status === 'overdue').length;
    const totalSalaryPaid = salaryRecords.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.amount, 0);
    const totalSalaryPending = salaryRecords.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.amount, 0);

    document.getElementById('analyticsStatsGrid').innerHTML = `
        <div class="stat-card"><span class="stat-label">Total Students</span><span class="stat-value">${totalStudents}</span></div>
        <div class="stat-card"><span class="stat-label">Total Teachers</span><span class="stat-value">${totalTeachers}</span></div>
        <div class="stat-card"><span class="stat-label">Total Staff</span><span class="stat-value">${totalStaff}</span></div>
        <div class="stat-card"><span class="stat-label">Fee Collected</span><span class="stat-value">₹${totalCollected.toLocaleString()}</span></div>
        <div class="stat-card"><span class="stat-label">Pending Fees</span><span class="stat-value">₹${totalPending.toLocaleString()}</span></div>
        <div class="stat-card"><span class="stat-label">Overdue</span><span class="stat-value">${overdue}</span></div>
        <div class="stat-card"><span class="stat-label">Salary Paid</span><span class="stat-value">₹${totalSalaryPaid.toLocaleString()}</span></div>
        <div class="stat-card"><span class="stat-label">Salary Pending</span><span class="stat-value">₹${totalSalaryPending.toLocaleString()}</span></div>
    `;

    renderCharts();
}

function renderCharts() {
    Object.values(chartInstances).forEach(chart => chart.destroy());
    chartInstances = {};

    // 1. Students per Class
    const classCounts = {};
    students.forEach(s => { classCounts[s.class] = (classCounts[s.class] || 0) + 1; });
    const classes = Object.keys(classCounts).sort((a, b) => a - b);
    const counts = classes.map(c => classCounts[c]);

    const ctx1 = document.getElementById('chartStudentsByClass').getContext('2d');
    chartInstances.studentsByClass = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: classes.map(c => `Class ${c}`),
            datasets: [{
                label: 'Students',
                data: counts,
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });

    // 2. Fee Collection Trend (dummy months)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const trendData = [5000, 7000, 6000, 9000, 8000, 12000];
    const ctx2 = document.getElementById('chartFeeTrend').getContext('2d');
    chartInstances.feeTrend = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Fee Collected (₹)',
                data: trendData,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });

    // 3. Fee Status Distribution
    const paid = feeRecords.filter(f => f.status === 'paid').length;
    const pending = feeRecords.filter(f => f.status === 'pending').length;
    const overdueCount = feeRecords.filter(f => f.status === 'overdue').length;
    const ctx3 = document.getElementById('chartFeeStatus').getContext('2d');
    chartInstances.feeStatus = new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: ['Paid', 'Pending', 'Overdue'],
            datasets: [{
                data: [paid, pending, overdueCount],
                backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
                borderWidth: 1
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    });

    // 4. Teacher vs Staff
    const teacherCount = teachers.filter(t => t.role === 'teacher').length;
    const staffCount = teachers.filter(t => t.role === 'staff').length;
    const ctx4 = document.getElementById('chartTeacherStaff').getContext('2d');
    chartInstances.teacherStaff = new Chart(ctx4, {
        type: 'doughnut',
        data: {
            labels: ['Teachers', 'Staff'],
            datasets: [{
                data: [teacherCount, staffCount],
                backgroundColor: ['#3b82f6', '#94a3b8'],
                borderWidth: 1
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
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
            case 'addSalary': showAddSalaryModal(); break;
            case 'viewFees': navigateTo('fees'); break;
        }
    });
});

document.getElementById('addStudentBtn').addEventListener('click', showAddStudentModal);
document.getElementById('addStaffBtn').addEventListener('click', showAddStaffModal);
document.getElementById('addFeeBtn').addEventListener('click', showAddFeeModal);
document.getElementById('addSalaryBtn').addEventListener('click', showAddSalaryModal);

// Student search & filter
document.getElementById('studentSearch').addEventListener('input', (e) => {
    const filter = document.getElementById('studentFilter').value;
    renderStudents(filter, e.target.value);
});
document.getElementById('studentFilter').addEventListener('change', (e) => {
    const search = document.getElementById('studentSearch').value;
    renderStudents(e.target.value, search);
});

// Staff search & filter
document.getElementById('staffSearch').addEventListener('input', (e) => {
    const filter = document.getElementById('staffFilter').value;
    renderStaff(filter, e.target.value);
});
document.getElementById('staffFilter').addEventListener('change', (e) => {
    const search = document.getElementById('staffSearch').value;
    renderStaff(e.target.value, search);
});

// Fee search & filter
document.getElementById('feeSearch').addEventListener('input', (e) => {
    const filter = document.getElementById('feeFilter').value;
    renderFees(filter, e.target.value);
});
document.getElementById('feeFilter').addEventListener('change', (e) => {
    const search = document.getElementById('feeSearch').value;
    renderFees(e.target.value, search);
});

// Salary search & filter
document.getElementById('salarySearch').addEventListener('input', (e) => {
    const status = document.getElementById('salaryFilter').value;
    renderSalary(status, e.target.value);
});
document.getElementById('salaryFilter').addEventListener('change', (e) => {
    const search = document.getElementById('salarySearch').value;
    renderSalary(e.target.value, search);
});

// Analytics filters
document.getElementById('analyticsApplyBtn').addEventListener('click', () => {
    renderAnalytics();
});
document.getElementById('analyticsResetBtn').addEventListener('click', () => {
    document.getElementById('analyticsYear').value = '2025';
    document.getElementById('analyticsStartDate').value = '';
    document.getElementById('analyticsEndDate').value = '';
    document.getElementById('analyticsClass').value = 'all';
    document.getElementById('analyticsStatus').value = 'all';
    renderAnalytics();
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
