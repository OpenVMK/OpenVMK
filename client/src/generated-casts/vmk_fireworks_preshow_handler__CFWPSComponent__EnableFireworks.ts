// vmk_fireworks_preshow_handler.cct / CFWPSComponent / EnableFireworks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EnableFireworks(_me: LingoMe) {
  setMeProp(_me, "m_disabled", 0);
  setThePropOf(meProp(_me, "m_viewImgSprite"), "member", meProp(_me, "m_bufMember"));
  callMethod("EnableButtons", callMethod("getInterface", _me))
  callNamed("receiveUpdate", callMethod("getID", _me))
}

