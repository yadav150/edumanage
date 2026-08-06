// ============================================================
// RECEIPT GENERATION MODULE
// ============================================================

/**
 * Opens a new window with a printable fee receipt.
 * Uses actual student and fee data from the main application.
 *
 * @param {number} feeId - The ID of the fee record to generate receipt for
 */
function generateReceipt(feeId) {
    // Find the fee record
    const fee = feeRecords.find(f => f.id === feeId);
    if (!fee) {
        showToast('Fee record not found', 'error');
        return;
    }

    // Find the student
    const student = students.find(s => s.id === fee.studentId);
    if (!student) {
        showToast('Student not found', 'error');
        return;
    }

    // Get all fee records for this student that have paid > 0
    const studentFees = feeRecords.filter(f => f.studentId === student.id && f.paid > 0);
    
    // Calculate total paid
    const totalPaid = studentFees.reduce((sum, f) => sum + f.paid, 0);

    // Generate receipt numbers
    const now = new Date();
    const year = now.getFullYear();
    const receiptNo = `#MGEA-${year}-${String(now.getTime()).slice(-4)}`;
    const feeIdStr = `FID-${String(student.id).padStart(5, '0')}-${String(fee.id).padStart(2, '0')}`;
    const txId = `TXN-${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
    const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Format currency
    const formatCurrency = (amount) => {
        return amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // Convert number to words (Indian style)
    const numberToWords = (num) => {
        if (num === 0) return 'Zero';
        const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const lakhs = (n) => {
            if (n === 0) return '';
            if (n < 20) return ones[n] + ' ';
            return tens[Math.floor(n / 10)] + ' ' + ones[n % 10] + ' ';
        };
        const crores = (n) => {
            if (n === 0) return '';
            return lakhs(n) + 'Crore ';
        };
        const lakhsPart = (n) => {
            if (n === 0) return '';
            return lakhs(n) + 'Lakh ';
        };
        const thousands = (n) => {
            if (n === 0) return '';
            return lakhs(n) + 'Thousand ';
        };
        const hundreds = (n) => {
            if (n === 0) return '';
            return ones[n] + ' Hundred ';
        };
        
        let words = '';
        const crore = Math.floor(num / 10000000);
        num = num % 10000000;
        const lakh = Math.floor(num / 100000);
        num = num % 100000;
        const thousand = Math.floor(num / 1000);
        num = num % 1000;
        const hundred = Math.floor(num / 100);
        num = num % 100;
        
        if (crore > 0) words += crores(crore);
        if (lakh > 0) words += lakhsPart(lakh);
        if (thousand > 0) words += thousands(thousand);
        if (hundred > 0) words += hundreds(hundred);
        if (num > 0) {
            if (num < 20) words += ones[num] + ' ';
            else words += tens[Math.floor(num / 10)] + ' ' + ones[num % 10] + ' ';
        }
        return words.trim() + ' Only';
    };

    // Determine payment mode (use a default or try to get from fee record)
    // We'll use a simple mapping based on fee type or add a field
    const paymentMode = fee.paymentMethod || 'Bank Transfer';

    // Build the receipt HTML
    const receiptHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fee Receipt - ${student.name}</title>
    <style>
        /* All styles are in receipt.css - loaded separately */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #e8e8e8; display: flex; justify-content: center; padding: 20px; }
        @media print { body { background: #fff; padding: 0; } }
    </style>
    <link rel="stylesheet" href="receipt.css" />
</head>
<body>
    <div class="receipt-wrapper" id="receiptContainer">
        <!-- HEADER -->
        <div class="receipt-header">
            <h1>Morning Glory English Academy</h1>
            <p>Dikhlem, West Karbi Anglong</p>
            <p>Email: mgea@gmail.com</p>
        </div>

        <!-- TITLE -->
        <div class="receipt-title">Fee Receipt</div>

        <!-- RECEIPT INFORMATION -->
        <div class="section-title">Receipt Information</div>
        <div class="info-grid">
            <div><span class="label">Receipt No:</span> <span class="value">${receiptNo}</span></div>
            <div><span class="label">Fee ID:</span> <span class="value">${feeIdStr}</span></div>
            <div><span class="label">Transaction ID:</span> <span class="value">${txId}</span></div>
            <div><span class="label">Date:</span> <span class="value">${dateStr}</span></div>
        </div>

        <!-- STUDENT DETAILS -->
        <div class="section-title">Student Details</div>
        <div class="info-full"><span class="label">Student Name:</span> <span class="value">${student.name}</span></div>
        <div class="info-full"><span class="label">Admission No:</span> <span class="value">${String(student.id).padStart(6, '0')}</span></div>
        <div class="info-full"><span class="label">Class/Grade:</span> <span class="value">${student.class} - ${student.section}</span></div>
        <div class="info-full"><span class="label">Roll No:</span> <span class="value">${student.roll}</span></div>

        <!-- PAID FEES BREAKDOWN -->
        <div class="section-title">Paid Fees Breakdown</div>
        <div style="font-size:12px; margin-bottom:6px; color:#555;">(Only showing categories where payment was received)</div>
        <table class="receipt-table">
            <thead>
                <tr>
                    <th style="width:50px;">Sl. No.</th>
                    <th>Paid Description</th>
                    <th style="width:130px; text-align:right;">Amount (₹)</th>
                </tr>
            </thead>
            <tbody>
                ${studentFees.map((f, idx) => `
                <tr>
                    <td>${idx + 1}</td>
                    <td>${f.feeType}</td>
                    <td class="text-right">${formatCurrency(f.paid)}</td>
                </tr>
                `).join('')}
                <tr class="total-row">
                    <td colspan="2"><strong>TOTAL PAID</strong></td>
                    <td class="text-right"><strong>₹ ${formatCurrency(totalPaid)}</strong></td>
                </tr>
            </tbody>
        </table>

        <!-- PAYMENT SUMMARY -->
        <div class="section-title">Payment Summary</div>
        <div class="payment-summary">
            <div class="line"><span class="label">Amount in Words:</span> ${numberToWords(Math.round(totalPaid))}</div>
            <div class="line"><span class="label">Payment Mode:</span> ${paymentMode}</div>
            <div class="line"><span class="label">Payment Status:</span> <strong>SUCCESS</strong></div>
        </div>

        <!-- AUTHENTICATION -->
        <div class="section-title">Authentication</div>
        <div class="signature-section">
            <div>
                <div class="signature-line">Authorized Signatory</div>
                <div style="text-align:center; font-size:11px; margin-top:4px; color:#555;">(Digital/Office Stamp)</div>
            </div>
            <div>
                <div class="signature-line">Parent/Guardian Signature</div>
            </div>
        </div>

        <!-- FOOTER -->
        <div class="receipt-footer">
            This is a system-generated receipt. No signature required for digital verification.
        </div>

        <!-- PRINT BUTTON -->
        <button class="receipt-print-btn" onclick="window.print()">🖨 Print Receipt</button>
    </div>
</body>
</html>
    `;

    // Open a new window with the receipt
    const win = window.open('', '_blank', 'width=850,height=1100,scrollbars=yes');
    if (!win) {
        showToast('Please allow pop-ups to view the receipt', 'error');
        return;
    }
    win.document.write(receiptHTML);
    win.document.close();
}
