/**
 * BetterDiscord Client Core
 * Copyright (c) 2015-present Jiiks/JsSucks - https://github.com/Jiiks / https://github.com/JsSucks
 * All rights reserved.
 * https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import { DOM, BdUI, Modals, Reflection } from 'ui';
import BdCss from './styles/index.scss';
import { Patcher, Vendor, Events, CssEditor, Globals, ExtModuleManager, PluginManager, ThemeManager, ModuleManager, WebpackModules, Settings, Database, ReactComponents, ReactAutoPatcher, DiscordApi } from 'modules';
import { ClientLogger as Logger, ClientIPC, Utils } from 'common';
import { EmoteModule } from 'builtin';
const ignoreExternal = false;
const DEV = true;

class BetterDiscord {

    constructor() {
        this._bd = {
            DOM,
            BdUI,
            Modals,
            Reflection,
            Patcher,
            Vendor,
            Events,
            CssEditor,
            Globals,
            ExtModuleManager,
            PluginManager,
            ThemeManager,
            ModuleManager,
            WebpackModules,
            Settings,
            Database,
            ReactComponents,
            DiscordApi,
            Logger,
            ClientIPC,
            Utils,
            EmoteModule
        };

        const developermode = Settings.getSetting('core', 'advanced', 'developer-mode');
        if (developermode.value) window._bd = this._bd;
        developermode.on('setting-updated', event => {
            if (event.value) window._bd = this._bd;
            else if (window._bd) delete window._bd;
        });

        DOM.injectStyle(BdCss, 'bdmain');
        this.globalReady = this.globalReady.bind(this);
        Events.on('global-ready', this.globalReady);
        Globals.initg();
    }

    async init() {
        try {
            await Database.init();
            await Settings.loadSettings();
            await ModuleManager.initModules();
            Modals.showContentManagerErrors();
            if (!ignoreExternal) {
                await ExtModuleManager.loadAllModules(true);
                await PluginManager.loadAllPlugins(true);
                await ThemeManager.loadAllThemes(true);
            }
            if (!Settings.get('core', 'advanced', 'ignore-content-manager-errors'))
                Modals.showContentManagerErrors();
            Events.emit('ready');
            Events.emit('discord-ready');
            EmoteModule.observe();
        } catch (err) {
            Logger.err('main', ['FAILED TO LOAD!', err]);
        }
    }

    globalReady() {
        BdUI.initUiEvents();
        this.vueInstance = BdUI.injectUi();
        this.init();
    }

}

if (window.BetterDiscord) {
    Logger.log('main', 'Attempting to inject again?');
} else {
    let instance = null;
    Events.on('autopatcher', () => instance = new BetterDiscord());
    ReactAutoPatcher.autoPatch().then(() => Events.emit('autopatcher'));
}
