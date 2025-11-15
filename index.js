 // Menu Data
const menu = [
 { name: " butter paneer ", category: "veg", price: 120, img:"images/paneer.jpg" },
  { name: "Masala Dosa", category: "veg", price: 120, img: "images/dosa.jpg" },
  { name: "Veg Fried Rice", category: "veg", price: 140, img:"images/fried.jpg"},
  { name: "Chicken Biryani", category: "nonveg", price: 250, img: "images/chniken briyani.jpg" },
  { name: "Butter Chicken", category: "nonveg", price: 280, img: "images/butter.jpg" },
  { name: "Cold Coffee", category: "beverages", price: 80, img: "images/Cold Coffee.jpg" },
  { name: "Lassi", category: "beverages", price: 70, img: "images/paneer.jpg" },
  { name: "Mutton Curry", category: "nonveg", price: 300, img: "images/curry.jpg" },
  { name: "Chole Bhature", category: "veg", price: 130, img:"images/chniken briyani.jpg" },
  { name: "Mango Shake", category: "beverages", price: 100, img:"images/egg curry.jpg" },
];

const menuContainer = document.getElementById("menu-items");
const buttons = document.querySelectorAll(".filter-btn");
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const orderBtn = document.getElementById("order-btn");
const orderStatusDiv = document.getElementById("order-status");
const statusText = document.getElementById("status-text");

let cart = [];

// Display Menu Items
function displayMenu(items) {
  menuContainer.innerHTML = items.map(item => `
    <div class="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-transform animate-fadeIn">
      <img src="${item.img}" class="w-full h-48 object-cover" alt="${item.name}">
      <div class="p-4 text-left">
        <h3 class="text-lg font-semibold">${item.name}</h3>
        <p class="text-red-600 font-bold mb-2">₹${item.price}</p>
        <button class="add-to-cart bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                data-name="${item.name}" data-price="${item.price}">
          Add to Cart
        </button>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.name, parseInt(btn.dataset.price));
    });
  });
}

// Filtering Logic
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("bg-red-600", "text-white"));
    btn.classList.add("bg-red-600", "text-white");

    const category = btn.dataset.category;
    if (category === "all") displayMenu(menu);
    else displayMenu(menu.filter(i => i.category === category));
  });
});

// Add to Cart
function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) existing.qty++;
  else cart.push({ name, price, qty: 1 });
  updateCart();
}

// Update Cart
function updateCart() {
  cartItemsContainer.innerHTML = cart.map(i => `
    <div class="flex justify-between py-2 border-b">
      <span>${i.name} (x${i.qty})</span>
      <span>₹${i.price * i.qty}</span>
    </div>
  `).join("");

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  totalPriceElement.textContent = "₹" + total;
}

// Place Order
orderBtn.addEventListener("click", () => {
  if (cart.length === 0) return alert("Cart is empty!");

  orderStatusDiv.classList.remove("hidden");
  statusText.textContent = "Processing...";
  statusText.classList.add("text-yellow-500");

  setTimeout(() => {
    statusText.textContent = "Cooking...";
    statusText.classList.replace("text-yellow-500", "text-orange-500");
  }, 2000);

  setTimeout(() => {
    statusText.textContent = "Out for Delivery 🚴‍♂️";
    statusText.classList.replace("text-orange-500", "text-blue-600");
  }, 5000);

  setTimeout(() => {
    statusText.textContent = "Delivered ✅";
    statusText.classList.replace("text-blue-600", "text-green-600");
    cart = [];
    updateCart();
  }, 8000);
});

// Initial Load
displayMenu(menu);
