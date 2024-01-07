const productForm = document.getElementById("productForm");
const productNameSelect = document.getElementById("productName");
const quantityInput = document.getElementById("quantity");
const priceInput = document.getElementById("price");
const dateInput = document.getElementById("date");
const submitBtn = document.getElementById("submitBtn");
const addNewProductBtn = document.getElementById("addNewProductBtn");

addNewProductBtn.addEventListener("click", () => {
    const newProduct = prompt("Enter new product name:");
    if (newProduct) {
        addNewProductToStorage(newProduct);
        populateProductOptions();
    }
});

function addNewProductToStorage(newProduct) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
}

submitBtn.addEventListener("click", () => {
    const product = productNameSelect.value;
    const quantity = quantityInput.value;
    const price = priceInput.value;
    const date = dateInput.value;

    if (product && quantity && price && date) {
        saveEntryToLocalStorage(product, quantity, price, date);
        alert("Entry submitted successfully!");
        clearForm();
        productForm.classList.add("hidden");
    } else {
        alert("Please fill out all fields.");
    }
});

function populateProductOptions() {
    const productNameSelect = document.getElementById("productName");
    const products = JSON.parse(localStorage.getItem("products")) || [];

    productNameSelect.innerHTML = "";

    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product;
        option.textContent = product;
        productNameSelect.appendChild(option);
    });
}

function saveEntryToLocalStorage(product, quantity, price, date) {
    const entry = {
        product: product,
        quantity: quantity,
        price: price,
        date: date
    };

    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));
}

function clearForm() {
    productNameSelect.value = "";
    quantityInput.value = "";
    priceInput.value = "";
    dateInput.value = "";
}

window.onload = () => {
    populateProductOptions();
};
