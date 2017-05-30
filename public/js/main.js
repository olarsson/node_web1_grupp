var form_methods = {
  //Gör om ett formulär till ett objekt
  objectifyForm: function(formArray) {
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) returnArray[formArray[i]['name']] = formArray[i]['value'];
    return returnArray;
  },
  //Hantering av medelanden till klienten
  booked_by: function(msg, positive, reload_win) {
    $('.confirm').removeClass('red');
    $('.confirm').addClass('active');
    if (!positive) $('.confirm').addClass('red');
    $('.confirm p').html(msg);
    booking.reload_win = reload_win;
  }
};

var booking = {
  reload_win: false,
  //Returnerar skillnaden i dagar mellan två datum
  date_diff_indays: function(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
  }
};

//Sortering av egenskaper i css-table under "min-sida" och "boka-bil"
var tableSort = {
  registerEventListener: function(el) {
    el.on('click', function(e) {
      tableSort.sortBy(e, el.children());
    });
  },
  sortBy: function(e, elList) {
    let index = null;
    for (let i = 0; i < elList.length; i++) {
      if (elList[i] == e.target) {
        const ignore = $($('.divTableRow')[0]).find('input[type="hidden"]').length;
        index = i + ignore; //hoppa över hidden input elementen i raderna
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
        e.innerText = e.innerText.replace('\u2193', '').replace('\u2191', ''); // remove all arrows
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
        a = isNaN(parseInt(a)) ? a : parseInt(a);
        b = isNaN(parseInt(b)) ? b : parseInt(b);
      }
      if (a > b) return 1
      return (a < b) ? -1 : 0
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
        a = isNaN(parseInt(a)) ? a : parseInt(a);
        b = isNaN(parseInt(b)) ? b : parseInt(b);
      }
      if (a < b) return 1
      return (a > b) ? -1 : 0
    });
    sortedRows.appendTo('.divTableBody');

  }
};

(function() {
  tableSort.registerEventListener($('.divTableHeading'));

  //Event för stängning av medelandet som skickades till klienten
  $(document).on("click", ".confirm.active input[type='submit']", function() {
    if (booking.reload_win) {
      window.location.reload(true);
    } else {
      $('.confirm').removeClass('active');
    }
  });

  //Detta händer när man bokar/avbokar som användare. Eller ändrar/lägger till/tar bort en bil som admin
  $(document).on("click", "form[data-edit='true'] input[type='submit']", function() {
    var method = $(this).attr('data-meth');
    var form = $(this).closest('form')[0];
    var url = $(this).attr('data-url') || $(form).attr('action');
    var btn_val = $(this).val();
    var date_1 = $(form).find('input[name="date_from"]').val();
    var date_2 = $(form).find('input[name="date_to"]').val();

    var error_msg = null;

    //Ny bokning, kontrollera att datum är i "rätt ordning"
    if (~url.indexOf('/bookings') && method == 'POST') {
      if (booking.date_diff_indays( date_1, date_2 ) < 0) {
        error_msg = 'Datumen är i fel ordning.';
      }
    }

    if (error_msg) {

      form_methods.booked_by(error_msg, false, false);

    } else {


      $.ajax({

        url: url,
        data: form_methods.objectifyForm(form),
        type: method,
        cache: true,
        timeout: 10000,

        complete: function(jqXHR, textStatus) {
          data = jqXHR.responseJSON;

          if (textStatus == 'success') {

            //Admin delen av post/delete/patch
            if (~url.indexOf('/cars')) {
              if (method == 'DELETE') {
                $(form).remove();
                form_methods.booked_by('Bil borttagen', true, false);
              } else {
                form_methods.booked_by('Bil ändrad', true, true);
              }
            }

            //Bokningsdelen av post/delete
            if (~url.indexOf('/bookings')) {
              if (method == 'DELETE') {
                form_methods.booked_by('Bil avbokad', true, true);
              } else {
                if (data) {
                  form_methods.booked_by(data.message, true, false);
                } else {
                  form_methods.booked_by('Bil bokad', true, false);
                }
              }
            }


          }

        }


      });

    }


    return false;
  })

})();
