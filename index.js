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
                <td>${prod.prodID}</td>
                <td>${prod.prodImg}</td>
                <td>${prod.prodType}</td>
                <td>${prod.prodName}</td>
                <td>${prod.prodPrice}</td>
                <td>${prod.prodDesc}</td>
                <td>
                    <button class="btn btn-danger" onclick="delProd('${prod.prodID}')">Delete</button>
                    <button class="btn btn-primary" onclick="editProd('${prod.prodID}')">Edit</button>
                </td>
            </tr>
        `;
    };
    document.querySelector('#tblProd').innerHTML = htmlStr;
};

function delProd(prodIdClick) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/DeleteProduct' + prodIdClick,
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
        url: 'http://svcy.myclass.vn/api/Product/GetById' + prodIdClick,
        method: 'GET',
    });

    promise.then(function (result) {
        var prod = result.data;

        document.querySelector('#prodID').value = prod.prodID;
        document.querySelector('#prodImg').value = prod.prodImg;
        document.querySelector('#prodName').value = prod.prodName;
        document.querySelector('#prodType').value = prod.prodType;
        document.querySelector('#prodPrice').value = prod.prodPrice;
        document.querySelector('#ProdDesc').value = prod.ProdDesc;
    });

    promise.catch(function (error) {
        console.log(error);
    });
};

document.querySelector('#btnUpdate').onclick = function () {
    var prodUpdate = new Product();

    prodUpdate.prodID = document.querySelector('#prodID').value;
    prodUpdate.prodImg = document.querySelector('#prodImg').value;
    prodUpdate.prodName = document.querySelector('#prodName').value;
    prodUpdate.prodType = document.querySelector('#prodType').value;
    prodUpdate.prodPrice = document.querySelector('#prodPrice').value;
    prodUpdate.prodDesc = document.querySelector('#prodDesc').value;

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct' + prodUpdate.prodID,
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