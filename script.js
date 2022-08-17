window.onload = function () {
  // BUTONS
  const addPerson = document.querySelector(".addPerson");
  const openAddForm = document.querySelector(".addForm");
  const cancelBtn = document.getElementById("Cancel");
  const addForm = document.getElementById("Add");
  // const edit = document.querySelector(".edit");
  const tableEl = document.querySelector(".addbook");
  //FORM FIELDS
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  let id;

  //EDIT

  // CREATE DIV
  const addBookDiv = document.querySelector(".addbook");

  // DISPLAY FORM
  addPerson.addEventListener("click", function () {
    openAddForm.style.display = "block";
    overlay.classList.remove("hidden");
  });

  cancelBtn.addEventListener("click", function () {
    openAddForm.style.display = "none";
  });

  addForm.addEventListener("click", addToBook);

  addBookDiv.addEventListener("click", removeEntry);

  // LOCAL STORAGE AND ADDRES BOOK UPDATE
  let addressBook = [];

  class jsonStructure {
    constructor(firstName, lastName, email, phone) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phone = phone;
    }
  }

  function saveContact(id) {
    addressBook[id].firstName = firstNameEdit.value;
    addressBook[id].lastName = lastNameEdit.value;
    addressBook[id].email = emailEdit.value;
    addressBook[id].phone = phoneEdit.value;
    localStorage["addbook"] = JSON.stringify(addressBook);
    showAddressBook();
  }

  function addToBook() {
    let isEmpty =
      firstName.value != "" &&
      lastName.value != "" &&
      email.value != "" &&
      phone.value != "";
    if (isEmpty) {
      let obj = new jsonStructure(
        firstName.value,
        lastName.value,
        email.value,
        phone.value
      );
      console.log(obj);
      addressBook.push(obj);
      localStorage["addbook"] = JSON.stringify(addressBook);
      openAddForm.style.display = "none";
      clearForm();
      showAddressBook();
    }
  }

  function removeEntry(e) {
    if (e.target.classList.contains("del")) {
      let dataID = e.target.getAttribute("data-id");
      addressBook.splice(dataID, 1);
      localStorage["addbook"] = JSON.stringify(addressBook);
      showAddressBook();
    }
  }
  function updateStorage() {
    localStorage.addressBook = JSON.stringify(addressBook);
  }
  function clearForm() {
    let formFields = document.querySelectorAll(".formFields");
    for (let i in formFields) {
      formFields[i].value = "";
    }
  }
  //EDIT FORM
  const openEdit = document.querySelector(".addFormEdit");
  const firstNameEdit = document.getElementById("firstNameEdit");
  const lastNameEdit = document.getElementById("lastNameEdit");
  const emailEdit = document.getElementById("emailEdit");
  const phoneEdit = document.getElementById("phoneEdit");
  const CancelEdit = document.querySelector("#CancelEdit");
  const SaveEdit = document.querySelector("#EditS");

  CancelEdit.addEventListener("click", function () {
    openEdit.style.display = "none";
  });

  tableEl.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("edit")) {
      id = e.target.getAttribute("data-id");

      openEdit.style.display = "block";
      id = e.target.dataset.id;
      firstNameEdit.value = addressBook[id].firstName;
      lastNameEdit.value = addressBook[id].lastName;
      emailEdit.value = addressBook[id].email;
      phoneEdit.value = addressBook[id].phone;
    }
  });

  SaveEdit.addEventListener("click", function (e) {
    e.preventDefault();
    openEdit.style.display = "none";
    saveContact(id);
  });

  function showAddressBook() {
    if (localStorage["addbook"] === undefined) {
      localStorage["addbook"] = "";
    } else {
      addressBook = JSON.parse(localStorage["addbook"]);
      addBookDiv.innerHTML = "";
      for (let i in addressBook) {
        let str = `<div class="entry">
                   <div class="id"><p>${+i + 1}</p></div>  
                   <div class="firstName"><p>${
                     addressBook[i].firstName
                   }</p></div>
                   <div class="lastName"><p>${addressBook[i].lastName}</p></div>
                   <div class="email"><p>${addressBook[i].email}</p></div>
                   <div class="phone"><p>${addressBook[i].phone}</p></div>
                   <div class="btns">
                   <button class="edit" data-id=${i}>Edit</button>
                   <button class="del" data-id=${i}>Delite</button>
                   </div>
                   </div>`;
        addBookDiv.innerHTML += str;
      }
    }
  }

  showAddressBook();
};
