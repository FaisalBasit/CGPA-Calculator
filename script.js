let courseCount = 0;

document.getElementById('add-course-btn').addEventListener('click', function() {
    courseCount++;
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course';
    courseDiv.innerHTML = `
        <h3>Course ${courseCount}</h3>
        <label for="credit${courseCount}">Credit Hours:</label>
        <input type="number" id="credit${courseCount}" name="credit${courseCount}" min="1" required>
        <br>
        <label for="marks${courseCount}">Marks:</label>
        <input type="number" id="marks${courseCount}" name="marks${courseCount}" min="0" max="100">
        <br>
        <label for="grade${courseCount}">Or Select Grade:</label>
        <select id="grade${courseCount}" name="grade${courseCount}">
            <option value="">Select Grade</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="C-">C-</option>
            <option value="D+">D+</option>
            <option value="D">D</option>
            <option value="F">F</option>
        </select>
        <br>
    `;
    document.getElementById('course-inputs').appendChild(courseDiv);
});

function getGradePoint(marks) {
    if (marks >= 86) return { grade: 'A', point: 4.00 };
    if (marks >= 80) return { grade: 'A-', point: 3.66 };
    if (marks >= 75) return { grade: 'B+', point: 3.33 };
    if (marks >= 70) return { grade: 'B', point: 3.00 };
    if (marks >= 67) return { grade: 'B-', point: 2.66 };
    if (marks >= 63) return { grade: 'C+', point: 2.33 };
    if (marks >= 60) return { grade: 'C', point: 2.00 };
    if (marks >= 57) return { grade: 'C-', point: 1.66 };
    if (marks >= 54) return { grade: 'D+', point: 1.30 };
    if (marks >= 50) return { grade: 'D', point: 1.00 };
    return { grade: 'F', point: 0.00 };
}

function getGradePointFromGrade(grade) {
    switch (grade) {
        case 'A':
            return 4.00;
        case 'A-':
            return 3.66;
        case 'B+':
            return 3.33;
        case 'B':
            return 3.00;
        case 'B-':
            return 2.66;
        case 'C+':
            return 2.33;
        case 'C':
            return 2.00;
        case 'C-':
            return 1.66;
        case 'D+':
            return 1.30;
        case 'D':
            return 1.00;
        case 'F':
            return 0.00;
        default:
            return null;
    }
}

document.getElementById('calculate-btn').addEventListener('click', function() {
    let totalCredit = 0;
    let totalCP = 0;
    let errorMessage = '';

    for (let i = 1; i <= courseCount; i++) {
        const creditInput = document.getElementById(`credit${i}`);
        const marksInput = document.getElementById(`marks${i}`);
        const gradeSelect = document.getElementById(`grade${i}`);

        const credit = parseFloat(creditInput.value);
        const marks = parseFloat(marksInput.value);
        const grade = gradeSelect.value;

        if (isNaN(credit) || credit <= 0) {
            errorMessage += `Invalid credit hours for Course ${i}.<br>`;
        }

        if (!isNaN(marks) && (marks < 0 || marks > 100)) {
            errorMessage += `Invalid marks for Course ${i}.<br>`;
        }

        if (!marksInput.value && !grade) {
            errorMessage += `Please enter marks or select grade for Course ${i}.<br>`;
        }

        let point;
        if (marksInput.value) {
            if (isNaN(marks)) {
                errorMessage += `Invalid marks for Course ${i}.<br>`;
            } else {
                const gradeData = getGradePoint(marks);
                point = gradeData.point;
            }
        } else if (grade) {
            point = getGradePointFromGrade(grade);
            if (point === null) {
                errorMessage += `Invalid grade for Course ${i}.<br>`;
            }
        } else {
            errorMessage += `Please enter marks or select grade for Course ${i}.<br>`;
        }

        if (!isNaN(credit) && credit > 0 && point !== undefined && point !== null) {
            totalCredit += credit;
            totalCP += point * credit;
        }
    }

    if (errorMessage !== '') {
        document.getElementById('result').innerHTML = `<span style="color: red;">${errorMessage}</span>`;
    } else if (totalCredit === 0) {
        document.getElementById('result').innerHTML = 'No valid courses to calculate GPA.';
    } else {
        const gpa = totalCP / totalCredit;
        document.getElementById('result').innerHTML = `Your GPA is: ${gpa.toFixed(2)}`;
    }
});