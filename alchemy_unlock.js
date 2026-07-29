// Alchemy Mod - Unlock Elements Through Gameplay

// Starting elements
var alchemyStart = [
    "sand",
    "dirt",
    "water",
    "fire",
    "oxygen"
];

// Create unlock list
if (!settings.alchemyUnlocked) {
    settings.alchemyUnlocked = {};
}

// Unlock starting elements
for (var i = 0; i < alchemyStart.length; i++) {
    settings.alchemyUnlocked[alchemyStart[i]] = true;
}


// Hide locked elements
for (var element in elements) {
    if (settings.alchemyUnlocked[element]) {
        elements[element].hidden = false;
    }
    else if (elements[element].category != "tools") {
        elements[element].hidden = true;
    }
}


// Unlock elements when they are made
var oldChangePixel = changePixel;

changePixel = function(pixel, element) {

    if (elements[element]) {

        if (!settings.alchemyUnlocked[element]) {

            settings.alchemyUnlocked[element] = true;
            elements[element].hidden = false;

            if (typeof createElementButton == "function") {
                createElementButton(element);
            }

            saveSettings();
        }
    }

    return oldChangePixel(pixel, element);
};
