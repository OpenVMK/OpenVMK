// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rCurPageObj", undefined);
  setMeProp(_me, "m_rCurPageObj2", undefined);
  setMeProp(_me, "m_mpAvatarData", undefined);
  callNamed("registerMessage", "room_leave", callMethod("getID", _this), symbol("closeAll"))
  callNamed("registerMessage", "ui_AvatarBuilder", callMethod("getID", _this), symbol("OpenCloseAvatarBuilder"))
  callNamed("registerMessage", "close_AvatarBuilder", callMethod("getID", _this), symbol("CloseAvatarBuilder"))
  callNamed("registerMessage", "ui_Settings", callMethod("getID", _this), symbol("OpenCloseSettings"))
  callNamed("registerMessage", "close_Settings", callMethod("getID", _this), symbol("CloseSettings"))
  callNamed("registerMessage", symbol("Initialize"), callMethod("getID", _this), symbol("AllCastsDone"))
  callNamed("registerMessage", symbol("MinigameState"), callMethod("getID", _this), symbol("MinigameStateChange"))
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_rWindow2", undefined);
  return 1;
}

