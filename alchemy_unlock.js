// Alchemy Mod - Start with basic elements and unlock as discovered

if (!settings.alchemyUnlocked) {
    settings.alchemyUnlocked = {
        sand: true,
        dirt: true,
        water: true,
        fire: true,
        oxygen: true
    };
}

// Hide locked elements
for (var element in elements) {

    if (settings.alchemyUnlocked[element]) {
        elements[element].hidden = false;
    }
    else if (elements[element].category !== "tools") {
        elements[element].hidden = true;
    }
}

// Unlock elements when they are created
runAfterLoad(function() {

    let oldCreatePixel = createPixel;

    createPixel = function(element, x, y) {

        if (elements[element] && !settings.alchemyUnlocked[element]) {

            settings.alchemyUnlocked[element] = true;
            elements[element].hidden = false;

            if (typeof createElementButton === "function") {
                createElementButton(element);
            }

            saveSettings();
        }

        return oldCreatePixel(element, x, y);
    };

});
