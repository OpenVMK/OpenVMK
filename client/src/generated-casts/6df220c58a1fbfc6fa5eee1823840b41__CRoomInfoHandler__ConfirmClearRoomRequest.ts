// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoHandler / ConfirmClearRoomRequest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ConfirmClearRoomRequest(_me: LingoMe, a_rMsg: LingoValue) {
  var t_rDialog = callNamed("createDialogWindow", callMethod("getID", _me), "ConfirmClearRoom", 2, 1);
  callMethod("show", t_rDialog)
  callMethod("setText", t_rDialog, callNamed("getText", "roominfo.clearroom.desc"), callNamed("getText", "roominfo.clearroom.title"), callNamed("getText", "roominfo.clearroom.cancel"), callNamed("getText", "roominfo.clearroom.ok"))
}

