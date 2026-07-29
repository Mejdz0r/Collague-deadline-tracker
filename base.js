const nextMontButton = document.getElementById("nextMonth");
const prevMonthButton = document.getElementById("prevMonth");
const date = document.getElementById("monthYear");
const prevMonth = () => {};
const nextMonth = () => {};
const creatingCalendarBox = () => {
    const now = new Date();
    const currentDate = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    date.textContent = `${currentDate}/${currentMonth + 1}/${currentYear} ${hour}:${minute}:${second}`;

};
updateTime = () => {
    setInterval(() => {
        creatingCalendarBox();
    }, 1000);
};
nextMontButton.addEventListener("click", nextMonth);
prevMonthButton.addEventListener("click", prevMonth);
creatingCalendarBox();
updateTime();