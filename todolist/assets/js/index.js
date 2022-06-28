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
    todoInput.value=''
    
}

