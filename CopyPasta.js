//https://www.w3schools.com/howto/howto_css_split_screen.asp
var arrayOfWords = [];
var listToCopy = [];
function showListHeader()
{
	document.getElementById('listHeader').innerHTML = "Choose a word to add to your Copy collection.";
}

function hideListHeader()
{
	document.getElementById('listHeader').innerHTML = "";
}

function addToList()
{
	var index = arrayOfWords.length;
	var word = document.getElementById('wordToAdd').value;
	if (word != "")
	{
		var button = "<span id='span" + index + "'><input type='submit' name='" + word + "' id='" + index + "' value='" + word + "' onclick='addToCopyList(\"" + word + "\")'>";
		var removeButton = "<input type='submit' id='remove" + index + "' value='Remove' onclick='removeFromList(" + index + ")'><br><br></span>"
		button += removeButton;
		document.getElementById('list').innerHTML += button;
		arrayOfWords.push(word);
		showListHeader();
		document.getElementById('wordToAdd').value = "";
	}
}

function addToCopyList(word)
{
	listToCopy.push(word);
	if (listToCopy.length == 1)
	{
		document.getElementById('collection').innerHTML = word;
	}
	else
	{
		document.getElementById('collection').innerHTML += ", " + word;
	}
}

function removeFromCopyList(index)
{
	listToCopy.splice(index, index + 1);
	var word;
	for (var i = 0; i < listToCopy.length; i++)
	{
		word = listToCopy[i];
		document.getElementById(word).id = i;
	}
}

function removeFromList(index)
{
	var toRemove = document.getElementById('span' + index);
	toRemove.remove();
	arrayOfWords.splice(index, index + 1);
	for (var i = index + 1; i <= arrayOfWords.length; i++)
	{
		if (arrayOfWords.length == 0)
		{
			hideListHeader();
			break;
		}
		document.getElementById(i).id -= 1;
		document.getElementById('span' + i).id = 'span' + (i - 1);
		document.getElementById('remove' + i).setAttribute( "onClick", "removeFromList(" + (i - 1) + ")" );
		document.getElementById('remove' + i).id = 'remove' + (i - 1);
	}
	if (arrayOfWords.length == 0)
	{
		hideListHeader();
	}
}

function copy()
{
	var copyText = document.getElementById("collection");
	copyText.select();
  	copyText.setSelectionRange(0, 9999)
  	document.execCommand("copy");
}

function reset()
{
	document.getElementById("collection").innerHTML = "";
	listToCopy = [];
}