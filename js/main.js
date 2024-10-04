
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productType = document.getElementById("productType");
var productDesc = document.getElementById("productDesc");
var add = document.getElementById("add");
var nameAlert = document.getElementById("nameAlert");
var productList = [];
var shadow;
var mode = "create";

if(localStorage.product != null){
  productList = JSON.parse(localStorage.product)
}
else{
  productList = [];
}

add.onclick = function () {
  // Validate name and description using regex functions
  if (regexName() && regexDesc() && regexPrice() && regexType()) {
    var addProduct = {
      name: productName.value.toLowerCase(),
      price: productPrice.value,
      type: productType.value,
      desc: productDesc.value,
    };
    
    if (
      productName.value !== "" &&
      productPrice.value !== "" &&
      productType.value !== "" &&
      productDesc.value !== "" &&
      productPrice.value <= 500000
    ) {
      nameAlert.classList.add("d-none"); 
      priceAlert.classList.add("d-none");
      typeAlert.classList.add("d-none");
      
      if (mode === "create") {
        productList.push(addProduct);
      } else {
        productList[shadow] = addProduct; // Update existing product
        mode = "create"; // Switch back to create mode
        add.innerHTML = "ADD"; // Reset button text to "ADD"
      }

      display();
      productDesc.classList.remove("is-valid");
      productName.classList.remove("is-valid");
      productPrice.classList.remove("is-valid");
      productType.classList.remove("is-valid");
      localStorage.setItem("product", JSON.stringify(productList)); // Store in localStorage
      clearData();
    } else {
      // Show error message if validation fails
      nameAlert.classList.remove("d-none");
    }
  } else {
    nameAlert.classList.remove("d-none");
  }
};

// Function to clear the form after adding/updating a product
function clearData() {
  productName.value = "";
  productPrice.value = "";
  productType.value = "";
  productDesc.value = "";
}

// Function to display the product list
function display() {
  var cartona = "";

  for (var i = 0; i < productList.length; i++) {
    if (productList[i]) { // Check if the product exists to avoid null errors
      cartona += `<tr>
          <td>${i + 1}</td>
          <td>${productList[i].name}</td>
          <td>${productList[i].price}</td>
          <td>${productList[i].type}</td>
          <td>${productList[i].desc}</td>
          <td><button class="btn update" onclick="updateData(${i})">UPDATE</button></td>
          <td><button onclick="deleteProduct(${i})" class="btn delete">DELETE</button></td>
        </tr>`;
    }
  }

  document.getElementById("tbody").innerHTML = cartona;
  var delall = document.getElementById("deletall");
  if (productList.length > 0) {
    delall.innerHTML = `<button onclick="deleteAll()" class="text-light my-2 mb-3" id="deleteall">DELETE ALL</button>`;
  } else {
    delall.innerHTML = "";
  }
}

// Function to delete a product
function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.product = JSON.stringify(productList);
  display();
}

// Function to delete all products
function deleteAll() {
  localStorage.clear();
  productList.splice(0); // Clear product list
  display();
}

// Function to update product data
function updateData(index) {
  if (productList[index]) { // Check if the product exists
    shadow = index;
    productName.value = productList[index].name;
    productPrice.value = productList[index].price;
    productType.value = productList[index].type;
    productDesc.value = productList[index].desc;
    add.innerHTML = "UPDATE";
    mode = "update"; // Switch mode to update
    scroll({
      top: 0,
    });
  }
}

// Search function to find products by name
function searchData(value) {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i] && productList[i].name.includes(value.toLowerCase())) {
      cartona += `<tr>
      <td>${i + 1}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].type}</td>
      <td>${productList[i].desc}</td>
      <td><button class="btn update" onclick="updateData(${i})">UPDATE</button></td>
      <td><button onclick="deleteProduct(${i})" class="btn delete">DELETE</button></td>
    </tr>`;
    }
  }

  document.getElementById("tbody").innerHTML = cartona;
}

display(); // Initial display of product list

// Regex function for validating description
function regexDesc() {
  var regex = /^[A-Za-z\s]+$/; // Allow alphabet and spaces
  var text = productDesc.value;
  if (regex.test(text)) {
    productDesc.classList.add("is-valid");
    productDesc.classList.remove("is-invalid");
    return true;
  } else {
    productDesc.classList.add("is-invalid");
    productDesc.classList.remove("is-valid");
    return false;
  }
}

// Regex function for validating name
function regexName() {
  var regex = /^(iPhone|Samsung|OnePlus|MacBook|Dell|HP|Lenovo|PlayStation|PlayStation 1|PlayStation 2|PlayStation 3|PlayStation 4|PlayStation 5|PS\d|Xbox|PC|Asus|Acer|Surface|Google Pixel)$/i;
  var text = productName.value;
  if (regex.test(text)) {
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
    return true;
  } else {
    productName.classList.remove("is-valid");
    productName.classList.add("is-invalid");
    nameAlert.classList.remove("d-none");
    return false;
  }
}

function regexPrice(){
  var regex = /^(100000|[1-9][0-9]{0,4})$/
  var text = productPrice.value;
  if (regex.test(text)) {
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    priceAlert.classList.add("d-none");
    return true;
  } else {
    productPrice.classList.remove("is-valid");
    productPrice.classList.add("is-invalid");
    priceAlert.classList.remove("d-none");
    return false;
  }
}


function regexType(){
  var regex = /^(mobile|laptop|pc|console)$/i
  var text = productType.value;
  if (regex.test(text)) {
    productType.classList.add("is-valid");
    productType.classList.remove("is-invalid");
    typeAlert.classList.add("d-none");
    return true;
  } else {
    productType.classList.remove("is-valid");
    productType.classList.add("is-invalid");
    typeAlert.classList.remove("d-none");
    return false;
  }
}