// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / handle_avatarchange

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_avatarchange(_me: LingoMe, tMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var mez = callNamed("getObject", symbol("room_handler"));
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", mez));
  var tID = callMethod("GetIntFrom", tMsg.connection);
  var t_rAvatar = callMethod("_AccessIndexed", t_rContext, tID, "avatar");
  var t_aFigure = new LingoList([]);
  for (var i = 1; i <= 12; ++i) {
  t_aFigure[i] = callMethod("GetIntFrom", tMsg.connection);
  }

  var t_rTransfer = callNamed("propList", symbol("input"), t_aFigure, symbol("Output"), callMethod("GetRenderer", callMethod("GetVisual", t_rAvatar)), symbol("avatar"), t_rAvatar);
  setThePropOf(t_rTransfer, "input", t_aFigure);
  callNamed("executeMessage", "CreateAvatar", t_rTransfer)
  if (callNamed("objectp", t_rTransfer.Output)) {
  callMethod("SetRenderer", callMethod("GetVisual", t_rAvatar), t_rTransfer.Output)
  }

}

