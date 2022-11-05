var productName     =document.getElementById('productName');
var productPrice    =document.getElementById('productPrice');
var productCategory =document.getElementById('productCategory');
var productDesc     =document.getElementById('productDesc');

var temp;
var mood ='create';

var productContainer = [];

if(localStorage.getItem("ourProduct") !=null){
   
    productContainer= JSON.parse( localStorage.getItem("ourProduct"));
    displayForm();
}

function addProduct(){
    // var Btn =document.getElementById('mainBtn').innerHTML;
    var products ={
        name:productName.value,
        price:productPrice.value,
        cat:productCategory.value,
        desc:productDesc.value
    }
    if(mood === 'create'){
        
        productContainer.push(products);
        localStorage.setItem("ourProduct",JSON.stringify( productContainer));
        console.log(productContainer);
    
        clearForm();
        displayForm();
    }else{
        productContainer[temp]=products;
        localStorage.setItem("ourProduct",JSON.stringify( productContainer));
        document.getElementById('mainBtn').innerHTML="Add Product";
        clearForm();
        displayForm();
    }
    
}

function clearForm(){
        productName.value="";
        productPrice.value="";
        productCategory.value="";
        productDesc.value="";
}


function displayForm(){
    var cartoon =``;
    for(var i=0 ; i<productContainer.length ; i++){
        cartoon +=`<tr>
            <td>${i}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].cat}</td>
            <td>${productContainer[i].desc}</td>
            <td>
                <button onclick='updateProduct(${i})' class="btn btn-outline-info">update</button>
                <button onclick='deleteProduct(${i})' class="btn btn-outline-danger">Delete</button>
            </td>
        </tr>
        `;
    }

    document.getElementById('tableInfo').innerHTML=cartoon;

}



function deleteProduct(index){

    productContainer.splice(index,1); //remove from array
    localStorage.setItem("ourProduct",JSON.stringify(productContainer)); //update localstorage or remove from localStorage
    displayForm();


}



function searchProduct(term){
    var cartoon =``;
    for(var i=0 ;i<productContainer.length;i++){
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())==true){
            cartoon +=`<tr>
            <td>${i}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].cat}</td>
            <td>${productContainer[i].desc}</td>
            <td>
                <button onclick='updateProduct(${i})' class="btn btn-outline-info">update</button>
                <button onclick='deleteProduct(${i})' class="btn btn-outline-danger">Delete</button>
            </td>
        </tr>
        `;
        }
    }
    document.getElementById('tableInfo').innerHTML=cartoon;
}

function updateProduct(index){
    productName.value=productContainer[index].name;
    productPrice.value=productContainer[index].price;
    productCategory.value=productContainer[index].cat;
    productDesc.value=productContainer[index].desc;

    document.getElementById('mainBtn').innerHTML="Update";

    temp=index;
    mood ='update';
}