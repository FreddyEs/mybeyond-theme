
function versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
        zeroExtend = options && options.zeroExtend,
        v1parts = v1.split('.'),
        v2parts = v2.split('.');

    function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push("0");
        while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }

        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }

    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
}

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

Hooks.on('renderActorSheet5eCharacter', (app, html, data) => {
    if (game.settings.get("mybeyond-theme", "charSheetEnabled") === true && game.settings.get("mybeyond-theme", "charSheetEnabledUser") === false) {
        const dnd5eVersion = game.system.data.version.toString();
        if (versionCompare(dnd5eVersion, "1.1.1") >= 0) {
            if (!html.hasClass("cb5es")) {
                html.addClass("my-beyond");
            }
        } else {
            ui.notifications.info("[MyBeyond-Theme] - DnD5e does not match the minimal required version 1.1.1");
        }
    }
});