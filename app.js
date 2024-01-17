// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID="";

// ****** EVENT LISTENERS **********
//submit form
form.addEventListener('submit', addItem)
//limpiar lista
clearBtn.addEventListener('click', clearItems);

// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    console.log(value);
    const id = new Date().getTime().toString();
    if(value && !editFlag) {
        const element = document.createElement('article');
        //añadir clase
        element.classList.add('grocery-item');
        //añadir id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);
        //append child
        list.appendChild(element);
        console.log(list.appendChild(element));
        displayAlert('Producto añadido a la lista', 'success');
        // mostrar
        container.classList.add("show-container");
        //add to local store
        addToLocalStorage(id,value);
        // set back to default
        setBackToDefault();

    }
    else if(value && editFlag){
        console.log("editando");
        editElement.innerHTML = value;
        displayAlert("Objeto cambiado con exito", "success");
        // editar local storage
        // editLocalStorage(editID, value)
        setBackToDefault();
    }
    else{
        displayAlert('por favor, introduzca un valor', 'danger')
    }
}
// mostrar alerta
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //eliminar alerta
setTimeout(function(){
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);},1400)
}
//limpiar lista
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("lista vacia","danger");
    setBackToDefault();
    //localStorage.removeItem('list');
}
//eliminar objeto
 function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove("show-container");
    }
    displayAlert("objeto borrado", "danger");
    setBackToDefault();

    //eliminar del local storage
    //removeFromLocalStorage(id);
} 

//editar objeto
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    //edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "editar";
    } 
//set back to default
function setBackToDefault(){
   grocery.value="";
   editFlag=false;
   editID="";
   submitBtn.textContent="submit";
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){

}

function removeFromLocalStorage(id){}
function editLocalStorage(id, value){
    localStorage.setItem('orange',JSON.stringify(['item','item2']));
}
// ****** SETUP ITEMS **********
