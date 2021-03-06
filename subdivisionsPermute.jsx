var subdivisions = [
    [ 0.382, 0.618, 1 ],

    [
        0.145924,
        0.236076,
        0.382,
        0.472152,
        0.527848,
        0.618,
        0.763924,
        0.8540760000000001,
        1
    ],

    [
        0.055742968,         0.090181032,
           0.145924,         0.180362064,
        0.201637936, 0.23607599999999998,
    0.29181896799999996, 0.32625703199999995,
    0.38199999999999995, 0.41643806399999994,
    0.4377139359999999,  0.4721519999999999,
    0.4934278719999999,  0.5065721279999998,
    0.5278479999999999,  0.5622860639999999,
        0.583561936,               0.618,
        0.673742968,         0.708181032,
           0.763924,  0.7983620640000001,
    0.8196379360000001,  0.8540760000000002,
    0.9098189680000002,  0.9442570320000002,
    1.0000000000000002
    ],

    [
        0.021293813776, 0.034449154223999995, 0.05574296799999999,
        0.06889830844799999,       0.077025691552,         0.090181032,
        0.11147484577599999,  0.12463018622399999,            0.145924,
        0.15907934044799998,  0.16720672355199998,         0.180362064,
        0.18848944710399998,  0.19351055289599997, 0.20163793599999996,
        0.21479327644799995,  0.22292065955199994, 0.23607599999999995,
        0.25736981377599993,   0.2705251542239999,  0.2918189679999999,
        0.3049743084479999,   0.3131016915519999,  0.3262570319999999,
        0.3475508457759999,  0.36070618622399986, 0.38199999999999984,
        0.3951553404479998,  0.40328272355199984, 0.41643806399999983,
        0.42456544710399985,  0.42958655289599984, 0.43771393599999986,
        0.45086927644799984,  0.45899665955199986, 0.47215199999999985,
        0.48027938310399987,  0.48530048889599986,  0.4934278719999999,
        0.49844897779199987,   0.5015510222079999,  0.5065721279999998,
        0.5146995111039998,   0.5197206168959998,  0.5278479999999998,
        0.5410033404479998,   0.5491307235519998,  0.5622860639999998,
        0.5704134471039998,   0.5754345528959998,  0.5835619359999997,
        0.5967172764479998,   0.6048446595519997,  0.6179999999999998,
        0.6392938137759998,   0.6524491542239998,  0.6737429679999999,
        0.6868983084479999,   0.6950256915519999,  0.7081810319999999,
            0.729474845776,       0.742630186224,            0.763924,
        0.7770793404480001,       0.785206723552,  0.7983620640000001,
        0.8064894471040001,       0.811510552896,         0.819637936,
            0.832793276448,       0.840920659552,  0.8540760000000001,
        0.8753698137760001,   0.8885251542240001,  0.9098189680000002,
        0.9229743084480002,   0.9311016915520002,  0.9442570320000002,
        0.9655508457760003,   0.9787061862240003,  1.0000000000000002
    ]
]

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

/**
 * Adds the guides to the document. It's a little weird, since the guides are
 * just making it super laggy. Basically, deletes everything then readds the 
 * desired number of guides depending on the permutation.
 * @param {PhotoShop Direction} dir 
 * @param {Number of Divisions to Add} divisions 
 */
function addGuides(dir, divisions) {
    var docWidth = app.activeDocument.width;
    var docHeight = app.activeDocument.height;
    alert(docWidth);
    var guides = app.activeDocument.guides;
    if (dir == Direction.HORIZONTAL) {
        var currDivs = currHorSubdivisions;
    } else {
        var currDivs = currVerSubdivisions;
    }

    // Why is this not appending anything? Debug this...
	if (currDivs == divisions) {
		// If the scroll bar is the same, we do not do anything.
		return;
    }
    // We update subdivisions like so:

    // First, we delete all the existing subdivisions.
    for (var i = 0; i < guides.length; ++i) {
        if (guides[i].direction == dir) {
            guides[i].remove();
        }
    }

    // No subdivisions, so we do nothing.
    if (divisions == 0) {
        return;
    } else {
        var desiredSubdivisions = subdivisions[divisions - 1];
        for (var i = 0; i < desiredSubdivisions.length; ++i) {
            guides.add(dir, desiredSubdivisions[i] * docHeight);
        }

        if (dir == Direction.HORIZONTAL) {
            var currHorSubdivisions = divisions;
        } else {
            var currVerSubdivisions = divisions;
        }
    }
}

// scrollbar counters grouping
var currHorSubdivisions = 0;
var docHeight = app.activeDocument.height;
var scrollbar1Counter = scrollbarCounterGroup.add("statictext",undefined,"1")
scrollbar1.onChange = function() {
    scrollbar1Counter.text = scrollbar1.value.toFixed();
    var divisions = scrollbar1.value.toFixed();
    addGuides(Direction.HORIZONTAL, divisions);
}

var currVerSubdivisions = 0;
var scrollbar2Counter = scrollbarCounterGroup.add("statictext",undefined,"1")
scrollbar2.onChange = function() {
	scrollbar2Counter.text = scrollbar2.value.toFixed()
    var divisions = scrollbar2.value.toFixed();
    addGuides(Direction.VERTICAL, divisions);
}
// dropdown menu
var dropDown = dropDownGroup.add("dropdownlist",undefined,["Diamond","Platinum","Golden","Silver","Bronze"]);
dropDown.size = [150,25];
dropDown.selection = 2;

//exit button

var exitButton = exitButtonGroup.add("button",undefined,"Exit Script");

// For debugging.
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
