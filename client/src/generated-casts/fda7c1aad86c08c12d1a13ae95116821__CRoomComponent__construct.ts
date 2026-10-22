// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("and", theProperty("controlDown"), callMethod("keyPressed", _key, 0))) {
  setTheProperty("debugPlaybackEnabled", 1);
  }

  setMeProp(_me, "m_sActive", "");
  setMeProp(_me, "m_rCache", new LingoPropList([]));
  setMeProp(_me, "m_rSprites", new LingoPropList([]));
  setMeProp(_me, "m_iVersion", 0);
  setMeProp(_me, "m_fPercent", float(0));
  setMeProp(_me, "m_bCancelled", 0);
  setMeProp(_me, "m_rRoomXML", callNamed("CreateXML"));
  setMeProp(_me, "m_rRoomBSPXML", undefined);
  setMeProp(_me, "m_bProcessInitialized", 0);
  setMeProp(_me, "m_rFactory", callNamed("createObject", symbol("temp"), callNamed("GetClsVariable", "core.xml.tree.factory")));
  setMeProp(_me, "m_rContext", undefined);
  var t_rXML = callNamed("CreateXML");
  callMethod("open", t_rXML, callNamed("getMember", "room.classes.xml").text)
  callMethod("LoadTagDef", meProp(_me, "m_rFactory"), t_rXML)
  callMethod("close", t_rXML)
  callMethod("_ResetProcess", _this)
  callNamed("registerMessage", "room_create", callMethod("getID", _this), symbol("_CreateRoom"))
  callNamed("registerMessage", "room_switch", callMethod("getID", _this), symbol("_SwitchRoom"))
  callNamed("registerMessage", "room_remove", callMethod("getID", _this), symbol("_RemoveRoom"))
  callNamed("registerMessage", symbol("Initialize"), callMethod("getID", _this), symbol("_Initialize"))
  return 1;
}

