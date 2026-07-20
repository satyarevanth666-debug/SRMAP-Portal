export function render() {
    return `
        <h1 class="page-title">STUDENT WISE SUBJECTS</h1>
        ${String.raw`
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Course Title</th>
                        <th>Credits</th>
                        <th>Grade/Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>CSE201</td><td>Data Structures and Algorithms</td><td>4</td><td><span class="badge success">A+</span></td></tr>
                    <tr><td>CSE203</td><td>Design and Analysis of Algorithms</td><td>4</td><td><span class="badge success">A</span></td></tr>
                    <tr><td>MAT201</td><td>Discrete Mathematics</td><td>3</td><td><span class="badge warning">B+</span></td></tr>
                    <tr><td>ECE201</td><td>Digital Electronics</td><td>3</td><td><span class="badge info">Pending</span></td></tr>
                </tbody>
            </table>
        </div>
        `}
    `;
}