let homeScore = 0
let guestScore = 0
let homeScoreEl = document.getElementById("home-score-el")
let guestScoreEl = document.getElementById("guest-score-el")

function homeAdd1Pt() {
    homeScore += 1
    homeScoreEl.textContent = homeScore
}

function homeAdd2Pts() {
    homeScore += 2
    homeScoreEl.textContent = homeScore
}

function homeAdd3Pts() {
    homeScore += 3
    homeScoreEl.textContent = homeScore
}

function guestAdd1Pt() {
    guestScore += 1
    guestScoreEl.textContent = guestScore
}

function guestAdd2Pts() {
    guestScore += 2
    guestScoreEl.textContent = guestScore
}

function guestAdd3Pts() {
    guestScore += 3
    guestScoreEl.textContent = guestScore
}

function newGame() {
    homeScore = 0
    guestScore = 0
    homeScoreEl.textContent = homeScore
    guestScoreEl.textContent = guestScore
}