// vmk_furniture_code.cct / CRoomItemSound / PlaySound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySound(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_sSoundName", lingoBinary("join", "SoundFurni", meProp(_me, "m_iType")));
  if (callNamed("memberExists", lingoBinary("join", meProp(_me, "m_sSoundName"), "sound.xml"))) {
  callNamed("executeMessage", "StopRoomSound")
  callNamed("executeMessage", "LoadRoomSound", meProp(_me, "m_sSoundName"))
  } else {
  setMeProp(_me, "m_sSoundName", "");
  callNamed("put", lingoBinary("joinPad", "xmls are missing:", meProp(_me, "m_sSoundName")))
  }

}

