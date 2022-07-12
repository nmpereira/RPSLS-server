console.log('Instinc is the best!')
const display = document.querySelector('#display')
const display2 = document.querySelector('#display2')

document.querySelector('form').addEventListener('click', async (e) => {
    if(e.target.classList.contains('btn')) {
        const id = e.target.getAttribute('id')
        const raw = await fetch(`/random?user=${id}`)
        let res = await raw.json()
        display.textContent = `${res.winner}`
        display2.textContent = `${res.logic}`
    }
})

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
