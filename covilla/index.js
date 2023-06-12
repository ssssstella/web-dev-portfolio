// scroll actions

    //header
let logo = document.querySelector("header .logo");
let btn_des = document.querySelector(".btn-des");
let overlay = document.getElementById("overlay");
let nav = document.getElementById("nav");

window.addEventListener("scroll", function () {
    let scrollTop = document.documentElement.scrollTop;

    //header animation
    logo.style.opacity = scrollTop < 250 ? Math.max(0, 1 - scrollTop / 500) : Math.min(1, (scrollTop - 250) / 250);
    logo.style.color = scrollTop < 250 ? "white" : "#121212";
    btn_des.style.color = scrollTop < 250 ? "white" : "#121212";
    btn_des.style.opacity = scrollTop < 250 ? Math.max(0, 1 - scrollTop / 500) : Math.min(1, (scrollTop - 250) / 250);

    overlay.style.opacity = scrollTop > 0 ? 1 : 0;
    overlay.style.height = scrollTop < 500 ? `${scrollTop / 500 * 80}px` : '80px';

    nav.innerHTML = scrollTop > 0 ? '<a href="about.html">About</a><a href="">Journal</a><a href="support.html">Support</a>' : "";
    nav.style.opacity = scrollTop < 250 ? 0 : Math.min(1, (scrollTop - 250) / 250);

});

// menu animation
let menu_open = document.getElementById("menu-open");
let menu_close = document.getElementById("menu-close");
let menu = document.getElementById("menu");

menu_open.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.style.left = 0;
})

// dropdown animation
let dropdown_box = document.querySelector(".dropdown-box");
let btn_des_down = document.querySelector(".btn-des .ph-caret-down");
let btn_des_up = document.querySelector(".btn-des .ph-caret-up");

btn_des.addEventListener("click", (e) => {
    e.stopPropagation();
    if (dropdown_box.style.display === "none") {
        dropdown_box.style.display = "block";
        btn_des_down.style.display = "none";
        btn_des_up.style.display = "inline";
    } else {
        dropdown_box.style.display = "none";
        btn_des_down.style.display = "inline";
        btn_des_up.style.display = "none";
    }
})

document.addEventListener("click", () => {
    if (menu.style.left === "0px") {
        menu.style.left = "-500px";
    }

    if (dropdown_box.style.display === "block") {
        dropdown_box.style.display = "none";
        btn_des_down.style.display = "inline";
        btn_des_up.style.display = "none";
    }
})



// promotion video
let videoMask = document.querySelector(".promotion-video-mask");
let videoHover = document.querySelector(".promotion-video-hover");
let videoHoverBtn = document.querySelector(".promotion-video-hover-button");
let videoWave = document.querySelector(".promotion-video-wave");
let videoContent = document.querySelector(".promotion-video-bg video");

videoMask.addEventListener("mouseenter", () => {
    videoWave.style.opacity = 1;
    videoWave.classList.add("waveIn");
    videoContent.style.display = "block";
    videoHover.classList.add("video-button-hover1");
    videoHoverBtn.classList.add("video-button-hover2");
})

videoMask.addEventListener("mousemove", (e) => {
    let movingXMax = videoMask.offsetWidth - videoHover.offsetWidth;
    let movingYMax = videoMask.offsetHeight - videoHover.offsetHeight;

    let movingX = e.offsetX - videoHover.offsetWidth / 2;
    let movingY = e.offsetY - videoHover.offsetHeight / 2;
    
    if (movingX < 0) {
        movingX = 0;
    } else if (movingX > movingXMax) {
        movingX = movingXMax;
    }

    if (movingY < 0) {
        movingY = 0;
    } else if (movingY > movingYMax) {
        movingY = movingYMax;
    }

    videoHover.style.left = `${movingX + 75}px`;
    videoHover.style.top = `${movingY + 75}px`;
 
})

videoMask.addEventListener("mouseleave", () => {
    videoWave.style.opacity = 0;
    videoWave.classList.remove("waveIn");
    videoContent.style.display = "none";
    videoHover.classList.remove("video-button-hover1");
    videoHoverBtn.classList.remove("video-button-hover2");
    videoHover.style.left = "75px";
    videoHover.style.top = "75px";
})


// render carousel
function renderCarousel(left, right, objs, renderCallback) {
    let current = 0;

    left.addEventListener("click", () => {
        if (current === 0) {
            current = objs.length - 1;
        } else {
            current--;
        }
        renderCallback(current);
    })

    right.addEventListener("click", () => {
        if (current === objs.length - 1) {
            current = 0;
        } else {
            current++;
        }
        renderCallback(current);
    })
}

// promotion carousel
let promoLeftArrow = document.querySelector(".promotion-left-arrow");
let promoRightArrow = document.querySelector(".promotion-right-arrow");
let promoBgImgs = ["images/greece1.jpg", "images/egypt1.jpg", "images/indonesia1.jpg"];
let promo = document.querySelector(".promotion");
let promoPriceHtml = ["<h4>Thessaloniki, Greece</h4><p>starting at $6700</p>", 
                        "<h4>Bahariya Oasis</h4><p>starting at $6400</p>", 
                        "<h4>Denpasar, Indonesia</h4><p>starting at $1900</p>"];
let promoPrice = document.querySelector(".promotion-price");

function renderPromoBg(current) {
    promo.style.backgroundImage = `url(${promoBgImgs[current]})`;
}

renderCarousel(promoLeftArrow, promoRightArrow, promoBgImgs, renderPromoBg);

function renderPromoPrice(current) {
    promoPrice.innerHTML = promoPriceHtml[current];
}
renderCarousel(promoLeftArrow, promoRightArrow, promoPriceHtml, renderPromoPrice);

// destination carousel
let desLeftArrow = document.querySelector(".destination-left-arrow");
let desRightArrow = document.querySelector(".destination-right-arrow");
let desPics = document.querySelectorAll(".destination-photo-card");

function renderDesPic(current) {
    for (let i = 0; i < desPics.length; i++) {
        if (i === current) {
            desPics[i].style.opacity = 1;
        } else {
            desPics[i].style.opacity = 0;
        }
    }
}

renderCarousel(desLeftArrow, desRightArrow, desPics, renderDesPic);

// testimonial carousel
let tesLeftArrow = document.querySelector(".testimonial-left-arrow");
let tesRightArrow = document.querySelector(".testimonial-right-arrow");
let tesMsgs = document.querySelectorAll(".testimonial-msg");
let tesIdct = document.querySelector(".testimonial-indicator");

let tesIdctStr = "";
for (let i = 0; i < tesMsgs.length; i++) {
    tesIdctStr += `<div class="testimonial-indicator-dot">${i + 1}</div>`;
}
tesIdct.innerHTML = tesIdctStr;
let tesIdctDots = document.querySelectorAll(".testimonial-indicator-dot");

function renderTesMsg(current) {
    for (let i = 0; i < tesMsgs.length; i++) {
        if (i === current) {
            tesMsgs[i].classList.add("fadeIn");
            setTimeout(() => {
                tesMsgs[i].classList.remove("fadeIn");
            }, 2000);
            tesMsgs[i].style.opacity = 1;
            tesIdctDots[i].style.borderLeft = "4px solid white";
        } else {
            tesMsgs[i].style.opacity = 0;
            tesIdctDots[i].style.borderLeft = "none";
        }
    }
}

renderCarousel(tesLeftArrow, tesRightArrow, tesMsgs, renderTesMsg);

// location card switch
let location_names = document.getElementById("location-names");

location_names.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.dataset.location) {
        const id = Number(e.target.dataset.location) - 1;
        let location_name_cards = document.querySelectorAll(".location-name-card");
        let dots = document.querySelectorAll(".dot");
        let dot_outlines = document.querySelectorAll(".dot-outline");
        let location_cards = document.querySelectorAll(".location-cards");

        for (let i = 0; i < 4; i++) {
            if (i < id) {
                location_name_cards[i].style.borderBottom = "3px solid black";
                dots[i].style.backgroundColor = "black";
                dot_outlines[i].style.display = "none";
                location_cards[i].style.display = "none";
            } else if (i === id) {
                location_name_cards[i].style.borderBottom = "3px solid black";
                dots[i].style.backgroundColor = "black";
                dot_outlines[i].classList.add("scaleIn");
                setTimeout(() => {
                    dot_outlines[i].classList.remove("scaleIn");
                }, 1000);
                dot_outlines[i].style.display = "block";
                location_cards[i].style.display = "flex";
            }
            else {
                location_name_cards[i].style.borderBottom = "3px solid rgb(222, 222, 222)";
                dots[i].style.backgroundColor = "rgb(222, 222, 222)";
                dot_outlines[i].style.display = "none";
                location_cards[i].style.display = "none";
            }

        }
    }

})




