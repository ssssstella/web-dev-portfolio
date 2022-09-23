const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T",
"U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
"t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#",
"$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

let pw1El = document.getElementById("pw1-el")
let pw2El = document.getElementById("pw2-el")
let pwLen = 0

function render() {
    var pwLenEl = Number(document.getElementById("pw-len-el").value)
    if (pwLenEl != NaN && pwLenEl > 9 && pwLenEl < 17) {
        pwLen = pwLenEl
        genPasswords()
    } else {
        pw1El.textContent = "Length not valid!"
        pw2El.textContent = "Length not valid!"
    }
}

function genPasswords() {
    let pw1 = ""
    let pw2 = ""
    for(let i = 0; i < pwLen; i++) {
        let idx1 = getRandomNumber(characters.length)
        let idx2 = getRandomNumber(characters.length)
        pw1 += characters[idx1]
        pw2 += characters[idx2]
    }
    pw1El.textContent = pw1
    pw2El.textContent = pw2
}

function getRandomNumber(range) {
    return Math.floor(Math.random() * range)
}

