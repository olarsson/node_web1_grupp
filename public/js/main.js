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

var booking = {
    step: 0,
    date_diff_indays: function(date1, date2) {
        dt1 = new Date(date1);
        dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    }
};

var tableSort = {
    registerEventListener: function(el) {
        el.on('click', function(e) {
            tableSort.sortBy(e, el.children());
        });
    },
    sortBy: function(e, elList) {
        index = null;
        for (let i = 0; i < elList.length; i++) {
            if (elList[i] == e.target) {
                index = i + 3; //there is 3 input elements first that we ignore
                break;
            };
        }
        if (~e.target.innerText.indexOf('\u2193')) {
            tableSort.highToLow(index, e.target);
        } else {
            tableSort.lowToHigh(index, e.target);
        }
    },
    lowToHigh: function(index, el) {
        if (~el.innerText.indexOf('\u2191')) {
            el.innerText = el.innerText.replace('\u2191', '\u2193');
        } else {
            $(el).parent().children().each((_, e) => {
                e.innerText = e.innerText.replace('\u2193', '').replace('^', ''); // remove all arrows
            });
            el.innerText = el.innerText + '\u2193';
        }
        const rows = $('.divTableBody').children().slice(1); // Slice to remove table header from selection
        let sortedRows = rows.sort((a, b) => {
            if ($($(a).children().children()[index]).find('input').length > 0) {
                a = $($(a).children().children()[index]).find('input')[0].value;
                b = $($(b).children().children()[index]).find('input')[0].value;
            } else {
                a = $(a).children().children()[index].innerText;
                b = $(b).children().children()[index].innerText;
            }
            return a > b;
        });
        sortedRows.appendTo('.divTableBody');
    },
    highToLow: function(index, el) {
        el.innerText = el.innerText.replace('\u2193', '\u2191');
        const rows = $('.divTableBody').children().slice(1); // Slice to remove table header from selection
        let sortedRows = rows.sort((a, b) => {
            if ($($(a).children().children()[index]).find('input').length > 0) {
                a = $($(a).children().children()[index]).find('input')[0].value;
                b = $($(b).children().children()[index]).find('input')[0].value;
            } else {
                a = $(a).children().children()[index].innerText;
                b = $(b).children().children()[index].innerText;
            }
            return a < b;
        });
        sortedRows.appendTo('.divTableBody');

    }
};

//if (res < 0) //error

(function() {
    tableSort.registerEventListener($('.divTableHeading'));


  /*  $(document).on("click", "#bookings_from_to input[type='submit']", function () {
  
        $.ajax({
  
          url: url,
          data: form_methods.objectifyForm(form),
          type: method,
          cache: true,
          timeout: 10000,
  
          complete: function (jqXHR, textStatus) {
  
            data = jqXHR.responseJSON;
  
            if (textStatus == 'success') {
  
  
            }
  
          }
  
  
        });
  
  
      });*/

    $(document).on("click", "form[data-edit='true'] input[type='submit']", function() {

        var method = $(this).attr('data-meth');
        var form = $(this).closest('form')[0];
        var url = $(this).attr('data-url') || $(form).attr('action');
        var btn_val = $(this).val();
        var date_1 = $(form).find('input[name="date_from"]').val();
        var date_2 = $(form).find('input[name="date_to"]').val();

        /*    if (btn_val == 'Boka' && booking.step == 0) {
    if (booking.date_diff_indays( date_1, date_2 ) < 0) {
    //dates are reversed, error out
    console.log('dates are reversed, error out');
  } else {
  //ok, show confirmation
  console.log('ok, show confirmation');
  $('.confirm p').html('');
  $('.confirm').addClass('active');
}
} else {*/

        $.ajax({

            url: url,
            data: form_methods.objectifyForm(form),
            type: method,
            cache: true,
            timeout: 10000,

            complete: function(jqXHR, textStatus) {
                data = jqXHR.responseJSON;

                if (textStatus == 'success') {

                    //admin delen av post/delete/patch
                    if (~url.indexOf('/cars')) {
                        if (method == 'DELETE') {
                            $(form).remove();
                        } else {
                            console.log('update success');
                        }
                    }

          //bokningsdelen av post/delete
          /*
          if (url == '/min-sida') {
            if (method == 'DELETE') {
              form_methods.booked_by(false, form);
              console.log('bil avbokad')
              $(form).remove();
            } else {
              console.log('bil bokad')
              form_methods.booked_by(true, form);
            }
          }

          if (url == '/boka-bil') {
            if (method == 'DELETE') {
              form_methods.booked_by(false, form);
              console.log('bil avbokad')
            } else {
              console.log('bil bokad')
              form_methods.booked_by(true, form);
            }
          }
          */
                    //bokningsdelen av post/delete
                    if (~url.indexOf('/bookings')) {
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

        //}

        return false;
    })

})();