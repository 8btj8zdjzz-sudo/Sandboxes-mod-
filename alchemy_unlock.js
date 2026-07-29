// Unlock Sand only

if (elements.sand) {
    elements.sand.hidden = false;
    elements.sand.category = "powders";
}

runAfterLoad(function() {
    if (typeof createElementButton === "function") {
        createElementButton("sand");
    }
});
