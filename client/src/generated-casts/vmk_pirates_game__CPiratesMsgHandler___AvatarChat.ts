// vmk_pirates_game.cct / CPiratesMsgHandler / _AvatarChat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _AvatarChat(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sMsg = callNamed("TransformCannedMsgToString", a_rMsg);
  var t_rCon = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  var t_rShip = callMethod("GetShipByOwner", callMethod("getComponent", _this), t_iRef);
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", t_rCon)) ? 0 : 1), (lingoTruthy(callNamed("voidp", t_rShip)) ? 0 : 1))) {
  var t_veLoc = callNamed("vector", callMethod("getRealLoc", callMethod("GetVisual", t_rShip)).locH, callMethod("getRealLoc", callMethod("GetVisual", t_rShip)).locV, 0);
  var t_sName = callMethod("getPlayerName", callMethod("GetVisual", t_rShip));
  if (lingoBinary("eq", callMethod("GetParam", t_rShip, "Team"), 1)) {
  var t_rColor = callNamed("rgb", 255, 40, 40);
  } else {
  t_rColor = callNamed("rgb", 40, 40, 255);
  }

  callNamed("executeMessage", symbol("chat"), new LingoPropList([symbol("message"), t_sMsg, symbol("mode"), symbol("say"), symbol("name"), t_sName, symbol("color"), t_rColor, symbol("loc"), t_veLoc]))
  }

}

