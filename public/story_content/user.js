// Make a storyline object global
var storyline = null;

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
  console.log('Script executed');
  storyline = GetPlayer();
}

