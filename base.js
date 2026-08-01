const nextMontButton = document.getElementById("nextMonth");
const prevMonthButton = document.getElementById("prevMonth");
const dateDisplay = document.getElementById("dateDisplay");
const chosenMonth = document.getElementById("chosenMonth");
const calendarBody = document.getElementById("calendarBody");
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const actionComm = document.querySelector(".actionComm");
const closeButton = document.getElementById("closeButton");
 const now = new Date();
    const currentDate = now.getDate();
    const currentMonth = now.getMonth();
    let displayMonth = currentMonth;
    const currentYear = now.getFullYear();
    let displayYear = currentYear;
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
const prevMonth = () => {
    displayMonth--; 
    switchingMonth();
    renderCalendar();
};
const nextMonth = () => {
   displayMonth++; 
  switchingMonth();
  renderCalendar();
    
};
const creatingCalendarBox = () => {
    const now = new Date();
    const currentDate = now.getDate();
    const currentMonth = now.getMonth();
    let displayMonth = currentMonth;
    const currentYear = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
   
    dateDisplay.textContent = `${currentDate}/${currentMonth + 1}/${currentYear} ${hour}:${minute}:${second}`;

};
updateTime = () => {
    setInterval(() => {
        creatingCalendarBox();
    }, 1000);
};
const switchingMonth = () => {
    if (displayMonth < 0) {
        displayMonth = 11;
        displayYear--;
    }else if (displayMonth > 11) {
        displayMonth = 0;
        displayYear++;
    }
    switch (displayMonth) {
        case 0:
            chosenMonth.textContent = `January ${displayYear}`;
            break;
        case 1:
            chosenMonth.textContent = `February ${displayYear}`;
            break;
        case 2:
            chosenMonth.textContent = `March ${displayYear}`;
            break;
        case 3:
            chosenMonth.textContent = `April ${displayYear}`;
            break;
        case 4:
            chosenMonth.textContent = `May ${displayYear}`;
            break;
        case 5:
            chosenMonth.textContent = `June ${displayYear}`;
            break;
        case 6:
            chosenMonth.textContent = `July ${displayYear}`;
            break;
        case 7:
            chosenMonth.textContent = `August ${displayYear}`;
            break;
        case 8:
            chosenMonth.textContent = `September ${displayYear}`;
            break;
        case 9:
            chosenMonth.textContent = `October ${displayYear}`;
            break;
        case 10:
            chosenMonth.textContent = `November ${displayYear}`;
            break;
        case 11:
            chosenMonth.textContent = `December ${displayYear}`;
            break;
    }
};

const renderCalendar = () => {
    calendarBody.innerHTML = "";

    let firstDay = new Date(displayYear, displayMonth, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1; // Korekta na poniedziałek

    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(displayYear, displayMonth, 0).getDate();

    let tr = document.createElement("tr");

    let currentDayCounter = 1;
    let nextMonthDayCounter = 1;

    
    for (let i = 0; i < 42; i++) {
        const td = document.createElement("td");
        
        
        const currentDayName = dayNames[i % 7]; 

        if (i < firstDay) {
            
            td.classList.add("inactive-month");
            const prevMonthDay = daysInPrevMonth - firstDay + i + 1;
            td.innerHTML = `
                <div class="day-name">${currentDayName}</div>
                <div class="day-number">${prevMonthDay}</div>
            `;
        } else if (currentDayCounter <= daysInMonth) {
            
            td.innerHTML = `
                <div class="day-name">${currentDayName}</div>
                <div class="day-number">${currentDayCounter}</div>
            `;
            currentDayCounter++;
        } else {
            
            td.classList.add("inactive-month");
            td.innerHTML = `
                <div class="day-name">${currentDayName}</div>
                <div class="day-number">${nextMonthDayCounter}</div>
            `;
            nextMonthDayCounter++;
        }

        tr.appendChild(td);

        if ((i + 1) % 7 === 0) {
            calendarBody.appendChild(tr);
            tr = document.createElement("tr");
        }
    }
};
const actionAdding = () => {
    const clickedCell = event.target.closest("td");
    if (!clickedCell) return;
    actionComm.style.display = "block";
    }
closeButton.addEventListener("click", () => { actionComm.style.display = "none"; });
calendarBody.addEventListener("click", actionAdding);
nextMontButton.addEventListener("click", nextMonth);
prevMonthButton.addEventListener("click", prevMonth);

creatingCalendarBox();
renderCalendar();
switchingMonth();
updateTime();
