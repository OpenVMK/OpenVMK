// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMenu / _EventProcModMenu

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProcModMenu(_me: LingoMe, _this: LingoValue, tEvent: LingoValue, tElemID: LingoValue, tParam: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseDown"))) {
  switch (tElemID) {
case "mods.mute.single":
  callMethod("_MuteSingle", _this)
  break;
case "mods.unmute.single":
  callMethod("_UnmuteSingle", _this)
  break;
case "mods.mute":
  callMethod("_MuteRoom", _this)
  break;
case "mods.unmute":
  callMethod("_UnmuteRoom", _this)
  break;
case "mods.forcename":
  callMethod("_ForceName", _this)
  break;
case "mods.akb":
  callMethod("_OpenAKBforUser", _this)
  break;
case "mods.akbrooms":
  callMethod("_OpenAKBforRooms", _this)
  break;
case "mods.pit":
  callMethod("_OpenPlayerInfoTool", _this)
  break;
case "mods.helpbrowser":
  callMethod("_OpenBrowser", _this)
  break;
case "mods.roomsowner":
  callMethod("_SelectRoomOwner", _this)
  break;
case "button.pull":
  callNamed("PullLoadingScreenConfiguration")
  break;
case "close":
  callMethod("_Remove", _this)
  break;
  }

  } else {
  if (lingoBinary("and", lingoBinary("eq", tEvent, symbol("keyDown")), lingoBinary("eq", tElemID, "mods.target.input"))) {
  setMeProp(_me, "m_ObjUserToOperate", undefined);
  if (lingoBinary("and", lingoBinary("and", lingoBinary("neq", _key.keyCode, 51), lingoBinary("neq", _key.keyCode, 49)), lingoBinary("neq", _key.keyCode, 51))) {
  var t_sName = callMethod("getText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.target.input"));
  setMeProp(_me, "m_sName", t_sName);
  }

  if (lingoBinary("eq", callMethod("getText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.target.input")), "")) {
  setMeProp(_me, "m_sName", "");
  }

  }

  }

}

