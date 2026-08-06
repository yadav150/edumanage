// ============================================================
// DUMMY DATA (standalone)
// ============================================================

const students = [
    { id: 1, name: 'Aarav Sharma', class: 10, section: 'A', roll: 12, feeStatus: 'paid', admissionNo: '2024-001' },
    { id: 2, name: 'Priya Patel', class: 9, section: 'B', roll: 5, feeStatus: 'pending', admissionNo: '2024-002' },
    { id: 3, name: 'Rohit Singh', class: 8, section: 'A', roll: 8, feeStatus: 'paid', admissionNo: '2024-003' },
    { id: 4, name: 'Sneha Reddy', class: 7, section: 'C', roll: 3, feeStatus: 'overdue', admissionNo: '2024-004' },
    { id: 5, name: 'Vikram Joshi', class: 6, section: 'B', roll: 15, feeStatus: 'paid', admissionNo: '2024-005' },
];

const feeRecords = [
    { id: 1, studentId: 1, feeType: 'Tuition', amount: 5000, paid: 5000, pending: 0, status: 'paid' },
    { id: 2, studentId: 2, feeType: 'Tuition', amount: 5000, paid: 2000, pending: 3000, status: 'pending' },
    { id: 3, studentId: 3, feeType: 'Tuition', amount: 5000, paid: 5000, pending: 0, status: 'paid' },
    { id: 4, studentId: 4, feeType: 'Tuition', amount: 5000, paid: 1000, pending: 4000, status: 'overdue' },
    { id: 5, studentId: 5, feeType: 'Tuition', amount: 5000, paid: 5000, pending: 0, status: 'paid' },
    { id: 6, studentId: 2, feeType: 'Library', amount: 500, paid: 0, pending: 500, status: 'pending' },
];

const parentDetails = {
    1: { name: 'Mr. Rajesh Sharma', phone: '9876543210', email: 'rajesh@email.com' },
    2: { name: 'Mrs. Meena Patel', phone: '9876543211', email: 'meena@email.com' },
    3: { name: 'Mr. Suresh Singh', phone: '9876543212', email: 'suresh@email.com' },
    4: { name: 'Mr. Naveen Reddy', phone: '9876543213', email: 'naveen@email.com' },
    5: { name: 'Mrs. Kavita Joshi', phone: '9876543214', email: 'kavita@email.com' },
};

// ============================================================
// UTILITY: Number to words
// ============================================================

function numberToWords(num) {
    if (num === 0) return 'Zero';
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    function convert(n) {
        if (n < 10) return ones[n];
        if (n < 20) return teens[n - 10];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
        if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + convert(n % 100) : '');
        if (n < 100000) return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + convert(n % 1000) : '');
        if (n < 10000000) return convert(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + convert(n % 100000) : '');
        return convert(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + convert(n % 10000000) : '');
    }

    return convert(num) + ' Rupees Only';
}

// ============================================================
// RENDER RECEIPT
// ============================================================

function renderReceipt(studentId, feeId) {
    const student = students.find(s => s.id === studentId);
    if (!student) {
        document.getElementById('receiptWrapper').innerHTML = '<p style="color:red;">Student not found.</p>';
        return;
    }

    const fee = feeRecords.find(f => f.id === feeId);
    if (!fee) {
        document.getElementById('receiptWrapper').innerHTML = '<p style="color:red;">Fee record not found.</p>';
        return;
    }

    const parent = parentDetails[studentId] || { name: 'N/A', phone: 'N/A', email: 'N/A' };

    const receiptNo = `RCPT-${String(studentId).padStart(4, '0')}-${String(feeId).padStart(4, '0')}`;
    const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const session = '2024-2025';
    const amountWords = numberToWords(fee.amount);

    const feeRows = `
        <tr>
            <td>${fee.feeType}</td>
            <td class="text-right">₹${fee.amount.toFixed(2)}</td>
            <td class="text-right">₹${fee.paid.toFixed(2)}</td>
            <td class="text-right">₹${fee.pending.toFixed(2)}</td>
        </tr>
    `;

    const wrapper = document.getElementById('receiptWrapper');
    wrapper.innerHTML = `
        <div class="receipt-header">
            <div class="school-name">Morning Glory English Academy</div>
            <div class="school-address">Dikhlem Nepali Subba Gaon, West Karbi Anglong, Assam – 782248</div>
            <div class="school-details">
                <span>Phone: +91-12345-67890</span>
                <span>Email: info@morningglory.edu.in</span>
                <span>Website: www.morningglory.edu.in</span>
                <span>School Code: MGEA/2024</span>
            </div>
            <div class="receipt-title">Fee Receipt</div>
        </div>

        <div class="receipt-meta">
            <div><strong>Receipt No.</strong> ${receiptNo}</div>
            <div><strong>Date:</strong> ${date}</div>
        </div>

        <div class="details-grid">
            <div class="detail-item"><span class="label">Student Name</span><span class="value">${student.name}</span></div>
            <div class="detail-item"><span class="label">Admission No.</span><span class="value">${student.admissionNo}</span></div>
            <div class="detail-item"><span class="label">Roll No.</span><span class="value">${student.roll}</span></div>
            <div class="detail-item"><span class="label">Class</span><span class="value">${student.class} - ${student.section}</span></div>
            <div class="detail-item"><span class="label">Session</span><span class="value">${session}</span></div>
            <div class="detail-item"><span class="label">Guardian</span><span class="value">${parent.name}</span></div>
            <div class="detail-item"><span class="label">Parent Contact</span><span class="value">${parent.phone}</span></div>
            <div class="detail-item"><span class="label">Parent Email</span><span class="value">${parent.email}</span></div>
        </div>

        <table class="fee-table">
            <thead>
                <tr>
                    <th>Particulars</th>
                    <th class="text-right">Amount (₹)</th>
                    <th class="text-right">Paid (₹)</th>
                    <th class="text-right">Balance (₹)</th>
                </tr>
            </thead>
            <tbody>
                ${feeRows}
            </tbody>
        </table>

        <div class="totals">
            <table>
                <tr><td>Total Amount</td><td class="text-right">₹${fee.amount.toFixed(2)}</td></tr>
                <tr><td>Amount Paid</td><td class="text-right">₹${fee.paid.toFixed(2)}</td></tr>
                <tr class="grand-total"><td>Balance</td><td class="text-right">₹${fee.pending.toFixed(2)}</td></tr>
            </table>
        </div>

        <div class="payment-details">
            <div class="item"><span>Payment Method</span><span>${fee.status === 'paid' ? 'Bank Transfer / Cash' : '—'}</span></div>
            <div class="item"><span>Transaction ID</span><span>${fee.status === 'paid' ? 'TXN' + String(fee.id).padStart(6, '0') : 'N/A'}</span></div>
            <div class="item"><span>Payment Date</span><span>${fee.status === 'paid' ? date : '—'}</span></div>
            <div class="item"><span>Status</span><span class="status-badge status-${fee.status}">${fee.status}</span></div>
        </div>

        <div class="amount-words">
            <strong>Amount in Words:</strong> ${amountWords}
        </div>

        <div class="receipt-footer">
            <div class="signature-box">
                <div class="line"></div>
                <div class="label">Authorized Signature</div>
            </div>
            <div class="seal-box">
                <div class="seal">School Seal</div>
            </div>
        </div>
    `;
}

// ============================================================
// INIT
// ============================================================

function init() {
    const params = new URLSearchParams(window.location.search);
    const studentId = parseInt(params.get('studentId'));
    const feeId = parseInt(params.get('feeId'));

    if (studentId && feeId) {
        renderReceipt(studentId, feeId);
    } else {
        document.getElementById('receiptWrapper').innerHTML = `
            <p style="color:red; text-align:center; padding:2rem;">
                Missing student or fee information. Please provide <code>?studentId=1&feeId=2</code> in the URL.
            </p>
        `;
    }

    // --- Button event listeners (no inline JS) ---
    document.getElementById('printBtn').addEventListener('click', function() {
        window.print();
    });

    document.getElementById('downloadBtn').addEventListener('click', function() {
        // This opens print dialog; user can choose "Save as PDF"
        window.print();
    });

    document.getElementById('closeBtn').addEventListener('click', function() {
        // Try to close the window; if not possible, fallback to history back
        if (window.close) {
            window.close();
        } else {
            // If window.close doesn't work, go back
            window.history.back();
        }
    });
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
