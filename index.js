let globalTaskData = [];
taskContents = document.getElementById("taskContents");


const addcard = () => {

  const newtaskDetails = {
    id: `${Date.now()}`,
    url: document.getElementById("imageURL").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("taskType").value,
    description: document.getElementById("taskDescription").value
  };
  // taskContents = document.getElementById("taskContents");
  taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newtaskDetails));

  globalTaskData.push(newtaskDetails)
  saveToLocalStorage();
}

const generateTaskCard = ({ id, url, title, type, description }) =>
  `<div class="col-6 col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-outline-info" name=${id} onclick="editCard(this)">
            <i class="bi bi-pencil-fill" name=${id} onclick="editCard(this)"></i>
          </button>

          <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
            <i class="bi bi-trash-fill" name=${id} onclick="deleteTask(this)"></i>
          </button>
        </div>
      </div>

      <img src=${url} class="card-img-top" alt="image" name=${url} />

      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <span class="badge bg-primary">${type}</span>
      </div>
      <div class="card-footer">
        <button class="btn btn-outline-primary float-end" imageee=${id}>
          Open task
        </button>
      </div>
    </div>
  </div>`


const saveToLocalStorage = () => {
  localStorage.setItem("tasky", JSON.stringify({ tasks: globalTaskData }));
}

const reloadTaskCard = () => {
  const localStorageCopy = JSON.parse(localStorage.getItem("tasky"));
  // console.log(localStorageCopy)
  if (localStorageCopy) {
    globalTaskData = localStorageCopy.tasks;
  }
  globalTaskData.map((cardData) => {
    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
  })
}

const deleteTask = (e) => {
  // console.log(e)
  // console.log(e.target)
  const targetID = e.getAttribute("name")
  console.log(targetID)

  globalTaskData = globalTaskData.filter((cardData) => cardData.id !== targetID);
  saveToLocalStorage();
  window.location.reload();
}

const editCard = (e) => {
  const targetID = e.getAttribute("name")
  // console.log(e.parentNode)
  // console.log(e.parentNode.parentNode.parentNode)
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true")
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true")
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "true")
  // saveToLocalStorage();


  // console.log(e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1])

  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "saveEditTask(this)")
  // e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].style.setProperty("background", "green")
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "Save Changes";

}
const saveEditTask = (e) => {


}

