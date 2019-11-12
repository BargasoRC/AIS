$(document).ready(function () {

  var results;
  var studentName;
  var studentData;

  $("#go").click(function () {
    studentName = $('#name').val()
    if (studentName !== "") {
      studentName = studentName.toLowerCase().split(',');

      console.log('checking')

      var method = 'GET'
      var url = 'http://localhost:8080/checking';
      studentData = { firstname: studentName[1], lastname: studentName[0] };
      var check;
      apiRequest(url, studentData, method).then(res => {
        check = res;
        if (check.exists) {
          $('#modalName').html(studentData.lastname + ", " + studentData.firstname);
          addVisitor();
        } else {
          console.log('Student not Found!')
        }
      });
    }else{
      console.log('testing ')
        $('#myModal').hide();
    }
  });

  $('#close').click(function () {
    student = {};
    studentName = "";
  })

  function addVisitor() {
    $('#save').on('click', function () {
      var firstName = $('#firstName').val();
      var lastName = $('#lastName').val();
      var age = $('#age').val();
      var gender = $('#sex option:selected').text()
      var address = $('#Address').val();
      var requestUrl = 'http://localhost:8080/add';
      var method = 'POST'
      var visitors = { FirstName: firstName, LastName: lastName, Age: age, Gender: gender, address: address };

      console.log(studentData)

      var data = { student: studentData, visitor: visitors };

      apiRequest(requestUrl, data, method);
    })
  }
  function apiRequest(apiurl, apidata, method) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: apiurl,
        data: apidata,
        type: method,
        success: function (result) {
          resolve(result)
        }, error: function (error) {
          reject(error)
        }
      });
    })
  }
});