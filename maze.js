var array=[];
var historyArray;
var height;
var startx;
var starty;
var end;
var length = 0;
var lastLongest;
var longest;
var longestCount = 0;
var time = 0;
var difficulty;
$(document).ready(function()
{
  creatMenu();
  // createDivs();
  // createArray();
  // startEnd();
  // createWalls();
  // createPlayer();
});
function creatMenu()
{
  $("body").append("<div id='menu'></div>");
  $("#menu").append("<div id='difficulty'></div>");
  $("#difficulty").append("<button id='easy'>easy</button>");
  $("#difficulty").append("<button id='medium'>medium</button>");
  $("#difficulty").append("<button id='hard'>hard</button>");
  $("#menu").append("<button id='play'>create and play</button>");
  $("#easy").click(function()
  {
    $(this).css("color","#00ff00");
    $(this).css("border","3px solid #00ff00");
    $("#medium").css("color","white");
    $("#medium").css("border","3px solid white");
    $("#hard").css("color","white");
    $("#hard").css("border","3px solid white");
    difficulty="easy";
  })
  $("#medium").click(function()
  {
    $(this).css("color","#ffff00");
    $(this).css("border","3px solid #ffff00");
    $("#easy").css("color","white");
    $("#easy").css("border","3px solid white");
    $("#hard").css("color","white");
    $("#hard").css("border","3px solid white");
    difficulty="medium";
  })
  $("#hard").click(function()
  {
    $(this).css("color","#ff0000");
    $(this).css("border","3px solid #ff0000");
    $("#easy").css("color","white");
    $("#easy").css("border","3px solid white");
    $("#medium").css("color","white");
    $("#medium").css("border","3px solid white");
    difficulty="hard";
  })
  $("#play").click(function()
  {
    if(difficulty)
    {
      $("#menu").remove();
      createDivs();
    }
  })
}
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

    // var one = "x"+Math.floor(Math.random()*50);
    // var two = "y"+(height-1);
    // end = one+""+two;
    // array[one.split("x")[1]][two.split("y")[1]] = "x";
  }
  else if (side === 1)
  {
    var one = "x"+49;
    var two = "y"+Math.floor(Math.random()*height);
    start = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";

    // var one = "x"+0
    // var two = "y"+Math.floor(Math.random()*height);
    // end = one+""+two;
    // array[one.split("x")[1]][two.split("y")[1]] = "x";
  }
  else if (side === 2)
  {
    var one = "x"+Math.floor(Math.random()*50);
    var two = "y"+(height-1);
    start = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";

    // var one = "x"+Math.floor(Math.random()*50);
    // var two = "y"+0;
    // end = one+""+two;
    // array[one.split("x")[1]][two.split("y")[1]] = "x";
  }
  else if (side === 3)
  {
    var one = "x"+0
    var two = "y"+Math.floor(Math.random()*height);
    start = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";

    // var one = "x"+49;
    // var two = "y"+Math.floor(Math.random()*height);
    // end = one+""+two;
    // array[one.split("x")[1]][two.split("y")[1]] = "x";
  }

  // var one = Math.floor(Math.random()*50);
  // var two = Math.floor(Math.random()*height);
  // console.log(one+""+two);

  // console.log("side: "+side);
  // console.log("start: "+start);
  // console.log("end: "+end);

  // $("#"+one+two).css("background-color", "white");

  $("#"+start).css("background-color", "#00ff00");
  // $("#"+end).css("background-color", "red");
  // console.log(height);

  // historyArray.push(start);
  historyArray=[start];
  // last = start;
  // console.log(start);
  // console.log(historyArray);
  createWalls();
}
function createWalls()
{
  var first=true;
  // while (historyArray.length)
  // {
    var draw = setInterval(function()
    {
      if (historyArray.length)
      {
        time+=25;
        var split1 = historyArray[historyArray.length-1].split("x");
        var split2 = split1[1].split("y");
        // console.log(split2);
        checkDirections(parseInt(split2[0]), parseInt(split2[1]));
        if (first)
        {
          first=false;
          longest = historyArray[historyArray.length-1];
          $(longest).css("background-color","#ff0000");
        }
        if (historyArray.length >= longestCount)
        {
          longestCount = historyArray.length;
          $(longest).css("background-color","white");
          longest = historyArray[historyArray.length-1];
          $(longest).css("background-color","#ff0000");

          // last = longest;
          // $(historyArray[historyArray.length-1]).css("background-color","red");
        }
        // console.log("history: "+historyArray[historyArray.length-1]);
      }
      else
      {
        console.log("time: "+(time/=1000)+"s");
        window.clearInterval(draw);
        // console.log(historyArray);
        console.log("length: "+length);
        console.log("longest: "+longestCount);
        // console.log(historyArray.length);
        // console.log(array);
        // console.log(start);
        // console.log(last);
        createPlayer();
      }
      // console.log("in interval");
    }, 25);
  // }
}
function checkDirections(x, y)
{
  // console.log("x: "+x);
  // console.log("y: "+y);

  var possible = [];
  for (var i=0; i<4; i++)
  {
    // up
    if (i === 0)
    {
      if (y-2 >= 0)
      {
        // console.log("up");
        if (x === 0)
        {
          if (array[x][y-2] === " " && array[x][y-1] === " " && array[x+1][y-1] === " ")
          {
            possible.push("U");
          }
        }
        else if (x === 49)
        {
          if (array[x][y-2] === " " && array[x][y-1] === " " && array[x-1][y-1] === " ")
          {
            possible.push("U");
          }
        }
        else if (array[x][y-2] === " " && array[x][y-1] === " " && array[x+1][y-1] === " " && array[x-1][y-1] === " ")
        {
          possible.push("U");
        }
      }
    }
    // down
    if (i === 1)
    {
      if (y+2 <= height-1)
      {
        // console.log("down");
        if (x === 0)
        {
          if (array[x][y+2] === " " && array[x][y+1] === " " && array[x+1][y+1] === " ")
          {
            possible.push("D");
          }
        }
        else if (x === 49)
        {
          if (array[x][y+2] === " " && array[x][y+1] === " "&& array[x-1][y+1] === " ")
          {
            possible.push("D");
          }
        }
        else if (array[x][y+2] === " " && array[x][y+1] === " " && array[x+1][y+1] === " " && array[x-1][y+1] === " ")
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
        // console.log("left");
        if (y === 0)
        {
          if (array[x-2][y] === " " && array[x-1][y] === " " && array[x-1][y+1] === " ")
          {
            possible.push("L");
          }
        }
        else if (y === height-1)
        {
          if (array[x-2][y] === " " && array[x-1][y] === " " && array[x-1][y-1] === " ")
          {
            possible.push("L");
          }
        }
        else if (array[x-2][y] === " " && array[x-1][y] === " " && array[x-1][y+1] === " " && array[x-1][y-1] === " ")
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
        // console.log("right");
        if (y === 0)
        {
          if (array[x+2][y] === " " && array[x+1][y] === " " && array[x+1][y+1] === " ")
          {
            possible.push("R");
          }
        }
        else if (y === height-1)
        {
          if (array[x+2][y] === " " && array[x+1][y] === " " && array[x+1][y-1] === " ")
          {
            possible.push("R");
          }
        }
        else if (array[x+2][y] === " " && array[x+1][y] === " " && array[x+1][y+1] === " " && array[x+1][y-1] === " ")
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
    // longestCount++;
    move(possible, x, y);
    // return move(possible);
  }
  else
  {
    historyArray.pop();
    // return;
  }
}
function move(possible, x, y)
{
  length++;
  // if (last)
  // {
  //   $(last).css("background-color","white");
  // }
  var whichMove = Math.floor(Math.random()*possible.length);
  if (possible[whichMove] === "U")
  {
    // console.log("x: "+x);
    // console.log("y: "+y);
    array[x][y-1] = "x";
    // console.log("up: true");
    $("#x"+x+"y"+(y-1)).css("background-color", "white");
    historyArray.push("#x"+x+"y"+(y-1));
  }
  else if (possible[whichMove] === "D")
  {
    // console.log("x: "+x);
    // console.log("y: "+y);
    array[x][y+1] = "x";
    // console.log("down: true");
    $("#x"+x+"y"+(y+1)).css("background-color", "white");
    historyArray.push("#x"+x+"y"+(y+1));
  }
  else if (possible[whichMove] === "L")
  {
    // console.log("x: "+x);
    // console.log("y: "+y);
    array[x-1][y] = "x";
    // console.log("left: true");
    $("#x"+(x-1)+"y"+y).css("background-color", "white");
    historyArray.push("#x"+(x-1)+"y"+y);
  }
  else if (possible[whichMove] === "R")
  {
    // console.log("x: "+x);
    // console.log("y: "+y);
    array[x+1][y] = "x";
    // console.log("right: true");
    $("#x"+(x+1)+"y"+y).css("background-color", "white");
    historyArray.push("#x"+(x+1)+"y"+y);
  }
  possible=[];
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
