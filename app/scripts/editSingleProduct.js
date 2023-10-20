$(document).ready(function() {
    $.urlParam = function(name) {
        var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
            window.location.href
        );
        if (results == null) {
            return null;
        } else {
            return decodeURI(results[1]) || 0;
        }
    };

    var productId = $.urlParam("id");

    $.ajax({
        url: "/getProduct:" + productId,
        dataType: "json",
        type: "GET",
        contentType: "application/json",
        processData: false,
        success: function(data, textStatus, jQxhr) {
            refreshProductsForm(data);
        },
        error: function(jqxhr, textStatus, errorThrown) {
            console.log(errorThrown);
        },
    });

    $("#editForm").submit(function(e) {
        e.preventDefault();
        // get all the inputs into an array.

        var productId = $.urlParam("id");

        var productDetails = {};
        const pName = $("#pName").val();
        const pDesc = $("#pDesc").val();
        const pPrice = $("#pPrice").val();
        const pQuantity = $("#pQuantity").val();

        productDetails["pName"] = pName;
        productDetails["pDesc"] = pDesc;
        productDetails["pPrice"] = pPrice;
        productDetails["pQuantity"] = pQuantity;

        console.log(productDetails);

        $.ajax({
            url: "/" + productId,
            dataType: "json",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                productDetails,
            }),
            processData: false,
            success: function(data, textStatus, jQxhr) {
                alert("Success");
                $("#pName").val("");
                $("#pDesc").val("");
                $("#pPrice").val("");
                $("#pQuantity").val("");
                window.location.href = "/pages/home.html";
            },
            error: function(jqxhr, textStatus, errorThrown) {
                console.log(errorThrown);
            },
        });
    });
});

function refreshProductsForm(data) {
    const pName = data.pName;
    const pDesc = data.pDesc;
    const pPrice = data.pPrice;
    const pQuantity = data.pQuantity;

    $("#pName").val(pName);
    $("#pDesc").val(pDesc);
    $("#pPrice").val(pPrice);
    $("#pQuantity").val(pQuantity);
}