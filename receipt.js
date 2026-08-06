/* ===== RESET & BASE ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', Arial, sans-serif;
    background: #f0f2f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    min-height: 100vh;
}

/* ===== RECEIPT CONTAINER ===== */
.receipt-wrapper {
    max-width: 794px; /* A4 width at 96dpi */
    width: 100%;
    background: white;
    padding: 2rem 2rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
}

/* ===== PRINT STYLES ===== */
@media print {
    body {
        background: white;
        padding: 0;
    }
    .receipt-wrapper {
        box-shadow: none;
        border-radius: 0;
        padding: 1.5rem;
        max-width: 100%;
    }
    .action-bar {
        display: none !important;
    }
}

/* ===== RECEIPT HEADER ===== */
.receipt-header {
    text-align: center;
    border-bottom: 3px double #222;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
}

.school-name {
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #1a1a1a;
}

.school-address {
    font-size: 0.9rem;
    color: #333;
    margin: 0.25rem 0;
}

.school-details {
    font-size: 0.8rem;
    color: #555;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem 1.5rem;
    margin-top: 0.25rem;
}

.school-details span {
    display: inline-block;
}

.receipt-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-top: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.25rem;
}

/* ===== RECEIPT META ===== */
.receipt-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    margin: 0.75rem 0 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px dashed #bbb;
}

.receipt-meta div {
    display: flex;
    gap: 0.5rem;
}

.receipt-meta strong {
    font-weight: 600;
    color: #222;
}

/* ===== STUDENT & PARENT DETAILS ===== */
.details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 2rem;
    margin-bottom: 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
}

.details-grid .detail-item {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0;
    font-size: 0.9rem;
}

.details-grid .detail-item .label {
    font-weight: 500;
    color: #333;
}

.details-grid .detail-item .value {
    font-weight: 400;
    color: #111;
}

/* ===== FEE TABLE ===== */
.fee-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    font-size: 0.9rem;
}

.fee-table th {
    background: #f8f8f8;
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
    font-weight: 600;
}

.fee-table td {
    border: 1px solid #ccc;
    padding: 0.4rem 0.5rem;
}

.fee-table .text-right {
    text-align: right;
}

.fee-table .text-center {
    text-align: center;
}

/* ===== TOTALS ===== */
.totals {
    margin: 0.5rem 0 1rem;
    display: flex;
    justify-content: flex-end;
}

.totals table {
    border-collapse: collapse;
    font-size: 0.9rem;
}

.totals td {
    padding: 0.25rem 1rem;
    border-bottom: 1px solid #eee;
}

.totals .grand-total {
    font-weight: 700;
    font-size: 1rem;
    border-top: 2px solid #222;
    border-bottom: 2px solid #222;
}

/* ===== PAYMENT DETAILS ===== */
.payment-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 2rem;
    margin: 1rem 0;
    padding: 0.5rem 0;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}

.payment-details .item {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
}

/* ===== AMOUNT IN WORDS ===== */
.amount-words {
    margin: 0.75rem 0;
    padding: 0.5rem;
    background: #f9f9f9;
    border-left: 4px solid #333;
    font-size: 0.95rem;
}

.amount-words strong {
    font-weight: 600;
}

/* ===== FOOTER ===== */
.receipt-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 2px solid #222;
}

.signature-box {
    text-align: center;
    width: 45%;
}

.signature-box .line {
    border-top: 1px solid #333;
    width: 80%;
    margin: 0.5rem auto;
}

.signature-box .label {
    font-size: 0.8rem;
    color: #444;
}

.seal-box {
    text-align: center;
    width: 30%;
}

.seal {
    display: inline-block;
    border: 3px double #222;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #222;
    background: #fcfcfc;
}

/* ===== ACTION BAR ===== */
.action-bar {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
    flex-wrap: wrap;
}

.action-bar .btn {
    padding: 0.6rem 1.8rem;
    border: none;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    background: #e2e8f0;
    color: #1e293b;
}

.action-bar .btn-print {
    background: #1e293b;
    color: white;
}
.action-bar .btn-print:hover {
    background: #0f172a;
}

.action-bar .btn-download {
    background: #2563eb;
    color: white;
}
.action-bar .btn-download:hover {
    background: #1d4ed8;
}

.action-bar .btn-back {
    background: #e2e8f0;
}
.action-bar .btn-back:hover {
    background: #cbd5e1;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 600px) {
    .details-grid {
        grid-template-columns: 1fr;
    }
    .payment-details {
        grid-template-columns: 1fr;
    }
    .receipt-footer {
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
    }
    .seal {
        width: 80px;
        height: 80px;
        line-height: 80px;
        font-size: 0.6rem;
    }
    .school-name {
        font-size: 1.4rem;
    }
}
