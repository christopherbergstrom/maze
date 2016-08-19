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
var difficulty = .02;
var maxWidth = 50;
var speed = 50;
var watch = true;
var position;
var currentPosition;
var up;
var down;
var left;
var right;
var moves=0;
var timeTaken=0;
var timeInterval;
var startColor="#00ff00";
var endColor="#ff0000";
var playerColor="#2ea1fb";
var backColor="#000000";
var mazeColor="#ffffff";
var colorSelected;
var timeVal;
var movesVal;
var timeMovesColor="#ffff00";

$(document).ready(function()
{
  createMenu();
});
function createMenu()
{
  $("body").append("<div id='menu'></div>");
  $("#menu").append("<div id='difficulty'></div>");
  $("#difficulty").append("<button id='easy'>easy</button>");
  $("#difficulty").append("<button id='medium'>medium</button>");
  $("#difficulty").append("<button id='hard'>hard</button>");
  $("#menu").append("<div id='theme'></div>");
  $("#theme").append("<select id='color'><option>Color Theme</option><option>Classic</option><option>Inverse</option><option>Dark</option><option>Light</option><option>Cornfield</option><option>Hedge Maze</option><option>Desert</option></select>");
  $("#theme").append("<select id='speed'><option>Create Speed</option><option>Slow</option><option>Medium</option><option>Fast</option></select>");
  $("#menu").append("<div id='text'>Watch maze create itself?</div>");
  $("#menu").append("<div id='yesNo'></div>");
  $("#yesNo").append("<button id='yes'>yes</button>");
  $("#yesNo").append("<button id='no'>no</button>");
  $("#menu").append("<div id='instructions'>Use the mouse, arrow keys, or arrow buttons to move the colored square from the green square to the red square.</div>");
  $("#easy").click(function()
  {
    $(this).css("color","#00ff00");
    $(this).css("border","3px solid #00ff00");
    $("#medium").css("color","#666600");
    $("#medium").css("border","3px solid #666600");
    $("#hard").css("color","#660000");
    $("#hard").css("border","3px solid #660000");
    difficulty=.04;
    maxWidth=25;
    // speed=50;
  });
  $("#medium").click(function()
  {
    $(this).css("color","#ffff00");
    $(this).css("border","3px solid #ffff00");
    $("#easy").css("color","#006600");
    $("#easy").css("border","3px solid #006600");
    $("#hard").css("color","#660000");
    $("#hard").css("border","3px solid #660000");
    difficulty=.02;
    maxWidth=50;
    // speed=50;
  });
  $("#hard").click(function()
  {
    $(this).css("color","#ff0000");
    $(this).css("border","3px solid #ff0000");
    $("#easy").css("color","#006600");
    $("#easy").css("border","3px solid #006600");
    $("#medium").css("color","#666600");
    $("#medium").css("border","3px solid #666600");
    difficulty=.01;
    maxWidth=100;
    // speed=50;
  });
  $("#theme").change(function()
  {
    colorSelected = $("#color").val();
    if (colorSelected === "Choose Color")
    {
      changeTheme("#00ff00", "#ff0000", "#2ea1fb", "#000000", "#ffffff");
      timeMovesColor = "#ffff00";
    }
    else if (colorSelected === "Classic")
    {
      changeTheme("#00ff00", "#ff0000", "#2ea1fb", "#000000", "#ffffff");
      timeMovesColor = "#ffff00";
    }
    else if (colorSelected === "Inverse")
    {
      changeTheme("#00ff00", "#ff0000", "#D15E04", "#ffffff", "#000000");
      timeMovesColor = "#0000ff";
    }
    else if (colorSelected === "Dark")
    {
      changeTheme("#006400", "#8b0000", "#ffffff", "#000000", "#808080");
      timeMovesColor = "#ffff00";
    }
    else if (colorSelected === "Light")
    {
      changeTheme("#66ff66", "#ff6666", "#000000", "#bfbfbf", "#ffffff");
      timeMovesColor = "#0000ff";
    }
    else if (colorSelected === "Cornfield")
    {
      changeTheme("#00ff00", "#ff0000", "#ffa500", "#c0b149", "#fef5e6");
      timeMovesColor = "#000000";
    }
    else if (colorSelected === "Hedge Maze")
    {
      changeTheme("#00ff00", "#ff0000", "#cccccc", "#386406", "#fef7cb");
      timeMovesColor = "#ffff00";
    }
    else if (colorSelected === "Desert")
    {
      changeTheme("#00ff00", "#ff0000", "#404040", "#d8a983", "#e7f6fe");
      timeMovesColor = "#0000ff";
    }
    var speedSelected = $("#speed").val();
    if (speedSelected === "Choose Speed")
    {
      speed = 50;
    }
    else if (speedSelected === "Slow")
    {
      speed = 100;
    }
    else if (speedSelected === "Medium")
    {
      speed = 50;
    }
    else if (speedSelected === "Fast")
    {
      speed = 10;
    }
  });
  $("#yes").click(function()
  {
    start(true)
  });
  $("#no").click(function()
  {
    start(false)
  });
}
function start(which)
{
  if(difficulty)
  {
    watch=which;
    $("#title").remove();
    $("#menu").remove();
    createDivs();
  }
}
function changeTheme(sC, eC, pC, bC, mC)
{
  startColor = sC;
  endColor = eC;
  playerColor = pC;
  backColor = bC;
  mazeColor = mC;
}
function createArrows()
{
  $("#container").append("<div id='arrowDiv'></div>");
  $("#arrowDiv").append("<div class='arrows'><div id='left' class='fa fa-arrow-circle-left'></div></div>");
  $("#arrowDiv").append("<div class='arrows'><div id='up' class='fa fa-arrow-circle-up'></div><div id='down' class='fa fa-arrow-circle-down'></div></div>");
  $("#arrowDiv").append("<div class='arrows'><div id='right' class='fa fa-arrow-circle-right'></div></div>");
}
function createDivs()
{
  // create divs for maze map
  $("body").append("<div id='container'></div>");
  $("#container").append("<div id='timeDiv' class='timeMoves'><div>Time</div><div id='time'>0</div></div>");
  $("#container").append("<div id='movesDiv' class='timeMoves'><div>Moves</div><div id='moves'>0</div></div>");
  createArrows();
  timeVal = $("#time");
  movesVal = $("#moves");
  console.log(movesVal.outerHeight());
  var width = window.innerWidth*difficulty;
  height = Math.floor(((window.innerHeight - $("#arrowDiv").outerHeight()) / width));
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
  $("body").css("background-color",backColor);
  $("#container").css("background-color",backColor);
  $(".timeMoves").css("color",timeMovesColor);
  $(".arrows").css("color",timeMovesColor);
  if (colorSelected === "Choose Color" || colorSelected === "Classic" || colorSelected === "Inverse" || colorSelected === "Dark" || colorSelected === "Light")
  {
    $(".wallS").css("background-color",backColor);
    $(".wallM").css("background-color",backColor);
    $(".wallL").css("background-color",backColor);
  }
  if (colorSelected === "Cornfield")
  {
    $(".wallS").each(function()
    {
      var whichColor = Math.floor(Math.random()*4);
      if (whichColor === 0)
      {
        $(this).css("background-color","#c0b149");
      }
      else if (whichColor === 1)
      {
        $(this).css("background-color","#546c42");
      }
      else if (whichColor === 2)
      {
        $(this).css("background-color","#d3bc76");
      }
      else if (whichColor === 3)
      {
        $(this).css("background-color","#132115");
      }
    });
    $(".wallM").each(function()
    {
      var whichColor = Math.floor(Math.random()*4);
      if (whichColor === 0)
      {
        $(this).css("background-color","#c0b149");
      }
      else if (whichColor === 1)
      {
        $(this).css("background-color","#546c42");
      }
      else if (whichColor === 2)
      {
        $(this).css("background-color","#d3bc76");
      }
      else if (whichColor === 3)
      {
        $(this).css("background-color","#132115");
      }
    });
    $(".wallL").each(function()
    {
      var whichColor = Math.floor(Math.random()*4);
      if (whichColor === 0)
      {
        $(this).css("background-color","#c0b149");
      }
      else if (whichColor === 1)
      {
        $(this).css("background-color","#546c42");
      }
      else if (whichColor === 2)
      {
        $(this).css("background-color","#d3bc76");
      }
      else if (whichColor === 3)
      {
        $(this).css("background-color","#132115");
      }
    });
  }
  else if (colorSelected === "Hedge Maze")
  {
    $(".wallS").each(function()
    {
      var whichColor = Math.floor(Math.random()*4);
      if (whichColor === 0)
      {
        $(this).css("background-color","#386406");
      }
      else if (whichColor === 1)
      {
        $(this).css("background-color","#798722");
      }
      else if (whichColor === 2)
      {
        $(this).css("background-color","#81b43b");
      }
      else if (whichColor === 3)
      {
        $(this).css("background-color","#1f3506");
      }
    });
    $(".wallM").each(function()
    {
      var whichColor = Math.floor(Math.random()*4);
      if (whichColor === 0)
      {
        $(this).css("background-color","#386406");
      }
      else if (whichColor === 1)
      {
        $(this).css("background-color","#798722");
      }
      else if (whichColor === 2)
      {
        $(this).css("background-color","#81b43b");
      }
      else if (whichColor === 3)
      {
        $(this).css("background-color","#1f3506");
      }
    });
    $(".wallL").each(function()
    {
      var whichColor = Math.floor(Math.random()*4);
      if (whichColor === 0)
      {
        $(this).css("background-color","#386406");
      }
      else if (whichColor === 1)
      {
        $(this).css("background-color","#798722");
      }
      else if (whichColor === 2)
      {
        $(this).css("background-color","#81b43b");
      }
      else if (whichColor === 3)
      {
        $(this).css("background-color","#1f3506");
      }
    });
  }
  else if (colorSelected === "Desert")
  {
    $(".wallS").each(function()
    {
      var whichColor = Math.floor(Math.random()*4);
      if (whichColor === 0)
      {
        $(this).css("background-color","#d8a983");
      }
      else if (whichColor === 1)
      {
        $(this).css("background-color","#f0b479");
      }
      else if (whichColor === 2)
      {
        $(this).css("background-color","#f2be6c");
      }
      else if (whichColor === 3)
      {
        $(this).css("background-color","#e49e73");
      }
    });
    $(".wallM").each(function()
    {
      var whichColor = Math.floor(Math.random()*4);
      if (whichColor === 0)
      {
        $(this).css("background-color","#d8a983");
      }
      else if (whichColor === 1)
      {
        $(this).css("background-color","#f0b479");
      }
      else if (whichColor === 2)
      {
        $(this).css("background-color","#f2be6c");
      }
      else if (whichColor === 3)
      {
        $(this).css("background-color","#e49e73");
      }
    });
    $(".wallL").each(function()
    {
      var whichColor = Math.floor(Math.random()*4);
      if (whichColor === 0)
      {
        $(this).css("background-color","#d8a983");
      }
      else if (whichColor === 1)
      {
        $(this).css("background-color","#f0b479");
      }
      else if (whichColor === 2)
      {
        $(this).css("background-color","#f2be6c");
      }
      else if (whichColor === 3)
      {
        $(this).css("background-color","#e49e73");
      }
    });
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
  // console.log(array);
  startEnd();
}
function startEnd()
{
  var side = Math.floor(Math.random()*4);
  // top
  if (side === 0)
  {
    var one = "x"+Math.floor(Math.random()*maxWidth);
    var two = "y"+1;
    start = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";
  }
  // left
  else if (side === 1)
  {
    var one = "x"+(maxWidth-2);
    var two = "y"+Math.floor(Math.random()*height);
    start = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";
  }
  // bottom
  else if (side === 2)
  {
    var one = "x"+Math.floor(Math.random()*(maxWidth-1));
    var two = "y"+(height-2);
    start = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";
  }
  //left
  else if (side === 3)
  {
    var one = "x"+1
    var two = "y"+Math.floor(Math.random()*height);
    start = one+""+two;
    array[one.split("x")[1]][two.split("y")[1]] = "x";
  }
  $("#"+start).css("background-color", startColor);
  historyArray=[start];
  createWalls();
}
function countdown()
{
  $("#container").append("<div id='startingNumbers'>3</div>");
  $("#startingNumbers").css("color",timeMovesColor);
  console.log(timeMovesColor);
  setTimeout(function()
  {
    $("#startingNumbers").html("2");
  }, 1000);
  setTimeout(function()
  {
    $("#startingNumbers").html("1");
  }, 2000);
  setTimeout(function()
  {
    $("#startingNumbers").remove();
  }, 3000);
}
function createWalls()
{
  // actually make the maze
  var first=true;
  if (watch)
  {
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
          $(longest).css("background-color",endColor);
        }
        if (historyArray.length >= longestCount)
        {
          longestCount = historyArray.length;
          $(longest).css("background-color",mazeColor);
          longest = historyArray[historyArray.length-1];
          $(longest).css("background-color",endColor);
          if (historyArray.length-2)
          {
            if (currentPosition)
            {
              $(currentPosition).css("background-color",mazeColor);
            }
            currentPosition = historyArray[historyArray.length-2];
            $(currentPosition).css("background-color",playerColor);
          }
        }
        else
        {
          $(currentPosition).css("background-color",mazeColor);
          currentPosition = historyArray[historyArray.length-1];
          $(currentPosition).css("background-color",playerColor);
        }
      }
      else
      {
        window.clearInterval(draw);
        $(position).css("background-color",playerColor);
        position = position.split("#")[1];
        position = position.split("x")[1];
        position = position.split("y");
        position[0]=parseInt(position[0]);
        position[1]=parseInt(position[1]);
        longest = longest.split("#")[1];
        longest = longest.split("x")[1];
        longest = longest.split("y");
        longest[0]=parseInt(longest[0]);
        longest[1]=parseInt(longest[1]);
        start = start.split("x")[1];
        start = start.split("y");
        start[0]=parseInt(start[0]);
        start[1]=parseInt(start[1]);
        // console.log("time: "+(time/=1000)+"s");
        // console.log("array: "+array);
        // console.log(historyArray);
        // console.log("length: "+length);
        console.log("longest count: "+longestCount);
        console.log("start: "+start);
        console.log("end: "+longest);
        console.log("position: "+position);
        // console.log("maze length: "+historyArray.length);
        $("#countdown")[0].play();
        countdown();
        setTimeout(function()
        {
          createPlayer();
          timeInterval = setInterval(function()
          {
            timeTaken+=10;
            timeVal.html(timeTaken/1000);
          }, 10);
        }, 3000);
      }
      // console.log("in interval");
    }, speed);
  }
  else
  {
    while (historyArray.length)
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
        $(longest).css("background-color",endColor);
      }
      if (historyArray.length >= longestCount)
      {
        longestCount = historyArray.length;
        $(longest).css("background-color",mazeColor);
        longest = historyArray[historyArray.length-1];
        $(longest).css("background-color",endColor);
      }
    }
    window.clearInterval(draw);
    $(position).css("background-color",playerColor);
    position = position.split("#")[1];
    position = position.split("x")[1];
    position = position.split("y");
    position[0]=parseInt(position[0]);
    position[1]=parseInt(position[1]);
    longest = longest.split("#")[1];
    longest = longest.split("x")[1];
    longest = longest.split("y");
    longest[0]=parseInt(longest[0]);
    longest[1]=parseInt(longest[1]);
    start = start.split("x")[1];
    start = start.split("y");
    start[0]=parseInt(start[0]);
    start[1]=parseInt(start[1]);
    // console.log("time: "+(time/=1000)+"s");
    // console.log("array: "+array);
    // console.log(historyArray);
    // console.log("length: "+length);
    console.log("longest count: "+longestCount);
    console.log("start: "+start);
    console.log("end: "+longest);
    console.log("position: "+position);
    // console.log("maze length: "+historyArray.length);
    $("#countdown")[0].play();
    countdown();
    setTimeout(function()
    {
      createPlayer();
      timeInterval = setInterval(function()
      {
        timeTaken+=10;
        timeVal.html(timeTaken/1000);
      }, 10);
    }, 3000);
  }
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
          if (array[x][y-2] === " " && array[x][y-1] === " " && array[x+1][y-1] === " " && array[x+1][y-2] === " ")
          {
            possible.push("U");
          }
        }
        else if (x === (maxWidth-1))
        {
          if (array[x][y-2] === " " && array[x][y-1] === " " && array[x-1][y-1] === " " && array[x-1][y-2] === " ")
          {
            possible.push("U");
          }
        }
        else if (array[x][y-2] === " " && array[x][y-1] === " " && array[x+1][y-1] === " " && array[x-1][y-1] === " " && array[x+1][y-2] === " " && array[x-1][y-2] === " ")
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
          if (array[x][y+2] === " " && array[x][y+1] === " " && array[x+1][y+1] === " " && array[x+1][y+2] === " ")
          {
            possible.push("D");
          }
        }
        else if (x === (maxWidth-1))
        {
          if (array[x][y+2] === " " && array[x][y+1] === " " && array[x-1][y+1] === " " && array[x-1][y+2] === " ")
          {
            possible.push("D");
          }
        }
        else if (array[x][y+2] === " " && array[x][y+1] === " " && array[x+1][y+1] === " " && array[x-1][y+1] === " " && array[x+1][y+2] === " " && array[x-1][y+2] === " ")
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
          if (array[x-2][y] === " " && array[x-1][y] === " " && array[x-1][y+1] === " " && array[x-2][y+1] === " ")
          {
            possible.push("L");
          }
        }
        else if (y === height-1)
        {
          if (array[x-2][y] === " " && array[x-1][y] === " " && array[x-1][y-1] === " " && array[x-2][y-1] === " ")
          {
            possible.push("L");
          }
        }
        else if (array[x-2][y] === " " && array[x-1][y] === " " && array[x-1][y+1] === " " && array[x-1][y-1] === " " && array[x-2][y+1] === " " && array[x-2][y-1] === " ")
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
          if (array[x+2][y] === " " && array[x+1][y] === " " && array[x+1][y+1] === " " && array[x+2][y+1] === " ")
          {
            possible.push("R");
          }
        }
        else if (y === height-1)
        {
          if (array[x+2][y] === " " && array[x+1][y] === " " && array[x+1][y-1] === " " && array[x+2][y-1] === " ")
          {
            possible.push("R");
          }
        }
        else if (array[x+2][y] === " " && array[x+1][y] === " " && array[x+1][y+1] === " " && array[x+1][y-1] === " " && array[x+2][y+1] === " " && array[x+2][y-1] === " ")
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
    $("#x"+x+"y"+(y-1)).css("background-color", mazeColor);
    historyArray.push("#x"+x+"y"+(y-1));
  }
  // move down
  else if (possible[whichMove] === "D")
  {
    // console.log("x: "+x);
    // console.log("y: "+y);
    array[x][y+1] = "x";
    $("#x"+x+"y"+(y+1)).css("background-color", mazeColor);
    historyArray.push("#x"+x+"y"+(y+1));
  }
  // move left
  else if (possible[whichMove] === "L")
  {
    // console.log("x: "+x);
    // console.log("y: "+y);
    array[x-1][y] = "x";
    $("#x"+(x-1)+"y"+y).css("background-color", mazeColor);
    historyArray.push("#x"+(x-1)+"y"+y);
  }
  // move right
  else if (possible[whichMove] === "R")
  {
    // console.log("x: "+x);
    // console.log("y: "+y);
    array[x+1][y] = "x";
    $("#x"+(x+1)+"y"+y).css("background-color", mazeColor);
    historyArray.push("#x"+(x+1)+"y"+y);
  }
  // reset possible moves
  possible=[];
}
function createPlayer()
{
  // move player arrow keys
  $(document).keydown(function(e)
  {
    checkMoveDirections();
    // up
    if (e.which === 38 && up)
    {
      makeFalse()
      $("#x"+position[0]+"y"+position[1]).css("background-color",mazeColor);
      position[1]-=1;
      $("#x"+position[0]+"y"+position[1]).css("background-color",playerColor);
      moves++;
      movesVal.html(parseInt((movesVal.html()))+1);
      checkWin();
    }
    // down
    if (e.which === 40 && down)
    {
      makeFalse()
      $("#x"+position[0]+"y"+position[1]).css("background-color",mazeColor);
      position[1]+=1;
      $("#x"+position[0]+"y"+position[1]).css("background-color",playerColor);
      moves++;
      movesVal.html(parseInt((movesVal.html()))+1);
      checkWin();
    }
    // left
    if (e.which === 37 && left)
    {
      makeFalse()
      $("#x"+position[0]+"y"+position[1]).css("background-color",mazeColor);
      position[0]-=1;
      $("#x"+position[0]+"y"+position[1]).css("background-color",playerColor);
      moves++;
      movesVal.html(parseInt((movesVal.html()))+1);
      checkWin();
    }
    // right
    if (e.which === 39 && right)
    {
      makeFalse()
      $("#x"+position[0]+"y"+position[1]).css("background-color",mazeColor);
      position[0]+=1;
      $("#x"+position[0]+"y"+position[1]).css("background-color",playerColor);
      moves++;
      movesVal.html(parseInt((movesVal.html()))+1);
      checkWin();
    }
  });
  // move player mouse
  $(".wallS").hover(mouseMove);
  $(".wallM").hover(mouseMove);
  $(".wallL").hover(mouseMove);
  // move player arrows
  checkMoveDirections();
  // up
  $("#up").click(function()
  {
    checkMoveDirections();
    if (up)
    {
      makeFalse()
      $("#x"+position[0]+"y"+position[1]).css("background-color",mazeColor);
      position[1]-=1;
      $("#x"+position[0]+"y"+position[1]).css("background-color",playerColor);
      moves++;
      movesVal.html(parseInt((movesVal.html()))+1);
      checkWin();
    }
  });
  // down
  $("#down").click(function()
  {
    checkMoveDirections();
    if (down)
    {
      makeFalse()
      $("#x"+position[0]+"y"+position[1]).css("background-color",mazeColor);
      position[1]+=1;
      $("#x"+position[0]+"y"+position[1]).css("background-color",playerColor);
      moves++;
      movesVal.html(parseInt((movesVal.html()))+1);
      checkWin();
    }
  });
  // left
  $("#left").click(function()
  {
    checkMoveDirections();
    if (left)
    {
      makeFalse()
      $("#x"+position[0]+"y"+position[1]).css("background-color",mazeColor);
      position[0]-=1;
      $("#x"+position[0]+"y"+position[1]).css("background-color",playerColor);
      moves++;
      movesVal.html(parseInt((movesVal.html()))+1);
      checkWin();
    }
  });
  // right
  $("#right").click(function()
  {
    checkMoveDirections();
    if (right)
    {
      makeFalse()
      $("#x"+position[0]+"y"+position[1]).css("background-color",mazeColor);
      position[0]+=1;
      $("#x"+position[0]+"y"+position[1]).css("background-color",playerColor);
      moves++;
      movesVal.html(parseInt((movesVal.html()))+1);
      checkWin();
    }
  });
}
function mouseMove()
{
  checkMoveDirections();
  var tempPosition1 = ($(this).attr("id"));
  // up
  if ((("#"+tempPosition1).toString()) == (("#x"+position[0]+"y"+(position[1]-1)).toString()) && up)
  {
    makeFalse()
    $("#x"+position[0]+"y"+position[1]).css("background-color",mazeColor);
    position[1]-=1;
    $("#x"+position[0]+"y"+position[1]).css("background-color",playerColor);
    moves++;
    movesVal.html(parseInt((movesVal.html()))+1);
    checkWin();
  }
  // down
  if ((("#"+tempPosition1).toString()) == (("#x"+position[0]+"y"+(position[1]+1)).toString()) && down)
  {
    makeFalse()
    $("#x"+position[0]+"y"+position[1]).css("background-color",mazeColor);
    position[1]+=1;
    $("#x"+position[0]+"y"+position[1]).css("background-color",playerColor);
    moves++;
    movesVal.html(parseInt((movesVal.html()))+1);
    checkWin();
  }
  // left
  if ((("#"+tempPosition1).toString()) == (("#x"+(position[0]-1)+"y"+position[1]).toString()) && left)
  {
    makeFalse()
    $("#x"+position[0]+"y"+position[1]).css("background-color",mazeColor);
    position[0]-=1;
    $("#x"+position[0]+"y"+position[1]).css("background-color",playerColor);
    moves++;
    movesVal.html(parseInt((movesVal.html()))+1);
    checkWin();
  }
  // right
  if ((("#"+tempPosition1).toString()) == (("#x"+(position[0]+1)+"y"+position[1]).toString()) && right)
  {
    makeFalse()
    $("#x"+position[0]+"y"+position[1]).css("background-color",mazeColor);
    position[0]+=1;
    $("#x"+position[0]+"y"+position[1]).css("background-color",playerColor);
    moves++;
    movesVal.html(parseInt((movesVal.html()))+1);
    checkWin();
  }
}
function makeFalse()
{
  up = false;
  down = false;
  left = false;
  right = false;
}
function checkMoveDirections()
{
  // up
  if (position[1]-1 >= 0)
  {
    if (position[0] === start[0] && position[1]-1 === start[1])
    {
      // cant move here
    }
    else if (array[position[0]][position[1]-1] === "x")
    {
      // can move here
      up = true;
    }
  }
  // down
  if (position[1]+1 <= height-1)
  {
    if (position[0] === start[0] &&position[1]+1 === start[1])
    {
      // cant move here
    }
    else if (array[position[0]][position[1]+1] === "x")
    {
      // can move here
      down = true;
    }
  }
  // left
  if (position[0]-1 >= 0)
  {
    if (position[0]-1 === start[0] && position[1] === start[1])
    {
      // cant move here
    }
    else if (array[position[0]-1][position[1]] === "x")
    {
      // can move here
      left = true;
    }
  }
  // right
  if (position[0]+1 <= (maxWidth-1))
  {
    if (position[0]+1 === start[0] && position[1] === start[1])
    {
      // cant move here
    }
    else if (array[position[0]+1][position[1]] === "x")
    {
      // can move here
      right = true;
    }
  }
}
function checkWin()
{
  if ((position[0] === longest[0] && position[1] === longest[1]))
  {
    // console.log("win!");
    window.clearInterval(timeInterval);
    $(document).off("keydown");
    $(".wallS").unbind("mouseenter mouseleave");
    $(".wallM").unbind("mouseenter mouseleave");
    $(".wallL").unbind("mouseenter mouseleave");
    $("body").append("<div id='menu'></div>");
    $("#menu").append("<div id='endData'></div>");
    $("#endData").append("<div id='success'>Success!</div>");
    $("#endData").append("<div class='dataLabel'>Time: <span class='data'>"+(timeTaken/1000)+"s<span></div>");
    $("#endData").append("<div class='dataLabel'>Moves:  <span class='data'>"+moves+"<span></div>");
    $("#menu").append("<button id='play'>play again</button>");
    $("#play").click(function()
    {
      if(difficulty)
      {
        location.reload();
      }
    });
  }
}
