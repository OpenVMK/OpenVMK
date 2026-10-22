// vmk_casual.cct / CCasualGameChallengeInterface / UpdateTime

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateTime(_me: LingoMe, _this: LingoValue, a_rDialog: LingoValue) {
  setMeProp(_me, "m_iTimeLeft", lingoBinary("sub", meProp(_me, "m_iTimeLeft"), 1));
  var t_txt = callNamed("getText", "casual.challenge.dialog.text");
  var t_title = callNamed("getText", "casual.challenge.dialog.title");
  var t_btn1 = callNamed("getText", "casual.challenge.dialog.button.1");
  var t_btn2 = callNamed("getText", "casual.challenge.dialog.button.2");
  var t_sAvatarName = "";
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  if (callNamed("objectp", tRoomContext)) {
  var t_rAvatar = callMethod("_AccessIndexed", tRoomContext, meProp(_me, "m_iChallengerRef"), "avatar");
  if (callNamed("objectp", t_rAvatar)) {
  t_sAvatarName = callMethod("GetParam", t_rAvatar, "NAME");
  }

  }

  t_txt = callNamed("replaceChunks", t_txt, "%A", t_sAvatarName);
  t_txt = callNamed("replaceChunks", t_txt, "%L", meProp(_me, "m_iChallengerLevel"));
  t_txt = callNamed("replaceChunks", t_txt, "%T", lingoBinary("joinPad", meProp(_me, "m_iTimeLeft"), "seconds."));
  t_txt = callNamed("replaceChunks", t_txt, "\\r", "\r");
  callMethod("setText", a_rDialog, t_txt, t_title, t_btn1, t_btn2)
  callNamed("createTimeout", meProp(_me, "m_sChallengeTimeout"), 1000, symbol("UpdateTime"), callMethod("getID", _this), a_rDialog, 1)
  if (lingoBinary("lt", meProp(_me, "m_iTimeLeft"), 0)) {
  callNamed("removeObject", callMethod("getID", _this))
  }

}

