const button_dialog = document.getElementById('button_dialog')
const button_window = document.getElementById('button_window')
const text = document.getElementById('text');

button_dialog.addEventListener('click', async () => {
  text.textContent = await window.myAPI.openDialog()
});