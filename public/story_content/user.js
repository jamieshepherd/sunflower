function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6YxyJTeNwSA":
        Script1();
        break;
  }
}

function Script1()
{
  var player = GetPlayer();
  console.log(player.getVar("moveVar"));
}

