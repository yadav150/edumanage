// ============================================================
// CORE – Navigation, Modal, Toast, Loading
// ============================================================

import { getCurrentUser, getAllData } from './firebase.js';

// DOM refs
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const sidebarClose = document.getElementById('sidebarClose');
const pageTitle = document.getElementById('pageTitle');
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
// TOAST & LOADING
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

// ============================================================
// MODAL
// ============================================================

function openModal(title, bodyHTML, confirmText = 'Confirm', callback) {
  modalTitle.textContent = title;
  modalBody.innerHTML = bodyHTML;
  modalConfirm.textContent = confirmText;
  modalCallback = callback;
  modalOverlay.classList.add('active');
}

function closeModal() {
  modalOverlay.classList.remove('active');
  modalCallback = null;
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

  // Load the module's render function (imported from separate files)
  switch (page) {
    case 'dashboard': renderDashboard(); break;
    case 'students': renderStudents(); break;
    case 'teachers': renderStaff(); break;
    case 'fees': renderFees(); break;
    case 'salary': renderSalary(); break;
    case 'analytics': renderAnalytics(); break;
  }

  if (window.innerWidth < 1024) {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }
}

// ============================================================
// SIDEBAR TOGGLE
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

// ============================================================
// MODAL EVENTS
// ============================================================

modalClose.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
modalConfirm.addEventListener('click', () => {
  if (modalCallback) modalCallback();
});

// ============================================================
// INIT – Check Auth & Load Data
// ============================================================

document.addEventListener('DOMContentLoaded', async function() {
  showLoading(true);
  const user = await getCurrentUser();
  if (!user) {
    // Show login modal or redirect
    showToast('Please log in as admin', 'info');
    // Optionally, you could open a login modal here.
  }
  // Load all data from Firebase
  await loadAllData();
  showLoading(false);
  navigateTo('dashboard');
});

// ============================================================
// GLOBAL DATA STORE (replaced dummy arrays)
// ============================================================

window.STUDENTS = [];
window.TEACHERS = [];
window.FEE_RECORDS = [];
window.SALARY_RECORDS = [];
window.PAYMENTS = [];
window.ACTIVITIES = [];

async function loadAllData() {
  try {
    const [students, teachers, fees, salary, payments, activities] = await Promise.all([
      getAllData('students'),
      getAllData('teachers'),
      getAllData('feeRecords'),
      getAllData('salaryRecords'),
      getAllData('payments'),
      getAllData('activities'),
    ]);
    window.STUDENTS = students;
    window.TEACHERS = teachers;
    window.FEE_RECORDS = fees;
    window.SALARY_RECORDS = salary;
    window.PAYMENTS = payments;
    window.ACTIVITIES = activities;
  } catch (error) {
    console.error('Error loading data:', error);
    showToast('Error loading data', 'error');
  }
}

// ============================================================
// EXPOSE GLOBALS FOR OTHER MODULES
// ============================================================

window.showToast = showToast;
window.openModal = openModal;
window.closeModal = closeModal;
window.showLoading = showLoading;
window.navigateTo = navigateTo;
window.loadAllData = loadAllData;
window.STUDENTS = window.STUDENTS;
window.TEACHERS = window.TEACHERS;
window.FEE_RECORDS = window.FEE_RECORDS;
window.SALARY_RECORDS = window.SALARY_RECORDS;
window.PAYMENTS = window.PAYMENTS;
window.ACTIVITIES = window.ACTIVITIES;
