// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurnitureMap / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_mp_iCode_rItem", new LingoPropList([]));
  setMeProp(_me, "m_ar_sMapFileName", new LingoList([]));
  setMeProp(_me, "m_rNullObjDesc", callNamed("CreateXML", callNamed("getMember", "room.furniture.null.xml").text));
  callMethod("Search", meProp(_me, "m_rNullObjDesc"), "TYPE", "ITEM")
  setMeProp(_me, "m_iProcessNumber", callMethod("QueueProcessTurn", callMethod("GetProcessManager", callNamed("getThread", symbol("main")).component)));
  callNamed("registerMessage", lingoBinary("join", "start_process_", meProp(_me, "m_iProcessNumber")), callMethod("getID", _this), symbol("_LoadMapFile"))
  return 1;
}

