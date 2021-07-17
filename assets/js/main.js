let allProducts = document.querySelector('.allProducts');
let showProducts = document.querySelector('#products');
let showAllProductsView = document.querySelector('#all-products-page');
let popularArticles = document.querySelector('#popularArticles');
let oneProductView = document.querySelector('#one-product');
let productsNumberInCart = document.querySelector('#ukupno');
let cartView = document.querySelector('#cart');

let allCategoriesLink = document.querySelectorAll('.allcategories > li > a');
let categoryProductsView = document.querySelector('.catprodview');

let productId;
let cart = [];

(function () {
    showNumItemCart();

    if (showProducts) {
        showAllProducts();
      } else if (oneProductView) {
        productId = window.location.hash.replace("#", ``);
        showOneProduct();
      } else if (cartView) {
        showCartProducts();
      } else if (showAllProductsView) {
        allProductsView();
      }
})();

function prevDef() {
    for (let i = 0; i < allCategoriesLink.length; i++) {
        allCategoriesLink[i].addEventListener('click', stopPrevDef);
    }
}

prevDef()
function stopPrevDef(e) {
    e.preventDefault();
    allCategoriesLink.forEach(cat => {
        cat.className = 'nav-link'
    })
    this.className += ' active';
    let current = this.querySelector('span').innerHTML;
    showCategoryProducts(current);
}
function showCategoryProducts(current) {
    let filltered = products.filter(function (product) {
        if(product.category === current) {
            return true;
        } else {
            return false;
        }
    })
    showProductsInCategory(filltered);
}
function showProductsInCategory(filltered) {
    categoryProductsView.innerHTML = '<img src="assets/img/reload.gif" class="img-gif-center"/>'
    let text = ``
    filltered.forEach(product => {
        text += `
                <a class="item border d-block" href="pages/one-product.html?#${product.id}">
                    <div class="holder">
                        <img src="assets/img/${product.image}" alt="">
                    </div>
                    <div class="text">
                        <h5>${product.name}</h5> 
                        <div class="price">
                            <span>${product.price}</span><span>&nbsp; rsd</span>
                        </div>
                    </div>
                    </a>
            `
    });
    setTimeout(function () {
        categoryProductsView.innerHTML = text;
    },300)
}



function showAllProducts() {
    let text = ``

    products.forEach(product => {
        text += `
            <a class="item border d-block" href="pages/one-product.html?#${product.id}">
            <div class="holder">
                <img src="assets/img/${product.image}" alt="">
            </div>
            <div class="text">
                <h5>${product.name}</h5> 
                <p>${product.shortDescription}</p>
                <div class="price">
                    <span>${product.price}</span><span>&nbsp; rsd</span>
                </div>
            </div>
            </a>`
    });

    showProducts.innerHTML = text
    popularProducts();
}
function allProductsView() {
    let text = ``

    products.forEach(product => {
        text += `
            <a class="item border d-block" href="one-product.html?#${product.id}">
            <div class="holder">
                <img src="../assets/img/${product.image}" alt="">
            </div>
            <div class="text">
                <h5>${product.name}</h5> 
                <p>${product.shortDescription}</p>
                <div class="price">
                    <span>${product.price}</span><span>&nbsp; rsd</span>
                </div>
            </div>
            </a>`
    });

    showAllProductsView.innerHTML = text
    popularProducts();
}
function popularProducts() {
    let text = ""

    products.forEach(product => { 
      if(product.popular === true) {
        text += `
        <a href="pages/one-product.html?#${product.id}" class="item border d-block">
                 <div class="holder">
                     <img src="assets/img/${product.image}" alt="">
                 </div>
                 <h5>${product.name}</h5>
                 <p>${product.shortDescription}</p>
         </a>
        `
      }
    });
    popularArticles.innerHTML = text;
}




function showOneProduct() {
    let oneProduct = products[productId];
    let text = '';
    text = `
    <article id="singleProduct" class="row mt-5">
        <div class="item">
            <img src="../assets/img/${oneProduct.image}" alt="">
        </div>
        <div>
            <h2>${oneProduct.name}</h2>
            <p class="price">${parseInt(oneProduct.price).toFixed(2)} rsd</p>
            <p>${oneProduct.shortDescription}</p>
                <div class="col-4">
                    <input id="addtocard-val" type="number" class="form-control" value="1">
                </div>
                <div class="col-4 mt-2">
                    <button id="add-to-cart" class="btn btn-warning form-control">Add to cart</button>
                </div>
                <p class="error_correct">asd</p>
            <hr>
            <p>Category: <a href="">${oneProduct.category}</a></p>
            <hr>
        </div>
    </article>
    <article class="row mt-5">
        <div class="col-10">
            <h4>Detail:</h4>
           <p>${oneProduct.description}</p>
        </div>
    </article>
    `;

    oneProductView.innerHTML = text;

    let addToCartBtn = document.querySelector('#add-to-cart');
    let info = document.querySelector('.error_correct');

    addToCartVal = document.querySelector('#addtocard-val');
    addToCartBtn.addEventListener('click', function () {
        if(oneProduct.quantity >= addToCartVal.value) {
            info.style.display = 'block';
            info.style.background = 'green';
            info.innerHTML = `Uspesno ste dodali proizvod u <a class="dodao" href="cart.html">korpu</a>`;
            cart.push({
                id: oneProduct.id,
                quantity: addToCartVal.value,
                price: oneProduct.price
            });
            oneProduct.quantity = oneProduct.quantity - addToCartVal.value;
            productsNumberInCart.innerHTML = cart.length;
            saveToLocalStorage();
            showNumItemCart();
        } else {
            info.style.display = 'block';
            info.style.background = 'red';
            info.innerHTML = `Trenutno nema na stanju toliko proizvoda`;
        }
    });
}

function showNumItemCart() {
    if (localStorage.cart) {
        cart = JSON.parse(localStorage.cart);
    } 
    productsNumberInCart.innerHTML = cart.length;
}

function showCartProducts() {
  
    let text = `<h3>Shopping cart</h3>`;
    let totalPriceOne = 0;
    let totalPriceAll = 0;

    cart.forEach((product, index) => {
        text += `
        <article>
            <div>
            <a href="one-product.html?#${product.id}"><img src="../assets/img/${products[product.id].image}" alt=""></a>
            </div>
            <div>
                <ul>
                    <li>
                        <h3><a href="one-product.html?#${product.id}">${products[product.id].name}</a></h3>
                    </li>
                    <li>
                        <p>Quantity: ${product.quantity}</p>
                    </li>
                    <li>
                        <p>Price: ${parseInt(products[product.id].price).toFixed(2)} rsd</p>
                        <p>Total price: ${totalPriceOne = (product.price*product.quantity).toFixed(2)} rsd</p>
                    </li>
                </ul>
                <button class="removeBtn" cart-id="${index}"><i class="fa fa-times"></i></button>
            </div>
        </article>
        `
        totalPriceAll += parseInt(products[product.id].price) * parseInt(product.quantity);
    })

    text += `<p class="totalpriceall">Total price for all: <span class="bold">${totalPriceAll.toFixed(2)} rsd</span></p>`
    cartView.innerHTML = text;

    let removeBtn = document.querySelectorAll(".removeBtn");
    removeBtn.forEach((btn) => {
        btn.addEventListener("click", removeItem);
    });
}
function removeItem() {
    let removeId = this.getAttribute(['cart-id']);
    products[cart[removeId].id].quantity += parseInt(cart[removeId].quantity);
    cart.splice(removeId, 1);
    saveToLocalStorage();
    showCartProducts();
    showNumItemCart();
}











function saveToLocalStorage() {
    localStorage.setItem("product", JSON.stringify(products));
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  








































$('.carousel').carousel({
    interval: 5000
})

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 4
        }
    }
})