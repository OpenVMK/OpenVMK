// d0e535313898676eb605277339b50f27.cct / CEmoticons / ShowEmotInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowEmotInfo(_me: LingoMe, _this: LingoValue, a_vParam: LingoValue, a_bDoubleClick: LingoValue) {
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if ((lingoTruthy(callNamed("voidp", a_vParam)) ? 0 : 1)) {
  callMethod("MouseSelection", meProp(_me, "m_rGrid"), a_vParam)
  var t_iItemId = callMethod("GetSelected", meProp(_me, "m_rGrid"));
  } else {
  t_iItemId = 1;
  callMethod("select", meProp(_me, "m_rGrid"), 1)
  }

  if (a_bDoubleClick) {
  if ((lingoTruthy(callNamed("voidp", t_iItemId)) ? 0 : 1)) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "SendEmoticon", new LingoPropList([symbol("int"), t_iItemId]))
  callMethod("_Close", _this)
  }

  }

}

