const nextMontButton = document.getElementById("nextMonth");
const prevMonthButton = document.getElementById("prevMonth");
const dateDisplay = document.getElementById("dateDisplay");
const chosenMonth = document.getElementById("chosenMonth");
 const now = new Date();
    const currentDate = now.getDate();
    const currentMonth = now.getMonth();
    let displayMonth = currentMonth;
    const currentYear = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
const prevMonth = () => {
    displayMonth--; 
    switchingMonth();
    
};
const nextMonth = () => {
   displayMonth++; 
  switchingMonth();
    
};
const creatingCalendarBox = () => {
   
    dateDisplay.textContent = `${currentDate}/${currentMonth + 1}/${currentYear} ${hour}:${minute}:${second}`;

};
updateTime = () => {
    setInterval(() => {
        creatingCalendarBox();
    }, 1000);
};
const switchingMonth = () => {
    switch (displayMonth) {
        case 0:
            chosenMonth.textContent = "January";
            break;
        case 1:
            chosenMonth.textContent = "February";
            break;
        case 2:
            chosenMonth.textContent = "March";
            break;
        case 3:
            chosenMonth.textContent = "April";
            break;
        case 4:
            chosenMonth.textContent = "May";
            break;
        case 5:
            chosenMonth.textContent = "June";
            break;
        case 6:
            chosenMonth.textContent = "July";
            break;
        case 7:
            chosenMonth.textContent = "August";
            break;
        case 8:
            chosenMonth.textContent = "September";
            break;
        case 9:
            chosenMonth.textContent = "October";
            break;
        case 10:
            chosenMonth.textContent = "November";
            break;
        case 11:
            chosenMonth.textContent = "December";
            break;
    }
};
nextMontButton.addEventListener("click", nextMonth);
prevMonthButton.addEventListener("click", prevMonth);

creatingCalendarBox();
switchingMonth();
updateTime();
