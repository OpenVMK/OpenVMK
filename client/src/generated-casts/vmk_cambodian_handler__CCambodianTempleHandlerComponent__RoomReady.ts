// vmk_cambodian_handler.cct / CCambodianTempleHandlerComponent / RoomReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RoomReady(_me: LingoMe) {
  setMeProp(_me, "m_stage", callNamed("createObject", "cambodian_boats", "CStage"));
  if (callNamed("objectp", meProp(_me, "m_stage"))) {
  callMethod("LoadXML", meProp(_me, "m_stage"), "cambodian.stage1.xml")
  callNamed("receiveUpdate", callMethod("getID", callMethod("getInterface", _me)))
  }

}

