// vmk_tiki_handler.cct / CTikiHandlerComponent / RoomReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RoomReady(_me: LingoMe) {
  setMeProp(_me, "m_stage", callNamed("createObject", "tiki_boats", "CStage"));
  callMethod("LoadXML", meProp(_me, "m_stage"), "tiki.stage1.xml")
  callNamed("receiveUpdate", callMethod("getID", callMethod("getInterface", _me)))
}

