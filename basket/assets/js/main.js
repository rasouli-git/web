const shopingCart = document.querySelector('.cart-btn');
const modal = document.querySelector('.modal');
const backDrop = document.querySelector('.backdrop');
const btnConfirm = document.querySelector('.btn.confirm');
const productDOM = document.querySelector('.product-center');

const cartTotal = document.querySelector('.total-price-val');
const cartItems = document.querySelector('.cart-items');
const basketItems = document.querySelector('.basket__item');

const clearCart = document.querySelector('.clear-cart')

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

let buttonsDOM = []
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
        const addTocartBtns = [... document.querySelectorAll('.add-to-cart')];
        buttonsDOM = addTocartBtns;
        
        addTocartBtns.forEach((btn)=>{
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
            <span class="price">${cartItem.price} $</span>
          </div>
          <div class="counter">
            <span class="fa fa-chevron-up" data-id=${cartItem.id}></span>
            <span class="value">${cartItem.quantity}</span>
            <span class="fa fa-chevron-down" data-id=${cartItem.id}></span>
          </div>
          <span class="remove">
            <span class="fa fa-trash" data-id=${cartItem.id}></span>
          </span>`;
          basketItems.appendChild(div);


    }

    setupApp(){
        cart = Storage.getCard() || [];
        cart.forEach((cartItem) => this.addCartItem(cartItem));
        this.setCartValue(cart)
    }
    cartLogic(){
        clearCart.addEventListener('click',()=>this.clearCart());
        basketItems.addEventListener('click',(event)=>{
            // console.log(event.target)
            if(event.target.classList.contains('fa-chevron-up')){
                // console.log(event.target.dataset.id)
                const addQuantity = event.target;
                const addedItem = cart.find((cItem)=> cItem.id == addQuantity.dataset.id)
                addedItem.quantity ++;
                this.setCartValue(cart)
                Storage.saveCart(cart)
                addQuantity.nextElementSibling.innerText = addedItem.quantity;  //   and see it
            }
            else if(event.target.classList.contains('fa-trash')){
                const removeItem = event.target;
                const _removedItem = cart.find(c => c.id == removeItem.dataset.id);
                this.removeItem(_removedItem.id);
                Storage.saveCart(cart);
                basketItems.removeChild(removeItem.parentElement.parentElement)
            }
            else if(event.target.classList.contains('fa-chevron-down')){
                const subQuantity = event.target;
                const substractedItem = cart.find(c => c.id == subQuantity.dataset.id);
                
                if(substractedItem.quantity === 1){
                    this.removeItem(substractedItem.id);
                    basketItems.removeChild(subQuantity.parentElement.parentElement);
                    return;
                }

                substractedItem.quantity --;
                this.setCartValue(cart)
                Storage.saveCart(cart)
                subQuantity.previousElementSibling.innerText = substractedItem.quantity;
            }
        })

    }



    
    clearCart(){
        cart.forEach((cItem)=> this.removeItem(cItem.id));
            while(basketItems.children.length){
                basketItems.removeChild(basketItems.children[0])
            }

        closeModal();
    }
    removeItem(id){
        
        cart = cart.filter(cItem => cItem.id != id)
        this.setCartValue(cart);
        Storage.saveCart(cart);

        this.getSingleButtons(id)

    }
    getSingleButtons(id){
        // console.log(buttonsDOM);
        const button = buttonsDOM.find((btn)=> btn.dataset.id == id);
        button.innerText = 'add to card';
        button.disabled = false;
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
    static getCard(){
        return JSON.parse(localStorage.getItem('cart'));
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    // console.log('loaded');
    const products = new Products;
    const productsData = products.getProducts();
    const ui = new Ui;
    // ui.setupApp();
    ui.setupApp();
    ui.displayProducts(productsData);
    ui.getAddTocardBtns();
    ui.cartLogic();
    Storage.saveProducts(productsData);
})


