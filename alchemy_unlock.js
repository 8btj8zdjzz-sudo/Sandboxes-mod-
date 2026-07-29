// Alchemy Mod - Unlock Elements Through Gameplay

// Starting unlocked elements
var alchemyStartingElements = [
    "sand",
    "dirt",
    "water",
    "fire",
    "oxygen"
];

if (!settings.alchemyUnlocked) {
    settings.alchemyUnlocked = {};
}

// Unlock starting elements
for (var i = 0; i < alchemyStartingElements.length; i++) {
    settings.alchemyUnlocked[alchemyStartingElements[i]] = true;
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


// Unlock elements when reactions create them
runAfterLoad(function() {

    var oldChangePixel = changePixel;

    changePixel = function(pixel, element) {

        if (elements[element] && !settings.alchemyUnlocked[element]) {

            settings.alchemyUnlocked[element] = true;
            elements[element].hidden = false;

            if (typeof createElementButton == "function") {
                createElementButton(element);
            }

            saveSettings();
        }

        return oldChangePixel(pixel, element);
    };

});
