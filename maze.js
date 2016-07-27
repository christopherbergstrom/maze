$(document).ready(function()
{
  createWalls();
});
function createWalls()
{
  $("body").append("<div id='container'></div>");
  var width = window.innerWidth*.02;
  var height = Math.floor(window.innerHeight / width);
  for (var i = 0; i < height; i++)
  {
    var item = $("<div class='row'></div>");
    for (var j = 0; j < 50; j++)
    {
      item.append("<div class='wall'></div>")
    }
    $("#container").append(item);
    $("body").append($("#container"));
  }
}
