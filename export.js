// ============================================================
// EXPORT MODULE (PDF & Excel)
// ============================================================

// Load CDN libraries (assumed already included in HTML)
// jsPDF and XLSX are globally available

document.addEventListener('DOMContentLoaded', function() {
    // Attach click listeners to all export buttons
    document.querySelectorAll('.btn-export').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const module = this.dataset.module;
            const type = this.dataset.export;
            exportData(module, type);
        });
    });
});

function exportData(module, type) {
    // Get current filter values from the UI
    let filterValue = 'all';
    let searchValue = '';
    let monthValue = null;

    switch (module) {
        case 'students':
            filterValue = document.getElementById('studentFilter')?.value || 'all';
            searchValue = document.getElementById('studentSearch')?.value || '';
            break;
        case 'teachers':
            filterValue = document.getElementById('staffFilter')?.value || 'all';
            searchValue = document.getElementById('staffSearch')?.value || '';
            break;
        case 'fees':
            filterValue = document.getElementById('feeFilter')?.value || 'all';
            searchValue = document.getElementById('feeSearch')?.value || '';
            break;
        case 'salary':
            filterValue = document.getElementById('salaryFilter')?.value || 'all';
            searchValue = document.getElementById('salarySearch')?.value || '';
            // Note: month filter removed for consistency
            break;
        default:
            return;
    }

    // Get filtered data
    const data = getFilteredData(module, filterValue, searchValue, monthValue);

    if (data.length === 0) {
        alert('No data to export based on current filters.');
        return;
    }

    // Generate filename
    const now = new Date();
    const dateStr = now.toISOString().slice(0,10);
    const fileName = `${module}_${dateStr}`;

    if (type === 'pdf') {
        exportToPDF(module, data, fileName);
    } else if (type === 'excel') {
        exportToExcel(module, data, fileName);
    }
}

function getFilteredData(module, filterValue, searchValue, monthValue) {
    // Access global data arrays
    let data = [];
    switch (module) {
        case 'students':
            data = students;
            // Apply class filter if not 'all'
            if (filterValue !== 'all') {
                data = data.filter(s => s.class === parseInt(filterValue));
            }
            // Apply search
            if (searchValue.trim()) {
                const q = searchValue.trim().toLowerCase();
                data = data.filter(s => s.name.toLowerCase().includes(q));
            }
            break;

        case 'teachers':
            data = teachers;
            if (filterValue !== 'all') {
                data = data.filter(t => t.role === filterValue);
            }
            if (searchValue.trim()) {
                const q = searchValue.trim().toLowerCase();
                data = data.filter(t => t.name.toLowerCase().includes(q) || t.subDepartment.toLowerCase().includes(q) || t.email.toLowerCase().includes(q));
            }
            break;

        case 'fees':
            data = feeRecords;
            if (filterValue !== 'all') {
                data = data.filter(f => f.status === filterValue);
            }
            if (searchValue.trim()) {
                const q = searchValue.trim().toLowerCase();
                data = data.filter(f => getStudentName(f.studentId).toLowerCase().includes(q));
            }
            break;

        case 'salary':
            data = salaryRecords;
            if (filterValue !== 'all') {
                data = data.filter(s => s.status === filterValue);
            }
            if (searchValue.trim()) {
                const q = searchValue.trim().toLowerCase();
                data = data.filter(s => s.employeeName.toLowerCase().includes(q));
            }
            // No month filter for consistency
            break;

        default:
            data = [];
    }
    return data;
}

// ============================================================
// PDF Export (using jsPDF + autoTable)
// ============================================================

function exportToPDF(module, data, fileName) {
    // Dynamically load jsPDF and autoTable if not already loaded
    // (assume we have included them via CDN in HTML)
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape', 'mm', 'a4');

    // Define columns and rows based on module
    let headers = [];
    let rows = [];
    let title = '';

    switch (module) {
        case 'students':
            title = 'Student List';
            headers = ['#', 'Name', 'Class', 'Section', 'Roll No', 'Fee Status'];
            rows = data.map((s, idx) => [idx+1, s.name, s.class, s.section, s.roll, s.feeStatus]);
            break;
        case 'teachers':
            title = 'Teachers & Staff';
            headers = ['#', 'Name', 'Role', 'Designation', 'Sub-Department', 'Email'];
            rows = data.map((t, idx) => [idx+1, t.name, t.role, t.designation, t.subDepartment, t.email]);
            break;
        case 'fees':
            title = 'Fee Records';
            headers = ['#', 'Student', 'Class', 'Fee Type', 'Amount', 'Paid', 'Pending', 'Status'];
            rows = data.map((f, idx) => {
                const studentName = getStudentName(f.studentId);
                const studentClass = getStudentClass(f.studentId);
                return [idx+1, studentName, studentClass, f.feeType, f.amount, f.paid, f.pending, f.status];
            });
            break;
        case 'salary':
            title = 'Salary Records';
            headers = ['#', 'Employee', 'Role', 'Month', 'Year', 'Amount', 'Status', 'Payment Method'];
            rows = data.map((s, idx) => [idx+1, s.employeeName, s.role, s.month, s.year, s.amount, s.status, s.paymentMethod || '—']);
            break;
        default:
            return;
    }

    doc.setFontSize(18);
    doc.text(title, 14, 22);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    doc.autoTable({
        head: [headers],
        body: rows,
        startY: 35,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [59, 130, 246], textColor: 255, fontSize: 8, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 247, 250] },
        margin: { left: 10, right: 10 },
        tableWidth: 'auto',
    });

    doc.save(`${fileName}.pdf`);
    showToast('PDF exported successfully', 'success');
}

// ============================================================
// Excel Export (using SheetJS / XLSX)
// ============================================================

function exportToExcel(module, data, fileName) {
    const XLSX = window.XLSX;

    // Prepare data for worksheet
    let wsData = [];
    let headers = [];

    switch (module) {
        case 'students':
            headers = ['#', 'Name', 'Class', 'Section', 'Roll No', 'Fee Status'];
            wsData = data.map((s, idx) => [idx+1, s.name, s.class, s.section, s.roll, s.feeStatus]);
            break;
        case 'teachers':
            headers = ['#', 'Name', 'Role', 'Designation', 'Sub-Department', 'Email'];
            wsData = data.map((t, idx) => [idx+1, t.name, t.role, t.designation, t.subDepartment, t.email]);
            break;
        case 'fees':
            headers = ['#', 'Student', 'Class', 'Fee Type', 'Amount', 'Paid', 'Pending', 'Status'];
            wsData = data.map((f, idx) => {
                const studentName = getStudentName(f.studentId);
                const studentClass = getStudentClass(f.studentId);
                return [idx+1, studentName, studentClass, f.feeType, f.amount, f.paid, f.pending, f.status];
            });
            break;
        case 'salary':
            headers = ['#', 'Employee', 'Role', 'Month', 'Year', 'Amount', 'Status', 'Payment Method'];
            wsData = data.map((s, idx) => [idx+1, s.employeeName, s.role, s.month, s.year, s.amount, s.status, s.paymentMethod || '—']);
            break;
        default:
            return;
    }

    // Combine headers and rows
    const fullData = [headers, ...wsData];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(fullData);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
    showToast('Excel exported successfully', 'success');
}
