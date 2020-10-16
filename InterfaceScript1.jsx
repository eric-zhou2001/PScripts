var window = new Window ("dialog","Subdivisions",undefined);
window.orientation = "column"

// panels
// horizontal panel
var horizontalPanel = window.add("panel",undefined,"");
var horizontalText = horizontalPanel.add("statictext",undefined,"Horizontal");
horizontalPanel.orientation = "row";
horizontalPanel.preferredSize.width = 250;
horizontalText.alignment = "left";



// vertical panel
var verticalPanel = window.add("panel",undefined,"");
var verticalText = verticalPanel.add("statictext",undefined,"Vertical");
verticalPanel.orientation = "row";
verticalPanel.preferredSize.width = 250;
horizontalText.alignment = "left";



// dropdown panel
var dropdownPanel = window.add("panel",undefined,"");
dropdownText = dropdownPanel.add("statictext",undefined,"Presets");
dropdownText.alignment = "left";
dropdownPanel.orientation = "row";
dropdownPanel.preferredSize.width = 250.;
dropdownText.alignment = "left";


// object controls
var horizontalScrollbar = horizontalPanel.add("scrollbar",undefined,125,25);
horizontalScrollbar.alignment = ["right","fill"];
horizontalScrollbar.preferredSize.width = 125;
horizontalScrollbar.preferredSize.length= 25;
horizontalScrollbar.value = 0;
var horizontalCounter = horizontalPanel.add("statictext",undefined,"0");
horizontalCounter.alignment = ["right","fill"];

var verticalScrollbar = verticalPanel.add("scrollbar",undefined,125,25);
verticalScrollbar.alignment = ["right","fill"];
verticalScrollbar.preferredSize.width = 125;
verticalScrollbar.preferredSize.length = 25;
verticalScrollbar.value = 0;
var verticalCounter = verticalPanel.add("statictext",undefined,"0");
verticalCounter.alignment = ["right","fill"];

var dropdown = dropdownPanel.add("dropdownlist",undefined,["Bronze","Silver","Golden","Platinum","Diamond"]);
dropdown.alignment = ["right","fill"];
dropdown.preferredSize.width = 125;
dropdown.selection = 2;
var dropdownCounter = dropdownPanel.add("statictext",undefined,"0");
dropdownCounter.alignment = ["right","fill"];
dropdownCounter.hide()



if (window !== null && window instanceof Window){
window.center();
window.show();
}

