const todoContainer = document.querySelector("#todoList")
const button = document.querySelector("#addButton")
let todoList = []
const input = document.querySelector('#addInput');

if(localStorage.getItem('todo')){
   todoList =  JSON.parse(localStorage.getItem('todo'));
   updateTodo()
}

button.addEventListener('click',()=>{
    const newTodo = input.value
    if(newTodo){
        todoList.push({status:false,name: newTodo})
        localStorage.setItem('todo',JSON.stringify(todoList))
        input.value = ''
        updateTodo()
    } else{
        alert('введите данные')
    }  
})

function updateTodo(){
    todoContainer.innerHTML = '';
    todoList.forEach((element,index) => {
        let newInput = element.status ?
        '<input checked onclick="updateStatus('+index+')" type="checkbox" >' 
        :'<input onclick="updateStatus('+index+')" type="checkbox" >'
      
        todoContainer.innerHTML += '<li>' +  newInput + '<span class="listDesc">' + element.name + '</span>' +'<button class = "delete" onclick="deleteTodo('+index+')">Удалить</button></li>';
    });
}

function updateStatus(index){
    todoList[index].status = !todoList[index].status 
    localStorage.setItem('todo', JSON.stringify(todoList));
    updateTodo()
}

function deleteTodo(index){
    todoList.splice(index, 1);
    localStorage.setItem('todo', JSON.stringify(todoList));
    updateTodo()
}