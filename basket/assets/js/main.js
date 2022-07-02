const shopingCart = document.querySelector('.cart-btn');
const modal = document.querySelector('.modal');
const backDrop = document.querySelector('.backdrop');
const btnConfirm = document.querySelector('.btn.confirm');
const productDOM = document.querySelector('.product-center');

const cartTotal = document.querySelector('.total-price-val');
const cartItems = document.querySelector('.cart-items');
const basketItems = document.querySelector('.basket__item');

let cart = []

shopingCart.addEventListener('click',showModal);
backDrop.addEventListener('click',closeModal);
btnConfirm.addEventListener('click',closeModal);



function showModal(){
    backDrop.style.display = 'unset';
    modal.style.display = 'unset';
}

function closeModal(){
    backDrop.style.display = 'none';
    modal.style.display = 'none';

}


import {productsData} from "./product.js";

// 1. get products
class Products{

    getProducts(){
        return productsData;
    }

}
// 2.display product
class Ui{

    displayProducts(products){
        let result = '';
        products.forEach(item => {
            result +=`<section class="product">
                            <div class="img-container">
                                <img class="product-img" src=${item.imageUrl} alt="p -1">
                            </div>
                            <div class="product-desc">
                                <p class="product-title">${item.title}</p>
                                <p class="product-price">$ ${item.price}</p>
                            </div>
                            <button class="add-to-cart" data-id=${item.id} >
                                add to cart
                            </button>
                       </section>`;
            productDOM.innerHTML=result; 
        });
    }
    getAddTocardBtns(){
        const addTocartBtns = document.querySelectorAll('.add-to-cart');
        const buttons = [... addTocartBtns];
        
        buttons.forEach((btn)=>{
            const id = btn.dataset.id;
            const isInCard= cart.find((p) => p.id ===id);
            if(isInCard){
                btn.innerText = 'In cart';
                btn.disabled = true;
            }
            btn.addEventListener('click',(event)=>{
                event.target.innerText = 'in cart';
                event.target.disabled = true

                const addedProduct = {... Storage.getProduct(id),quantity : 1 };

                cart = [... cart,{... addedProduct}]

                Storage.saveCart(cart);

                this.setCartValue(cart)

                this.addCartItem(addedProduct)
            })

            // console.log(id)
        })
    }


    setCartValue(cart){

        let tempCartItems = 0;
        const totalPrice = cart.reduce((acc,curr)=>{
            tempCartItems += curr.quantity;
            return acc + curr.quantity * curr.price
        },0)
        cartTotal.innerText = totalPrice.toFixed(2);
        cartItems.innerText = tempCartItems;
    }
    addCartItem(cartItem){
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = 
        ` <div class="image">
            <img src=${cartItem.imageUrl} alt="">
          </div>
          <div class="detail">
            <span class="title">${cartItem.title}</span>
            <span class="price">${cartItem.price}</span>
          </div>
          <div class="counter">
            <span class="fa fa-chevron-up"></span>
            <span class="value">${cartItem.quantity}</span>
            <span class="fa fa-chevron-down"></span>
          </div>
          <span class="remove">
            <span class="fa fa-trash"></span>
          </span>`;
          basketItems.appendChild(div);
    }

}

// 3.storage
class Storage{
    static saveProducts(products){
        localStorage.setItem('products',JSON.stringify(products));
    }

    static getProduct(id){
        const _products = JSON.parse(localStorage.getItem('products'));
        return _products.find((p)=> p.id===parseInt(id));
    }
    static saveCart(cart){
        localStorage.setItem('cart',JSON.stringify(cart))
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    // console.log('loaded');
    const products = new Products;
    const productsData = products.getProducts();
    const ui = new Ui;
    ui.displayProducts(productsData);
    ui.getAddTocardBtns();
    Storage.saveProducts(productsData);
})


