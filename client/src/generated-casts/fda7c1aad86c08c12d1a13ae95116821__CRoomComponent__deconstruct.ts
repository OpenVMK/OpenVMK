// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("unregisterMessage", "room_create", callMethod("getID", _this))
  callNamed("unregisterMessage", "room_switch", callMethod("getID", _this))
  callNamed("unregisterMessage", "room_remove", callMethod("getID", _this))
  callMethod("_ResetProcess", _this)
  callNamed("call", symbol("deconstruct"), meProp(_me, "m_rFactory"))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rFurniMap"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rFurniMap")))
  }

  setMeProp(_me, "m_rRoomXML", undefined);
  setMeProp(_me, "m_rRoomBSPXML", undefined);
  setMeProp(_me, "m_rFurniMap", undefined);
  setMeProp(_me, "m_rFactory", undefined);
  setMeProp(_me, "m_rContext", undefined);
  setMeProp(_me, "m_sActive", "");
  setMeProp(_me, "m_rCache", new LingoPropList([]));
  callNamed("removeObject", "RoomItemAssetManager")
  if (callNamed("objectp", meProp(_me, "m_rThumbRenderer"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rThumbRenderer")))
  setMeProp(_me, "m_rThumbRenderer", undefined);
  }

  return 1;
}

