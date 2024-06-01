function singup() {
  event.preventDefault(); // prevent form submit (default behavior)
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('pwd').value;
  var confirmPassword = document.getElementById('pre-pwd').value;

  // Kiểm tra email đã tồn tại
  var existingUser = localStorage.getItem(email);
  if (existingUser) {
    alert('Email đã tồn tại. Vui lòng chọn email khác.');
    return false;
  }
  // Kiểm tra Username không được bỏ trống
  if (username.trim() === '') {
    alert('Vui lòng nhập Tên người dùng.');
    return false;
  }

  // Kiểm tra email không được bỏ trống
  if (email.trim() === '') {
    alert('Vui lòng nhập email.');
    return false;
  }

  // Kiểm tra tính hợp lệ của email
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Vui lòng nhập địa chỉ email hợp lệ.');
    return false;
  }

  // Kiểm tra mật khẩu đúng và nhập lại mật khẩu giống nhau
  if (password.trim() === '') {
    alert('Vui lòng nhập mật khẩu.');
    return false;
  }
  // Kiểm tra mật khẩu theo định dạng "Abc@123"
  var passwordPattern = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordPattern.test(password)) {
    alert('Mật khẩu không hợp lệ. Mật khẩu phải có ít nhất 8 kí tự bao gồm chữ và số');
    return false;
  }
  if (password !== confirmPassword) {
    alert('Mật khẩu không khớp. Vui lòng nhập lại mật khẩu.');
    return false;
  }
  var user = {
    username: username,
    email: email,
    password: password,
  };
  var json = JSON.stringify(user);
  localStorage.setItem(email, json);
  // Nếu tất cả kiểm tra đều thành công, cho phép submit form
  alert("Đăng ký thành công");
  window.location.href = "login.html";
  return true;
}

function login() {
  event.preventDefault(); // prevent form submit (default behavior)
  var email = document.getElementById('email').value;
  var password = document.getElementById('pwd').value;
  var user = localStorage.getItem(email);
  var data = JSON.parse(user);


  // Kiểm tra email không được bỏ trống
  if (email.trim() === '') {
    alert('Vui lòng nhập email.');
    return false;
  }

  // Kiểm tra tính hợp lệ của email
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Vui lòng nhập địa chỉ email hợp lệ.');
    return false;
  }

  // Kiểm tra mật khẩu không bỏ trống
  if (password.trim() === '') {
    alert('Vui lòng nhập mật khẩu.');
    return false;
  }

  //Kiểm tra email có tồn tại
  if (!data) {
    alert("Email không tồn tại");
    return false;
  }
  // Kiểm tra tính đúng sai của mật khẩu
  if (email == data.email && password != data.password) {
    alert("Sai mật khẩu!");
    return false;
  }
  // Nếu kiểm tra tất cả thành công, cho phép đăng nhập
  if (email == data.email && password == data.password) {
    if (email == 'admin@gmail.com') {
      alert("Bạn đã đăng nhập dưới quyền Admin");
      window.location.href = "Admin/dashboard.html";
    } else {
      alert("Đăng nhập thành công");
      window.location.href = "index.html";
    }
  }
  return true;
}
function cancel() {
  // Xóa dữ liệu trong các trường input của form
  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  document.getElementById('pwd').value = '';
  document.getElementById('pre-pwd').value = '';
  return false;
}

function turnback() {
  window.location.href = "index.html";
}

const giohang = [
  { name: 'Ổi trân châu ruột đỏ (1kg)', category: 'trái cây', p_price: '31.000đ', discount: '40%', price: '19.000đ', rating: '4/5', image: 'img/poster_oi.jpg' }

];

// Load data from products.json by jQuery
var products = [];
$.ajax({
  url: 'products.json',
  dataType: 'json',
  success: function (data) {
    products = data;
    console.log(data);
  },
  error: function (xhr, status, error) {
    console.error('Error fetching the products:', error);
  }
});

setTimeout(() => { console.log(products) }, 50)

function searchProduct(keyWord = '') {
  const searchInput = document.getElementById('searchInput');

  var searchResults = products;
  if (keyWord != '') {
    const searchKeyword = keyWord;
    searchResults = products.filter(product => {
      return removeDiacritics(product.category.toLowerCase()).includes(removeDiacritics(searchKeyword));
    });
  }
  else if (searchInput && searchInput.value) {
    const searchKeyword = searchInput.value.toLowerCase();
    searchResults = products.filter(product => {
      return removeDiacritics(product.name.toLowerCase()).includes(removeDiacritics(searchKeyword)) || removeDiacritics(product.category.toLowerCase()).includes(removeDiacritics(searchKeyword));
    });
  }

  var i = 1;
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // Xóa danh sách sản phẩm hiện tạ

  if (searchResults.length === 0) {
    productList.innerHTML = 'Không tìm thấy sản phẩm phù hợp.';
  } else {
    searchResults.forEach(product => {
      var productHtml = `
        <div class="col-3 mb-3" style="margin-top:20px;">
          <div class="card mt-3" style="margin-left: 30px; cursor: pointer;" onclick="searchProductDetail('${product.id}')">
            <img src="${product.image}" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text" style="text-decoration:line-through;">${product.p_price}</p>
              <div class="discount" style="margin-top: -10px;" style="margin-top: -10px;">
                <p style="display: inline;">${product.price}</p>
                <p style="display: inline; background-color: red; color: white; padding: 2px; align-items: center; margin-left: 3px;">${product.discount}</p>
              </div>
              <div class="star-rating" style="padding-top: 5px;" style="padding-top: 5px;">
                ${product.rating}<span class="material-symbols-outlined">grade</span>
              </div>
              <button class="btn btn-success">Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>
      `;
      i += 1;
      if (i > 4) {
        i = 1;
      }
      productList.innerHTML += productHtml;
    });
  }
}

//bat enter
function checkEnterKey(event) {
  if (event.code === 'Enter') {
    searchProduct();
  }
}

// Hàm chuyển đổi từ khóa thành dạng không dấu
function removeDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function searchProductDetail(productId) {
  window.location.href = 'product-detail.html?id=' + productId;
}

function loadProductDetail(productId) {
  const productMain = document.getElementsByClassName('product-main')[0];

  var product = null;
  products.forEach(p => {
    if (p.id == productId) product = p;
  })

  var star = "";
  var ratingStr = product.rating;
  var ratingNumber = +(ratingStr.substring(0, ratingStr.indexOf('/')))

  for(var k = 0; k < 5; k++){
    if(ratingNumber >= 1){
      star += '<i class="fa fa-star"></i>'
      ratingNumber--;
    }
    else if(ratingNumber == 0.5){
      star += '<i class="fa fa-star-half-o"></i>'
      ratingNumber = 0;
    }
    else star += '<i class="fa fa-star-o"></i>'
  }

  var productDetailInfor = `
  <div class="card-wrapper" style="margin-top: 30px; margin-bottom: 60px;">
      <div class="card">
          <div class="product-imgs">
              <div class="img-display">
                  <div class="img-showcase">
                      <img src="${product.img1}" alt="">
                      <img src="${product.img2}" alt="">
                      <img src="${product.img3}" alt="">
                      <img src="${product.img4}" alt="">
                  </div>
              </div>

              <div class="img-select">
                  <div class="img-item">
                      <div onclick="slideImage(1)">
                          <img src="${product.img1}" alt="">
                      </div>
                  </div>

                  <div class="img-item">
                    <div onclick="slideImage(2)">
                        <img src="${product.img2}" alt="">
                    </div>
                  </div>

                  <div class="img-item">
                    <div onclick="slideImage(3)">
                      <img src="${product.img3}" alt="">
                    </div>
                  </div>

                  <div class="img-item">
                    <div onclick="slideImage(4)">
                        <img src="${product.img4}" alt="">
                    </div>
                  </div>
              </div>
          </div>

          <!-- Card right -->
          <div class="product-content">
              <h2 class="product-title">${product.name}</h2>
              <div class="product-rating">
                  ${star}
                  <span>${product.rating}</span>
              </div>

              <div class="product-price">
                  <p class="new-price"><span>${product.price}</span></p>
                  <p>
                      <span class="last-price">${product.p_price}</span>
                      <span class="discount"> ${product.discount} </span>
                  </p>
              </div>

              <div class="purchase-info">
                  <input type="number" min="0" value="1">
                  <button type="button" class="buttn"  onclick="addToCart('${product.name}','${product.category}','${product.image}','${product.price}')">Thêm vào giỏ hàng <i class="fa fa-shopping-cart"></i></button>
                  <button type="button" class="buttn">Mua</button>
              </div>

              <div class="product-detail">
                  <h2>Về sản phẩm: </h2>
                  <p style="white-space: pre-line;">${product.des}</p>
                  <ul>
                      <li>Trạng Thái: <span>Còn hàng</span></li>
                      <lif>Khu Vực Vận Chuyển: <span>Khắp Việt Nam</span></li>
                      <li>Phí Vận Chuyển: <span>20.000Đ</span></li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
  `;

  productMain.innerHTML = productDetailInfor;
}

// Slide - product detail
function slideImage(imgId) {
  const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
  document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

const cart = [];
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartTable = document.getElementById("cart");
    let total = 0;
    cart.forEach(function (item) {
      const row = cartTable.insertRow(-1);
      const nameCell = row.insertCell(0);
      const categoryCell = row.insertCell(1);
      const imageCell = row.insertCell(2);
      const priceCell = row.insertCell(3);
      const quantityCell = row.insertCell(4);
      const removeCell = row.insertCell(5);

      nameCell.textContent = item.name;
      priceCell.textContent = item.price;
      categoryCell.textContent = item.category;

      const quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.value = 1; // Mặc định số lượng là 1
      quantityInput.min = 1; // Số lượng tối thiểu là 1
      quantityInput.oninput = function () {
        updateCartItemTotal(row, item.price);
      };
      quantityCell.appendChild(quantityInput);

      const img = document.createElement("img");
      img.src = item.image;
      imageCell.appendChild(img);

      const removeButton = document.createElement("button");
      removeButton.textContent = "Xóa";
      removeButton.onclick = function () {
        removeCartItem(row);
        updateTotal();
      };
      removeCell.appendChild(removeButton);

      // Cập nhật tổng tiền
      total += item.price;
    });
    document.getElementById("total").textContent = "Tổng tiền: " + total + "VNĐ";
  }
});
function updateCartItemTotal(row, price) {
  const cartTable = document.getElementById("cart");
  const rowIndex = row.rowIndex;
  const quantityInput = cartTable.rows[rowIndex].cells[4].querySelector("input");
  const quantity = parseInt(quantityInput.value);
  const totalPrice = quantity * price;

  cartTable.rows[rowIndex].cells[3].textContent = totalPrice.toFixed(2);

  updateTotal();
}

function updateTotal() {
  const cartTable = document.getElementById("cart");
  let total = 0;

  for (let i = 1; i < cartTable.rows.length; i++) {
    const price = parseFloat(cartTable.rows[i].cells[3].textContent);
    total += price;
  }

  // Hiển thị tổng tiền
  document.getElementById("total").textContent = "Tổng tiền: " + total + "VNĐ";
}
function removeCartItem(row) {
  const cartTable = document.getElementById("cart");
  const rowIndex = row.rowIndex;
  cartTable.deleteRow(rowIndex);
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(rowIndex - 1, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, category, image, price) {
  const item = {
    name: name,
    category: category,
    image: image,
    price: price
  };

  // Kiểm tra xem đã có giỏ hàng trong LocalStorage chưa
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === name) {
        alert("Sản phẩm đã có trong giỏ hàng!");
        return;
      }
    }
  }

  cart.push(item);

  // Lưu giỏ hàng mới vào LocalStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  const cartTable = document.getElementById("cart");
  const row = cartTable.insertRow(-1);
  const nameCell = row.insertCell(0);
  const categoryCell = row.insertCell(1);
  const imageCell = row.insertCell(2);
  const priceCell = row.insertCell(3);
  const quantityCell = row.insertCell(4);
  const removeCell = row.insertCell(5);

  nameCell.textContent = item.name;
  priceCell.textContent = item.price;

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1; // Mặc định số lượng là 1
  quantityInput.min = 1; // Số lượng tối thiểu là 1
  quantityInput.oninput = function () {
    updateCartItemTotal(row, item.price);
  };
  quantityCell.appendChild(quantityInput);
  const img = document.createElement("img");
  img.src = image;
  img.alt = name;
  img.classList.add("product-image");
  imageCell.appendChild(img);

  // Tạo nút xóa sản phẩm
  const removeButton = document.createElement("button");
  removeButton.textContent = "Xóa";
  removeButton.onclick = function () {
    removeCartItem(row);
    updateTotal();
  };
  removeCell.appendChild(removeButton);

  updateTotal();
}