// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorAKB / CreateConfirmDialog

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateConfirmDialog(_me: LingoMe, t_dialogName: LingoValue) {
  switch (t_dialogName) {
case "ban":
  var t_sMsg = callNamed("getText", "mod.confirm.ban.text");
  var t_sTitle = callNamed("getText", "mod.confirm.ban.title");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "BanRoom", 2, 1);
  callMethod("show", t)
  callMethod("setText", t, t_sMsg, t_sTitle, "CANCEL", "OK")
  break;
case "kick":
  t_sMsg = callNamed("getText", "mod.confirm.kick.text");
  t_sTitle = callNamed("getText", "mod.confirm.kick.title");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "KickRoom", 2, 1);
  callMethod("show", t)
  callMethod("setText", t, t_sMsg, t_sTitle, "CANCEL", "OK")
  break;
case "alert":
  t_sMsg = callNamed("getText", "mod.confirm.alert.text");
  t_sTitle = callNamed("getText", "mod.confirm.alert.title");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "AlerRoom", 2, 1);
  callMethod("show", t)
  callMethod("setText", t, t_sMsg, t_sTitle, "CANCEL", "OK")
  break;
case "AlertQueue":
  t_sMsg = callNamed("getText", "mod.confirm.alert.queue.text");
  t_sTitle = callNamed("getText", "mod.confirm.alert.queue.title");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "AlertQueue", 2, 1);
  callMethod("show", t)
  callMethod("setText", t, t_sMsg, t_sTitle, "CANCEL", "OK")
  break;
  }

}

