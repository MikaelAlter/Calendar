const getDayHtml = day => `<div class="days__element"><p>${day}</p></div>`;
const getDate = date => new Date(currentYear, currentMonth, +date);
const deleteChildNodes = parentNode => {
  while (parentNode.firstChild) parentNode.removeChild(parentNode.firstChild);
};

const getCountDays = (year, month) => {
  var currentMonthDate = new Date(year, month, 1);
  var nextMonthDate = new Date(year, month + 1, 1);

  return Math.round((nextMonthDate - currentMonthDate) / 1000 / 3600 / 24);
};

const insertCalendarDates = days => {
  const NUMBER_CELL = 42;
  const FIRST_DATE_INDEX = getDate(1).getDay() || 7;

  deleteChildNodes(dateContainer);

  for (let i = 0; i < NUMBER_CELL; i++) {
    const dateCell = document.createElement('div');
    dateCell.classList.add('date__cell', `theme__${theme}`);

    if (i < FIRST_DATE_INDEX - 1 || i > days + FIRST_DATE_INDEX - 2) {
      dateCell.classList.add('empty');
      dateContainer.appendChild(dateCell);
      continue;
    }

    dateCell.innerHTML = `<p>${i - FIRST_DATE_INDEX + 2}</p>`;
    dateContainer.appendChild(dateCell);
  }
};

const insertDynamicHtml = () => {
  year.innerHTML = `<p>${currentYear}</p>`;
  month.innerHTML = `<p>${months.find(month => month.id === currentMonth).name}</p>`;
  insertCalendarDates(getCountDays(currentYear, currentMonth));
};

const addSelectedDate = selectedDate => {
  if (selectedDates.isFull) {
    selectedDates.first = selectedDate;
    selectedDates.second = '';
    selectedDates.isFull = false;
    return;
  }

  if (selectedDates.first) {
    selectedDates.second = selectedDate;
    selectedDates.isFull = true;
    allSelectedDates.push({ ...selectedDates });
    setBetweenDates();
    return;
  }

  selectedDates.first = selectedDate;
};

const setSelectedForCurrentMonth = (date, dateNode) => {
  if (Date.parse(date) === Date.parse(selectedDates.first)) dateNode.classList.add('select');

  allSelectedDates.forEach(d => {
    const isFirst = Date.parse(d.first) === Date.parse(date);
    const isSecond = Date.parse(d.second) === Date.parse(date);
    const isBetween = date > d.first && date < d.second;

    if (isFirst || isSecond || isBetween) dateNode.classList.add('select');
  });
};

const setBetweenDates = () => {
  cells.forEach(cell => {
    const selectedDate = getDate(cell.textContent);
    const isBetween = allSelectedDates.some(d => selectedDate > d.first && selectedDate < d.second);

    if (cell.classList.contains('empty')) return;
    if (isBetween) cell.classList.add('select');
  });
};

const setBlockedDates = () => {
  cells.forEach(cell => {
    const currentDate = getDate(cell.textContent);

    if (currentDate < selectedDates.first) cell.classList.add('blocked');
  });
};

const unblockedDates = () => {
  cells.forEach(cell => cell.classList.remove('blocked'));
};

const toggleBlockedDates = () => {
  if (selectedDates.isFull) unblockedDates();
  else setBlockedDates();
};

const addDatesListener = () => {
  cells.forEach(cell => {
    const currentDate = getDate(cell.textContent);

    if (cell.classList.contains('empty')) return;

    setSelectedForCurrentMonth(currentDate, cell);
    toggleBlockedDates()

    cell.addEventListener('click', () => {
      if (cell.classList.contains('blocked')) return;

      cell.classList.add('select');

      addSelectedDate(currentDate);
      toggleBlockedDates()
    });
  });
};
