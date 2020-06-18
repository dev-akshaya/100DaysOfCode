const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
})

// Show Pop Up ---------------------------------------------------------------
open.addEventListener('click', () => modal.classList.add('show-modal'));

// Close Pop Up ---------------------------------------------------------------
close.addEventListener('click', () => modal.classList.remove('show-modal'));

// Hide Pop Up when click outside ----------------------------------------------
window.addEventListener('click', e => {
  e.target == modal ? modal.classList.remove('show-modal') : false
})