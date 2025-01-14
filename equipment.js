// When the equipment page loads, initialize the event listeners
document.addEventListener('DOMContentLoaded', initializeEquipmentPage);

function initializeEquipmentPage() {
    // Get all the 'Add to Cart' buttons on the equipment page
    const addToCartButtons = document.querySelectorAll('.cc1');
    
    // Attach event listeners to each button
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemElement = button.closest('.testimonial');
            const item = {
                name: itemElement.querySelector('.name').textContent,
                description: itemElement.querySelector('.feedback').textContent,
                price: itemElement.querySelector('.price').textContent,
                image: itemElement.querySelector('.user-image').src,
            };
            addToCart(item);
        });
    });
}

// Add an item to the cart
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item); // Add the new item to the cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart to localStorage
    alert(`${item.name} has been added to your cart!`); // Display the alert message
}
