document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();
  });

window.addEventListener('scroll', function() {
    var navbar = document.getElementById('Nav');
    if (window.scrollY > 50) {
        navbar.classList.remove('transparent');
        navbar.classList.add('white-bg');
    } else {
        navbar.classList.remove('white-bg');
        navbar.classList.add('transparent');
    }
});


