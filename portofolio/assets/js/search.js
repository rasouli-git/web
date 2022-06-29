const products=[

    {img:'assets/images/intro_desktop.jpg',title:'rebeka',oldPrice:20000,newPrice:10000,},
    {img:'assets/images/intro_desktop.jpg',title:'samfoni',oldPrice:22000,newPrice:8000,},
    {img:'assets/images/intro_desktop.jpg',title:'sofi',oldPrice:1000,newPrice:500,},
    {img:'assets/images/intro_desktop.jpg',title:'oscar',oldPrice:300,newPrice:200,},

]


const searchInput = document.querySelector('.search-input');
const productDiv = document.querySelector('.product');
const ulTag = document.querySelector('.ulTag');




const filters = {
    dataFilter :'',
}


function renderSearch(product,filter){
    const item = product.filter((data)=>{
        return data.title.toLowerCase().includes(filter.dataFilter.toLowerCase())
    })
    productDiv.innerHTML='';
    item.forEach((data)=>{

        const div = document.createElement('div');
        const a = `
                        <a href="#">
                            <img src="assets/images/intro_desktop.jpg" alt="image product">
                            <div>
                               ${data.title}
                            </div>
                            <div class="old-price">
                                <span>تومان</span>
                                ${data.oldPrice}
                            </div>
                            <div class="price">
                                <span>تومان</span>
                                ${data.newPrice}
                            </div>
                        </a>
                    `;

                    div.innerHTML=a;
                    productDiv.appendChild(div);
                    // ulTag.appendChild(li)

    })
}

searchInput.addEventListener('input',(data)=>{
    filters.dataFilter = data.target.value;

    renderSearch(products,filters);

})

renderSearch(products,filters)







// const increment = document.querySelector('.incerement');
// const decrement = document.querySelector('.decrement');
// const reset = document.querySelector('.reset');

// const value = document.querySelector('.value span');


// increment.addEventListener('click',()=>{
//     value.textContent ++;
// })

// decrement.addEventListener('click',()=>{
//     value.textContent --;
// })
// reset.addEventListener('click',()=>{
//     value.textContent = 0;
// })

const buttons = document.querySelectorAll('.btn');
const value = document.querySelector('.value span');

let count = 0;
buttons.forEach((btn)=>{
    btn.addEventListener('click',()=>{
       
        const classList = btn.classList;
        if(classList.contains('incerement')) count ++;
        else if(classList.contains('decrement')) count--;
        else count=0;
        value.textContent = count

    })
})

// console.log(buttons);