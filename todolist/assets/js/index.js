const todoInput = document.querySelector('#todo-input');
const todoDiv = document.querySelector('.todo');
const modalTodo = document.querySelector('.modal-todo')
const buttons = document.querySelectorAll('.btn')
todoInput.addEventListener('input',addTodo)


buttons.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        const classList = btn.classList;
        // console.log(classList)
        if(classList.contains('close')){
            console.log('close btn');

        }
    })
})



function addTodo(e){
    
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
}