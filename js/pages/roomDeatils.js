export function render() {
    return `
        <div class="page-card" style="margin-top: 10px;">
            <div class="page-card-body">
                <h3 class="success-title">Hostel registration completed</h3>
                <div class="divider-green" style="margin-top: 10px; margin-bottom: 20px;"></div>
                
                <div class="detail-grid">
                    <div class="detail-label">Room Type</div>
                    <div class="detail-value" style="color: #0f766e;">6 Sharing Bunker AC</div>
                </div>
                
                <div class="divider"></div>

                <div class="detail-grid">
                    <div class="detail-label">Allotted Room No.</div>
                    <div class="detail-value" style="color: #0f766e;">GANGA B / Level 4 / GB-434 / Bed - 1</div>
                </div>

                <button class="btn-print" onclick="window.print()">Print</button>

                <h4 style="color: #0d9488; font-size: 13px; font-weight: 600; margin-top: 25px; margin-bottom: 10px;">Previous Year Hostel Status</h4>
                
                <div style="overflow-x: auto;">
                    <table class="data-table table-green-header">
                        <thead>
                            <tr>
                                <th>Academic Year</th>
                                <th>Alloted Date</th>
                                <th>Block</th>
                                <th>Tower</th>
                                <th>Room Name</th>
                                <th>Room Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2025-2026</td>
                                <td>18-Aug-2025</td>
                                <td>GANGA B</td>
                                <td>Level 4</td>
                                <td>409</td>
                                <td>4 Bunker Sharing A/C</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}