$(document).ready(function () {
  $("#go").click(function () {
    var studentName = $('#name').val();
    // $.ajax({
    //   url: 'http:localhost:8080/checking',
    //   data: studentName,
    //   type: "POST",
    //   success: function (result) {

    //   }
    // });
    var method = 'GET'
    var url = 'http:localhost:8080/checking';
    var data = JSON.stringify({'student':studentName});
    if(apiRequest(url, data, method)){
      var firstName = $('#name').val();
      var lastName = $('#subject').val();
      var age = $('#Age').val();
      var gender = $('#courseYear').val();
      var address = $('#Address').val();
      var requestUrl = 'http://localhost:8080/visit/' + studentName;
      var data = JSON.stringify({ "FirstName": firstName, "LastName": lastName, "Age": age, "Gender": gender, "address": address })
      apiRequest(requestUrl, data)
    }
  });
  function apiRequest(apiurl, apidata = true, method) {
    $.ajax({
      url: apiurl,
      data: apidata,
      type: method,
      success: function (result) {
        swal({
          title: "Success!",
          text: result + " has been added!",
          icon: "success",
          button: "OK",
        });
        return result;
      },error:function(error){
        return false;
      }
    });
  }
});