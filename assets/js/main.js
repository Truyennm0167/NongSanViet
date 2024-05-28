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
      username : username,
      email : email,
      password : password,
   };
   var json = JSON.stringify(user);
   localStorage.setItem(email,json);
    // Nếu tất cả kiểm tra đều thành công, cho phép submit form
    alert("Đăng ký thành công");
    window.location.href="login.html";
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
    if(email == data.email  && password != data.password){
      alert("Sai mật khẩu!");
      return false;
    }
    // Nếu kiểm tra tất cả thành công, cho phép đăng nhập
    if(email == data.email  && password == data.password){
      if(email == 'admin@gmail.com'){
        alert("Bạn đã đăng nhập dưới quyền Admin");
        window.location.href="Admin/dashboard.html";
      } else {
        alert("Đăng nhập thành công");
        window.location.href="index.html";  
      }
    } 
    return true;
  }
function cancel() {
    // Xóa dữ liệu trong các trường input của form
    document.getElementById('username').value ='';
    document.getElementById('email').value = '';
    document.getElementById('pwd').value = '';
    document.getElementById('pre-pwd').value = '';
    return false;
}
function turnback(){
  window.location.href="index.html";
}


const giohang =[
  { name: 'Ổi trân châu ruột đỏ (1kg)', category: 'trái cây', p_price: '31.000đ', discount: '40%', price: '19.000đ', rating: '4/5',   image: 'img/poster_oi.jpg' }

];

const products = [
  { id: "TC001", name: 'Ổi trân châu ruột đỏ (1kg)', category: 'trái cây', p_price: '31.000đ', discount: '40%', price: '19.000đ', rating: '4/5',   image: 'img/poster_oi.jpg' },
  { id: "TC002", name: 'Xoài keo (2-3 trái)',        category: 'trái cây', p_price: '25.000đ', discount: '28%', price: '18.000đ', rating: '4.5/5', image: 'img/poster_xoai.jpg'},
  { id: "TC003", name: 'Dưa hấu đỏ (1.8kg)',         category: 'trái cây', p_price: '38.000đ', discount: '11%', price: '34.000đ', rating: '5/5',   image: 'img/poster_duahau.jpg'},
  { id: "TC004", name: 'Chuối già Nam Mỹ (1kg)',     category: 'trái cây', p_price: '33.000đ', discount: '21%', price: '26.000đ', rating: '3.5/5', image: 'img/poster_chuoi.jpg'},
  { id: "TC005", name: 'Cam sành túi (0.9-1.1kg)',   category: 'trái cây', p_price: '25.000đ', discount: '20%', price: '21.000đ', rating: '4/5',   image: 'img/poster_cam.jpg'},
  
  { id: "RL001", name: 'Rau muống (500g)',           category: 'rau lá',   p_price: '14.000đ', discount: '12%', price: '12.000đ', rating: '4.5/5', image: 'img/poster_raumuong.jpg'},
  { id: "RL002", name: 'Cải ngọt (500g)',            category: 'rau lá',   p_price: '15.000đ', discount: '32%', price: '10.000đ', rating: '4/5',   image: 'img/poster_caingot.jpg'},
  { id: "RL003", name: 'Mồng tơi (500g)',            category: 'rau lá',   p_price: '15.000đ', discount: '33%', price: '10.000đ', rating: '5/5',   image: 'img/poster_mongtoi.jpg'},
  { id: "RL004", name: 'Xà lách (500g)',             category: 'rau lá',   p_price: '16.000đ', discount: '20%', price: '13.000đ', rating: '4/5',   image: 'img/poster_xalach.jpg'},
  { id: "RL005", name: 'Hành lá (100g)',             category: 'rau lá',   p_price: '7.000đ',  discount: '5%',  price: '7.000đ',  rating: '4/5',   image: 'img/poster_hanhla.jpg'},

  { id: "CQ001", name: 'Cà rốt (500g)',              category: 'củ quả',   p_price: '10.000đ', discount: '0%',  price: '10.000đ', rating: '3/5',   image: 'img/carot1.jpg'},
  { id: "CQ002", name: 'Hành tây (500g)',            category: 'củ quả',   p_price: '18.000đ', discount: '0%',  price: '18.000đ', rating: '4/5',   image: 'img/poster_cuhanhtay.jpg'},
  { id: "CQ003", name: 'Khoai tây (500g)',           category: 'củ quả',   p_price: '15.000đ', discount: '0%',  price: '15.000đ', rating: '4.5/5', image: 'img/poster_khoaitay.jpg'},
  { id: "CQ004", name: 'Củ cải trắng',               category: 'củ quả',   p_price: '10.000đ', discount: '0%',  price: '10.000đ', rating: '5/5',   image: 'img/poster_cucaitrang.jpg'},
  { id: "CQ005", name: 'Su hào (500g)',              category: 'củ quả',   p_price: '16.000đ', discount: '0%',  price: '16.000đ', rating: '5/5',   image: 'img/suhao1.jpg'},

  { id: "N001,", name: 'Nấm đùi gà (200g)',          category: 'nấm',      p_price: '31.000đ', discount: '18%', price: '25.000đ', rating: '5/5',   image: 'img/duiga1.jpg' },
  { id: "N002,", name: 'Nấm linh chi (150g)',        category: 'nấm',      p_price: '33.000đ', discount: '0%',  price: '33.000đ', rating: '5/5',   image: 'img/linhchi1.jpg' },
  { id: "N003,", name: 'Nấm hương (150g)',           category: 'nấm',      p_price: '33.000đ', discount: '15%', price: '28.000đ', rating: '4.5/5', image: 'img/namhuong1.jpg' },
  { id: "N004,", name: 'Nấm tuyết Vietfresh (50g)',  category: 'nấm',      p_price: '30.000đ', discount: '0%',  price: '30.000đ', rating: '4/5',   image: 'img/namtuyet1.jpg' },
  { id: "N005,", name: 'Nấm linh chi nâu 150g',      category: 'nấm',      p_price: '33.000đ', discount: '0%',  price: '33.000đ', rating: '3/5',   image: 'img/linhchinau1.jpg' },
  // Thêm các sản phẩm khác vào đây
];

function searchProduct() {
  const searchInput = document.getElementById('searchInput');

  var searchResults = products;
  if (searchInput && searchInput.value) {
    const searchKeyword = searchInput.value.toLowerCase();
    searchResults = products.filter(product => {
      return removeDiacritics(product.name.toLowerCase()).includes(removeDiacritics(searchKeyword)) || removeDiacritics(product.category.toLowerCase()).includes(removeDiacritics(searchKeyword));
    });
  } 

  var i = 1;
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // Xóa danh sách sản phẩm hiện tạ

  console.log(searchResults)
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
      if(i>4){
        i = 1;
      }
      productList.innerHTML += productHtml;
    });
  }
}

//bat enter
function checkEnterKey(event){
  if (event.code === 'Enter'){
    searchProduct();
  }
}

// Hàm chuyển đổi từ khóa thành dạng không dấu
function removeDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function searchProductDetail(productId){
  window.location.href = 'product-detail.html?id=' + productId;
}

function loadProductDetail(productId){
  const productMain = document.getElementsByClassName('product-main')[0];

  var productDetailInfor = `
  <div class="card-wrapper" style="margin-top: 30px; margin-bottom: 60px;">
      <div class="card">
          <div class="product-imgs">
              <div class="img-display">
                  <div class="img-showcase">
                      <img src="img/cam1.jpg" alt="">
                      <img src="img/cam2.jpg" alt="">
                      <img src="img/cam3.jpg" alt="">
                      <img src="img/cam4.jpg" alt="">
                  </div>
              </div>

              <div class="img-select">
                  <div class="img-item">
                      <a href="#" data-id="1">
                          <img src="img/cam1.jpg" alt="">
                      </a>
                  </div>

                  <div class="img-item">
                      <a href="#" data-id="2">
                          <img src="img/cam2.jpg" alt="">
                      </a>
                  </div>

                  <div class="img-item">
                      <a href="#" data-id="3">
                          <img src="img/cam3.jpg" alt="">
                      </a>
                  </div>

                  <div class="img-item">
                      <a href="#" data-id="4">
                          <img src="img/cam4.jpg" alt="">
                      </a>
                  </div>
              </div>
          </div>

          <!-- Card right -->
          <div class="product-content">
              <h2 class="product-title">Cam sành túi (0.9-1.1kg)</h2>
              <div class="product-rating">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star-half-o"></i>
                  <i class="fa fa-star-o"></i>
                  <span>4.2(15)</span>
              </div>

              <div class="product-price">
                  <p class="new-price"><span>18.000VNĐ</span></p>
                  <p>
                      <span class="last-price">25.000VNĐ</span>
                      <span class="discount"> 28% </span>
                  </p>
              </div>

              <div class="purchase-info">
                  <input type="number" min="0" value="1">
                  <button type="button" class="buttn"  onclick="addToCart('Cam sành túi (0.9-1.1kg)','trái cây','img/cam1.jpg',18000)">Thêm vào giỏ hàng <i class="fa fa-shopping-cart"></i>
                  </button>
                  <button type="button" class="buttn">Mua
                  </button>
              </div>

              <div class="product-detail">
                  <h2>Về sản phẩm: </h2>
                  <p>- Ổi trân châu ruột đỏ giòn ngọt, tươi ngon, trái to, không bị dập. Ổi có ruột màu đỏ hồng vô cùng hấp dẫn, ổi ngọt ngon. Ổi ngon, được đóng gói cẩn thận, tiện lợi, là loại trái cây cung cấp nhiều dưỡng chất cho cơ thể. Ổi ngon, giòn nhất khi trái chắc, xanh sáng, cầm nặng tay.</p>
                  <p>- Sản phẩm sạch, đạt tiêu chuẩn kiểm nghiệm VS ATTP.</p>
                  <p>- Cam kết hoàn tiền hoặc giao lại ngay sản phẩm trong tất cả trường hợp khách nhận sản phẩm không đạt chất lượng gồm ổi bị dập, úng hoặc hư hỏng bên trong.</p>
                  <p>- Liên hệ tổng đài 1900.1908 để được hỗ trợ nhanh nhất, hoặc để lại thông tin sản phẩm hư hỏng trên web/app theo hướng dẫn tại đây</p>
                  <ul>
                      <li>Trạng Thái: <span>Còn hàng</span></li>
                      <li>Khu Vực Vận Chuyển: <span>Khắp Việt Nam</span></li>
                      <li>Phí Vận Chuyển: <span>20.000Đ</span></li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
  `;

  productMain.innerHTML = productDetailInfor;
}

function cam_redirect() {
  window.location.href = "item_info/cam_info.html";
}

function chuoi_redirect() {
  window.location.href = "item_info/chuoi_info.html";
}

function duahau_redirect() {
  window.location.href = "item_info/duahau_info.html";
}

function oi_redirect() {
  window.location.href = "item_info/oi_info.html";
}

function xoai_redirect() {
  window.location.href = "item_info/xoai_info.html";
}

function raumuong_redirect() {
  window.location.href = "item_info/raumuong_info.html";
}

function caingot_redirect() {
  window.location.href = "item_info/caingot_info.html";
}

function mongtoi_redirect() {
  window.location.href = "item_info/mongtoi_info.html";
}

function xalach_redirect() {
  window.location.href = "item_info/xalach_info.html";
}

function hanhla_redirect() {
  window.location.href = "item_info/hanhla_info.html";
}

function carot_redirect() {
  window.location.href = "item_info/carot_info.html";
}

function hanhtay_redirect() {
  window.location.href = "item_info/hanhtay_info.html";
}

function khoaitay_redirect() {
  window.location.href = "item_info/khoaitay_info.html";
}

function cucaitrang_redirect() {
  window.location.href = "item_info/cucaitrang_info.html";
}

function suhao_redirect() {
  window.location.href = "item_info/suhao_info.html";
}

function namhuong_redirect() {
  window.location.href = "item_info/namhuong_info.html";
}

function namlinhchi_redirect() {
  window.location.href = "item_info/namlinhchi_info.html";
}

function namlinhchinau_redirect() {
  window.location.href = "item_info/namlinhchinau_info.html";
}

function namtuyet_redirect() {
  window.location.href = "item_info/namtuyet_info.html";
}

function namduiga_redirect() {
  window.location.href = "item_info/namduiga_info.html";
}
const cart = [];
document.addEventListener("DOMContentLoaded", function() {
  if(localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const cartTable = document.getElementById("cart");
      let total = 0;
      cart.forEach(function(item) {
          const row = cartTable.insertRow(-1);
          const nameCell = row.insertCell(0);
          const categoryCell = row.insertCell(1);
          const imageCell = row.insertCell(2);
          const priceCell = row.insertCell(3);
          const quantityCell = row.insertCell(4);
          const removeCell = row.insertCell(5);

          nameCell.textContent = item.name;
          priceCell.textContent = item.price;
          categoryCell.textContent= item.category;

          const quantityInput = document.createElement("input");
          quantityInput.type = "number";
          quantityInput.value = 1; // Mặc định số lượng là 1
          quantityInput.min = 1; // Số lượng tối thiểu là 1
          quantityInput.oninput = function() {
            updateCartItemTotal(row, item.price);
          };
          quantityCell.appendChild(quantityInput);

          const img = document.createElement("img");
          img.src = item.image;
          imageCell.appendChild(img);

          const removeButton = document.createElement("button");
          removeButton.textContent = "Xóa";
          removeButton.onclick = function() {
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
  document.getElementById("total").textContent = "Tổng tiền: " + total +"VNĐ";
}
function removeCartItem(row) {
  const cartTable = document.getElementById("cart");
  const rowIndex = row.rowIndex;
  cartTable.deleteRow(rowIndex);
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(rowIndex - 1, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name,category, image, price) {
  const item = {
      name: name,
      category:category,
      image: image ,
      price: price
  };

  // Kiểm tra xem đã có giỏ hàng trong LocalStorage chưa
  let cart = [];
  if(localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      for(let i = 0; i < cart.length; i++) {
        if(cart[i].name === name) {
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
  quantityInput.oninput = function() {
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
  removeButton.onclick = function() {
      removeCartItem(row);
      updateTotal();
  };
  removeCell.appendChild(removeButton);

  updateTotal();
}