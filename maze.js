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
      item.append("<div class='wall' id='x"+i+"y"+j+"'></div>")
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
  // console.log(array);
}
function test()
{
  var start;
  var end;

  var side = Math.floor(Math.random()*4);
  if (side === 0)
  {
    var one = "x"+Math.floor(Math.random()*50);
    var two = "y"+0;
    start = one+""+two;

    var one = "x"+Math.floor(Math.random()*50);
    var two = "y"+(height-1);
    end = one+""+two;
  }
  else if (side === 1)
  {
    var one = "x"+49;
    var two = "y"+Math.floor(Math.random()*height);
    start = one+""+two;

    var one = "x"+0
    var two = "y"+Math.floor(Math.random()*height);
    end = one+""+two;
  }
  else if (side === 2)
  {
    var one = "x"+Math.floor(Math.random()*50);
    var two = "y"+(height-1);
    start = one+""+two;

    var one = "x"+Math.floor(Math.random()*50);
    var two = "y"+0;
    end = one+""+two;
  }
  else if (side === 3)
  {
    var one = "x"+0
    var two = "y"+Math.floor(Math.random()*height);
    start = one+""+two;

    var one = "x"+49;
    var two = "y"+Math.floor(Math.random()*height);
    end = one+""+two;
  }

  // var one = Math.floor(Math.random()*50);
  // var two = Math.floor(Math.random()*height);
  // console.log(one+""+two);
  console.log("side: "+side);
  console.log("start: "+start);
  console.log("end: "+end);
  // $("#"+one+two).css("background-color", "white");
  $("#"+start).css("background-color", "green");
  $("#"+end).css("background-color", "red");
}
