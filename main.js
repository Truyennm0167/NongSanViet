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




const products = [
  { name: 'Ổi trân châu ruột đỏ (1kg)', category: 'trái cây', p_price: '31.000đ', discount: '40%', price: '19.000đ', rating: '4/5',   image: 'img/poster_oi.jpg' },
  { name: 'Xoài keo (2-3 trái)',        category: 'trái cây', p_price: '25.000đ', discount: '28%', price: '18.000đ', rating: '4.5/5', image: 'img/poster_xoai.jpg'},
  { name: 'Dưa hấu đỏ (1.8kg)',         category: 'trái cây', p_price: '38.000đ', discount: '11%', price: '34.000đ', rating: '5/5',   image: 'img/poster_duahau.jpg'},
  { name: 'Chuối già Nam Mỹ (1kg)',     category: 'trái cây', p_price: '33.000đ', discount: '21%', price: '26.000đ', rating: '3.5/5', image: 'img/poster_chuoi.jpg'},
  { name: 'Cam sành túi (0.9-1.1kg)',   category: 'trái cây', p_price: '25.000đ', discount: '20%', price: '21.000đ', rating: '4/5',   image: 'img/poster_cam.jpg'},
  
  { name: 'Rau muống (500g)',           category: 'rau lá',   p_price: '14.000đ', discount: '12%', price: '12.000đ', rating: '4.5/5', image: 'img/poster_raumuong.jpg'},
  { name: 'Cải ngọt (500g)',            category: 'rau lá',   p_price: '15.000đ', discount: '32%', price: '10.000đ', rating: '4/5',   image: 'img/poster_caingot.jpg'},
  { name: 'Mồng tơi (500g)',            category: 'rau lá',   p_price: '15.000đ', discount: '33%', price: '10.000đ', rating: '5/5',   image: 'img/poster_mongtoi.jpg'},
  { name: 'Xà lách (500g)',             category: 'rau lá',   p_price: '16.000đ', discount: '20%', price: '13.000đ', rating: '4/5',   image: 'img/poster_xalach.jpg'},
  { name: 'Hành lá (100g)',             category: 'rau lá',   p_price: '7.000đ',  discount: '5%',  price: '7.000đ',  rating: '4/5',   image: 'img/poster_hanhla.jpg'},

  { name: 'Cà rốt (500g)',              category: 'củ quả',   p_price: '10.000đ', discount: '0%',  price: '10.000đ', rating: '3/5',   image: 'img/carot1.jpg'},
  { name: 'Hành tây (500g)',            category: 'củ quả',   p_price: '18.000đ', discount: '0%',  price: '18.000đ', rating: '4/5',   image: 'img/poster_cuhanhtay.jpg'},
  { name: 'Khoai tây (500g)',           category: 'củ quả',   p_price: '15.000đ', discount: '0%',  price: '15.000đ', rating: '4.5/5', image: 'img/poster_khoaitay.jpg'},
  { name: 'Củ cải trắng',               category: 'củ quả',   p_price: '10.000đ', discount: '0%',  price: '10.000đ', rating: '5/5',   image: 'img/poster_cucaitrang.jpg'},
  { name: 'Su hào (500g)',              category: 'củ quả',   p_price: '16.000đ', discount: '0%',  price: '16.000đ', rating: '5/5',   image: 'img/suhao1.jpg'},

  { name: 'Nấm đùi gà (200g)',          category: 'nấm',      p_price: '31.000đ', discount: '18%', price: '25.000đ', rating: '5/5',   image: 'img/duiga1.jpg' },
  { name: 'Nấm linh chi (150g)',        category: 'nấm',      p_price: '33.000đ', discount: '0%',  price: '33.000đ', rating: '5/5',   image: 'img/linhchi1.jpg' },
  { name: 'Nấm hương (150g)',           category: 'nấm',      p_price: '33.000đ', discount: '15%', price: '28.000đ', rating: '4.5/5', image: 'img/namhuong1.jpg' },
  { name: 'Nấm tuyết Vietfresh (50g)',  category: 'nấm',      p_price: '30.000đ', discount: '0%',  price: '30.000đ', rating: '4/5',   image: 'img/namtuyet1.jpg' },
  { name: 'Nấm linh chi nâu 150g',      category: 'nấm',      p_price: '33.000đ', discount: '0%',  price: '33.000đ', rating: '3/5',   image: 'img/linhchinau1.jpg' },
  // Thêm các sản phẩm khác vào đây
];
function searchProduct() {
  const searchInput = document.getElementById('searchInput');
  var i = 1;
  if (searchInput && searchInput.value) {
      const searchKeyword = searchInput.value.toLowerCase();
      const searchResults = products.filter(product => {
          return removeDiacritics(product.name.toLowerCase()).includes(removeDiacritics(searchKeyword)) || removeDiacritics(product.category.toLowerCase()).includes(removeDiacritics(searchKeyword));
      });

      const productList = document.getElementById('productList');
      productList.innerHTML = ''; // Xóa danh sách sản phẩm hiện tại

      if (searchResults.length === 0) {
          productList.innerHTML = 'Không tìm thấy sản phẩm phù hợp.';
      } else {
          searchResults.forEach(product => {
              const productHtml = `
                  <div class="col-3 mb-5" style="margin-top:20px;">
                      <div class="card mt-5" style="margin-left: 30px;">
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
  } else {
      // Xử lý trường hợp không có giá trị nhập vào hoặc không tìm thấy phần tử
      console.error('Không tìm thấy phần tử input hoặc không có giá trị nhập vào');
  }
}

// Hàm chuyển đổi từ khóa thành dạng không dấu
function removeDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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