/**
 * BetterDiscord BD Message Badge Component
 * Copyright (c) 2015-present Jiiks/JsSucks - https://github.com/Jiiks / https://github.com/JsSucks
 * All rights reserved.
 * https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

<template>
    <div class="bd-message-badges-wrap">
        <div v-if="developer == 'true'" v-tooltip="'BetterDiscord Developer'" class="bd-message-badge bd-message-badge-developer" @click="onClick"></div>
        <div v-else-if="webdev == 'true'" v-tooltip="'BetterDiscord Web Developer'" class="bd-message-badge bd-message-badge-developer" @click="onClick"></div>
        <div v-else-if="contributor == 'true'" v-tooltip="'BetterDiscord Contributor'" class="bd-message-badge bd-message-badge-contributor" @click="onClick"></div>
    </div>
</template>
<script>
    // Imports
    import { shell } from 'electron';

    export default {
        props: ['webdev', 'developer', 'contributor', 'hasBadges'],
        methods: {
            onClick() {
                if (this.developer) return shell.openExternal('https://github.com/JsSucks/BetterDiscordApp');
                if (this.webdev) return shell.openExternal('https://betterdiscord.net');
                if (this.contributor) return shell.openExternal('https://github.com/JsSucks/BetterDiscordApp/graphs/contributors');
            }
        }
    }
</script>
