// vmk_fireworks_preshow_handler.cct / CFWPSComponent / DisableFireworks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DisableFireworks(_me: LingoMe) {
  setMeProp(_me, "m_disabled", 1);
  setThePropOf(meProp(_me, "m_viewImgSprite"), "member", undefined);
  callMethod("DisableButtons", callMethod("getInterface", _me))
  callNamed("removeUpdate", callMethod("getID", _me))
}

