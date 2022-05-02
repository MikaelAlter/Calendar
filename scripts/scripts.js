button.addEventListener('click', ({ target }) => {
  if (!showDatepicker) {
    calendar.style.display = 'none';
    showDatepicker = true;
    target.innerHTML = 'Show Datepiker';
    return;
  }

  calendar.style.display = 'block';
  showDatepicker = false;
  target.innerHTML = 'Hide Datepiker';
});

arrowLeft.addEventListener('click', () => {
  if (!currentMonth) {
    currentYear -= 1;
    currentMonth = 11;
  } else {
    currentMonth -= 1;
  }
  insertDynamicHtml();
  addDatesListener();
});

arrowRight.addEventListener('click', () => {
  if (currentMonth === 11) {
    currentYear += 1;
    currentMonth = 0;
  } else {
    currentMonth += 1;
  }
  insertDynamicHtml();
  addDatesListener();
});

switcher.addEventListener('change', () => {
  const themeElements = document.querySelectorAll(`.theme__${theme}`);

  themeElements.forEach(el => el.classList.remove(`theme__${theme}`));

  if (theme === 'light') theme = 'dark';
  else theme = 'light';

  themeTitle.innerHTML = `${theme} Mode`;
  themeElements.forEach(el => el.classList.add(`theme__${theme}`));
});

document.addEventListener('DOMContentLoaded', () => {
  insertDynamicHtml();
  addDatesListener();

  days.forEach(day => daysContainer.insertAdjacentHTML('beforeend', getDayHtml(day.name)));
});
