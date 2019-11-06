$(document).ready(function () {
  $("#go").click(function () {
    $(this).attr('data-toggle', 'modal');
    var firstName = $('#name').val();
    var lastName = $('#subject').val();
    var age = $('#Age').val();
    var gender = $('#courseYear').val();
    var address = $('#Address').val();

    var requestUrl = 'http://localhost:8080/visit/'+studentName;
    var data = JSON.stringify({ "FirstName": firstName, "LastName": lastName, "Age": age, "Gender": gender,"address":address })
    apiRequest(requestUrl, data)
  });
  function apiRequest(apiurl,apidata = true) {
    $.ajax({
      url: apiurl,
      data: apidata,
      type: "POST",
      success: function (result) {
        swal({
          title: "Success!",
          text: result + " has been added!",
          icon: "success",
          button: "OK",
        });
      }
    });
  }
});