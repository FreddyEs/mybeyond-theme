declare var Hooks: Foundry.Hooks;
declare var game: Foundry.Game;
declare var ui: Foundry.Ui;

declare namespace Foundry {

    interface Hooks {
        on(event: string, callback: Function):void;
    }

    interface Ui {
        notifications: UiNotifications;
    }

    interface UiNotifications {
        info(message: string): void;
    }

    interface Game {
        settings: ClientSettings;
        system: any;
    }

    interface ClientSettings {
        register(module: string, key: string, data: any): void;
        get(module: string, key: string): any;
    }
}