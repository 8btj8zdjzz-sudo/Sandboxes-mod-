// Alchemy Unlock Mod
// Unlock elements when they are created

if (!settings.alchemyUnlocked) {
    settings.alchemyUnlocked = {
        oxygen: true,
        dirt: true,
        fire: true,
        water: true
    };
}

// Put locked elements into alchemy category
for (var element in elements) {
    if (settings.alchemyUnlocked[element]) {
        elements[element].hidden = false;
    } else {
        if (elements[element].category !== "tools") {
            elements[element].hidden = true;
            elements[element].category = "alchemy mod";
        }
    }
}

// Keep explosion as tool
if (elements.explosion) {
    elements.explosion.category = "tools";
}

settings.unhide = 2;

runAfterLoad(function() {

    window.checkAlchemyUnlock = function(element) {

        if (!elements[element]) return;

        if (settings.alchemyUnlocked[element]) return;

        settings.alchemyUnlocked[element] = true;
        elements[element].hidden = false;

        if (typeof createElementButton === "function") {
            createElementButton(element);
        }

        saveSettings();
    };


    // Watch elements being created
    for (let name in elements) {

        let oldCreate = elements[name].onCreate;

        elements[name].onCreate = function(pixel) {

            checkAlchemyUnlock(pixel.element);

            if (oldCreate) {
                oldCreate(pixel);
            }
        };
    }

});
