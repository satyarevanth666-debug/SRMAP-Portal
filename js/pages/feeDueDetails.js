export function render() {
    return `
        <h3 class="finance-title">DUES</h3>
        
        <div style="overflow-x: auto; background: #fff; border: 1px solid #dbe2e8; border-radius: 4px; margin-bottom: 25px;">
            <table class="data-table table-blue-header" style="margin-bottom: 0;">
                <thead>
                    <tr>
                        <th style="text-align: center; border-bottom: 1px solid #dbe2e8;">Sl.No.</th>
                        <th style="text-align: center; border-bottom: 1px solid #dbe2e8; border-left: 1px solid #dbe2e8;">Fee Category</th>
                        <th style="text-align: center; border-bottom: 1px solid #dbe2e8; border-left: 1px solid #dbe2e8;">Fee Head</th>
                        <th style="text-align: center; border-bottom: 1px solid #dbe2e8; border-left: 1px solid #dbe2e8;">Due Amount (INR)</th>
                        <th style="text-align: center; border-bottom: 1px solid #dbe2e8; border-left: 1px solid #dbe2e8;">Collected (INR)</th>
                        <th style="text-align: center; border-bottom: 1px solid #dbe2e8; border-left: 1px solid #dbe2e8;">To be Paid Amount (INR)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="6" style="text-align: center; color: #a9b7cd; padding: 16px;">No fee dues</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3 class="finance-title">SELECT FEE CATEGORY TO PAY</h3>
        <p class="finance-note">Note : You will be allowed to make the Tuition Fees payment once the other old dues are cleared</p>

        <div class="note-alert" style="margin-top: 30px;">
            <strong>Note:</strong>To verify the current status of your online Payment Gateway transaction, where the status was not updated and amount was deducted from you bank account, please go through the navigation : <strong>Student Portal>>Finance>>Online Payment Verification</strong> to verify the current status. If there will be a change, the status gets updated accordingly
        </div>
    `;
}