// When the cart page loads, update the cart UI
document.addEventListener('DOMContentLoaded', updateCartUI);

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear the current cart items
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'Your cart is empty!';
        cartItems.appendChild(emptyMessage);
        totalPriceElement.textContent = '0 AED'; // Update total when cart is empty
        return;
    }

    let total = 0;

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

        // Extract numeric value from the price string and add it to the total
        const itemPrice = parseFloat(item.price.replace('AED', '').trim()); // Remove "AED" and convert to number
        total += itemPrice;
    });

    // Update the total price display
    totalPriceElement.textContent = `${total.toFixed(2)} AED`;

    // Attach event listener to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = button.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}

// Remove an item from the cart and update the localStorage
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart to localStorage

    updateCartUI(); // Update the cart UI
}

// Back to Menu functionality
document.getElementById('back-to-menu').addEventListener('click', function() {
    window.location.href = 'menu.html'; // Redirect to the menu page
});
