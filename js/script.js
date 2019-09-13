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
  // $('#myModal').modal('show');

});
