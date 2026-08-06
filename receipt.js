// ============================================================
// RECEIPT OVERRIDE (No edits to app.js)
// ============================================================

// Override the global showReceipt function
window.showReceipt = function(id) {
    const fee = feeRecords.find(f => f.id === id);
    if (!fee) {
        showToast('Fee record not found', 'error');
        return;
    }

    const student = students.find(s => s.id === fee.studentId);
    const studentName = student ? student.name : 'Unknown';
    const studentClass = student ? `${student.class}${student.section}` : 'N/A';

    // Generate receipt number and transaction ID
    const now = new Date();
    const dateStr = now.toISOString().slice(0,10).replace(/-/g, '');
    const receiptNum = `REC-${dateStr}-${String(fee.id).padStart(4, '0')}`;
    const transId = `TXN-${dateStr}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

    // Build receipt HTML
    const receiptHTML = `
        <div class="receipt-header">
            <div class="receipt-brand">
                <svg width="40" height="40" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="32" height="32" rx="8" fill="#3b82f6" />
                    <rect x="8" y="8" width="20" height="20" rx="4" fill="white" />
                    <path d="M14 14H22V16H14V14ZM14 18H20V20H14V18ZM14 22H18V24H14V22Z" fill="#3b82f6" />
                </svg>
                <h1>SchoolERP</h1>
            </div>
            <div class="receipt-title">
                <h2>FEE RECEIPT</h2>
                <div class="receipt-number"># ${receiptNum}</div>
            </div>
        </div>

        <div class="receipt-details">
            <div class="detail-item">
                <span class="label">Student</span>
                <span class="value">${studentName}</span>
            </div>
            <div class="detail-item">
                <span class="label">Class</span>
                <span class="value">${studentClass}</span>
            </div>
            <div class="detail-item">
                <span class="label">Date</span>
                <span class="value">${now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
            <div class="detail-item">
                <span class="label">Transaction ID</span>
                <span class="value">${transId}</span>
            </div>
        </div>

        <div class="receipt-table-wrapper">
            <table class="receipt-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th class="text-right">Amount (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${fee.feeType}</td>
                        <td class="text-right">${fee.amount.toFixed(2)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td class="text-right"><strong>₹${fee.amount.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td>Paid</td>
                        <td class="text-right">₹${fee.paid.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Pending</td>
                        <td class="text-right">₹${fee.pending.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td><strong>Status</strong></td>
                        <td class="text-right"><span class="receipt-status ${fee.status}">${fee.status}</span></td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="receipt-footer">
            <div>Generated on ${now.toLocaleString()}</div>
            <div class="signature">Authorised Signature</div>
        </div>
    `;

    // Insert into receipt container
    document.getElementById('receiptContent').innerHTML = receiptHTML;

    // Show overlay
    const overlay = document.getElementById('receiptOverlay');
    overlay.classList.add('active');

    // Close button
    document.getElementById('receiptCloseBtn').onclick = function() {
        overlay.classList.remove('active');
    };

    // Print button
    document.getElementById('receiptPrintBtn').onclick = function() {
        window.print();
    };

    // Download PDF button
    document.getElementById('receiptDownloadBtn').onclick = function() {
        downloadReceiptPDF();
    };

    // Click overlay background to close
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
};

// ============================================================
// DOWNLOAD PDF (using html2canvas + jsPDF)
// ============================================================

function downloadReceiptPDF() {
    const element = document.getElementById('receiptContent');
    // Temporarily hide any action buttons inside receipt (if any)
    html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Fee_Receipt_${new Date().toISOString().slice(0,10)}.pdf`);
        showToast('PDF downloaded successfully', 'success');
    }).catch(err => {
        console.error('PDF generation error:', err);
        showToast('Failed to generate PDF', 'error');
    });
}
