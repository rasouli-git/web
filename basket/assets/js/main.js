const shopingCart = document.querySelector('.cart-btn');
const modal = document.querySelector('.modal');
const backDrop = document.querySelector('.backdrop');
const btnConfirm = document.querySelector('.btn.confirm');
const productDOM = document.querySelector('.product-center');



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
}

// 3.storage

class Storage{
    static saveProducts(products){
        localStorage.setItem('products',JSON.stringify(products))
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    // console.log('loaded');
    const products = new Products;
    const productsData = products.getProducts();
    const ui = new Ui();
    ui.displayProducts(productsData);
    Storage.saveProducts(productsData)
    // console.log(productsData)
})


