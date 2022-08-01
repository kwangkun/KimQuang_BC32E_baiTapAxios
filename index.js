var arrProd = [];

// GET
function getProdList() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET',
    });
    promise.then(function (result) {
        console.log(result.data);
        renderProduct(result.data);
    });
    promise.catch(function (error) {
        console.log(error);
    });
};

window.onload = function () {
    getProdList();
};

document.querySelector('#btnCreate').onclick = function () {
    var prod = new Product();

    prod.prodID = document.querySelector('#prodId').value;
    prod.prodImg = document.querySelector('#prodImg').value;
    prod.prodName = document.querySelector('#prodName').value;
    prod.prodType = document.querySelector('#prodType').value;
    prod.prodPrice = document.querySelector('#prodPrice').value;
    prod.prodDesc = document.querySelector('#prodDesc').value;

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: prod,
    });

    promise.then(function (result) {
        console.log(result.data);
        getProdList();
    });

    promise.catch(function (error) {
        console.log(error);
    });
};

function renderProduct(arr) {
    var htmlStr = '';
    for (var i = 0; i < arr.length; i++) {
        var prod = arr[i];
        htmlStr += `
            <tr>
                <td>${prod.id}</td>
                <td>${prod.img}</td>
                <td>${prod.type}</td>
                <td>${prod.name}</td>
                <td>${prod.price}</td>
                <td>${prod.description}</td>
                <td>
                    <button class="btn btn-danger" onclick="delProd('${prod.id}')">Delete</button>
                    <button class="btn btn-primary" onclick="editProd('${prod.id}')">Edit</button>
                </td>
            </tr>
        `;
    };
    document.querySelector('#tblProd').innerHTML = htmlStr;
};

function delProd(prodIdClick) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/DeleteProduct/' + prodIdClick,
        method: 'DELETE',
    });

    promise.then(function (result) {
        console.log(result.data);
        getProdList();
    });

    promise.catch(function (error) {
        console.log(error);
    });
};

function editProd(prodIdClick) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetById/' + prodIdClick,
        method: 'GET',
    });

    promise.then(function (result) {
        var prod = result.data;

        document.querySelector('#prodId').value = prod.id;
        document.querySelector('#prodImg').value = prod.img;
        document.querySelector('#prodName').value = prod.name;
        document.querySelector('#prodType').value = prod.type;
        document.querySelector('#prodPrice').value = prod.price;
        document.querySelector('#ProdDesc').value = prod.description;
    });

    promise.catch(function (error) {
        console.log(error);
    });
};

document.querySelector('#btnUpdate').onclick = function () {
    var prodUpdate = new Product();

    prodUpdate.id = document.querySelector('#prodId').value;
    prodUpdate.img = document.querySelector('#prodImg').value;
    prodUpdate.name = document.querySelector('#prodName').value;
    prodUpdate.type = document.querySelector('#prodType').value;
    prodUpdate.price = document.querySelector('#prodPrice').value;
    prodUpdate.description = document.querySelector('#prodDesc').value;

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + prodUpdate.id,
        method: 'PUT',
        data: prodUpdate,
    });

    promise.then(function (result) {
        console.log(result.data);
        getProdList();
    });

    promise.catch(function (error) {
        console.log(error);
    });
};