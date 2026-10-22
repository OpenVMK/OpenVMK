// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / AddFriendFailed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddFriendFailed(_me: LingoMe, a_iRequesterId: LingoValue) {
  var t_txt = callNamed("getText", "mes.dialog.addfriendfailed.info", "We failed to add your friend at this time since his friend-list is full, try again later.");
  var t_title = callNamed("getText", "mes.dialog.addfriendfailed.title", "Add Friend Failed");
  var t_btn1 = callNamed("getText", "mes.dialog.addfriendfailed.btn1", "OK");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "mes.dialog.addfriendfailed", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
}

