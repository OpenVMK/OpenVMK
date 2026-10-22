// 02a651b7c670fb161ce1a3e4d28713a1.cct / CInterfaceHandler / ChatAvatarMuted

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ChatAvatarMuted(_me: LingoMe, tMsg: LingoValue) {
  var tMuteTime = callMethod("GetIntFrom", tMsg.connection);
  callMethod("Mute", callMethod("getMessageBar", callMethod("getInterface", _me)), tMuteTime)
}

