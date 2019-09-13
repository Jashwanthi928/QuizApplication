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
  let qcount=5,op=4,count=0,nextPrev=0;
  let checkRepeat=new Array();checkRepeat=[];
  $('.total-que').html(qcount)
  // $('#myModal').modal('show');
    let jsonValues = $.getJSON("quizQuestions.json", function(){
    for (i = 1; i<=qcount; i++) {
      let queNo=Math.floor(Math.random() * jsonValues.responseJSON.Personalities.length);
      if(checkRepeat.includes(queNo))
      {
        i=i-2;
        if(count>=5)
        {
            break;
        }
      }
      else
      {
        if(count>=5)
        {
          break;
        }
        count=count+1;
        checkRepeat.push(queNo);
        let dataToStore = JSON.stringify(jsonValues.responseJSON.Personalities[queNo]);
        localStorage.setItem(count,dataToStore);
      }
    }
    });
    let getQuestions=function(qc)
    {
      $("#optionBtn").empty();
              let retrievedObject = localStorage.getItem(qc);
              let parsedObject = JSON.parse(retrievedObject);
              $('.questions').html(parsedObject.question);
              $('.question-number').html('Question '+qc+'/');
              for(j=1;j<=op;j++)
              {
                let btn='<div class="">'+'<input type="button" class="option" name="Option" value="'+parsedObject[j]+'"/>'+'</div>';
                $('#optionBtn').append(btn).last();
              }
    }
    getQuestions(1);
    $('.next').click(function(){
      nextPrev+=1;
      if(nextPrev<=qcount){
        $("#optionBtn").empty();
        getQuestions(nextPrev);
      }
      else {
        alert('You have seen all questions');
      }
    });
    $('.prev').click(function(){
      nextPrev-=1;
      if(nextPrev>=0){
        $("#optionBtn").empty();
        getQuestions(nextPrev);
      }
      else {
        nextPrev=0;
        alert('This is the first question');
      }
    });
});
