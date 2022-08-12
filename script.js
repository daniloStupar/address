window.onload = function () {
  // BUTONS
  const addPerson = document.querySelector(".addPerson");
  const openAddForm = document.querySelector(".addForm");
  const cancelBtn = document.getElementById("Cancel");
  const addForm = document.getElementById("Add");
  const edit = document.querySelector(".edit");
  //FORM FIELDS
  const personID = document.getElementById("ID");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  // CREATE DIV
  const addBookDiv = document.querySelector(".addbook");

  // DISPLAY FORM
  addPerson.addEventListener("click", function () {
    openAddForm.style.display = "block";
  });

  cancelBtn.addEventListener("click", function () {
    openAddForm.style.display = "none";

    addForm.addEventListener("click", addToBook);

    addBookDiv.addEventListener("click", removeEntry);
  });
  // LOCAL STORAGE AND ADDRES BOOK UPDATE
  let addressBook = [];

  class jsonStructure {
    constructor(personID, firstName, lastName, email, phone) {
      this.id = personID;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phone = phone;
    }
  }

  function addToBook() {
    let isEmpty =
      personID.value != "" &&
      firstName.value != "" &&
      lastName.value != "" &&
      email.value != "" &&
      phone.value != "";
    if (isEmpty) {
      let obj = new jsonStructure(
        personID.value,
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
    if (e.target.classListr.contains("delbutton")) {
      let dataID = e.target.getAttribute("data-id");
      addressBook.splice(dataID, 1);
      localStorage["addbook"] = JSON.stringify(addressBook);
      showAddressBook();
    }
  }

  function clearForm() {
    let formFields = document.querySelectorAll(".formFields");
    for (let i in formFields) {
      formFields[i] = "";
    }
  }
  function showAddressBook() {
    if (localStorage["addbook"] === undefined) {
      localStorage["addbook"] = "";
    } else {
      addressBook = JSON.parse(localStorage["addbook"]);
      addBookDiv.innerHTML = "";
      for (let i in addressBook) {
        let str = '<div class="entry">';
        str += '<div class="id"><p>' + addressBook[i].id + "</p></div>";
        str +=
          '<div class="firstName"><p>' +
          addressBook[i].firstName +
          "</p></div>";
        str +=
          '<div class="lastName"><p>' + addressBook[i].lastName + "</p></div>";
        str += '<div class="email"><p>' + addressBook[i].email + "</p></div>";
        str += '<div class="phone"><p>' + addressBook[i].phone + "</p></div>";
        str += '<div class="btns">';
        str += '<button class="edit">Edit</button>';
        str += '<button class="del" data-id="' + i + '">Delite</button>';
        str += "</div>";
        // str +='<div class="del"><a href="#" class="delbutton" data-id="' + i + '">Delete</a></div>';
        str += "</div>";
        addBookDiv.innerHTML += str;
      }
    }
  }

  showAddressBook();
};
