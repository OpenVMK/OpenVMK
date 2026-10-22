// vmk_mystics.cct /  / me

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _me(_me: LingoMe, _AccessIndexed: LingoValue, t_rAvatar: LingoValue) {
  callNamed("GetVisual", "Init purple inferno renderer!")
  setThePropOf(_AccessIndexed, "SetMysticRenderer", t_rAvatar);
  setThePropOf(_AccessIndexed, "error", 0);
  setThePropOf(t_rAvatar, "t_iMagicFX", 33);
  setThePropOf(t_rAvatar, "t_aParams", callNamed("t_aParams", "magic_purpleinferno_1"));
  setThePropOf(t_rAvatar, "t_iAvatar", lingoBinary("mul", t_rAvatar.t_aParams.t_iAvatar, lingoBinary("div", _AccessIndexed._this, 32)));
  setThePropOf(t_rAvatar, "t_rContext", lingoBinary("mul", t_rAvatar.t_aParams.t_rContext, lingoBinary("div", _AccessIndexed._this, 32)));
}

