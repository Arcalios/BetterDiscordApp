/**
 * BetterDiscord Error Interface
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

/*
export interface IError {
    raw: any;
    severity: number;
    shortReason: string;
    longReason: string;
    title: string;
    reason: string;
    other?: any;
}*/

export interface IError {
    native: any;
    severity: number;
    reason: string;
    shortReason: string;
    title: string;
    misc?: any;
}