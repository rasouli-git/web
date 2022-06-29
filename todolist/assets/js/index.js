const todoWindow = document.querySelector('.plus')

const todoInput = document.querySelector('#todo-input');
const todoDiv = document.querySelector('.todo');
const backDrop = document.querySelector('.backdrop')
const modalTodo = document.querySelector('.modal-todo')
const buttons = document.querySelectorAll('.btn')





todoWindow.addEventListener('click',()=>{
    modalTodo.style.display = 'flex'
    backDrop.style.display = 'block'
    todoWindow.querySelector('span').style.transform = 'rotate(136deg)'
})

// todoInput.addEventListener('input',addTodo)


buttons.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        const classList = btn.classList;
        // console.log(classList)
        if(classList.contains('ok')){
            addTodo()
            modalTodo.style.display = 'none'
            backDrop.style.display = 'none'
            todoWindow.querySelector('span').style.transform = 'rotate(0)'


        }
        else if(classList.contains('apply')){
            addTodo();
        }
        else{
            modalTodo.style.display = 'none'
            backDrop.style.display = 'none'
            todoWindow.querySelector('span').style.transform = 'rotate(0)'

        }
        
    })
})
backDrop.addEventListener('click',()=>{
    modalTodo.style.display = 'none'
    backDrop.style.display = 'none'
    todoWindow.querySelector('span').style.transform = 'rotate(0)'
})

function addTodo(){

    const todoItem = document.createElement('div');
    todoItem.classList.add('todo__item');
    const todoItemInner = 
    `<span>${todoInput.value}</span>
    <div class="social">
        <span class="fa fa-edit"></span>
        <span class="fa fa-check"></span>
        <span class="fa fa-remove"></span>
    </div>`
    todoItem.innerHTML = todoItemInner ;
    todoDiv.appendChild(todoItem);
    saveLocalTodos(todoInput.value)
    todoInput.value=''
    
}




const todoItem = document.querySelector('.todo')

todoItem.addEventListener('click',checkRemove);


function checkRemove(e){
    const classList = [... e.target.classList];
    const item = e.target;

    if(classList[1]==='fa-edit'){

    }

    else if(classList[1]==='fa-check'){
        const parentItem = item.parentElement.parentElement;
        parentItem.classList.toggle('completed');

    }

    else if(classList[1]==='fa-remove'){
        const parentItem = item.parentElement.parentElement;
        removeLocalTodos(parentItem);
        parentItem.remove();
    }
}






const searchInput = document.querySelector('.searchInput');
const filters = {
    filter:'',
}
searchInput.addEventListener('input',(data)=>{
    filters.filter = data.target.value
    const item = todoItem.textContent;
    rendeSearch(item,filters)
})

function rendeSearch(item,filters){

    
}



/* local storage */
document.addEventListener('DOMContentLoaded',getLocalTodos);

function saveLocalTodos(todo){

    let savedTodos = localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem('todos')) : [];

    savedTodos.push(todo);

    localStorage.setItem('todos',JSON.stringify(savedTodos))

}

function getLocalTodos(){
    let savedTodos = localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem('todos')) : [];

    savedTodos.forEach(todo =>{
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo__item');
        const todoItemInner = 
        `<span>${todo}</span>
        <div class="social">
            <span class="fa fa-edit"></span>
            <span class="fa fa-check"></span>
            <span class="fa fa-remove"></span>
        </div>`
        todoItem.innerHTML = todoItemInner ;
        todoDiv.appendChild(todoItem);
    })
}

function removeLocalTodos(todo){
    // console.log(todo.children[0].innerText)


    let savedTodos = localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem('todos')) : [];

    let filter = savedTodos.filter(t => t!==todo.children[0].innerText)

    localStorage.setItem('todos',JSON.stringify(filter))
}