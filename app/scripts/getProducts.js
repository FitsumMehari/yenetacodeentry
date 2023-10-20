$(document).ready(function() {

    // make a call to api to get all products

    $.ajax({
        url: "/getProducts",
        dataType: "json",
        type: "GET",
        contentType: "application/json",
        processData: false,
        success: function(data, textStatus, jQxhr) {
            refreshProductsList(data);
        },
        error: function(jqxhr, textStatus, errorThrown) {
            console.log(errorThrown);
        },
    });
});

// update the products table

function refreshProductsList(data) {
    data.forEach((product) => {
        var pId = product._id.toString();
        console.log(pId);
        const isAvaialble = product.pQuantity > 0 ? "in stock" : "out of stock"

        console.log(product);
        $("tbody").append(`
        <tr>
        <td>${product.pName}</td>
        <td>${product.pDesc}</td>
        <td>${product.pPrice}</td>
        <td>${product.pQuantity}</td>
        <td>${isAvaialble}</td>
        <td>
            <a href="/pages/editProduct.html?id=${product._id}" class="btn btn-warning">Edit</a>
        </td>
        <td><button id="${product._id}" class="btn btn-danger">Delete</button></td>
        </tr>
        `);

        $(`#${product._id}`).click(function(e) {
            e.preventDefault();
            deleteProduct(product._id);
        });
    });
}

// code for product deletion

function deleteProduct(productid) {
    var decision = confirm("Are you sure to remove the product?");
    if (!decision) {
        return;
    } else {
        console.log(productid);

        // make a call to api to delete a product from db

        $.ajax({
            url: "/:" + productid,
            type: "DELETE",
            success: function(result) {
                window.location.href = "/pages/home.html";
            },
        });
    }
}