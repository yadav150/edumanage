// ============================================================
// REPORTS & ANALYTICS – Charts + Dashboard
// ============================================================

function renderAnalytics() {
  const students = window.STUDENTS || [];
  const teachers = window.TEACHERS || [];
  const fees = window.FEE_RECORDS || [];
  const salary = window.SALARY_RECORDS || [];

  // Stats
  const totalStudents = students.length;
  const totalTeachers = teachers.filter(t => t.role === 'teacher').length;
  const totalStaff = teachers.filter(t => t.role === 'staff').length;
  const totalCollected = fees.reduce((sum, f) => sum + f.paid, 0);
  const totalPending = fees.reduce((sum, f) => sum + f.pending, 0);
  const overdue = fees.filter(f => f.status === 'overdue').length;
  const totalSalaryPaid = salary.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.amount, 0);
  const totalSalaryPending = salary.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.amount, 0);

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

  // Render charts (Chart.js)
  renderCharts(students, teachers, fees);
}

let chartInstances = {};

function renderCharts(students, teachers, fees) {
  // Destroy existing charts
  Object.values(chartInstances).forEach(chart => chart.destroy());
  chartInstances = {};

  // 1. Students per Class (Bar)
  const classCounts = {};
  students.forEach(s => { classCounts[s.class] = (classCounts[s.class] || 0) + 1; });
  const classes = Object.keys(classCounts).sort((a,b) => a-b);
  const counts = classes.map(c => classCounts[c]);
  const ctx1 = document.getElementById('chartStudentsByClass').getContext('2d');
  chartInstances.studentsByClass = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: classes.map(c => `Class ${c}`),
      datasets: [{ label: 'Students', data: counts, backgroundColor: 'rgba(59, 130, 246, 0.6)', borderColor: 'rgba(59, 130, 246, 1)', borderWidth: 1 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
  });

  // 2. Fee Collection Trend (Line)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const trendData = [5000, 7000, 6000, 9000, 8000, 12000]; // dummy; ideally from fees
  const ctx2 = document.getElementById('chartFeeTrend').getContext('2d');
  chartInstances.feeTrend = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{ label: 'Fee Collected (₹)', data: trendData, borderColor: 'rgb(59, 130, 246)', backgroundColor: 'rgba(59, 130, 246, 0.1)', tension: 0.3, fill: true }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
  });

  // 3. Fee Status (Pie)
  const paid = fees.filter(f => f.status === 'paid').length;
  const pending = fees.filter(f => f.status === 'pending').length;
  const overdueCount = fees.filter(f => f.status === 'overdue').length;
  const ctx3 = document.getElementById('chartFeeStatus').getContext('2d');
  chartInstances.feeStatus = new Chart(ctx3, {
    type: 'pie',
    data: {
      labels: ['Paid', 'Pending', 'Overdue'],
      datasets: [{ data: [paid, pending, overdueCount], backgroundColor: ['#22c55e', '#eab308', '#ef4444'], borderWidth: 1 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
  });

  // 4. Teacher vs Staff (Donut)
  const teacherCount = teachers.filter(t => t.role === 'teacher').length;
  const staffCount = teachers.filter(t => t.role === 'staff').length;
  const ctx4 = document.getElementById('chartTeacherStaff').getContext('2d');
  chartInstances.teacherStaff = new Chart(ctx4, {
    type: 'doughnut',
    data: {
      labels: ['Teachers', 'Staff'],
      datasets: [{ data: [teacherCount, staffCount], backgroundColor: ['#3b82f6', '#94a3b8'], borderWidth: 1 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
  });
}

// Export Analytics PDF/Excel
function exportAnalyticsPDF() {
  const element = document.getElementById('page-analytics');
  html2canvas(element, { scale: 2, useCORS: true, logging: false }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save('Analytics_Dashboard.pdf');
    showToast('PDF exported successfully', 'success');
  });
}

function exportAnalyticsExcel() {
  const students = window.STUDENTS || [];
  const teachers = window.TEACHERS || [];
  const fees = window.FEE_RECORDS || [];
  const salary = window.SALARY_RECORDS || [];
  const data = [
    ['Metric', 'Value'],
    ['Total Students', students.length],
    ['Total Teachers', teachers.filter(t => t.role === 'teacher').length],
    ['Total Staff', teachers.filter(t => t.role === 'staff').length],
    ['Fee Collected', fees.reduce((s,f) => s + f.paid, 0)],
    ['Pending Fees', fees.reduce((s,f) => s + f.pending, 0)],
    ['Overdue Records', fees.filter(f => f.status === 'overdue').length],
    ['Salary Paid', salary.filter(s => s.status === 'paid').reduce((s,rec) => s + rec.amount, 0)],
    ['Salary Pending', salary.filter(s => s.status === 'pending').reduce((s,rec) => s + rec.amount, 0)],
  ];
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Dashboard');
  XLSX.writeFile(wb, 'Analytics_Dashboard.xlsx');
  showToast('Excel exported successfully', 'success');
}

// Event bindings
document.getElementById('exportAnalyticsPdf').addEventListener('click', exportAnalyticsPDF);
document.getElementById('exportAnalyticsExcel').addEventListener('click', exportAnalyticsExcel);

// Filters (Apply/Reset)
document.getElementById('analyticsApplyBtn').addEventListener('click', () => renderAnalytics());
document.getElementById('analyticsResetBtn').addEventListener('click', () => {
  document.getElementById('analyticsYear').value = '2025';
  document.getElementById('analyticsStartDate').value = '';
  document.getElementById('analyticsEndDate').value = '';
  document.getElementById('analyticsClass').value = 'all';
  document.getElementById('analyticsStatus').value = 'all';
  renderAnalytics();
});

// Expose
window.renderAnalytics = renderAnalytics;
window.exportAnalyticsPDF = exportAnalyticsPDF;
window.exportAnalyticsExcel = exportAnalyticsExcel;
