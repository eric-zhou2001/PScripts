
// var segment = [0,10,.7]
HEIGHT = app.activeDocument.height;
START = 0; // This can change in the future, in case we want to adjust the height.
RATIO = prompt("What ratio do you want? (less than 1, enter like \".7\" for example)");
var segment = [START, HEIGHT, RATIO];

function display(input) {
    var seg = [segment[0],segment[1]];
    ratio = segment[2];

    for (var i = 0; i < input; i++) {
        var segIterations = seg.length - 1;
        var index = 0;
        // This is a little bad in practice, but the code functions as desired.
        // Need to add 2 each time to keep track of the "original" segments. By adding subdivisions,
        // we are adding two more guide lines.
        for (var j = 0; j < segIterations; ++j) {
            var start = seg[index + j];
            var end = seg[index + j + 1];
            seg.splice(j + 1 + index, 0, start+((end-start)*(1-ratio)), start+(end-start)*ratio);
            index+=2;
        }
    }
    return seg;
}

function addGuideLines(position) {
    activeDocument.guides.add(Direction.HORIZONTAL, new UnitValue(position,position));
}


// "main" method.
var input = prompt("How many subdivisions do you want? (an integer)");
var subdivisions = display(input);

for (var i = 0; i < subdivisions.length; ++i) {
    activeDocument.suspendHistory("test", "addGuideLines(subdivisions[i]);");
}
