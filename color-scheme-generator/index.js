const initialColor = ["#F55A5A", "#2B283A", "#FBF3AB", "#AAD1B6", "#A626D3"]
const colorPicker = document.getElementById("color-picker")
const colorMode = document.getElementById("color-mode")
const colorBtn = document.getElementById("color-btn")
const colorPanel = document.getElementById("color-panel")

colorBtn.addEventListener("click", function(){
    const seedColor = colorPicker.value.replace("#", "")
    const mode = colorMode.value
    getColorScheme(seedColor, mode)
})

function getColorScheme(seedColor, mode) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}&count=5`)
        .then(res => res.json())
        .then(data => {
            const colorArr = data.colors.map(color => color.hex.value)
            renderColor(colorArr)
        })
}

function renderColor(colorArr) {
    const colorCodeHtml = colorArr.map(color => `<p class="color-text">${color}</p>`).join("")
    colorPanel.innerHTML = `<div id="color0"></div>
                <div id="color1"></div>
                <div id="color2"></div>
                <div id="color3"></div>
                <div id="color4"></div>
                ${colorCodeHtml}`
    
    colorArr.forEach(function(color, idx){
        document.getElementById(`color${idx}`).style.background = color 
    })
}

function initialize() {
    renderColor(initialColor)
}

initialize()

