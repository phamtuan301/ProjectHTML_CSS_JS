document.addEventListener("DOMContentLoaded", function () {
  loadSchedules();
  document.querySelector(".add-schedule").addEventListener("click", openModal);
});
let editIndex = null;
const deleteModal = document.getElementById("delete-modal");
function openModal() {
  resetScheduleForm();
  document.getElementById("modal-background").style.display = "block";
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    console.log(name, email);
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
  } else {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
  }
  editIndex = null;
  document.getElementById("class").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time-slot").value = "";
}
function closeModal() {
  document.getElementById("modal-background").style.display = "none";
  editIndex = null;
}
function openDeleteModal(index) {
  deleteModal.style.display = "block";
  deleteModal.dataset.index = index;
}

function closeDeleteModal() {
  deleteModal.style.display = "none";
}

function saveSchedule() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  let userKey = `${user.email}`;
  let schedules = JSON.parse(localStorage.getItem(userKey)) || [];

  const isEdit = editIndex !== null;

  let classSelect = document.getElementById("class");
  let dateInput = document.getElementById("date");
  let timeSlotSelect = document.getElementById("time-slot");

  document.querySelectorAll(".warning").forEach((el) => el.remove());

  let isValid = true;

  if (!classSelect.value || classSelect.value === "Chọn lớp học") {
    let warning = document.createElement("p");
    warning.textContent = "Vui lòng chọn lớp học";
    warning.style.color = "red";
    warning.classList.add("warning");
    classSelect.insertAdjacentElement("afterend", warning);
    isValid = false;
  }
  // if (!dateInput.value) {
  //   let warning = document.createElement("p");
  //   warning.textContent = "Vui lòng chọn ngày tập";
  //   warning.style.color = "red";
  //   warning.classList.add("warning");
  //   dateInput.insertAdjacentElement("afterend", warning);
  //   isValid = false;
  // }
  // if (!timeSlotSelect.value || timeSlotSelect.value === "Chọn khung giờ") {
  //   let warning = document.createElement("p");
  //   warning.textContent = "Vui lòng chọn khung giờ";
  //   warning.style.color = "red";
  //   warning.classList.add("warning");
  //   timeSlotSelect.insertAdjacentElement("afterend", warning);
  //   isValid = false;
  // }
  if (!dateInput.value) {
    let warning = document.createElement("p");
    warning.textContent = "Vui lòng chọn ngày tập";
    warning.style.color = "red";
    warning.classList.add("warning");
    dateInput.insertAdjacentElement("afterend", warning);
    isValid = false;
  } else {
    const today = new Date();
    const selectedDate = new Date(dateInput.value);
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      let warning = document.createElement("p");
      warning.textContent = "Ngày bạn chọn không hợp lệ! Vui lòng chọn lại!";
      warning.style.color = "red";
      warning.classList.add("warning");
      dateInput.insertAdjacentElement("afterend", warning);
      isValid = false;
    } else if (selectedDate.getTime() === today.getTime()) {
      const now = new Date();
      const currentHour = now.getHours();
      const selectedTime = timeSlotSelect.value;
      if (selectedTime) {
        const selectedHour = parseInt(selectedTime.split(":")[0]);
        if (selectedHour <= currentHour) {
          let warning = document.createElement("p");
          warning.textContent = "Khung giờ không hợp lệ! Vui lòng chọn lại!";
          warning.style.color = "red";
          warning.classList.add("warning");
          timeSlotSelect.insertAdjacentElement("afterend", warning);
          isValid = false;
        }
      }
    }
  }

  if (!isValid) return;

  let selectedDate = dateInput.value;
  let selectedTime = timeSlotSelect.value;

  let isDuplicate = schedules.some((s, index) => {
    return (
      s.date === selectedDate && s.time === selectedTime && index !== editIndex
    );
  });

  if (isDuplicate) {
    let warning = document.createElement("p");
    warning.textContent = "Khung giờ này đã được đặt, vui lòng chọn lịch khác.";
    warning.style.color = "red";
    warning.classList.add("warning");
    timeSlotSelect.insertAdjacentElement("afterend", warning);
    return;
  }

  let schedule = {
    class: classSelect.value,
    date: selectedDate,
    time: selectedTime,
    name: user.fullName || "",
    email: user.email || "",
  };

  if (isEdit) {
    schedules[editIndex] = schedule;
  } else {
    schedules.push(schedule);
  }

  localStorage.setItem(userKey, JSON.stringify(schedules));
  closeModal();
  loadSchedules();
  editIndex = null;
}

// function loadSchedules() {
//   const user = JSON.parse(localStorage.getItem("currentUser"));
//   if (!user) return;

//   let userKey = `${user.email}`;
//   let schedules = JSON.parse(localStorage.getItem(userKey)) || [];
//   let tbody = document.querySelector("#schedule-table tbody");
//   tbody.innerHTML = "";
//   schedules.forEach((schedule, index) => {
//     tbody.innerHTML += `<tr>
//       <td class="td">${schedule.class}</td>
//       <td>${schedule.date}</td>
//       <td>${schedule.time}</td>
//       <td>${schedule.name}</td>
//       <td>${schedule.email}</td>
//       <td>
//         <button class="edit" onclick="editSchedule(${index})">Sửa</button>
//         <button class="delete" onclick="openDeleteModal(${index})">Xóa</button>
//       </td>
//     </tr>`;
//   });
// }
function loadSchedules() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  let userKey = `${user.email}`;
  let schedules = JSON.parse(localStorage.getItem(userKey)) || [];

  // schedules.sort((a, b) => {
  //   // let classA = a.class.toLowerCase();
  //   // let classB = b.class.toLowerCase();

  //   // if (classA < classB) return -1;
  //   // if (classA > classB) return 1;
  //   let dateTimeA = new Date(`${a.date}T${a.time}`);
  //   let dateTimeB = new Date(`${b.date}T${b.time}`);
  //   return dateTimeA - dateTimeB;
  // });
  // schedules.sort((a, b) => {
  //   const dateA = new Date(a.date);
  //   const dateB = new Date(b.date);
  //   return dateA - dateB;
  // });
  schedules.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA - dateB !== 0) {
      return dateA - dateB;
    }
    const timeA = parseInt(a.time);
    const timeB = parseInt(b.time);
    return timeA - timeB;
  });
  localStorage.setItem(userKey, JSON.stringify(schedules));

  let tbody = document.querySelector("#schedule-table tbody");
  tbody.innerHTML = "";

  schedules.forEach((schedule, index) => {
    tbody.innerHTML += `<tr>
      <td class="td">${schedule.class}</td>
      <td>${schedule.date}</td>
      <td>${schedule.time}</td>
      <td>${schedule.name}</td>
      <td>${schedule.email}</td>
      <td>
        <button class="edit" onclick="editSchedule(${index})">Sửa</button>
        <button class="delete" onclick="openDeleteModal(${index})">Xóa</button>
      </td>
    </tr>`;
  });
}

function editSchedule(index) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  let userKey = `${user.email}`;
  let schedules = JSON.parse(localStorage.getItem(userKey)) || [];
  let schedule = schedules[index];

  editIndex = index;
  document.getElementById("modal-background").style.display = "block";
  document.getElementById("class").value = schedule.class;
  document.getElementById("date").value = schedule.date;
  document.getElementById("time-slot").value = schedule.time;
}

function deleteSchedule() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  let userKey = `${user.email}`;
  let schedules = JSON.parse(localStorage.getItem(userKey)) || [];
  schedules.splice(deleteModal.dataset.index, 1);
  localStorage.setItem(userKey, JSON.stringify(schedules));
  closeDeleteModal();
  loadSchedules();
}
function resetScheduleForm() {
  document.getElementById("class").value = "Chọn lớp học";
  document.getElementById("date").value = "";
  document.getElementById("time-slot").value = "Chọn khung giờ";
  document.querySelectorAll(".warning").forEach((el) => el.remove());
}
