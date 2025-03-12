const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.total');
const clearCartButton = document.querySelector('.clear-cart');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const name = product.getAttribute('data-name');
        const price = parseFloat(product.getAttribute('data-price'));
        
        addToCart(name, price);
    });
});

function addToCart(item, price) {
    const newItem = document.createElement('li');
    newItem.innerHTML = `${item} - $${price}`;
    
    cartItems.appendChild(newItem);
    
    const currentTotal = parseFloat(cartTotal.innerHTML);
    cartTotal.innerHTML = (currentTotal + price).toFixed(2);
}

clearCartButton.addEventListener('click', () => {
    cartItems.innerHTML = '';
    cartTotal.innerHTML = '0';
});

fetch('products.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.setAttribute('data-name', product.name);
            productDiv.setAttribute('data-price', product.price);
            
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>Цена: $${product.price}</p>
                <button class="add-to-cart">Добавить в корзину</button>`;
                
            document.querySelector('.catalog').appendChild(productDiv);
        });
        
        // Добавляем обработчики событий для кнопок "Добавить в корзину"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const product = button.parentElement;
                const name = product.getAttribute('data-name');
                const price = parseFloat(product.getAttribute('data-price'));
                
                addToCart(name, price);
            });
        });
    });
