// Alchemy Mod - Unlock Everything Through Gameplay

if (!settings.alchemyUnlocked) {
    settings.alchemyUnlocked = {
        oxygen: true,
        dirt: true,
        fire: true,
        water: true,
    };
}

if (settings.unlocked && settings.unlocked.alchemymod) {
    for (var element in settings.unlocked) {
        if (settings.unlocked[element]) {
            settings.alchemyUnlocked[element] = true;
        }
    }
}

// Keep explosion in tools
if (elements.explosion) {
    elements.explosion.category = "tools";
}

// Hide everything except unlocked elements
for (var element in elements) {
    if (settings.alchemyUnlocked[element]) {
        elements[element].hidden = false;
        if (elements[element].category !== "tools") {
            elements[element].category = "alchemy mod";
        }
    } else if (elements[element].category !== "tools") {
        elements[element].hidden = true;
        elements[element].category = "alchemy mod";
    }
}

// Unlock as discovered
settings.unhide = 2;

runAfterLoad(function () {

    checkUnlock = function(element) {
        if (!elements[element]) return;

        // Already unlocked
        if (settings.alchemyUnlocked[element]) return;

        // Unlock permanently
        settings.alchemyUnlocked[element] = true;
        elements[element].hidden = false;

        // Create button if needed
        if (!document.getElementById("elementButton-" + element)) {
            createElementButton(element);
        }

        if (settings.unhide === 2) {
            var categoryButton = document.querySelector(".categoryButton[current='true']");
            if (categoryButton) {
                var currentCategory = categoryButton.getAttribute("category");
                if (currentCategory !== elements[element].category) {
                    var cat = document.getElementById("categoryButton-" + elements[element].category);
                    if (cat) cat.classList.add("notify");
                }
            }

            var btn = document.getElementById("elementButton-" + element);
            if (btn) btn.classList.add("notify");
        }

        saveSettings();
    };

    // Unlock any element the first time it exists
    for (var element in elements) {
        var oldTick = elements[element].tick;

        elements[element].tick = function(pixel) {
            if (!settings.alchemyUnlocked[pixel.element]) {
                checkUnlock(pixel.element);
            }

            if (oldTick) {
                oldTick(pixel);
            }
        };
    }
});

runAfterAutogen(function () {
    for (var element in elements) {
        if (elements[element].category === "states") {
            elements[element].category = "alchemy mod";
        }
    }
});

window.addEventListener("load", function () {
    for (var element in elements) {
        if (elements[element].hidden) {
            var button = document.getElementById("elementButton-" + element);
            if (button) {
                button.remove();
            }
        }
    }
});
