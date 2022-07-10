//  localhost:3000/items
const searchInput = document.querySelector('#search');
const productsDOM = document.querySelector('.products');
const btns = document.querySelectorAll('.btn')

let allProductsData = [];

const filters = {
    searchItems : '',
}

document.addEventListener('DOMContentLoaded',()=>{
    axios
    .get('http://localhost:3000/items')
    .then(res=>{
        allProductsData = res.data
        renderProducts(res.data,filters);
    })
    .catch(err=>console.log(err))
})


function renderProducts(products,filters){
    const filteredProducts = products.filter(p=>{
        return p.title.toLowerCase().includes(filters.searchItems.toLowerCase());
    })
    productsDOM.innerHTML = ''
    filteredProducts.forEach((item,index) => {
        const productsDiv = document.createElement('div');
        productsDiv.classList.add('product')
        productsDiv.innerHTML =
        `<div class="img-container">
        <img src="${item.image}" alt="p-${index}">
        </div>
        <div class="product-desc">
            <p class="product-title">${item.title}</p>
            <p class="product-price">${item.price} $</p>
        </div>`
        productsDOM.appendChild(productsDiv);
    });
}



searchInput.addEventListener('input',(e)=>{
    filters.searchItems = e.target.value;
    renderProducts(allProductsData,filters)

})

btns.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        const filter = e.target.dataset.filter
        // console.log(filter);
        filters.searchItems = filter;
        renderProducts(allProductsData,filters)
    })
})


// ******************************************************************
