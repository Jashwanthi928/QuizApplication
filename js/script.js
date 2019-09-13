// Author: Debarun Mitra
// Technology used: HTML, CSS, JavaScript, JQuery, Bootstrap
// objective: Create a quiz application
let bar=document.getElementById('myLinks');
function barAccess()
{
  console.log('in');
  if(bar.style.display=="block")
  {
    console.log("none");
    bar.style.display="none";
  }
  else {
        console.log("block");
    bar.style.display="block";
  }
}
$(document).ready(function(){
  let qcount=0,op=4;
  // $('#myModal').modal('show');
  // $.getJSON("quizQuestions.json", function(result){
  //      $.each(result, function(i, field){
  //           //create table
  //       });
  //   });
    let jsonValues = $.getJSON("quizQuestions.json", function(){
    $("#optionBtn").empty();
    let dataToStore = JSON.stringify(jsonValues.responseJSON.Personalities);
    let totalQue=JSON.parse(dataToStore);
    let queNo=Math.floor(Math.random() * totalQue.length);
    $('.questions').html(totalQue[queNo].question);
    for (i = 1; i <=op; i++) {
    let btn='<div class="">'+'<input type="button" class="option" name="Option" value="'+totalQue[queNo][i]+'"/>'+'</div>';
    $('#optionBtn').append(btn).last();
     //console.log(totalQue[queNo][i]);
    };
    });

});
