// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraComponent / captionReceived

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function captionReceived(_me: LingoMe, tSuccess: LingoValue) {
  if (callNamed("value", tSuccess.content)) {
  callNamed("put", "Caption stored succesfully")
  var tCS = callMethod("countCS", _me, meProp(_me, "m_thumbmember").image);
  var tdata = new LingoPropList([symbol("image"), meProp(_me, "m_thumbmember").media, symbol("time"), lingoBinary("joinPad", theProperty("date"), theProperty("time")), symbol("cs"), tCS]);
  callMethod("storeThumbData", callNamed("getBinaryManager"), tdata, callMethod("getID", _me))
  } else {
  callNamed("put", "Caption was invalid")
  }

}

