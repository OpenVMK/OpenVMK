// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMenu / _OpenAKBforUser

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _OpenAKBforUser(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_ObjUserToOperate"))) {
  setMeProp(_me, "m_sName", callMethod("GetParam", meProp(_me, "m_ObjUserToOperate"), "NAME"));
  } else {
  setMeProp(_me, "m_sName", callMethod("getText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.target.input")));
  }

  if (lingoBinary("neq", meProp(_me, "m_sName"), "")) {
  callMethod("SetAvatarName", callMethod("getInterface", callNamed("getThread", symbol("moderator_tools"))), meProp(_me, "m_sName"))
  callMethod("ManageModWindows", callMethod("getInterface", callNamed("getThread", symbol("moderator_tools"))), "akb")
  }

}

