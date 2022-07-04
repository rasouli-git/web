const linkList = document.querySelector('.link-list')
import { digiLink } from "./products.js";




// 1. get data
class Detail{

    getDigiLink(){

        return digiLink
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

}



// 3. 
class Storage{

}

document.addEventListener('DOMContentLoaded',()=>{

    const detail = new Detail;
    const digiLinkItems = detail.getDigiLink();

    // *************************

    const ui = new Ui;
    ui.displayDigiLink(digiLinkItems)


    // *************************
})





