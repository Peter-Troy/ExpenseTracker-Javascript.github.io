const entryList = document.getElementById("entryList");
const searchInput = document.getElementById("searchInput");
const totalPriceDisplay = document.getElementById("totalPriceDisplay"); // Assuming you have an element with this ID in your HTML

function displayEntries() {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    let total = 0;  // Rename the variable to avoid shadowing

    entryList.innerHTML = ""; // Clear existing list items

    entries.forEach(entry => {
        const listItem = document.createElement("li");
        const entryTotalPrice = parseFloat(entry.price) * parseFloat(entry.quantity);

        listItem.textContent = `Product: ${entry.product}, Quantity: ${entry.quantity}, Price per Product: ${entry.price}, Total Price: ${entryTotalPrice.toFixed(2)}, Date: ${entry.date}`;
        listItem.classList.add("entry-item"); // Apply the CSS class to the list item
        entryList.appendChild(listItem);

        // Accumulate the total price
        total += entryTotalPrice;
    });

    // Display the total price
    totalPriceDisplay.textContent = `Total Price: ${total.toFixed(2)}`;
}


function confirmClearEntries() {
    const confirmed = confirm("Are you sure you want to clear all entries?");
    if (confirmed) {
        clearEntries();
    }
}

function clearEntries() {
    localStorage.removeItem("entries");
    entryList.innerHTML = "";
}

function searchEntries() {
    const searchQuery = searchInput.value.toLowerCase();
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    const matchingEntries = entries.filter(entry =>
        entry.product.toLowerCase().includes(searchQuery)
    );

    // Clear existing list items
    entryList.innerHTML = "";

    // Add the matching entries to the list
matchingEntries.forEach(entry => {
    const listItem = document.createElement("li");

    // Calculate the total price for the current entry
    const entryTotalPrice = parseFloat(entry.price) * parseFloat(entry.quantity);

    listItem.textContent = `Product: ${entry.product}, Quantity: ${entry.quantity}, Price per Product: ${entry.price}, Total Price: ${entryTotalPrice.toFixed(2)}, Date: ${entry.date}`;
    listItem.classList.add("entry-item"); // Apply the CSS class to the list item
    entryList.appendChild(listItem);
});
}



function exportToCSV() {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];

    if (entries.length === 0) {
        alert("No entries to export.");
        return;
    }

    let csvContent = "Product,Price,Date\n"; // Header row

    entries.forEach(entry => {
        csvContent += `${entry.product},${entry.price},${entry.date}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "entries.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

window.onload = () => {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    displayEntries(entries);
};
