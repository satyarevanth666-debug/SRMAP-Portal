export function render() {
    return `
        <h3 class="finance-title">FEE PAID DETAILS</h3>
        
        <div style="overflow-x: auto; background: #fff; border: 1px solid #dbe2e8; border-radius: 4px;">
            <table class="data-table table-blue-header" style="margin-bottom: 0;">
                <thead>
                    <tr>
                        <th colspan="5" style="text-align: center; border-bottom: 1px solid #dbe2e8;">Fixed/Advances</th>
                        <th colspan="2" style="text-align: center; border-bottom: 1px solid #dbe2e8; border-left: 1px solid #dbe2e8;">Receipts/Payments</th>
                        <th colspan="1" style="text-align: center; border-bottom: 1px solid #dbe2e8; border-left: 1px solid #dbe2e8;">Due</th>
                    </tr>
                    <tr>
                        <th>Term</th>
                        <th>Fee Type</th>
                        <th>Due Date</th>
                        <th>Amount</th>
                        <th>Receipt Date</th>
                        <th style="border-left: 1px solid #dbe2e8;">Mode</th>
                        <th>Number</th>
                        <th style="border-left: 1px solid #dbe2e8;">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="white-space: nowrap;">2025-<br>2026</td>
                        <td>Hostel Fees</td>
                        <td style="white-space: nowrap;">07/06/2025</td>
                        <td>149300.00</td>
                        <td style="white-space: nowrap;">07/06/2025</td>
                        <td style="border-left: 1px solid #dbe2e8; white-space: nowrap;">Online-<br>PAYU</td>
                        <td>SEAS/25-26/102792</td>
                        <td style="border-left: 1px solid #dbe2e8;">
                            <div style="display: flex; justify-content: space-between;">
                                <span>149300.00</span>
                                <span>0.0</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="white-space: nowrap;">2025-<br>2026</td>
                        <td>Admission Fees, General Fees, Insurance Fees,<br>Training and Career Development, Tuition Fees</td>
                        <td style="white-space: nowrap;">12/09/2025</td>
                        <td>132700.00</td>
                        <td style="white-space: nowrap;">20/09/2025,<br>21/09/2025,<br>29/11/2025</td>
                        <td style="border-left: 1px solid #dbe2e8; white-space: nowrap;">Online-<br>PAYU</td>
                        <td>SEAS/25-26/107381, SEAS/25-26/107383, SEAS/25-26/107396,<br>SEAS/25-26/120751, SEAS/25-26/120752, SEAS/25-26/120753</td>
                        <td style="border-left: 1px solid #dbe2e8;">
                            <div style="display: flex; justify-content: space-between;">
                                <span>132700.00</span>
                                <span>0.0</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="white-space: nowrap;">2025-<br>2026</td>
                        <td>Exam Fees</td>
                        <td style="white-space: nowrap;">02/11/2025</td>
                        <td>2600.00</td>
                        <td style="white-space: nowrap;">02/11/2025</td>
                        <td style="border-left: 1px solid #dbe2e8; white-space: nowrap;">Online-<br>PAYU</td>
                        <td>SEAS/25-26/110925</td>
                        <td style="border-left: 1px solid #dbe2e8;">
                            <div style="display: flex; justify-content: space-between;">
                                <span>2600.00</span>
                                <span>0.0</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="white-space: nowrap;">2025-<br>2026</td>
                        <td>Exam Fees</td>
                        <td style="white-space: nowrap;">04/04/2026</td>
                        <td>2600.00</td>
                        <td style="white-space: nowrap;">04/04/2026</td>
                        <td style="border-left: 1px solid #dbe2e8; white-space: nowrap;">Online-<br>PAYU</td>
                        <td>SEAS/26-27/02152</td>
                        <td style="border-left: 1px solid #dbe2e8;">
                            <div style="display: flex; justify-content: space-between;">
                                <span>2600.00</span>
                                <span>0.0</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="white-space: nowrap;">2026-<br>2027</td>
                        <td>Insurance Fees, Training and Career Development,<br>Tuition Fees</td>
                        <td style="white-space: nowrap;">04/05/2026</td>
                        <td>117700.00</td>
                        <td style="white-space: nowrap;">04/07/2026</td>
                        <td style="border-left: 1px solid #dbe2e8; white-space: nowrap;">Online-<br>PAYU</td>
                        <td>SEAS/26-27/54991, SEAS/26-27/54992, SEAS/26-27/54993</td>
                        <td style="border-left: 1px solid #dbe2e8;">
                            <div style="display: flex; justify-content: space-between;">
                                <span>117700.00</span>
                                <span>0.0</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="white-space: nowrap;">2026-<br>2027</td>
                        <td>Hostel Fees</td>
                        <td style="white-space: nowrap;">10/06/2026</td>
                        <td>154800.00</td>
                        <td style="white-space: nowrap;">10/06/2026</td>
                        <td style="border-left: 1px solid #dbe2e8; white-space: nowrap;">Online-<br>PAYU</td>
                        <td>SEAS/26-27/27465</td>
                        <td style="border-left: 1px solid #dbe2e8;">
                            <div style="display: flex; justify-content: space-between;">
                                <span>154800.00</span>
                                <span>0.0</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3 class="finance-title" style="margin-top: 30px;">FEE REFUND DETAILS</h3>
        
        <div style="overflow-x: auto; background: #fff; border: 1px solid #dbe2e8; border-radius: 4px;">
            <table class="data-table table-blue-header" style="margin-bottom: 0;">
                <thead>
                    <tr>
                        <th style="text-align: center;">Amount Refunded</th>
                        <th style="text-align: center; border-left: 1px solid #dbe2e8;">Amount Refunded Against Collected</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Empty row for no data -->
                    <tr>
                        <td style="height: 40px;"></td>
                        <td style="border-left: 1px solid #dbe2e8;"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}