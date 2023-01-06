if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartButtons)
    for(var i = 0; i < removeCartButtons.length;i++){
        var buttons = removeCartButtons[i]
        buttons.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for( var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', qauntityCh)
    }

    var addToCartbuttons = document.getElementsByClassName('shop-item-button')
    for( var i = 0; i < addToCartbuttons.length; i++){
        var button = addToCartbuttons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-total')[0].addEventListener('click', 
    purchaseClicked)
}

function purchaseClicked(){
    alert('You have purchase')
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var image = shopItem.getElementsByClassName('shop-item-image')[0].src
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    console.log(image,title,price)
    additemtocart(image,title,price)
    updateCartTotal()
}

function additemtocart(image,title,price){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartname = cartItems.getElementsByClassName('cart-item-title')
    for(var i = 0; i < cartname.length; i++){
        if(cartname[i].innerText == title){
            alert('Selected Item is within cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${image}">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <span class="cart-size cart-column">N/A</span>
        <div class="cart-item cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" role="button">REMOVE</button>
        </div>`
        cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', 
    removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',
    qauntityCh)
}


function qauntityCh(event){
    var input = event.target
    if (isNaN(input.value) || input.value <=0 ){
        input.value = 1;
    } 
    updateCartTotal();
}


function removeCartItem(event) {
    var buttonclicked = event.target
    buttonclicked.parentElement.parentElement.remove();
    updateCartTotal()
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')

    var total = 0;

    for(var i = 0; i < cartRows.length;i++){
        var cartRow = cartRows[i];
        var priceElem = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElem = cartRow.getElementsByClassName('cart-quantity-input')[0]
        
        var price = parseFloat(priceElem.innerText.replace('$', ''))
        var quantity = quantityElem.value

        total = total + (price * quantity)
        console.log(price * quantity)
    }
    
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText =  '$' + total
}