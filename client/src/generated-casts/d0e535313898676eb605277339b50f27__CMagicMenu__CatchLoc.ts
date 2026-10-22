// d0e535313898676eb605277339b50f27.cct / CMagicMenu / CatchLoc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CatchLoc(_me: LingoMe, _this: LingoValue) {
  var t_iStack = callNamed("value", callMethod("GetTheTileStack", callMethod("GetFactor", callMethod("Search", callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component), "CLASS", "pointer"))));
  if ((lingoTruthy(callNamed("voidp", t_iStack)) ? 0 : 1)) {
  var t_iTile = callNamed("value", callMethod("GetParam", t_iStack, "REF"));
  }

  if (callNamed("integerp", t_iTile)) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "MagicTeleport", new LingoPropList([symbol("int"), meProp(_me, "m_iTelePortFxId"), symbol("int"), t_iTile]))
  callNamed("removeObject", "MagicTeleporter")
  setMeProp(_me, "m_EventAgent_obj", undefined);
  if (callNamed("windowExists", meProp(_me, "m_sWindowID"))) {
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.stop.button"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word.hd"), symbol("visible"), 0)
  }

  }

}

