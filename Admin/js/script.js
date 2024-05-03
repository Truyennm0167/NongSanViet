const body = document.querySelector("body"),
sidebarToggle = body.querySelector(".sidebar-toggle"),
sidebar = body.querySelector(".sidebar");


sidebarToggle.addEventListener("click" ,() => {
sidebar.classList.toggle("close");
})
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.product-item').remove();
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function() {
            var quantityElement = this.closest('.product-item').querySelector('.quantity');
            var currentQuantity = parseInt(quantityElement.textContent);
            var newQuantity = prompt('Nhập số lượng mới:', currentQuantity);
            if (newQuantity !== null) {
                if (!isNaN(newQuantity)) {
                    quantityElement.textContent = parseInt(newQuantity);
                } else {
                    alert('Vui lòng nhập một số hợp lệ.');
                }
            }
        });
    });
});

