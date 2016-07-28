var array=[];
var histortArray;
var height;
var startx;
var starty;
var end;
$(document).ready(function()
{
  createDivs();
  // createArray();
  // startEnd();
  // createWalls();
  // createPlayer();
});
function createDivs()
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
  createArray();
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
  startEnd();
}
function startEnd()
{
  var side = Math.floor(Math.random()*4);
  if (side === 0)
  {
    var one = "x"+Math.floor(Math.random()*50);
    var two = "y"+0;
    start = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";

    var one = "x"+Math.floor(Math.random()*50);
    var two = "y"+(height-1);
    end = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";
  }
  else if (side === 1)
  {
    var one = "x"+49;
    var two = "y"+Math.floor(Math.random()*height);
    start = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";

    var one = "x"+0
    var two = "y"+Math.floor(Math.random()*height);
    end = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";
  }
  else if (side === 2)
  {
    var one = "x"+Math.floor(Math.random()*50);
    var two = "y"+(height-1);
    start = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";

    var one = "x"+Math.floor(Math.random()*50);
    var two = "y"+0;
    end = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";
  }
  else if (side === 3)
  {
    var one = "x"+0
    var two = "y"+Math.floor(Math.random()*height);
    start = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";

    var one = "x"+49;
    var two = "y"+Math.floor(Math.random()*height);
    end = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";
  }

  // var one = Math.floor(Math.random()*50);
  // var two = Math.floor(Math.random()*height);
  // console.log(one+""+two);

  // console.log("side: "+side);
  // console.log("start: "+start);
  // console.log("end: "+end);

  // $("#"+one+two).css("background-color", "white");
  $("#"+start).css("background-color", "green");
  $("#"+end).css("background-color", "red");
  // histortArray.push(start);
  histortArray=[start];
  console.log(start);
  console.log(histortArray);
  createWalls();
}
function createWalls()
{
  while (histortArray.length)
  {
    // console.log(histortArray);
    var split1 = histortArray[histortArray.length-1].split("x");
    var split2 = split1[1].split("y");
    // console.log(split2);
    checkDirections(parseInt(split2[0]), parseInt(split2[1]));
  }
}
function checkDirections(x, y)
{
  console.log("x: "+x);
  // console.log(x);
  console.log("y: "+y);
  // console.log(y);


  var possible = [];
  for (var i=0; i<4; i++)
  {
    // up
    if (i === 0)
    {
      if (y-2 >= 0)
      {
        console.log("up");
        if (array[x][y-2] === " ")
        {
          possible.push("U");
        }
      }
    }
    // down
    if (i === 1)
    {
      if (y+2 <= height-2)
      {
        console.log("down");
        if (array[x][y+2] === " ")
        {
          possible.push("D");
        }
      }
    }
    // left
    if (i === 2)
    {
      if (x-2 >= 0)
      {
        console.log("left");
        if (array[x-2][y] === " ")
        {
          possible.push("L");
        }
      }
    }
    // right
    if (i === 3)
    {
      if (x+2 <= 49)
      {
        console.log("right");
        if (array[x+2][y] === " ")
        {
          possible.push("R");
        }
      }
    }
  }
  // console.log(possible);
  // console.log(possible.length);
  if (possible.length)
  {
    move(possible);
    // return move(possible);
  }
  else
  {
    histortArray.pop();
    // return;
  }
}
function move(possible)
{
  // var moves = possible.split("");
  // for (var i=0; i<moves.length; i++)
  // {
  //
  // }
  var whichMove = Math.floor(Math.random()*possible.length);
  if (possible[whichMove] === "U")
  {
    array[x][y-2] = "x";
    // console.log("up: true");
    $("#x"+x+"y"+(y-2)).css("background-color", "white");
    // checkDirections(x, y-2);
    histortArray.push("#x"+x+"y"+(y-2));
  }
  else if (possible[whichMove] === "D")
  {
    array[x][y+2] = "x";
    // console.log("down: true");
    $("#x"+x+"y"+(y+2)).css("background-color", "white");
    // checkDirections(x, y+2);
    histortArray.push("#x"+x+"y"+(y+2));
  }
  else if (possible[whichMove] === "L")
  {
    array[x-2][y] = "x";
    console.log("left: true");
    $("#x"+(x-2)+"y"+y).css("background-color", "white");
    // checkDirections(x-2, y);
    histortArray.push("#x"+(x-2)+"y"+y);
  }
  else if (possible[whichMove] === "R")
  {
    array[x+2][y] = "x";
    // console.log("right: true");
    $("#x"+(x+2)+"y"+y).css("background-color", "white");
    // checkDirections(x+2, y);
    histortArray.push("#x"+(x+2)+"y"+y);
  }
  possible=[];
  // return;
}
function createPlayer()
{
  // start code to make player square

  // end code to make player square
  $(document).keyup(function(e)
  {
    // left
    if (e.which === 37)
    {
      console.log("left");
      // hor-=2;
      // player.css("left", hor+"px");
    }
    // up
    if (e.which === 38)
    {
      console.log("up");
      // vert-=2;
      // player.css("top", vert+"px");
    }
    // right
    if (e.which === 39)
    {
      console.log("right");
      // hor+=2;
      // player.css("left", hor+"px");
    }
    // down
    if (e.which === 40)
    {
      console.log("down");
      // vert+=2;
      // player.css("top", vert+"px");
    }
  });
}
