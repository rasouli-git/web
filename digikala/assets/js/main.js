const linkList = document.querySelector('.link-list')
const amazingParent = document.querySelector('.slider-items')
import { digiLink } from "./products.js";
import {amazingSlider} from './products.js';




// 1. get data
class Detail{

    getDigiLink(){
        return digiLink
    }
    getAmazingSlider(){
        return amazingSlider;
    }
}



// 2. display product
class Ui{

    // digi link
    displayDigiLink(items){
        let item = '';
        items.forEach(data => {
            item +=
            `<li class="link-list__item">
                <a href=${data.link}>
                    <img src='${data.imageUrl}' alt=${data.alt}>
                    <span>${data.title}</span>
                </a>
             </li>`;
            linkList.innerHTML=item;
        });
    }
    // end digi link

    // amazing slider

    displayAmazingSlider(items){
        
        let result = '';
        items.forEach(item =>{
            let discount = item.price - (item.price * item.discount) /100
            result +=
            `<div class="amazing-slider__item">
                <a href="#">
                    <div class="item-image">
                        <img src="${item.imageUrl}" alt="${item.alt}">
                    </div>
                    <div class="item-detail">
                        <div class="item-discount">
                            <span>${item.discount} %</span>
                        </div>
                        <div class="item-price">
                            <span>${discount}</span>
                            <span>تومان</span>
                        </div>
                    </div>
                    <div class="item-oldPrice">
                        <span>${item.price}</span>
                    </div>
                </a>
            </div> `
            amazingParent.innerHTML = result;
        })


    }
    // end amazing slider

}



// 3. 
class Storage{

}

document.addEventListener('DOMContentLoaded',()=>{

    const detail = new Detail;
    const digiLinkItems = detail.getDigiLink();
    const amazingSliderItems = detail.getAmazingSlider();

    // *************************

    const ui = new Ui;
    ui.displayDigiLink(digiLinkItems);
    ui.displayAmazingSlider(amazingSliderItems);


    // *************************
})





