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
        alert("Đăng nhập thành công")
        window.location.href="index.html";
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



const products = [
  { name: 'Ổi trân châu ruột đỏ',       category: 'trái cây', price: '21.000đ', image: 'img/poster_oi.jpg' },
  { name: 'Xoài keo',     category: 'trái cây', price: '21.000đ', image: 'img/poster_xoai.jpg'},
  { name: 'Dưa hấu',  category: 'trái cây', price: '21.000đ', image: 'img/poster_duahau.jpg'},
  { name: 'Chuối già Nam Mỹ', category: 'trái cây', price: '21.000đ', image: 'img/poster_chuoi.jpg'},
  { name: 'Cam sành', category: 'trái cây', price: '21.000đ', image: 'img/poster_cam.jpg'},
  
  { name: '', category: 'rau củ', price: '21.000đ', image: 'img/poster_cam.jpg'},
  { name: 'cam', category: 'rau củ', price: '21.000đ', image: 'img/poster_cam.jpg'},
  { name: 'cam', category: 'rau củ', price: '21.000đ', image: 'img/poster_cam.jpg'},
  { name: 'cam', category: 'rau củ', price: '21.000đ', image: 'img/poster_cam.jpg'},
  { name: 'cam', category: 'rau củ', price: '21.000đ', image: 'img/poster_cam.jpg'},

  { name: 'Nấm đông cô', category: 'nấm', price: '21.000đ', image: 'img/poster_namdongco.jpg' },
  { name: 'Nấm Linh Chi', category: 'nấm', price: '21.000đ', image: 'img/linhchi1.jpg' },
  // Thêm các sản phẩm khác vào đây
];
function searchProduct() {
  const searchInput = document.getElementById('searchInput');
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
                  <div class="col-md-4 col-sm-6 mb-5">
                      <div class="card ms-5 mt-5 w-75">
                          <img src="${product.image}" class="card-img-top p-2 rounded-4" alt="${product.name}">
                          <div class="card-body">
                              <h5 class="card-title">${product.name}</h5>
                              <p class="card-text">${product.price} đ</p>
                              <button class="btn btn-primary">Thêm vào giỏ hàng</button>
                          </div>
                      </div>
                  </div>
              `;
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
