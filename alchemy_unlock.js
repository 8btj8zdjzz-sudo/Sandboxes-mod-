runAfterLoad(function() {
    settings.unlocked = settings.unlocked || {};

    settings.unlocked.sand = true;

    if (elements.sand) {
        elements.sand.hidden = false;
    }

    if (typeof createElementButton === "function") {
        createElementButton("sand");
    }

    saveSettings();
});
