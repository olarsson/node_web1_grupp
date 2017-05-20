var form_methods = {
  objectifyForm: function(formArray) {
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) returnArray[formArray[i]['name']] = formArray[i]['value'];
    return returnArray;
  },
  booked_by: function(i, form) {
    $(form).removeClass('red green');
    $(form).find('input[value="Boka"]').prop('disabled', (i ? true : false));
    $(form).find('input[value="Avboka"]').prop('disabled', (i ? false : true));
    $(form).find('input[name="date_from"]').prop('disabled', (i ? true : false));
    $(form).find('input[name="date_to"]').prop('disabled', (i ? true : false));
    $(form).find('span[name="booked"]').html((i ? 'Ja' : 'Ledig'));
    if (i) $(form).addClass('green');
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
              form_methods.booked_by(false, form);
              console.log('bil avbokad')
            } else {
              console.log('bil bokad')
              form_methods.booked_by(true, form);
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
