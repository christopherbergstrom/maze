var array=[];
var height;
$(document).ready(function()
{
  createWalls();
  createArray();
  test();
});
function createWalls()
{
  // rows
  // $("body").append("<div id='container'></div>");
  // var width = window.innerWidth*.02;
  // height = Math.floor(window.innerHeight / width);
  // for (var i = 0; i < height; i++)
  // {
  //   var item = $("<div class='row'></div>");
  //   for (var j = 0; j < 50; j++)
  //   {
  //     item.append("<div class='wall'></div>")
  //   }
  //   $("#container").append(item);
  //   $("body").append($("#container"));
  // }
  // cols
  $("body").append("<div id='container'></div>");
  var width = window.innerWidth*.02;
  height = Math.floor(window.innerHeight / width);
  for (var i = 0; i < 50; i++)
  {
    var item = $("<div class='col'></div>");
    for (var j = 0; j < height; j++)
    {
      item.append("<div class='wall' id='"+i+""+j+"'></div>")
    }
    $("#container").append(item);
    $("body").append($("#container"));
  }
}
function createArray()
{
  for (var i = 0; i < 50; i++)
  {
    var tempArray = [];
    for (var j = 0; j < height; j++)
    {
      tempArray.push(" ");
    }
    array.push(tempArray);
  }
  console.log(array);
}
function test()
{
  var one = Math.floor(Math.random()*50);
  var two = Math.floor(Math.random()*height);
  $("#"+one+two).css("background-color", "white");
}
