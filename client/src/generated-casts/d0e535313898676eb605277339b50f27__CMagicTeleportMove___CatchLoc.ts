// d0e535313898676eb605277339b50f27.cct / CMagicTeleportMove / _CatchLoc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CatchLoc(_me: LingoMe, _this: LingoValue) {
  var t_Obj = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  if (callNamed("objectp", t_Obj)) {
  var t_iStack = callNamed("value", callMethod("GetTheTileStack", callMethod("GetFactor", callMethod("Search", callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component), "CLASS", "pointer"))));
  if ((lingoTruthy(callNamed("voidp", t_iStack)) ? 0 : 1)) {
  var t_iTile = callNamed("value", callMethod("GetParam", t_iStack, "REF"));
  }

  if ((lingoTruthy(callNamed("voidp", t_iTile)) ? 0 : 1)) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "MagicTeleport", new LingoPropList([symbol("int"), meProp(_me, "m_iMagicFxNum"), symbol("int"), t_iTile]))
  callNamed("removeObject", "MagicTeleporter")
  if (callNamed("objectExists", "TeleportObj")) {
  callNamed("removeObject", "TeleportObj")
  }

  }

  }

}

