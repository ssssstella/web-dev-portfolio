/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const cvtBtn = document.getElementById("cvt-btn")
const lengthEl = document.getElementById("length-el")
const volumeEl = document.getElementById("volume-el")
const massEl = document.getElementById("mass-el")

cvtBtn.addEventListener("click", function(){
    const unit = Number(document.getElementById("input-el").value)
    // console.log(unit)
    if (unit >= 0) {
        render(unit)
    } else {
        lengthEl.textContent = "Invalid number!"
        volumeEl.textContent = "Invalid number!"
        massEl.textContent = "Invalid number!"
    }
})

function render(unit) {
    const mt2feet = (unit * 3.281).toFixed(3)
    const feet2mt = (unit / 3.281).toFixed(3)
    lengthEl.textContent = `${unit} meters = ${mt2feet} feet | ${unit} feet = ${feet2mt} meters`
    const lt2gl = (unit * 0.264).toFixed(3)
    const gl2lt = (unit / 0.264).toFixed(3)
    volumeEl.textContent = `${unit} liters = ${lt2gl} gallons | ${unit} gallons = ${gl2lt} liters`
    const kg2lb = (unit * 2.204).toFixed(3)
    const lb2kg = (unit / 2.204).toFixed(3)
    massEl.textContent = `${unit} kilos = ${kg2lb} pounds | ${unit} pounds = ${lb2kg} kilos`
}