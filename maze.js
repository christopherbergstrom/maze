var array=[];
var historyArray;
var height;
var start;
var startx;
var starty;
var length = 0;
var lastLongest;
var longest;
var longestCount = 0;
var time = 0;
var difficulty;
var maxWidth;
var speed;
var position;
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
    difficulty=.04;
    maxWidth=25;
    speed=20;
  })
  $("#medium").click(function()
  {
    $(this).css("color","#ffff00");
    $(this).css("border","3px solid #ffff00");
    $("#easy").css("color","white");
    $("#easy").css("border","3px solid white");
    $("#hard").css("color","white");
    $("#hard").css("border","3px solid white");
    difficulty=.02;
    maxWidth=50;
    speed=10;
  })
  $("#hard").click(function()
  {
    $(this).css("color","#ff0000");
    $(this).css("border","3px solid #ff0000");
    $("#easy").css("color","white");
    $("#easy").css("border","3px solid white");
    $("#medium").css("color","white");
    $("#medium").css("border","3px solid white");
    difficulty=.01;
    maxWidth=100;
    speed=5;
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
  // create divs for maze map
  $("body").append("<div id='container'></div>");
  var width = window.innerWidth*difficulty;
  height = Math.floor(window.innerHeight / width);
  for (var i = 0; i < maxWidth; i++)
  {
    if (difficulty === .04)
    {
      var item = $("<div class='colL'></div>");
    }
    else if (difficulty === .02)
    {
      var item = $("<div class='colM'></div>");
    }
    else if (difficulty === .01)
    {
      var item = $("<div class='colS'></div>");
    }
    for (var j = 0; j < height; j++)
    {
      if (difficulty === .04)
      {
        item.append("<div class='wallL' id='x"+i+"y"+j+"'></div>")
      }
      else if (difficulty === .02)
      {
        item.append("<div class='wallM' id='x"+i+"y"+j+"'></div>")
      }
      else if (difficulty === .01)
      {
        item.append("<div class='wallS' id='x"+i+"y"+j+"'></div>")
      }
    }
    $("#container").append(item);
    $("body").append($("#container"));
  }
  createArray();
}
function createArray()
{
  // create maze map array
  for (var i = 0; i < maxWidth; i++)
  {
    var tempArray = [];
    for (var j = 0; j < height; j++)
    {
      tempArray.push(" ");
    }
    array.push(tempArray);
  }
  startEnd();
}
function startEnd()
{
  var side = Math.floor(Math.random()*4);
  if (side === 0)
  {
    var one = "x"+Math.floor(Math.random()*maxWidth);
    var two = "y"+0;
    start = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";
  }
  else if (side === 1)
  {
    var one = "x"+(maxWidth-1);
    var two = "y"+Math.floor(Math.random()*height);
    start = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";
  }
  else if (side === 2)
  {
    var one = "x"+Math.floor(Math.random()*(maxWidth-1));
    var two = "y"+(height-1);
    start = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";
  }
  else if (side === 3)
  {
    var one = "x"+0
    var two = "y"+Math.floor(Math.random()*height);
    start = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";
  }
  $("#"+start).css("background-color", "#00ff00");
  historyArray=[start];
  createWalls();
}
function createWalls()
{
  // actually make the maze
  var first=true;
  var draw = setInterval(function()
  {
    if (historyArray.length)
    {
      time+=speed;
      var split1 = historyArray[historyArray.length-1].split("x");
      var split2 = split1[1].split("y");
      checkDirections(parseInt(split2[0]), parseInt(split2[1]));
      if (first)
      {
        first=false;
        longest = historyArray[historyArray.length-1];
        position = historyArray[historyArray.length-1];
        $(longest).css("background-color","#ff0000");
      }
      if (historyArray.length >= longestCount)
      {
        longestCount = historyArray.length;
        $(longest).css("background-color","white");
        longest = historyArray[historyArray.length-1];
        $(longest).css("background-color","#ff0000");
      }
    }
    else
    {
      window.clearInterval(draw);
      $(position).css("background-color","#2ea1fb");
      position = position.split("#")[1];
      position = position.split("x")[1];
      position = position.split("y");
      longest = longest.split("#")[1];
      longest = longest.split("x")[1];
      longest = longest.split("y");
      start = start.split("x")[1];
      start = start.split("y");
      // console.log("time: "+(time/=1000)+"s");
      // console.log("array: "+array);
      // console.log(historyArray);
      // console.log("length: "+length);
      // console.log("longest count: "+longestCount);
      console.log("start: "+start);
      console.log("end: "+longest);
      console.log("position: "+position);
      // console.log("maze length: "+historyArray.length);
      createPlayer();
    }
    // console.log("in interval");
  }, speed);
}
function checkDirections(x, y)
{
  // console.log("x: "+x);
  // console.log("y: "+y);

  var possible = [];
  for (var i=0; i<4; i++)
  {
    // check up
    if (i === 0)
    {
      if (y-2 >= 0)
      {
        if (x === 0)
        {
          if (array[x][y-2] === " " && array[x][y-1] === " " && array[x+1][y-1] === " ")
          {
            possible.push("U");
          }
        }
        else if (x === (maxWidth-1))
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
    // check down
    if (i === 1)
    {
      if (y+2 <= height-1)
      {
        if (x === 0)
        {
          if (array[x][y+2] === " " && array[x][y+1] === " " && array[x+1][y+1] === " ")
          {
            possible.push("D");
          }
        }
        else if (x === (maxWidth-1))
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
    // check left
    if (i === 2)
    {
      if (x-2 >= 0)
      {
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
    // check right
    if (i === 3)
    {
      if (x+2 <= (maxWidth-1))
      {
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
  if (possible.length)
  {
    move(possible, x, y);
  }
  else
  {
    historyArray.pop();
  }
}
function move(possible, x, y)
{
  length++;
  var whichMove = Math.floor(Math.random()*possible.length);
  // move up
  if (possible[whichMove] === "U")
  {
    // console.log("x: "+x);
    // console.log("y: "+y);
    array[x][y-1] = "x";
    $("#x"+x+"y"+(y-1)).css("background-color", "white");
    historyArray.push("#x"+x+"y"+(y-1));
  }
  // move down
  else if (possible[whichMove] === "D")
  {
    // console.log("x: "+x);
    // console.log("y: "+y);
    array[x][y+1] = "x";
    $("#x"+x+"y"+(y+1)).css("background-color", "white");
    historyArray.push("#x"+x+"y"+(y+1));
  }
  // move left
  else if (possible[whichMove] === "L")
  {
    // console.log("x: "+x);
    // console.log("y: "+y);
    array[x-1][y] = "x";
    $("#x"+(x-1)+"y"+y).css("background-color", "white");
    historyArray.push("#x"+(x-1)+"y"+y);
  }
  // move right
  else if (possible[whichMove] === "R")
  {
    // console.log("x: "+x);
    // console.log("y: "+y);
    array[x+1][y] = "x";
    $("#x"+(x+1)+"y"+y).css("background-color", "white");
    historyArray.push("#x"+(x+1)+"y"+y);
  }
  // reset possible moves
  possible=[];
}
function createPlayer()
{
  // move player
  $(document).keyup(function(e)
  {
    // up
    if (e.which === 38)
    {
      if (position[1]-1 >= 0)
      {
        if (array[position[0],position[1]-1] === "x")
        {
          position[1]-=1;
        }
      }
    }
    // down
    if (e.which === 40)
    {
    }
    // left
    if (e.which === 37)
    {
    }
    // right
    if (e.which === 39)
    {
    }
  });
}
