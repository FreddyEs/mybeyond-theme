
Hooks.on('init', () => {
    /**
     * Load required fonts
     */
    $("head").append(`<link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah|Noto+Sans:400,700|Open+Sans:400,700|Roboto+Condensed:400,700|Roboto:400,500,700&display=swap" rel="stylesheet">`);


    /**
     * Register settings
     */
    game.settings.register("mybeyond-theme", "charSheetEnabled", {
        name: '[Global] Character Sheet Style Enabled',
        hint: 'overwrites the default Character Sheet Styles to match the DnDBeyond character sheet',
        type: Boolean,
        default: true,
        config: true,
        scope: "world"
    });
    game.settings.register("mybeyond-theme", "charSheetEnabledUser", {
        name: '[User] Disable Character Sheet Style for User',
        hint: 'User option to disable MyBeyond Character Sheet Styles if globaly enabled',
        type: Boolean,
        default: false,
        config: true,
        scope: "user"
    });

});

Hooks.on('renderActorSheet5eCharacter', (app: any, html: JQuery<HTMLElement>, data: any) => {
    if (game.settings.get("mybeyond-theme", "charSheetEnabled") === true && game.settings.get("mybeyond-theme", "charSheetEnabledUser") === false) {
        const dnd5eVersion = game.system.data.version.toString() as string;
        if (MyBeyond.Tools.versionCompare(dnd5eVersion, "1.1.1") >= 0) {
            if (!html.hasClass("cb5es")) {
                html.addClass("my-beyond");
            }
        } else {
            ui.notifications.info("[MyBeyond-Theme] - DnD5e does not match the minimal required version 1.1.1");
        }
    }
});