// Author: Debarun Mitra
// Technology used: HTML, CSS, JavaScript, JQuery, Bootstrap
// objective: Create a quiz application
//navbar icon start
let bar = document.getElementById('myLinks');
let userAns = new Array();
function barAccess() {
  if (bar.style.display == "block") {
    bar.style.display = "none";
  } else {
    bar.style.display = "block";
  }
}
//navbar icon end
function clickedOption(id,que)
{
  let optionVal=document.getElementById(id);
  userAns[que-1]=optionVal.value;
  for(i=1;i<=4;i++)
  {
      if(i!=id)
      {
        document.getElementById(i).style.border="solid";
        document.getElementById(i).style.borderColor="white";
      }
      else
      {
        optionVal.style.border="solid";
        optionVal.style.borderColor="green";
        localStorage.setItem("ans", JSON.stringify(userAns));
      }
  }
  //console.log(userAns);
}
$(document).ready(function() {
  let qcount = 5,
    op = 4,
    count = 0,
    nextPrev = 1;
  let checkRepeat = new Array();
  checkRepeat = [];
  $('.total-que').html(qcount);
  // $('#myModal').modal('show');
  /*random question set start*/
  let jsonValues = $.getJSON("quizQuestions.json", function() {
    for (i = 1; i <= qcount; i++) {
      let queNo = Math.floor(Math.random() * jsonValues.responseJSON.Personalities.length);
      if (checkRepeat.includes(queNo)) {
        i = i - 2;
        if (count >= 5) {
          break;
        }
      } else {
        if (count >= 5) {
          break;
        }
        count = count + 1;
        checkRepeat.push(queNo);
        let dataToStore = JSON.stringify(jsonValues.responseJSON.Personalities[queNo]);
        localStorage.setItem(count, dataToStore);
      }
    }
  });
  /*random question set end*/
  /*question-option show start*/
  let getQuestions = function(qc) {
    $("#optionBtn").empty();
    let retrievedObject = localStorage.getItem(qc);
    let parsedObject = JSON.parse(retrievedObject);
    $('.questions').html(parsedObject.question);
    $('.question-number').html('Question ' + qc + '/');
    for (j = 1; j <= op; j++) {
      let btn = '<div class="">' + '<input id="'+j+'" type="button" class="option" onclick="clickedOption('+j+','+qc+')" name="Option" value="' + parsedObject[j] + '"/>' + '</div>';
      $('#optionBtn').append(btn).last();
    }
  }
  getQuestions(1);
  /*question-option show end*/
  /*next question start*/
  $('.next').click(function() {
    nextPrev += 1;
    if (nextPrev <= qcount) {
      $("#optionBtn").empty();
      getQuestions(nextPrev);
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
    } else {
      nextPrev = 0;
      alert('This is the first question');
    }
  });
  /*next question end*/
});
