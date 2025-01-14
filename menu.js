document.querySelectorAll('.button-menu').forEach(button => {
    button.addEventListener('click', function() {
        const menuItem = button.closest('.menu-item');
        const itemName = menuItem.querySelector('.name').textContent;
        const itemPrice = menuItem.querySelector('.price').textContent;
        const itemImage = menuItem.querySelector('.menu-image').src;
        
        // Debugging alert
        alert(`Item Added: ${itemName} - ${itemPrice} - ${itemImage}`);
        
        addToCart(itemName, itemPrice, itemImage);
    });
});

function addToCart(name, price, image) {
    const cartItem = {
        name: name,
        price: price,
        image: image
    };

    // Get the current cart items from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Clear the current cart items
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        alert('No items in cart!');
    }

    // Loop through each item in the cart and display it
    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-image" />
            <div class="cart-details">
                <span class="cart-name">${item.name}</span>
                <span class="cart-price">${item.price}</span>
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    // Attach event listener to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = button.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartUI();
}

// Initialize the cart UI when the page loads
document.addEventListener('DOMContentLoaded', updateCartUI);
