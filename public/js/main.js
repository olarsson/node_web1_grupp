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

    //console.log(form)
    $.ajax({

      url: '/cars',
      data: form_methods.objectifyForm(form),
      type: method,
      cache: true,
      timeout: 10000,

      complete: function (jqXHR, textStatus) {

        data = jqXHR.responseJSON;

        if (textStatus == 'success') {
          if (method == 'DELETE') {
            $(form).remove();
          } else {
            console.log('update success');
          }
        } else {
          //request failed, timed out, etc..

        }

      }


    });

    return false;
  })

})();
