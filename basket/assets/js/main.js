const shopingCart = document.querySelector('.cart-btn');
const modal = document.querySelector('.modal');
const backDrop = document.querySelector('.backdrop');

shopingCart.addEventListener('click',()=>{
    backDrop.style.display = 'unset';
    modal.style.display = 'unset';
})
backDrop.addEventListener('click',()=>{
    backDrop.style.display = 'none';
    modal.style.display = 'none';
})