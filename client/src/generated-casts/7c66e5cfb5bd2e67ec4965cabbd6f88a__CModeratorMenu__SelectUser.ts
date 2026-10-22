// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMenu / SelectUser

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SelectUser(_me: LingoMe, _this: LingoValue, a_ObjAvatar: LingoValue) {
  if (callNamed("objectp", a_ObjAvatar)) {
  setMeProp(_me, "m_sName", callMethod("GetParam", a_ObjAvatar, "NAME"));
  if (callNamed("objectp", meProp(_me, "m_rWnd"))) {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), "mods.target.input")) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.target.input"), meProp(_me, "m_sName"))
  }

  }

  setMeProp(_me, "m_ObjUserToOperate", a_ObjAvatar);
  } else {
  setMeProp(_me, "m_ObjUserToOperate", undefined);
  }

}

