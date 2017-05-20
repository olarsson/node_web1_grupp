var form_methods = {
  objectifyForm: function(formArray) {
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) returnArray[formArray[i]['name']] = formArray[i]['value'];
    return returnArray;
  }
};

(function() {

  $(document).on("click", "form[data-edit='true'] input[type='submit']", function () {

    var method = $(this).attr('data-meth');
    var form = $(this).closest('form')[0];
    var url = $(form).attr('action');

    $.ajax({

      url: url,
      data: form_methods.objectifyForm(form),
      type: method,
      cache: true,
      timeout: 10000,

      complete: function (jqXHR, textStatus) {

        data = jqXHR.responseJSON;

        if (textStatus == 'success') {

          //admin delen av post/delete/patch
          if (url == '/cars') {
            if (method == 'DELETE') {
              $(form).remove();
            } else {
              console.log('update success');
            }
          }

          //bokningsdelen av post/delete
          if (url == '/min-sida') {
            if (method == 'DELETE') {
              console.log('bil avbokad')
            } else {
              console.log('bil bokad')
            }
          }


        } else {
          //request failed, timed out, etc..

        }

      }


    });

    return false;
  })

})();
