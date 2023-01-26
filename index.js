let carsList = [
    { id: 1, owner: "Rahul Kumar", vName: "Audi A8", vNumber: "UP-4586", entryDate: "01-10-2000", exitDate: "11-12-2023" },
    // { id: 2, owner: "Rohit Kumar", vName: "Honda City", vNumber: "UP-4476", entryDate: "10-10-2022", exitDate: "01-02-2000" },
    // { id: 3, owner: "Mohit Kumar", vName: "Swift Desire", vNumber: "UP-4686", entryDate: "10-05-2023", exitDate: "11-09-2019" },
  ]
  
  const tbody = document.querySelector("#cars_table");
  const submitBtn = document.querySelector("#submitBtn");
  let update = false;
  
  function createListItem(item) {
    tr = document.createElement("tr");                  
    tr.onclick = function() {
      updateEntry(item.id);
    };
    tdOwner = document.createElement("td");
    tdOwner.innerText = item.owner;
    tdName = document.createElement("td");
    tdName.innerText = item.vName;
    tdNumber = document.createElement("td");
    tdNumber.innerText = item.vNumber;
    tdEntryDate = document.createElement("td");
    tdEntryDate.innerText = item.entryDate;
    tdExitDate = document.createElement("td");
    tdExitDate.innerText = item.exitDate;
    tdDelete = document.createElement("td");
    tdDelete.classList.add("del");
    tdDelete.onclick = deleteItem;
    tdDelete.setAttribute("data", item.id);
    tdDelete.innerText = "delete";
  
    tr.appendChild(tdOwner);                          
    tr.appendChild(tdName);
    tr.appendChild(tdNumber);
    tr.appendChild(tdEntryDate);
    tr.appendChild(tdExitDate);
    tr.appendChild(tdDelete);
    tbody.appendChild(tr);
  }
  
  function renderTable(list) {                     
    while (tbody.hasChildNodes()) {
      tbody.removeChild(tbody.firstChild);
    }
    list.forEach((item, i) => {
      createListItem(item)
    });
  }
  
  renderTable(carsList);                             
  
  reg_form = document.querySelector("#myForm");
  reg_form.addEventListener('submit', addNewCar);
  
  function addNewCar(e) {                             
    e.preventDefault();                               
    for (i=0;i<formInputs.length;i++) {               
      if (formInputs[i].value === "") {
        alert("Please fill out all the Fields..");    
        return
        break
      }
    };
    const newItem = { id: Math.floor(Math.random()*1000000),              
                      owner: reg_form.owner.value,
                      vName: reg_form.vName.value,
                      vNumber: reg_form.vNumber.value,
                      entryDate: reg_form.entryDate.value.split("-").reverse().join("-"),
                      exitDate: reg_form.exitDate.value.split("-").reverse().join("-") };
    if (update) {
      carsList.forEach((item, i) => { if (item.id === targetItem.id) carsList[i] = newItem; });      
      update = false;
      submitBtn.innerText = "SUBMIT";
    } else {
      carsList.push(newItem);                                              
    }
    renderTable(carsList);                                                 
    resetForm();                                                            
  }

  formInputs = document.querySelectorAll("#myForm input");
  function resetForm() {                                                 
    formInputs.forEach((item, i) => item.value = "");
    setCurrentDate();
  }
  
  function deleteItem(e) {                                               
    const clickedItem = this.attributes.data.value;
    carsList = carsList.filter( item => item.id != clickedItem );
    renderTable(carsList);
    e.stopPropagation();
  }
  
  const entDate = document.querySelector("#entryDate");
  function setCurrentDate() {                                             
    let d = new Date();
    let currentDay = d.getDate() < 10 ? "0"+d.getDate() : d.getDate();
    let currentMonth = (d.getMonth()+1) < 10 ? "0"+(d.getMonth()+1) : (d.getMonth()+1);
    currentDate = d.getFullYear() + "-" + currentMonth + "-" + currentDay;
    entDate.value = currentDate;
  }
  setCurrentDate();
  
  function updateEntry(x) {
    update = true;
    submitBtn.innerText = "UPDATE";
    targetItem = carsList.filter(item => item.id === x)[0];
    reg_form.owner.value = targetItem.owner;
    reg_form.vName.value = targetItem.vName;
    reg_form.vNumber.value = targetItem.vNumber;
    reg_form.entryDate.value = targetItem.entryDate.split("-").reverse().join("-");
    reg_form.exitDate.value = targetItem.exitDate.split("-").reverse().join("-");
  }