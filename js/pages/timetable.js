export function render() {
    return `
        <h1 class="page-title">TIMETABLE</h1>
        <div class="timetable-container">
            <table class="schedule-table">
                <thead>
                    <tr class="period-row">
                        <th class="empty-header"></th>
                        <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th>
                    </tr>
                    <tr class="time-row">
                        <th class="empty-header"></th>
                        <th>09:00 To 09:50</th>
                        <th>10:00 To 10:50</th>
                        <th>11:00 To 11:50</th>
                        <th>12:00 To 12:50</th>
                        <th>01:00 To 01:50</th>
                        <th>02:00 To 02:50</th>
                        <th>03:00 To 03:50</th>
                        <th>04:00 To 05:30</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th class="day-col">Monday</th>
                        <td>SEC 101(V 202)</td>
                        <td>SEC 101(V 202)</td>
                        <td>SEC 166(V 202)</td>
                        <td></td>
                        <td>CSE 101(V 101)</td>
                        <td>CSE 101(V 101)</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th class="day-col">Tuesday</th>
                        <td></td><td></td><td></td><td></td>
                        <td>FIC 103(V 202)</td>
                        <td>FIC 103(V 202)</td>
                        <td>CSE 101(V 202)</td>
                        <td>SEC 101(V 202)</td>
                    </tr>
                    <tr>
                        <th class="day-col">Wednesday</th>
                        <td>AEC 101(V 202)</td>
                        <td>AEC 101(V 202)</td>
                        <td>SEC 166(V 202)</td>
                        <td>SEC 166(V 202)</td>
                        <td></td>
                        <td>FIC 102(V 305)</td>
                        <td>FIC 102(V 305)</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th class="day-col">Thursday</th>
                        <td></td><td></td><td></td><td></td>
                        <td>AEC 101(V 202)</td>
                        <td>CSE 101(V 202)</td>
                        <td>CSE 101(V 202)</td>
                        <td>VAC 101(V 202)</td>
                    </tr>
                    <tr>
                        <th class="day-col">Friday</th>
                        <td>VAC 101(V 202)</td>
                        <td>FIC 102(V 202)</td>
                        <td>FIC 102(V 202)</td>
                        <td>FIC 103(V 202)</td>
                        <td></td><td></td><td></td><td></td>
                    </tr>
                    <tr>
                        <th class="day-col">Saturday</th>
                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="timetable-container" style="margin-top: 25px;">
            <table class="subjects-table">
                <thead>
                    <tr>
                        <th style="width: 15%"></th>
                        <th style="width: 35%">Subjects Description</th>
                        <th style="width: 10%">L-T-P-C</th>
                        <th style="width: 25%">Faculty Name</th>
                        <th style="width: 15%">Class Room Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="sub-code">AEC 101</td>
                        <td class="sub-desc">ART OF LISTENING, SPEAKING AND READING SKILLS</td>
                        <td class="sub-center">1-0-1-2</td>
                        <td>Dr. Rajni ( 18070 )</td>
                        <td>(V 202)</td>
                    </tr>
                    <tr>
                        <td class="sub-code">CSE 101</td>
                        <td class="sub-desc">FUNDAMENTALS OF COMPUTING AND PROGRAMMING IN C</td>
                        <td class="sub-center">3-0-1-4</td>
                        <td>Dr. Neeraj Kumar Sharma ( 20119 )</td>
                        <td>(V 101), (V 202)</td>
                    </tr>
                    <tr>
                        <td class="sub-code">FIC 102</td>
                        <td class="sub-desc">ENGINEERING PHYSICS</td>
                        <td class="sub-center">2-0-1-3</td>
                        <td>Dr. Laxminarayana Patro ( 18045 )</td>
                        <td>(V 202), (V 305)</td>
                    </tr>
                    <tr>
                        <td class="sub-code">FIC 103</td>
                        <td class="sub-desc">CALCULUS FOR ENGINEERS</td>
                        <td class="sub-center">3-0-0-3</td>
                        <td>Dr. Surinder Kaur ( 23119 )</td>
                        <td>(V 202)</td>
                    </tr>
                    <tr>
                        <td class="sub-code">SEC 101</td>
                        <td class="sub-desc">ANALYTICAL REASONING AND APTITUDE SKILLS - I</td>
                        <td class="sub-center">1-0-1-2</td>
                        <td>Mr. Skilling Course ( tmp054 )</td>
                        <td>(V 202)</td>
                    </tr>
                    <tr>
                        <td class="sub-code">SEC 166</td>
                        <td class="sub-desc">INDUSTRY STANDARD EMPLOYABILITY SKILLS - I</td>
                        <td class="sub-center">1-0-1-2</td>
                        <td>Mr. Skilling Course ( tmp059 )</td>
                        <td>(V 202)</td>
                    </tr>
                    <tr>
                        <td class="sub-code">VAC 101</td>
                        <td class="sub-desc">ENVIRONMENTAL SCIENCE</td>
                        <td class="sub-center">2-0-0-2</td>
                        <td>Dr. Uttiya Dey ( 24115 )</td>
                        <td>(V 202)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}