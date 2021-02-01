var myWindow = new Window("dialog", "Guide Subdivisions");
myWindow.orientation = "column";

var HorizontalPanel = myWindow.add("panel", undefined, "");
HorizontalPanel.orientation = "row";
HorizontalPanel.size = [300, 45];

var LeftHorizontalGroup = HorizontalPanel.add("group", undefined, "");
LeftHorizontalGroup.alignment = "left";
var HorizontalLabel = LeftHorizontalGroup.add(
  "statictext",
  undefined,
  "Horizontal"
);

var CenterHorizontalGroup = HorizontalPanel.add("group", undefined, "");
CenterHorizontalGroup.alignment = ["right", "fill"];
var HorizontalScrollbar = CenterHorizontalGroup.add("scrollbar", undefined, "");
HorizontalScrollbar.size = [175, 17.5];

var RightHorizontalGroup = HorizontalPanel.add("group", undefined, "");
RightHorizontalGroup.alignment = ["right", "fill"];
var HorizontalCounterText = RightHorizontalGroup.add(
  "statictext",
  undefined,
  "1"
);
HorizontalScrollbar.onChange = function () {
  HorizontalCounterText.text = HorizontalScrollbar.value.toFixed();
};
HorizontalCounterText.justify = ["right", "center"];

// Demark vertical button

var VerticalPanel = myWindow.add("panel", undefined, "");
VerticalPanel.orientation = "row";
VerticalPanel.size = [300, 45];

var LeftVerticalGroup = VerticalPanel.add("group", undefined, "");
LeftVerticalGroup.alignment = "left";
var VerticalLabel = LeftVerticalGroup.add("statictext", undefined, "Vertical");

var CenterVerticalGroup = VerticalPanel.add("group", undefined, "");
CenterVerticalGroup.alignment = ["right", "fill"];
var VerticalScrollbar = CenterVerticalGroup.add("scrollbar", undefined, "");
VerticalScrollbar.size = [175, 17.5];

var RightVerticalGroup = VerticalPanel.add("group", undefined, "");
RightVerticalGroup.alignment = ["right", "fill"];
var VerticalCounterText = RightVerticalGroup.add("statictext", undefined, "1");
VerticalScrollbar.onChange = function () {
  VerticalCounterText.text = VerticalScrollbar.value.toFixed();
};
VerticalCounterText.justify = ["right", "center"];

// Demark preset button

var PresetsPanel = myWindow.add("panel", undefined, "");
PresetsPanel.orientation = "row";
PresetsPanel.size = [300, 45];

var LeftPresetsGroup = PresetsPanel.add("group", undefined, "");
LeftPresetsGroup.alignment = "left";
var PresetsLabel = LeftPresetsGroup.add("statictext", undefined, "Presets");

var CenterPresetsGroup = PresetsPanel.add("group", undefined, "");
CenterPresetsGroup.alignment = ["right", "fill"];
var PresetsDropdown = CenterPresetsGroup.add(
  "dropdownlist",
  undefined,
  ["Bronze", "Silver", "Golden", "Platinum", "Diamond"],
  ""
);
PresetsDropdown.size = [175, 17.5];

var RightPresetsGroup = PresetsPanel.add("group", undefined, "");
RightPresetsGroup.alignment = ["right", "fill"];
var PresetsCounterText = RightPresetsGroup.add("statictext", undefined, "0");
PresetsCounterText.justify = ["right", "center"];
PresetsCounterText.hide();

// Maxvalue modifiers

HorizontalScrollbar.minvalue = 0;
HorizontalScrollbar.maxvalue = 10;
HorizontalScrollbar.value = 1;
HorizontalScrollbar.jumpdelta = 1;

VerticalScrollbar.minvalue = 0;
VerticalScrollbar.maxvalue = 10;
VerticalScrollbar.value = 1;
VerticalScrollbar.jumpdelta = 1;

// Changes 1.31.21
PresetsDropdown.onChange = function () {
  // Selection is the dropdown current selection
  var selection = PresetsDropdown.selection;
  for (i = 0; i < PresetsDropdown.items.length; ++i) {
	  // Very basic search function (very inefficient, but shouldn't be
	  // too much of an issue since the dropdown is always fixed length)
	  // that finds the index of the current slider preset.
	  if (PresetsDropdown.items[i] == selection) {
		// Upon location, modify the val and texts of the
		// scrollbar. This will vary with time, currently set to i for now
		// but will be subject to change.
		HorizontalScrollbar.value = i;
		HorizontalCounterText.text = i;
		VerticalScrollbar.value = i;
		VerticalCounterText.text = i;
		break;
	  }
  }
};

myWindow.show();
