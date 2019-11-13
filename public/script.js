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
          $('#addModal').modal('toggle');
          $('#addModal').modal('show');
          $('#modalName').html(studentData.lastname + ", " + studentData.firstname);
          addVisitor();
        } else {
          swal({
            icon: "error",
            text:"Student not Found!"
          });
          console.log('Student not Found!')
        }
      });
    }
  });

  $('#close').click(function () {
    student = {};
    studentName = "";
  })

  $('#retrieveAll').click(function () {
    var method = "GET";
    var url = 'http://localhost:8080/retrieve-all';
    var data = "";
    apiRequest(url, studentData, method).then(res => {
      console.log('table body testing...')
      console.log(res.data.body[6].visitors[0]);
      $("#table").show();
      $("#table").fadeIn();
      var body = res.data.body;
      var update = '<button id="tableUpdate" type="button" class="btn btn-outline-primary">update</button>';
      var Delete = '<button id="tabledelete"type="button" class="btn btn-outline-danger">delete</button>';
      for (var i = 0; i < body.length; ++i) {
        for (var x = 0; x < body[i].visitors.length; ++x) {
          if (body[i].visitors.length !== 0) {
            var data = '<tr id=' + body[i]._id + '>' +
              '<td>' + body[i].name.lastname + ', ' + body[i].name.firstname + '</td>' +
              '<td>' + body[i].visitors[x].lastName + '</td>' +
              '<td>' + body[i].visitors[x].firstName + '</td>' +
              '<td>' + body[i].visitors[x].age + '</td>' +
              '<td>' + body[i].visitors[x].gender + '</td>' +
              '<td>' + body[i].visitors[x].address + '</td>' +
              '<td>' + update + Delete + '</td>' +
              '</tr>';
            $('tbody').css({ 'font-size': '12px' }).append(data);
          }
        }
      }
    });
  })

  $(document).on('click', '#tableUpdate', function () {
    console.log(this)
    var a = $(this).closest('tr').attr('id');
    console.log(a)
    $('#updateModal').modal('show');
    var updatedFirstName = $('#updateFirstName').val();
    var updatedLastName = $('#updateLastName').val();
    var updatedAge = $('#updateAge').val();
    var updatedGender = $('#updateSex option:selected').text()
    var updatedAddress = $('#updateAddress').val();
    var url = 'http://localhost:8080/update/'+a;
    var method = 'PUT'
    var data = { firstname: updatedFirstName, lastname: updatedLastName, age: updatedAge, gender: updatedGender, address: updatedAddress };
    apiRequest(url, data, method).then(res => {
      console.log(res)
    });
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
      var visitors = { firstname: firstName, lastname: lastName, age: age, gender: gender, address: address };

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