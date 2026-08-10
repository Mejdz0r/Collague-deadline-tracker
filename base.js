const nextMontButton = document.getElementById("nextMonth");
const prevMonthButton = document.getElementById("prevMonth");
const dateDisplay = document.getElementById("dateDisplay");
const chosenMonth = document.getElementById("chosenMonth");
const calendarBody = document.getElementById("calendarBody");
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const actionComm = document.querySelector(".actionComm");
const closeButton = document.getElementById("closeButton");
const showMoreButton = document.getElementById("showMore");
const additionalInputs = document.getElementById("additionalInputs");
const actionDate = document.getElementById("actionDate");
const saveButton = document.getElementById("saveButton");
const removeCategoryButton = document.getElementById("removeCategoryButton");
const removeCategorySelect = document.getElementById("removeCategory");
const addCategoryButton = document.getElementById("addCategoryButton");
const callbackDiv = document.querySelector(".callback");
const categorySelect = document.getElementById("categorySelect");
const categoryId = document.getElementById("categoryId");
const newCategoryInput = document.getElementById("newCategory");
const colorOfNewCategory = document.getElementById("colorNewCategory");
const now = new Date();
    const currentDate = now.getDate();
    const currentMonth = now.getMonth();
    let displayMonth = currentMonth;
    const currentYear = now.getFullYear();
    let displayYear = currentYear;
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
let categories = [
    {name: "Colleague", color: "#FF5733"}, 
    {name: "Work", color: "#33FF57"}
];
let events = [];
let selectedDate = ""; 
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
const updateTime = () => {
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
    firstDay = firstDay === 0 ? 6 : firstDay - 1; 

    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(displayYear, displayMonth, 0).getDate();

    let tr = document.createElement("tr");

    let currentDayCounter = 1;
    let nextMonthDayCounter = 1;
    
    for (let i = 0; i < 42; i++) {
        const td = document.createElement("td");
        const currentDayName = dayNames[i % 7]; 
        
        
        let cellYear = displayYear;
        let cellMonth = displayMonth + 1;
        let cellDay;

        if (i < firstDay) {
            td.classList.add("inactive-month");
            cellDay = daysInPrevMonth - firstDay + i + 1;
            cellMonth -= 1;
            if (cellMonth === 0) { cellMonth = 12; cellYear -= 1; }
        } else if (currentDayCounter <= daysInMonth) {
            cellDay = currentDayCounter;
            currentDayCounter++;
        } else {
            td.classList.add("inactive-month");
            cellDay = nextMonthDayCounter;
            cellMonth += 1;
            if (cellMonth === 13) { cellMonth = 1; cellYear += 1; }
            nextMonthDayCounter++;
        }

        td.innerHTML = `
            <div class="day-name">${currentDayName}</div>
            <div class="day-number">${cellDay}</div>
        `;

        const cellDateString = `${cellYear}-${cellMonth}-${cellDay}`;
        
        const eventsForThisDay = events.filter(ev => ev.date === cellDateString);
        
        if (eventsForThisDay.length > 0) {
            const dotsContainer = document.createElement("div");
            dotsContainer.classList.add("dots-container");
            
            eventsForThisDay.forEach(ev => {
                const dot = document.createElement("div");
                dot.classList.add("event-dot");
                dot.style.backgroundColor = ev.color; 
                dotsContainer.appendChild(dot);
            });
            
            td.appendChild(dotsContainer);
        }

        tr.appendChild(td);

        if ((i + 1) % 7 === 0) {
            calendarBody.appendChild(tr);
            tr = document.createElement("tr");
        }
    }
};
const actionAdding = (event) => { 
    const clickedCell = event.target.closest("td");
    
    if (!clickedCell) return;
    
    const dayNumber = parseInt(clickedCell.querySelector(".day-number").textContent);
    
    let actionMonth = displayMonth + 1; 
    let actionYear = displayYear;

    if (clickedCell.classList.contains("inactive-month")) {
        if (dayNumber > 15) {
            actionMonth -= 1;
            if (actionMonth === 0) { actionMonth = 12; actionYear -= 1; }
        } else {
            actionMonth += 1;
            if (actionMonth === 13) { actionMonth = 1; actionYear += 1; }
        }
    }
    
    selectedDate = `${actionYear}-${actionMonth}-${dayNumber}`;
    
    actionDate.textContent = `Action Date: ${selectedDate}`;
    actionComm.style.display = "block";
};
const saveEvent = () => {
    const title = getTitle();
    if(!title) {
        positiveOrNegative("Please enter an event title!", false);
        return;
    }

    const categoryName = getCategory();
    
    if (categoryName === "-- Choose a category --") {
        positiveOrNegative("Please select a valid category!", false);
        return;
    }

    const { startTime, endTime } = getTimes();
    const description = getDescription();
    
    const categoryObj = categories.find(cat => cat.name === categoryName);
    const eventColor = categoryObj ? categoryObj.color : "#000000";

    const newEvent = {
        date: selectedDate, 
        title: title,
        description: description,
        category: categoryName,
        color: eventColor,
        startTime: startTime,
        endTime: endTime
    };

    events.push(newEvent);

    actionComm.style.display = "none";
    
    document.getElementById("actionTittle").value = "";
    document.getElementById("textInput").value = "";
    document.getElementById("timeInputStarts").value = "";
    document.getElementById("timeInputEnds").value = "";
    document.getElementById("categoryId").value = "";
    
    positiveOrNegative("Event saved successfully!", true);
    
    renderCalendar();
};
const addNewCategory = () => {
    const newCategoryInput = document.getElementById("newCategory");
    const newCategory = newCategoryInput.value.trim();
    const removeCategorySelect = document.getElementById("removeCategory");
    const newCategoryColor = document.getElementById("colorNewCategory");
    if (!newCategory) {
        positiveOrNegative("Please enter a category name!", false);
        return;
    }
       let newCategoryUpper = newCategory.charAt(0).toUpperCase() + newCategory.slice(1).toLowerCase();
        if(categories.some(cat => cat.name === newCategoryUpper)) {
            positiveOrNegative("Category already exists!", false);
            return;
        }
        let newCategoryColorValue = newCategoryColor.value;
        categories.push({name: newCategoryUpper, color: newCategoryColorValue});
        const option = document.createElement("option");
        option.value = newCategoryUpper;
        option.textContent = newCategoryUpper;
        document.getElementById("categoryId").appendChild(option);
        document.getElementById("categorySelect").appendChild(option.cloneNode(true));
        document.getElementById("removeCategory").appendChild(option.cloneNode(true));
        newCategoryInput.value = "";
        newCategoryColor.value = "#000000";
        positiveOrNegative("Category added successfully!", true);
    }
const positiveOrNegative = (message, isPositive) => {
    callbackDiv.textContent = message;
    callbackDiv.style.display = "flex";
    callbackDiv.style.backgroundColor = isPositive ? "green" : "red";
    setTimeout(() => {
        callbackDiv.style.display = "none";
    }, 3000)
};
const getTimes = () => {
    const startTime = document.getElementById("timeInputStarts").value;
    const endTime = document.getElementById("timeInputEnds").value;
    return { startTime, endTime };
};
const getTitle = () => {
    const titleInput = document.getElementById("actionTittle");
    return titleInput.value.trim();
};
const getDescription = () => {
    const descriptionInput = document.getElementById("textInput");
    return descriptionInput.value.trim();
};
const getCategory = () => {
    const categorySelect = document.getElementById("categoryId");
    return categorySelect.options[categorySelect.selectedIndex].text;
}

const renderCategoriesList = () => {
    
    const placeholderHTML = '<option value="" disabled selected hidden>-- Choose a category --</option>';

    categoryId.innerHTML = placeholderHTML;
    categorySelect.innerHTML = placeholderHTML;
    removeCategorySelect.innerHTML = placeholderHTML;
    
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.name;       
        option.textContent = cat.name; 
        
        categoryId.appendChild(option.cloneNode(true));
        categorySelect.appendChild(option.cloneNode(true));
        removeCategorySelect.appendChild(option.cloneNode(true));
    });
};
const removeCategory = () => {
    if(removeCategorySelect.value === "") {
        positiveOrNegative("Please select a category to remove!", false);
        return;
    }
    
    const selectedCategory = removeCategorySelect.options[removeCategorySelect.selectedIndex].text;
    const categoryIndex = categories.findIndex(cat => cat.name === selectedCategory);

    if (categoryIndex !== -1) {
        categories.splice(categoryIndex, 1);
        
        const catIdOption = categoryId.querySelector(`option[value="${selectedCategory}"]`);
        if (catIdOption) catIdOption.remove();
        
        const catSelectOption = categorySelect.querySelector(`option[value="${selectedCategory}"]`);
        if (catSelectOption) catSelectOption.remove();
        
        const removeCatOption = removeCategorySelect.querySelector(`option[value="${selectedCategory}"]`);
        if (removeCatOption) removeCatOption.remove();
        
        categoryId.value = "";
        categorySelect.value = "";
        removeCategorySelect.value = "";
        
        positiveOrNegative("Category removed successfully!", true);
    } else {
        positiveOrNegative("Selected category not found!", false);
    }
};
closeButton.addEventListener("click", () => { 
    actionComm.style.display = "none"; 
    additionalInputs.style.display = "none"; 
    showMoreButton.textContent = "Show more";
});
calendarBody.addEventListener("click", actionAdding);
nextMontButton.addEventListener("click", nextMonth);
prevMonthButton.addEventListener("click", prevMonth);
showMoreButton.addEventListener("click", () => { 
    if (additionalInputs.style.display != "flex"){ 
        additionalInputs.style.display = "flex";
        showMoreButton.textContent = "Show less";}
        else { 
            additionalInputs.style.display = "none"; 
            showMoreButton.textContent = "Show more";}
        });
saveButton.addEventListener("click", () => {
    saveEvent();
 });
addCategoryButton.addEventListener("click", addNewCategory);
removeCategoryButton.addEventListener("click", removeCategory);
creatingCalendarBox();
renderCalendar();
switchingMonth();
updateTime();
renderCategoriesList();
