// vmk_dock_boats.cct / CDockBoatsComponent / RoomReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RoomReady(_me: LingoMe) {
  if ((lingoTruthy(callNamed("objectp", callNamed("getObject", "dock_boats"))) ? 0 : 1)) {
  setMeProp(_me, "m_stage", callNamed("createObject", "dock_boats", "CStage"));
  callMethod("LoadXML", meProp(_me, "m_stage"), "dock.stage1.xml")
  callNamed("receiveUpdate", callMethod("getID", callMethod("getInterface", _me)))
  }

}

