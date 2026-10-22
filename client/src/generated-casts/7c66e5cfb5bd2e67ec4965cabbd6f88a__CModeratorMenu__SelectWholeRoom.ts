// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMenu / SelectWholeRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SelectWholeRoom(_me: LingoMe, _this: LingoValue) {
  var t_sTxt = callNamed("getText", "mods.room");
  if (callNamed("objectp", meProp(_me, "m_rWnd"))) {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), "mods.akb.target")) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.akb.target"), t_sTxt)
  }

  }

  setMeProp(_me, "m_ObjUserToOperate", undefined);
  setMeProp(_me, "m_sName", "");
}

