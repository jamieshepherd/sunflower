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
  console.log('script executed');
  storyline = GetPlayer();
  console.log('proving we get player:');
  console.log(storyline);
  console.log('trying to get a variable moveVar');
  console.log(storyline.GetVar("moveVar"));
  console.log('trying to set moveVar');
  storyline.SetVar("moveVar", 1);
  console.log('trying to get variable moveVar');
  console.log(storyline.GetVar("moveVar"));
}

