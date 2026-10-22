// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurnitureMap / _FileLoadCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _FileLoadCallback(_me: LingoMe, _this: LingoValue, a_sMember: LingoValue) {
  if (lingoBinary("gt", callMethod("getPos", meProp(_me, "m_ar_sMapFileName"), a_sMember), 0)) {
  callMethod("deleteOne", meProp(_me, "m_ar_sMapFileName"), a_sMember)
  } else {
  callNamed("error", _this, lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "File load callback for unknown file:", "\""), a_sMember), "\""), "!"), symbol("_FileLoadCallback"))
  return;
  }

  var tt = theProperty("milliSeconds");
  var t_rTypeMapXML = callNamed("CreateXML", callNamed("getMember", a_sMember).text);
  if (callMethod("Search", t_rTypeMapXML, "type", "ITEMS")) {
  var t_rItems = callMethod("GetNode", t_rTypeMapXML);
  for (var t_rItem of t_rItems.child.toArray()) {
  callMethod("setaProp", meProp(_me, "m_mp_iCode_rItem"), callNamed("integer", t_rItem.param["CODE"]), t_rItem)
  }

  }

  tt = lingoBinary("sub", theProperty("milliSeconds"), tt);
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "furnimap parsed in", tt), "ms."))
  if (lingoBinary("eq", meProp(_me, "m_ar_sMapFileName").count, 0)) {
  setMeProp(_me, "m_bReady", 1);
  if (callMethod("exists", callNamed("getObjectManager"), "RoomFurniMapLoadingDialog")) {
  callMethod("DeleteWindow", callNamed("getObject", "RoomFurniMapLoadingDialog"))
  callNamed("removeObject", "RoomFurniMapLoadingDialog")
  }

  callMethod("unlock", callNamed("getWindowManager"))
  callNamed("RemoveCustomLoadingScreen")
  callMethod("ProcessReadyCallback", callMethod("GetProcessManager", callNamed("getThread", symbol("main")).component), meProp(_me, "m_iProcessNumber"))
  callNamed("executeMessage", "furnimap_ready")
  }

}

