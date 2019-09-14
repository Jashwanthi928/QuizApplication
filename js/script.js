// Author: Debarun Mitra
// Technology used: HTML, CSS, JavaScript, JQuery, Bootstrap
// objective: Create a quiz application
//navbar icon start
let bar = document.getElementById('myLinks');
const gradeMsg = ["Improve!!", "GOOD", "GREAT!!"]
let userAns = new Array();

function barAccess() {
  if (bar.style.display == "block") {
    bar.style.display = "none";
  } else {
    bar.style.display = "block";
  }
}
//navbar icon end
//countDown start
document.getElementById('timeCounter').innerHTML = 9 + ":" + 59;

function startTimer() {
  let presentTime = document.getElementById('timeCounter').innerHTML;
  let timeArray = presentTime.split(/[:]+/);
  let m = timeArray[0];
  let s = checkSecond((timeArray[1] - 1));
  if (s == 59) {
    m = m - 1
  }
  document.getElementById('timeCounter').innerHTML = m + ":" + s;
  setTimeout(startTimer, 1500);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec
  }; // add zero in front of numbers < 10
  if (sec < 0) {
    sec = "59"
  };
  return sec;
}
//countDown stop

function clickedOption(id, que) {
  let optionVal = document.getElementById(id);
  userAns[que - 1] = optionVal.value;
  for (i = 1; i <= 4; i++) {
    if (i != id) {
      document.getElementById(i).style.border = "solid";
      document.getElementById(i).style.borderColor = "white";
    } else {
      optionVal.style.border = "solid";
      optionVal.style.outline = "none";
      optionVal.style.borderColor = "#374176";
      localStorage.setItem("ans", JSON.stringify(userAns));
    }
  }
}
$(document).ready(function() {
  let qcount = 10,
    op = 4,
    count = 0,
    nextPrev = 1;
  let checkRepeat = new Array();
  checkRepeat = [];
  $('.total-que').html(qcount);
  $("#optionBtn").empty();
  $('.questions').html(' ');
  $('#startModal').modal('show');
  /*random question set start*/
  $('.start-btn').click(function() {
    $('#startModal').modal('hide');
    $('#instruction').css("display", "block");
    startTimer();
    let jsonValues = $.getJSON("quizQuestions.json", function() {
      for (i = 1; i <= qcount; i++) {
        let queNo = Math.floor(Math.random() * jsonValues.responseJSON.Personalities.length);
        if (checkRepeat.includes(queNo)) {
          i = i - 2;
          if (count >= qcount) {
            break;
          }
        } else {
          if (count >= qcount) {
            break;
          }
          count = count + 1;
          checkRepeat.push(queNo);
          let dataToStore = JSON.stringify(jsonValues.responseJSON.Personalities[queNo]);
          localStorage.setItem(count, dataToStore);
        }
      }
    });
    getQuestions(1);
  });
  /*random question set end*/
  /*question-option show start*/
  let getQuestions = function(qc) {
    $("#optionBtn").empty();
    $('.questions').html(' ');
    let retrievedObject = localStorage.getItem(qc);
    let parsedObject = JSON.parse(retrievedObject);
    $('.questions').html(parsedObject.question);
    //console.log(parsedObject);
    $('.question-number').html('Question ' + qc + '/');
    for (j = 1; j <= op; j++) {
      let btn = '<div class="">' + '<input id="' + j + '" type="button" class="option" onclick="clickedOption(' + j + ',' + qc + ')" name="Option" value="' + parsedObject[j] + '"/>' + '</div>';
      $('#optionBtn').append(btn).last();
    }
  }
  getQuestions(1);
  /*question-option show end*/
  /*next question start*/
  $('.next').click(function() {
    nextPrev += 1;
    if (nextPrev <= qcount) {
      $('.prev').css("display", "block");
      $("#optionBtn").empty();
      getQuestions(nextPrev);
      if (nextPrev === qcount) {
        $('.next').css("display", "none");
        $('.submit-btn,.prev').css("display", "block");
      }
    } else {
      alert('You have seen all questions');
    }
  });
  /*next question end*/
  /*prev question start*/
  $('.prev').click(function() {
    nextPrev -= 1;
    if (nextPrev > 0) {
      $("#optionBtn").empty();
      getQuestions(nextPrev);
      $('.next').css("display", "block");
      $('.submit-btn').css("display", "none");
    } else {
      nextPrev = 0;
      $('.prev').css("display", "none");
      alert('This is the first question');
    }
  });
  /*next question end*/

  $("#submitAns").click(function() {
    $("#questDiv").css("display", "none");
    $("#userScore").css("display", "block");
    $(".timeCounter").css("display", "none");
    $(".timer-count").html('00:00');
    //  clearInterval(startTimer);
    let point = 0;
    for (i = 1; i <= qcount; i++) {
      let retrievedObject = localStorage.getItem(i);
      let parsedObject = JSON.parse(retrievedObject);
      if (userAns.includes(parsedObject.ans)) {
        point += 1;
      }
    }
    if (point < 5) {
      $('.grade').html(gradeMsg[0]);
    } else if (point == 5) {
      $('.grade').html(gradeMsg[1]);
    } else if (point > 5) {
      $('.grade').html(gradeMsg[2]);
    }
    $('.score-point').html(`${point}/${qcount}`);
  });
  /*quit start*/
  $('.quit-btn').click(function() {
    $('#myModal').modal('show');
  });
  $('#ok').click(function() {
    //  localStorage.clear();
    $('#myModal').modal('hide');
    location.reload();
  });
  /*quit stop*/
  $('.review-ans').click(function() {
    location.reload();
  });
  $('.next-go').click(function() {
    $('#instruction').css("display", "none");
    $('#questDiv').css("display", "block");
  });
});
