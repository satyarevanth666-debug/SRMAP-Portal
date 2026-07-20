export function render() {
    return `
        <h1 class="page-title">EVENT ATTENDANCE</h1>
        ${String.raw`
        <div class="info-card">
            <h3>Overall Attendance: <strong>85%</strong></h3>
            <p>You are meeting the minimum requirement of 75% for this semester.</p>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>09:00 - 10:00</th>
                        <th>10:00 - 11:00</th>
                        <th>11:00 - 12:00</th>
                        <th>13:00 - 15:00</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Monday</td><td>CSE201 (L)</td><td>MAT201 (L)</td><td>Free</td><td>CSE201 (P)</td></tr>
                    <tr><td>Tuesday</td><td>ECE201 (L)</td><td>CSE203 (L)</td><td>MAT201 (T)</td><td>Free</td></tr>
                    <tr><td>Wednesday</td><td>CSE201 (L)</td><td>Free</td><td>ECE201 (L)</td><td>CSE203 (P)</td></tr>
                    <tr><td>Thursday</td><td>CSE203 (L)</td><td>MAT201 (L)</td><td>ECE201 (T)</td><td>Free</td></tr>
                    <tr><td>Friday</td><td>Free</td><td>Free</td><td>Free</td><td>ECE201 (P)</td></tr>
                </tbody>
            </table>
        </div>
        `}
    `;
}