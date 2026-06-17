const createBtn = document.querySelector("#create");
const formDiv = document.querySelector(".form");
const closeBtn = document.querySelector("#close")

const productDiv = document.querySelector(".products")

const form = document.querySelector("form")

const productArr = [];

let updateIndex = null; // here we have created this to cgheck if the value came for update is proper or not 

let ui = () => {

    productDiv.innerHTML = ""; // will always reset the form after use and we will get the fresh form

    productArr.forEach((elem , index) => {
        productDiv.innerHTML += `
        <div class="product-card">
                <div class="img">
                    <img src="${elem.image}" alt="">
                </div>
                <div class="text">
                    <h3>${elem.productName}</h3>
                    <p>${elem.productDiscription}</p>
                    <p>${elem.productPrice}</p>
                </div>

                <div class="p-btn">
                    <button onclick="updateProduct('${elem.productName}')"  id="update" class="btn-2">Update</button>
                    <button onclick="deleteProduct('${index}')" id="delete"  class="btn-3">Delete</button>
                </div>
            </div>
            `
    })
}

createBtn.addEventListener("click", () => {
    formDiv.style.display = "flex";
})

closeBtn.addEventListener("click", () => {
    formDiv.style.display = "none"
})

form.addEventListener("submit", (event) => {
    event.preventDefault(); // It Prevents the form from reloading 

    let productName = event.target[0].value;
    let productDiscription = event.target[1].value;
    let productPrice = event.target[2].value;
    let image = event.target[3].value;

    if (productName.trim() === "" || productDiscription.trim() === "" || productPrice.trim() === "" || image.trim() === "") {// .trim() helps to remove empty space and in this case it will prevent all the empty entries 
        alert("Please Fill All The filds !!!");
        return;
    };

    let obj = {
        productName,
        productDiscription,
        productPrice,
        image,
    };

    if (updateIndex !== null) {
        productArr[updateIndex] = obj;
        updateIndex= null;
    }
    else {
        productArr.push(obj); // in this we are pussing values dynamically to product array via object 

    }



    ui(); // we have call ui over here as after creation it will be shown dynamically 


    console.log(productArr); // with this er have check the product which is comming in array form 

    form.reset(); // will empty the form as soon as it will be submitted 

    formDiv.style.display = "none" // will close the form as soon as it will be submited 


});



const updateProduct = (name) => {

    formDiv.style.display = "flex";

    let product = productArr.find((elem) => elem.productName === name);

    updateIndex = productArr.findIndex((elem) => elem.productName === name);

    form[0].value = product.productName
    form[1].value = product.productDiscription
    form[2].value = product.productPrice
    form[3].value = product.image


}


const deleteProduct = (index) => {
productArr.splice(index , 1);
ui();
}