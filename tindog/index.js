import dogData from './data.js'
import Dog from './Dog.js'

let isWaiting = false
const badgeLike = document.getElementById('badge-like')
const badgeNope = document.getElementById('badge-nope')
const btnLike = document.getElementById('btn-like')
const btnNope = document.getElementById('btn-nope')


function getNewDog() {
    const newDogData = dogData.shift()
    return newDogData ? new Dog(newDogData) : {}
}

function like() {
    btnLike.blur()
    if(!isWaiting) {
        badgeLike.style.display = 'block'
        dog.hasBeenLiked = true
        dog.hasBeenSwiped = true
        isWaiting = true
        if(dogData.length > 0) {
            setTimeout(() => {
                dog = getNewDog()
                badgeLike.style.display = 'none'
                render()
                isWaiting = false
            }, 1000)
        }
        else {
            endSwipe()
        }
    }   
}

function nope() {
    btnNope.blur()
    if(!isWaiting) {
        badgeNope.style.display = 'block'
        dog.hasBeenSwiped = true
        isWaiting = true
        if(dogData.length > 0) {
            setTimeout(() => {
                dog = getNewDog()
                badgeNope.style.display = 'none'
                render()
                isWaiting = false
            }, 1000)
        }
        else {
            endSwipe()
        }
    }   
}

btnLike.addEventListener('click', like)
btnNope.addEventListener('click', nope)


function endSwipe() {
    isWaiting = true
    setTimeout(()=>{
        badgeNope.style.display = 'none'
        badgeLike.style.display = 'none'
        document.getElementById('listing-ctn').innerHTML = ``
        document.getElementById('ending-ctn').innerHTML = `
                                        <img class="profile-img" src="./images/ending-bg.jpg" alt="ending background">
                                        <p>Sorry, you've run out all the potential matches here.</p>`
    }, 1000)

}

function render() {
    document.getElementById('listing-ctn').innerHTML = dog.getDogHtml()
}

let dog = getNewDog()
render()