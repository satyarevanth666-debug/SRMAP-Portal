export function render() {
    return `
        <h1 class="page-title">COURSE REGISTRATION</h1>
        ${String.raw`
        <div class="module-form">
            <h3>Submit Details for COURSE REGISTRATION</h3>
            <div class="form-group">
                <label>Select Term/Semester</label>
                <select><option>Fall 2026</option><option>Spring 2027</option></select>
            </div>
            <div class="form-group">
                <label>Additional Comments / Details</label>
                <textarea rows="4" placeholder="Enter details here..."></textarea>
            </div>
            <button class="btn-primary">Submit Application</button>
        </div>
        `}
    `;
}