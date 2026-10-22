// registration.cct / CRegistrationHandler / HandleLogin

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleLogin(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  if (callNamed("timeoutExists", "login_timer")) {
  callNamed("removeTimeout", "login_timer")
  }

  if (callNamed("windowExists", "LoginInProgress")) {
  var t_rAnimationManager = callNamed("getObject", "AnimationManager");
  if (callNamed("objectp", t_rAnimationManager)) {
  callMethod("ClearAll", t_rAnimationManager)
  }

  callNamed("removeWindow", "LoginInProgress")
  }

  var t_iState = callMethod("GetIntFrom", tMsg.connection);
  switch (t_iState) {
case 0:
  callMethod("send", callNamed("getConnection", "VMK"), "GetName")
  callNamed("executeMessage", "init_messenger")
  break;
case 1:
  setMeProp(_me, "m_bRegistrationGoingOn", 1);
  callMethod("CreateAvatar", _this._interface)
  break;
case 99:
  var t_sName = callMethod("GetStrFrom", tMsg.connection);
  callMethod("set", callNamed("getObject", symbol("session")), "name", t_sName)
  callMethod("_RefreshRegList", _this._interface, undefined, "RegistrationContinued")
  callNamed("executeMessage", symbol("login_hide"))
  break;
case 100:
case 101:
  setMeProp(_me, "m_bNameRejected", 1);
  t_sName = callMethod("GetStrFrom", tMsg.connection);
  callMethod("NameRejected", _this._interface, t_sName)
  callMethod("set", callNamed("getObject", symbol("session")), "name", t_sName)
  callNamed("executeMessage", symbol("login_hide"))
  break;
case 1101:
  callMethod("AlertNameResubmit", _this._interface)
  callNamed("executeMessage", symbol("login_hide"))
  break;
case 102:
  setMeProp(_me, "m_bContinueRegistrationAfterAcceptedName", 1);
  t_sName = callMethod("GetStrFrom", tMsg.connection);
  callMethod("NameRejected", _this._interface, t_sName, 1)
  callNamed("executeMessage", symbol("login_hide"))
  break;
case 103:
  setMeProp(_me, "m_bRegistrationGoingOn", 1);
  callMethod("_RefreshRegList", _this._interface, undefined, "NoNameNoRoom")
  callNamed("executeMessage", symbol("login_hide"))
  break;
case 104:
  t_sName = callMethod("GetStrFrom", tMsg.connection);
  callMethod("set", callNamed("getObject", symbol("session")), "name", t_sName)
  setMeProp(_me, "m_bRegistrationGoingOn", 1);
  callMethod("_RefreshRegList", _this._interface, undefined, "NoEULA")
  callMethod("send", callNamed("getConnection", "VMK"), "GetName")
  callNamed("executeMessage", symbol("login_hide"))
  break;
case 105:
  setMeProp(_me, "m_bRegistrationGoingOn", 1);
  callMethod("CreateAvatar", _this._interface)
  var t_wnd = callNamed("createDialogWindow", callMethod("getID", _this), "AvatarDeleted", 1, 1);
  callMethod("show", t_wnd)
  var t_sMsg = callNamed("getText", "reg.avatar.deleted");
  callMethod("setText", t_wnd, t_sMsg, callNamed("getText", "reg.avatar.deleted.hd"), "OK")
  break;
  break;
  }

}

