// 02a651b7c670fb161ce1a3e4d28713a1.cct / CMessageBar / Mute

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Mute(_me: LingoMe, t_iTime: LingoValue) {
  callMethod("updateMute", _me, t_iTime)
  callMethod("setEditable", _me, 0)
}

