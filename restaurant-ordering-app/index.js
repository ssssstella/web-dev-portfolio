import { menuArray } from "./data.js";
let orderItems = []
let orderTotal = 0
const paymentForm = document.getElementById("payment-form")
const orderSummary = document.getElementById("order-summary")


document.addEventListener('click', function(e){
    if (e.target.dataset.add) {
        handleAddItemClick(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        handleRemoveItemClick(e.target.dataset.remove)
    }
    else if(e.target.id === 'order-btn') {
        handleOrderClick()
    } 
})

paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    const paymentFormData = new FormData(paymentForm)
    const fullName = paymentFormData.get("fullname")
    document.getElementById('payment-modal').classList.add('hidden')
    orderSummary.innerHTML = ``
    orderSummary.classList.add('hidden')
    renderConfirmationMsg(fullName)
    
})

function renderConfirmationMsg(name) {
    const orderConfirmation = document.getElementById('order-confirmation')
    orderConfirmation.innerHTML = `<h2 class="confirmation-msg">Thanks, ${name}! Your order is on its way!</h2>`
    orderConfirmation.classList.remove('hidden')
}

function handleAddItemClick(menuItemId) {
    const targetMenuItem = menuArray.filter(function(menuItem){
        return Number(menuItemId) === menuItem.id
    })[0]
    orderItems.push(targetMenuItem)
    orderTotal += targetMenuItem.price  
    renderOrderSummary(orderItems, orderTotal)
}

function handleRemoveItemClick(itemIdx) {
    const idx = Number(itemIdx)
    const targetRemoveItem = orderItems[idx]
    orderTotal -= targetRemoveItem.price  
    orderItems.splice(idx, 1)
    renderOrderSummary(orderItems, orderTotal)
}

function renderOrderSummary(orderItems, orderTotal) {
    let orderItemHtml = ``
    orderItems.forEach(function(item, idx){
        orderItemHtml += `<div class="order-item">
                            <h2>${item.name}</h2>
                            <button class="remove-btn" data-remove="${idx}">remove</button>
                            <div class="price-ctn">
                                <h4 class="checkout-price">$${item.price}</h4>
                            </div>
                        </div>`
    })
    orderSummary.innerHTML = `<h2 class="order-summary-title">Your order</h2>
                            ${orderItemHtml}
                            <div class="order-summary-divider"></div>
                            <div class="order-total">
                                <h2>Total price:</h2>
                                <div class="price-ctn">
                                    <h4 class="checkout-price" id="price-total">$${orderTotal}</h4>
                                </div>
                            </div>
                            <button id="order-btn">Complete order</button>`
    orderSummary.classList.remove('hidden')
}

function handleOrderClick() {
    document.getElementById('payment-modal').classList.remove('hidden')
    orderItems = []
    orderTotal = 0
}

function getMenuHtml() {
    let menuHtml = ``
    menuArray.forEach(function(menuItem){
        menuHtml += `<div class="menu-item-ctn">
                        <h1 class="menu-item-emoji">${menuItem.emoji}</h1>
                        <div class="menu-item-info">
                            <h2 class="menu-text">${menuItem.name}</h1>
                            <p class="menu-text ingredients">${menuItem.ingredients.join(", ")}</p>
                            <h4 class="menu-text">$${menuItem.price}</h4>
                        </div>
                        <span class="menu-btn-ctn">
                            <i class="fa-regular fa-square-plus fa-3x" data-add="${menuItem.id}"></i>
                        </span>
                    </div> `
    })
    return menuHtml
}

function renderMenu() {
    document.getElementById("menu").innerHTML = getMenuHtml()
}

renderMenu()