// 1. Khai báo các biến toàn cục
const services = []; // Mảng chứa danh sách dịch vụ
let editingIndex = -1; // Biến chỉ định dịch vụ nào đang được sửa
let serviceToDeleteIndex = -1; // Biến chỉ dịch vụ nào đang bị xóa

// Các DOM elements (phần tử trong HTML)
const modal = document.getElementById("service-modal");
const deleteModal = document.getElementById("delete-modal");
const btnAdd = document.getElementById("btn-add");
const btnClose = document.getElementById("close-service");
const btnSave = document.getElementById("save-service");
const nameInput = document.getElementById("service-name");
const descInput = document.getElementById("service-description");
const imageInput = document.getElementById("service-image");
const table = document.querySelector("table");
const btnCancelDelete = document.getElementById("delete-cancel-btn");
const btnConfirmDelete = document.getElementById("delete-confirm-btn");

// 2. Hàm khởi tạo: Đọc từ Local Storage và render danh sách dịch vụ
loadFromLocalStorage();
renderServices();

// 3. Sự kiện khi nhấn các nút
btnAdd.addEventListener("click", openAddModal);
btnClose.addEventListener("click", closeModal);
btnSave.addEventListener("click", saveService);
btnCancelDelete.addEventListener("click", cancelDelete);
btnConfirmDelete.addEventListener("click", confirmDelete);

// 4. Mở Modal thêm dịch vụ
function openAddModal() {
  // Hiển thị modal thêm dịch vụ
  modal.style.display = "block";
  nameInput.value = "";
  descInput.value = "";
  imageInput.value = "";
  editingIndex = -1; // Chỉ rõ rằng không có dịch vụ nào đang được sửa
}

// 5. Đóng Modal
function closeModal() {
  modal.style.display = "none"; // Đóng modal
}

// 6. Lưu dịch vụ vào mảng và Local Storage
function saveService() {
  const name = nameInput.value.trim();
  const desc = descInput.value.trim();
  const image = imageInput.value.trim();

  if (name === "" || desc === "" || image === "") {
    alert("Vui lòng nhập đầy đủ thông tin.");
    return;
  }

  const service = { name, desc, image };

  if (editingIndex === -1) {
    // Nếu không đang sửa, thêm mới dịch vụ
    services.push(service);
  } else {
    // Nếu đang sửa, cập nhật dịch vụ
    services[editingIndex] = service;
    editingIndex = -1; // Kết thúc chế độ sửa
  }

  saveToLocalStorage();
  renderServices();
  closeModal();
}

// 7. Render lại danh sách dịch vụ lên bảng
function renderServices() {
  const rows = services
    .map(
      (service, index) => `
    <tr onclick="viewServiceDetail(${index})">
      <td>${service.name}</td>
      <td>${service.desc}</td>
      <td><img src="${service.image}" alt="${service.name}" style="width: 100px"></td>
      <td>
        <button onclick="editService(${index})">Sửa</button>
        <button onclick="deleteService(${index})">Xóa</button>
      </td>
    </tr>
  `
    )
    .join("");

  table.innerHTML = `
    <tr>
      <th>Tên dịch vụ</th>
      <th>Mô tả</th>
      <th>Hình ảnh</th>
      <th>Thao tác</th>
    </tr>
    ${rows}
  `;
}

// 8. Mở modal để sửa dịch vụ
function editService(index) {
  const service = services[index];
  modal.style.display = "block";
  nameInput.value = service.name;
  descInput.value = service.desc;
  imageInput.value = service.image;
  editingIndex = index; // Đặt lại chỉ mục để biết dịch vụ nào đang sửa
}

// 9. Mở modal xác nhận xóa
function deleteService(index) {
  serviceToDeleteIndex = index;
  deleteModal.style.display = "block"; // Hiện modal xác nhận xóa
}

// 11. Xác nhận xóa dịch vụ
function confirmDelete() {
  if (serviceToDeleteIndex !== -1) {
    services.splice(serviceToDeleteIndex, 1); // Xóa dịch vụ khỏi mảng
    saveToLocalStorage(); // Lưu lại vào Local Storage
    renderServices(); // Cập nhật lại danh sách dịch vụ
  }
  deleteModal.style.display = "none"; // Đóng modal xác nhận
  serviceToDeleteIndex = -1; // Reset lại chỉ mục
}

// 12. Hủy xóa và đóng modal xác nhận
function cancelDelete() {
  deleteModal.style.display = "none"; // Đóng modal xác nhận
  serviceToDeleteIndex = -1; // Reset lại chỉ mục
}

// 13. Lưu dịch vụ vào Local Storage
function saveToLocalStorage() {
  localStorage.setItem("services", JSON.stringify(services));
}

// 14. Đọc dịch vụ từ Local Storage khi tải trang
function loadFromLocalStorage() {
  const data = localStorage.getItem("services");
  if (data) {
    services.push(...JSON.parse(data));
  }
}
