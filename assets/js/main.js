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

// Load data from products.json by jQuery
var products = [];
$.ajax({
  url: 'products.json',
  dataType: 'json',
  success: function (data) {
    products = data;
  },
  error: function (xhr, status, error) {
    console.error('Error fetching the products:', error);
  }
});

// Hàm load product by keyword
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
  productList.innerHTML = ''; // Xóa danh sách sản phẩm hiện tại

  if (searchResults.length === 0) {
    productList.innerHTML = 'Không tìm thấy sản phẩm phù hợp.';
  } else {
    searchResults.forEach(product => {
      var priceContainer = "";
      if(product.discount != 0){
        var priceDiscounted = +product.price * (1 - product.discount);
        priceContainer = `
          <p class="card-text" style="text-decoration:line-through; font-style: italic;">${formatPrice(+product.price)}</p>
          <div class="discount" style="margin-top: -10px;" style="margin-top: -10px;">
            <p style="display: inline;">${formatPrice(priceDiscounted)} VNĐ</p>
            <p style="display: inline; background-color: red; color: white; padding: 2px; align-items: center; margin-left: 3px;">${+(product.discount * 100) + "%"}</p>
          </div>
        `
      } else {
        priceContainer = `
          <p class="card-text">${formatPrice(+product.price)} VNĐ</p>
        `
      }
      
      var productHtml = `
        <div class="col-3 mb-3" style="margin-top:20px;">
          <div class="card mt-3" style="margin-left: 30px; cursor: pointer;" onclick="searchProductDetail('${product.id}')">
            <img src="${product.image}" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              ${priceContainer}
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

//Bắt phím enter khi tìm kiếm sản phẩm
function checkEnterKey(event) {
  if (event.code === 'Enter') {
    searchProduct();
  }
}

// Hàm chuyển đổi từ khóa thành dạng không dấu
function removeDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Hàm format giá tiền
function formatPrice(number) {
  return number.toLocaleString('de-DE');
}

// Hàm chuyển tới trang chi tiết sản phẩm
function searchProductDetail(productId) {
  window.location.href = 'product-detail.html?id=' + productId;
}

// Hàm load chi tiết sản phẩm với productId tương ứng
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

  var priceContainer = "";
  if(product.discount != 0){
    var priceDiscounted = +product.price * (1 - product.discount);
    priceContainer = `
    <p class="new-price"><span>${formatPrice(priceDiscounted)} VNĐ</span></p>
    <p>
        <span class="last-price">${formatPrice(+product.price)}</span>
        <span class="discount">${(product.discount * 100) + "%"}</span>
    </p>
    `
  } else {
    priceContainer = `
    <p class="new-price"><span>${formatPrice(+product.price)} VNĐ</span></p>
    `
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
                  ${priceContainer}
              </div>

              <div class="purchase-info">
                  <input type="number" min="0" value="1" id="quality">
                  <button type="button" class="buttn" onclick="addToCart('${product.id}')">Thêm vào giỏ hàng <i class="fa fa-shopping-cart"></i></button>
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

function searchProductsByCategory(category) {
  window.location.href = 'product.html?category=' + category;
}

// Hàm thực hiện thêm sản phẩm vào giỏ hàm
function addToCart(productId) {
  var quality = document.getElementById("quality").value;
  const item = {
    productId: productId,
    quality: quality
  };

  // Kiểm tra xem đã có giỏ hàng trong LocalStorage chưa
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }

  var exist = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === item.productId) {
      cart[i].quality = +(cart[i].quality) + +(item.quality);
      exist = true;
      break;
    }
  }
  if(!exist){
    cart.push(item);
  }

  alert("Thêm sản phẩm vào giỏ hàng thành công");

  // Lưu giỏ hàng mới vào LocalStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getProductById(productId){
  var res = null;
  products.forEach(product => {
    if(product.id == productId){
      res = product;
    }
  })
  return res;
}

// Hàm load hiển thị giỏ hàm trong trang giỏ hàng
function loadCart(){
  if(localStorage.getItem("cart") != '[]'){

    document.getElementsByClassName("cart-container")[0].innerHTML = `
      <table class="table" id="cart">
        <thead>
            <tr>
                <th class="col-2">Tên</th>
                <th class="col-2">Loại</th>
                <th class="col-2">Hình ảnh <img src="" alt=""></th>
                <th class="col-1">Đơn giá</th>
                <th class="col-1">Số lượng</th>
                <th class="col-1">Thành tiền</th>
                <th class="col-1"></th>
            </tr>
        </thead>
        <tbody>
            <!---->
        </tbody>
      </table>
      <div>
          <b style="text-align: right; font-size: larger;">
              <p id="total">Tổng tiền: 0đ</p>
          </b>
          <div class="d-flex justify-content-between">
              <a href="product.html" class="btn btn-success buy-extra">Mua thêm sản phẩm</a>
              <a href="payment.html" class="btn btn-danger">Thanh toán</a>
          </div>
      </div>
    `
    var cart = JSON.parse(localStorage.getItem("cart"));
    var cartTable = document.getElementById("cart");

    cart.forEach(function(item){
      var product = getProductById(item.productId)

      var row = cartTable.insertRow();
      var nameCell = row.insertCell(0);
      var categoryCell = row.insertCell(1);
      var imageCell = row.insertCell(2);
      var priceCell = row.insertCell(3);
      var quantityCell = row.insertCell(4);
      var t_priceCell = row.insertCell(5);
      var removeCell = row.insertCell(6);

      nameCell.textContent = product.name;
      categoryCell.textContent = product.category;

      var img = document.createElement("img");
      img.src = product.image;
      imageCell.appendChild(img)

      var priceLastest = +(product.discount == 0 ? product.price : product.price * product.discount);
      priceCell.textContent = formatPrice(priceLastest) + " VNĐ";
      quantityCell.textContent = item.quality;

      t_priceCell.textContent = formatPrice(priceLastest * item.quality) + " VNĐ";

      var removeButton = document.createElement("button")
      removeButton.textContent = "Xóa";
      removeButton.onclick = function(){
        removeCartItem(row);
      }
      removeCell.appendChild(removeButton);

    })
    updateTotal(cart);
  } else {
    document.getElementsByClassName("cart-container")[0].innerHTML = `
      <div class="text-center">
        <span style="font-size: 24px">Bạn chưa có sản phẩm trong giỏ hàng</span>
      </div>
      <div class="d-flex justify-content-between">
        <a href="product.html" class="btn btn-success buy-extra">Mua thêm sản phẩm</a>
      </div>
    `
  }

}

// Hàm tính và cập nhật tổng tiền trong trang giỏ hàng
function updateTotal(cart) {
  let total = 0;

  cart.forEach(item => {
    const product = getProductById(item.productId);
    var priceLastest = +(product.discount == 0 ? product.price : product.price * product.discount);
    total += +(priceLastest * item.quality);
  })
  // Hiển thị tổng tiền
  document.getElementById("total").textContent = "Tổng tiền: " + formatPrice(total) + " VNĐ";
}

// Hàm thực hiện xóa item trong giỏ hàng - xóa row
function removeCartItem(row) {
  const cartTable = document.getElementById("cart");
  const rowIndex = row.rowIndex;
  cartTable.deleteRow(rowIndex);
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(rowIndex - 1, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateTotal(cart);
}