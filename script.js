
document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCountDisplay = document.getElementById("cart-count");
    const totalPriceDisplay = document.getElementById("total-price");
    const confirmOrderButton = document.querySelector("#cart button"); // Select the Confirm Order button

    // Select all "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const productDiv = event.target.closest("div");
            const name = productDiv.querySelector("h3").innerText.trim();
            const priceText = productDiv.querySelector("p").innerText.trim();
            const price = parseFloat(priceText.replace("price $", "").trim());

            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`;
            cartItemsContainer.appendChild(li);
            total += item.price * item.quantity;
        });

        cartCountDisplay.textContent = `Items: ${cart.reduce((sum, item) => sum + item.quantity, 0)}`;
        totalPriceDisplay.textContent = `Total: $${total.toFixed(2)}`;
    }

    // ✅ Make the "Confirm Order" button work
    confirmOrderButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before confirming your order.");
        } else {
            alert("🎉 Thank you for your order! Your total is $" + totalPriceDisplay.textContent.split('$')[1]);

            // Clear the cart
            cart.length = 0;
            updateCart();
        }
    });
});
