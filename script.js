// To have the dropdown animation when loading into the services page
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card, index) => {
      setTimeout(() => {
          card.classList.add("animate-drop");
      }, index * 200);
  });

  const cardContents = document.querySelectorAll(".card-content");

  cardContents.forEach((content) => {
      content.addEventListener("mouseover", () => {
          content.classList.add("card-hover");
      });

      content.addEventListener("mouseout", () => {
          content.classList.remove("card-hover");
      });
  });
});

// Levitating effect for hovering above the service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
      document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      document.querySelectorAll('.service-radio').forEach(r => r.classList.remove('selected'));
      card.querySelector('.service-radio').classList.add('selected');
  });
});

// Creating the order in the order page
function submitOrder() {
  const selectedDate = document.getElementById('date').value;
  const selectedTime = document.getElementById('time').value;
  const address = document.getElementById('address').value;
  const selectedServiceCard = document.querySelector('.service-card.selected');

  if (!selectedDate || !selectedTime || !address || !selectedServiceCard) {
      alert('Please fill in all fields and select a service before submitting.');
      return;
  }

  const selectedService = selectedServiceCard.getAttribute('data-service'); // From the order page selected service cards

  const order = {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      address: address,
  };

  // Retrieve existing orders or initialize a new array
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);

  // Save updated orders array to localStorage
  localStorage.setItem('orders', JSON.stringify(orders));

  // Display success message and track order button
  const messageContainer = document.getElementById('order-message');
  messageContainer.innerHTML = `
      <p class="text-success fw-bold">Order submitted successfully!</p>
      <button class="btn btn-success mt-3 rounded-5" onclick="window.location.href='orders.html'">Track Your Order</button>
  `;

  // Redisplay the 'Submit order' button into a "make an order" button
  const submitOrderButton = document.getElementById('reorder');
  submitOrderButton.innerHTML = `
      <button class="btn-submit btn d-block mx-auto my-5 btn-lg btn-success rounded-5" onclick="window.location.href='order.html'">Make another order</button>
  `;

  // Clear the message after a few seconds
  setTimeout(() => {
      messageContainer.innerHTML = `
          <button class="btn btn-success mt-3 rounded-5" onclick="window.location.href='orders.html'">Track Your Order</button>
      `;
  }, 5000);
}

// Makes the selection from the services page carry into the order page
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedService = urlParams.get('service');

  if (selectedService) {
      const serviceCards = document.querySelectorAll('.service-card');
      serviceCards.forEach(card => {
          if (card.getAttribute('data-service') === selectedService) {
              card.classList.add('selected');
              const serviceRadio = card.querySelector('.service-radio');
              if (serviceRadio) {
                  serviceRadio.classList.add('selected');
              }
          }
      });
  }
});

// Display orders in tracking orders page
function displayAllOrders() {
  const orderDetailsContainer = document.getElementById('order-details');
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  if (orders.length === 0) {
      orderDetailsContainer.innerHTML = `
          <p class="text-danger">No orders found. Please place an order first.</p>
      `;
      return;
  }

  orderDetailsContainer.innerHTML = '';

  orders.forEach((order, index) => {
      const orderCard = document.createElement('div');
      orderCard.classList.add('card', 'mb-3');
      orderCard.innerHTML = `
          <div class="card-body">
              <h5 class="card-title">Order #${index + 1}</h5>
              <p class="card-text"><strong>Service:</strong> ${order.service}</p>
              <p class="card-text"><strong>Date:</strong> ${order.date}</p>
              <p class="card-text"><strong>Time:</strong> ${order.time}</p>
              <p class="card-text"><strong>Address:</strong> ${order.address}</p>
              <button class="btn btn-danger mt-2" onclick="removeOrder(${index})">Remove Order</button>
          </div>
      `;
      orderDetailsContainer.appendChild(orderCard);
  });
}

function removeOrder(orderIndex) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  if (orderIndex < 0 || orderIndex >= orders.length) {
      console.error("Invalid order index:", orderIndex);
      return;
  }

  orders.splice(orderIndex, 1);

  localStorage.setItem('orders', JSON.stringify(orders));

  displayAllOrders();
}

document.addEventListener('DOMContentLoaded', displayAllOrders);

// Login form (checks for name and password for staff)
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  const staffCredentials = [
      { name: 'andy', password: 'andy123' },
      { name: 'john', password: 'john123' },
      { name: 'manager', password: 'manager123' },
      { name: '1', password: '1' }
  ];

  const isStaffValid = staffCredentials.some(staff => staff.name === name && staff.password === password);
  localStorage.setItem('loggedInStaff', name);

  if (isStaffValid) {
      alert('Welcome, Staff!');
      window.location.href = 'staff.html';
  } else {
      alert('Invalid login credentials. Please try again.');
  }
});

// Removes any local storage for staff's name
function logOut() {
  localStorage.removeItem('loggedInStaff');
}
