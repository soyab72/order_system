var fetchData = function (query, dataURL, contentType) {
    return $.ajax({
        data: query,
        dataType: contentType,
        url: dataURL,
        type: "POST",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        beforeSend: function(){
            $("#loading").show();
        },
        complete: function(){
            $("#loading").hide();
        },
    });
}

$(document).on("click", "#generate-grid", function () {

    var row = $('#row-number').val();
    var column = $('#column-number').val();

    $('#row-validate').text("");
    $('#column-validate').text("");

    if ($.isNumeric(row) && $.isNumeric(column)) {

        var generateGrid = fetchData(
            {
                'column': column,
                'row': row
            }, '/generate-grid', 'html');

        $.when(generateGrid).then(function (gridHtml) {
            $('#order-grid').html(gridHtml);
        });

    } else {

        if (!$.isNumeric(row)) {
            $('#row-validate').text("Please enter valid row number.");
        }
        if (!$.isNumeric(column)) {
            $('#column-validate').text("Please enter valid column number.");
        }

    }

});

$(document).on("click", ".open-menu-modal", function () {
    //$("#menu-form-modal").modal('show');
    var index = $(this).data('index');
    $('#index').val(index);
    var row_number = $(this).data('rowval')
    var column_number = $(this).data('columnval')
    $('#current_row').val(row_number);
    $('#current_column').val(column_number);
});

$(document).on("click", "#make-order", function () {

    var item_name = $('#item-name').val().trim();
    var price = $('#price').val();
    var index = $('#index').val();
    var row_number = $('#current_row').val();
    var column_number = $('#current_column').val();

    $('#price-validate').text("");
    $('#item-validate').text("");

    if (item_name != '' && $.isNumeric(price)) {

        var makeOrder = fetchData(
            {
                'price': price,
                'index': index,
                'item_name': item_name,
                'column': column_number,
                'row': row_number
            }, '/make-order', 'json');

        $.when(makeOrder).then(function (orderData) {
            $('#generate-grid').trigger('click');
            $('#menu-form-modal').modal('hide');
        });

    } else {

        if (!$.isNumeric(price)) {
            $('#price-validate').text("Please enter valid price.");
        }
        if (item_name == '') {
            $('#item-validate').text("Please enter item name.");
        }

    }

});

$('#menu-form-modal').on('hidden.bs.modal', function () {
    $('#index').val('');
    $('#item-name').val('');
    $('#price').val('');
})
