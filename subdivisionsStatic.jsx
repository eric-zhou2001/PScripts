/**
 * Important note: guides are stored in this collection/array that can be accessed by doing
 * activeDocument.app.guides. This returns an array, in which we can access certain guides
 * by array indexing (app.guides[i], for example if we are to iterate). The actual addition
 * or creation of a new guide is done like so:
 * 
 * app.guides.add([Direction, so HORIZONTAL vs. VERTICAL], [x/y positioning]);
 * 
 * Oddly enough, guides are sequentially with increasing index. Let's say we add this guide first:
 * 
 * (Direction.HORIZONTAL, 100)
 * 
 * This guide will be stored (assuming there are no other guides in the guide collection)
 * at guides[0], since it is the first guide. Let's say we now add this guide:
 * 
 * (Direction.HORIZONTAL, 200)
 * 
 * This guide will now be stored at guides[1], since there is already a guide stored at
 * guides[0]. By doing guides[0], we can still access the guide originally placed at
 * index 0 (in other words, the first guide inserted). This repeats itself onwards.
 * 
 * To remove the newest guide, we have to access the LAST guide in the guide collection
 * (as in, the most recent addition). So, we can do guides[guides.length - 1] to access
 * said guide. As long as we keep this in mind, the methods that interact with the
 * guides will be more or less straightforward.
 * 
 * Another note, the [insertSomeGuide].remove() method is sort of hidden in the actual
 * JavaScript Photoshop documentation. Therefore, I mainly stuck with this documentation:
 * https://theiviaxx.github.io/photoshop-docs/Photoshop/Guide.html
 */

// window setup

var currentStatus = app.activeDocument.activeHistoryState;

var window = new Window("dialog","Subdivider",undefined);
window.orientation = "column";
var mainButtonsGroup = window.add("group",undefined,"");


// group definitions and ordering
mainButtonsGroup.orientation = "row"

var scrollbarLabelGroup = mainButtonsGroup.add("group",undefined,"Horizontal");
scrollbarLabelGroup.orientation = "column"

var scrollbarButtonGroup = mainButtonsGroup.add("group",undefined,"Vertical");
scrollbarButtonGroup.orientation = "column"

var scrollbarCounterGroup = mainButtonsGroup.add("group",undefined,"Presets");
scrollbarCounterGroup.orientation = "column"

var dropDownGroup = window.add("group",undefined,"");
dropDownGroup.orientation = "column"

var exitButtonGroup = window.add("group",undefined,"");
exitButtonGroup.orientation = "column"


// scrollbar buttons grouping
var scrollbar1 = scrollbarButtonGroup.add("scrollbar",undefined,150,50);
scrollbar1.jumpdelta = 1;
scrollbar1.value = 1
scrollbar1.minvalue = 0;
scrollbar1.maxvalue = 10;
scrollbar1.value = 1;
var scrollbar2 = scrollbarButtonGroup.add("scrollbar",undefined,150,50);
scrollbar2.jumpdelta = 1;
scrollbar2.value = 1;
scrollbar2.minvalue = 0;
scrollbar2.maxvalue = 10;
scrollbar2.value = 1;


// scrollbar labels grouping
var scrollbar1Label = scrollbarLabelGroup.add("statictext",undefined,"Horizontal");
scrollbar1Label.characters = 4
var scrollbar2Label = scrollbarLabelGroup.add("statictext",undefined,"Vertical");
scrollbar2Label.characters = 4
var dropDownLabel = scrollbarLabelGroup.add("statictext",undefined,"Presets");

// Counts the number of guides with the specific direction provided by user
// currently on page.
function numGuides(direction) {
	var guides = app.activeDocument.guides;
	var counter = 0;
	for (var i = 0; i < guides.length; ++i) {
		if (guides[i].direction == direction) {
			counter++;
		}
	}
	return counter;
}

// Delete Guide function. Will store the guides to delete in an array that is returned
// back to its respective function call.
function deleteGuides(dir, numDivisions) {
	var guides = app.activeDocument.guides;
	var guidesToDelete = [];
	for (var j = 0; j < guides.length; ++j) {
		var delGuide = guides[guides.length - j - 1];
		if (delGuide.direction == dir) {
			if (guidesToDelete.length == numDivisions) {
				break;
			} else {
				guidesToDelete.push(delGuide);
			}
		} else {
			continue;
		}
	}
	return guidesToDelete;
}

// scrollbar counters grouping
var scrollbar1Counter = scrollbarCounterGroup.add("statictext",undefined,"1")
scrollbar1.onChange = function() {
	scrollbar1Counter.text = scrollbar1.value.toFixed()
	var guides = app.activeDocument.guides;
	var endGuides = scrollbar1.value.toFixed();
	var initialGuides = numGuides(Direction.HORIZONTAL);

	var numDivisions = initialGuides - endGuides;
	if (numDivisions == 0) {
		// If the scroll bar is the same, we do not do anything.
		return;
	} else if (numDivisions > 0) {
		// If numDivisions is greater than zero, that means the num of initial guides is
		// GREATER than the num of desired guides (end guides). Therefore, must remove
		// some guides from document then.
		var guidesToDelete = deleteGuides(Direction.HORIZONTAL, numDivisions);

		for (var i = 0; i < guidesToDelete.length; ++i) {
			guidesToDelete[i].remove();
		}
	} else {
		// Need to add numDivisions amount of times.
		numDivisions = Math.abs(numDivisions);
		for (var i = 0; i < numDivisions; ++i) {
			guides.add(Direction.HORIZONTAL, 30 * (initialGuides + 1));
		}
	}
}

var scrollbar2Counter = scrollbarCounterGroup.add("statictext",undefined,"1")
var scrollbar2Array = [];
scrollbar2.onChange = function() {
	scrollbar2Counter.text = scrollbar2.value.toFixed()
	var guides = app.activeDocument.guides;
	var endGuides = scrollbar2.value.toFixed();
	var initialGuides = numGuides(Direction.VERTICAL);

	var numDivisions = initialGuides - endGuides;
	if (numDivisions == 0) {
		// If the scroll bar is the same, we do not do anything.
		return;
	} else if (numDivisions > 0) {
		// If numDivisions is greater than zero, that means the num of initial guides is
		// GREATER than the num of desired guides (end guides). Therefore, must remove
		// some guides from document then.
		var guidesToDelete = deleteGuides(Direction.VERTICAL, numDivisions);

		for (var i = 0; i < guidesToDelete.length; ++i) {
			guidesToDelete[i].remove();
		}
	} else {
		numDivisions = Math.abs(numDivisions);
		for (var i = 0; i < numDivisions; ++i) {
			guides.add(Direction.VERTICAL, 30 * (initialGuides + 1));
		}
	}
}
// dropdown menu
var dropDown = dropDownGroup.add("dropdownlist",undefined,["Diamond","Platinum","Golden","Silver","Bronze"]);
dropDown.size = [150,25];
dropDown.selection = 2;

//exit button

var exitButton = exitButtonGroup.add("button",undefined,"Exit Script");

exitButton.onClick = function close(){
  var guides = app.activeDocument.guides;
  var s = "";
  for (var i = 0; i < guides.length; ++i) {
	  var guide = guides[i];
	  s += "Guide " + i + ". Direction: " + guide.direction + ", coordinate: " + guide.coordinate + "\n";
  }
  alert(s);
  window.close();
}

if (window !== null && window instanceof Window){
window.center();
window.show();
}
