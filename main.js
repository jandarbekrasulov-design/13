const container = document.getElementById('app');

const jsonString = `[
    {
        "username": "Lionel Messi",
        "id": 1,
        "age": 39,
        "address": {
            "city": "Barcelona",
            "country": "Spain"
        },
        "hobbies": ["football", "basketball", "tennis"],
        "orders": [
            { "id": 1, "name": "iphone", "price": 1000 },
            { "id": 2, "name": "samsung", "price": 800 },
            { "id": 3, "name": "xiaomi", "price": 500 }
        ]
    },
    {
        "username": "Cristiano Ronaldo",
        "id": 2,
        "age": 41,
        "address": {
            "city": "Madrid",
            "country": "Spain"
        },
        "hobbies": ["football", "basketball", "car racing"],
        "orders": [
            { "id": 1, "name": "apple", "price": 100 },
            { "id": 2, "name": "banana", "price": 80 },
            { "id": 3, "name": "orange", "price": 50 }
        ]
    }
]`;

function renderOrders(orders = []) {
    const ordersContainer = document.createElement('div');
    ordersContainer.innerHTML = '<h3>Orders:</h3>';

    orders.forEach((order) => {
        const orderDiv = document.createElement('div');
        orderDiv.innerHTML = `
            <span>Order ID: ${order.id}</span><br>
            <span>Product Name: ${order.name}</span><br>
            <span>Price: $${order.price}</span>
            
        `;
        ordersContainer.appendChild(orderDiv);

        
    });

     const total = orders.reduce((sum, order) => sum + order.price, 0);

    const totalEl = document.createElement('b');
    totalEl.textContent = `Total: $${total}`;
    ordersContainer.appendChild(totalEl);
    return ordersContainer;
}

const renderUsers = (users = []) => {
    users.forEach((user) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h2>${user.username}</h2>
            <span>Age: ${user.age} лет</span><br>
            <span>Address: ${user.address.city}, ${user.address.country}</span><br>
            <span>Hobbies: ${user.hobbies.join(', ')}</span>
        `;
        div.appendChild(renderOrders(user.orders));
        container.appendChild(div);
    });
};

function showError(message) {
    container.innerHTML = '';           
    const p = document.createElement('p');
    p.style.color = 'red';
    p.textContent = message;
    container.appendChild(p);
}

try {
    const users = JSON.parse(jsonString);  
    renderUsers(users);
} catch (err) {
    console.error('Ошибка загрузки пользователей:', err);
    showError('Не удалось загрузить пользователей');
}