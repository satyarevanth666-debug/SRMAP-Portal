export function render() {
    return `
        <h1 class="page-title">FEEDBACK</h1>
        ${String.raw`
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>TXN-902384</td><td>Aug 15, 2025</td><td>Tuition Fee - Sem 3</td><td>₹ 1,25,000</td><td><span class="badge success">Paid</span></td></tr>
                    <tr><td>TXN-902385</td><td>Aug 15, 2025</td><td>Hostel Fee</td><td>₹ 50,000</td><td><span class="badge success">Paid</span></td></tr>
                    <tr><td>TXN-109283</td><td>Jan 10, 2026</td><td>Tuition Fee - Sem 4</td><td>₹ 1,25,000</td><td><span class="badge danger">Due</span></td></tr>
                </tbody>
            </table>
        </div>
        <div style="margin-top:20px;">
            <button class="btn-primary">Pay Due Amount</button>
        </div>
        `}
    `;
}