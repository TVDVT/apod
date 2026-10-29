const monthLabel = document.querySelector("#calendarMonth");
const daysContainer = document.querySelector("#calendarDays");

let currentMonth = new Date();
let selectedDay = new Date();

function renderCalendar() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    monthLabel.textContent = currentMonth
        .toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        })
        .toUpperCase();

    daysContainer.innerHTML = "";

    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const totalDays = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        empty.className = "calendar-day empty";
        daysContainer.appendChild(empty);
    }

    for (let day = 1; day <= totalDays; day++) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "calendar-day";
        button.textContent = day;

        const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        const isSelected =
            day === selectedDay.getDate() &&
            month === selectedDay.getMonth() &&
            year === selectedDay.getFullYear();

        if (isToday) button.classList.add("today");
        if (isSelected) button.classList.add("selected");

        button.addEventListener("click", () => {
            selectedDay = new Date(year, month, day);
            renderCalendar();
        });

        daysContainer.appendChild(button);
    }
}

document.querySelector("#prevMonth").addEventListener("click", () => {
    currentMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
    );
    renderCalendar();
});

document.querySelector("#nextMonth").addEventListener("click", () => {
    currentMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
    );
    renderCalendar();
});

renderCalendar();
