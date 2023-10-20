$(document).ready(function() {
    $("#addForm").submit(function(e) {
        e.preventDefault();
        // get all the inputs 

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
        // make a call to api to add a new product
        $.ajax({
            url: "/",
            dataType: "json",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                productDetails
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