// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomComponent / _WaitForItemsToPreloadBeforeEnteringRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _WaitForItemsToPreloadBeforeEnteringRoom(_me: LingoMe, _this: LingoValue) {
  var t_rLoader = callNamed("getObject", "RoomItemAssetManager");
  if (callNamed("voidp", t_rLoader)) {
  callNamed("error", _this, "Asset loader instance was lost!", symbol("_WaitForItemsToPreloadBeforeEnteringRoom"))
  return;
  }

  if (lingoBinary("eq", callMethod("GetQueueLength", t_rLoader), 0)) {
  if (callNamed("connectionExists", callNamed("getVariable", "main.connection.id", "VMK"))) {
  if (callMethod("exists", callNamed("getObjectManager"), "RoomAssetLoadingDialog")) {
  callMethod("DeleteWindow", callNamed("getObject", "RoomAssetLoadingDialog"))
  callNamed("removeObject", "RoomAssetLoadingDialog")
  }

  if (callNamed("objectp", meProp(_me, "m_rContext"))) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "start")
  }

  }

  } else {
  if (callNamed("objectp", meProp(_me, "m_rContext"))) {
  if ((lingoTruthy(callMethod("exists", callNamed("getObjectManager"), "RoomAssetLoadingDialog")) ? 0 : 1)) {
  var t_rObj = callNamed("createObject", "RoomAssetLoadingDialog", "CLoadingWindow");
  callMethod("DefineWindow", t_rObj, new LingoPropList([symbol("headline"), callNamed("getText", "room.loading.assets.headline"), symbol("infotext"), callNamed("getText", "room.loading.assets.info"), symbol("showbutton"), 1, symbol("ButtonText"), callNamed("getText", "roomqueue.cancel"), symbol("modal"), 1, symbol("client"), callMethod("getID", _this), symbol("soundloop"), "VMK-loadingloop-v1"]))
  }

  callMethod("delay", _this, 500, symbol("_WaitForItemsToPreloadBeforeEnteringRoom"))
  }

  }

}

