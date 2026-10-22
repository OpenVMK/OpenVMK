// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAvatarProfile / select

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function select(_me: LingoMe, _this: LingoValue, a_rSelected: LingoValue) {
  if ((lingoTruthy(lingoBinary("eq", callMethod("GetParam", a_rSelected, "NAME"), callMethod("get", callNamed("getObject", symbol("session")), "name"))) ? 0 : 1)) {
  callNamed("executeMessage", "ui_avatarprofile")
  }

  if (lingoBinary("eq", callMethod("GetParam", a_rSelected, "NAME"), callMethod("get", callNamed("getObject", symbol("session")), "name"))) {
  }

  setMeProp(_me, "m_rSelected", a_rSelected);
  var t_sID = callNamed("getUniqueID");
  if (callNamed("voidp", meProp(_me, "m_rControls"))) {
  if (callNamed("createWindow", t_sID, "vmk_avatarinfo.window")) {
  setMeProp(_me, "m_rControls", callNamed("getWindow", t_sID));
  callMethod("moveTo", meProp(_me, "m_rControls"), 571, 259)
  callMethod("registerClient", meProp(_me, "m_rControls"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rControls"), symbol("_EventProc"), callMethod("getID", _this), symbol("mouseUp"))
  } else {
  return callNamed("error", _this, "Failed to show avatar profile!", symbol("select"));
  }

  }

  callMethod("setText", callMethod("getElement", meProp(_me, "m_rControls"), "avatarinfo.name"), callMethod("GetParam", a_rSelected, "NAME"))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rControls"), "avatarinfo.userslogan"), callMethod("GetParam", a_rSelected, "DESC"))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rControls"), "avatarinfo.userspin"), "")
  setMeProp(_me, "m_iTradeState", callNamed("integer", callMethod("GetParam", a_rSelected, "TRADE")));
  setMeProp(_me, "m_iFriendRequestState", callNamed("integer", callMethod("GetParam", a_rSelected, "FRIEND")));
  if (lingoBinary("eq", callMethod("GetParam", a_rSelected, "NAME"), callMethod("get", callNamed("getObject", symbol("session")), "name"))) {
  callMethod("setButtonState", _this, "avatarinfo.ignore.button", 0)
  callMethod("setButtonState", _this, "avatarinfo.askfriendship.button", 0)
  callMethod("setButtonState", _this, "avatarinfo.trade.button", 0)
  callMethod("setButtonState", _this, "avatarinfo.kick.button", 0)
  callMethod("setButtonState", _this, "avatarinfo.report.button", 0)
  } else {
  var t_sName = callMethod("GetParam", a_rSelected, "NAME");
  var tbNotFriend = (lingoTruthy(callMethod("isFriend", callMethod("getComponent", callNamed("getThread", "Messenger")), t_sName)) ? 0 : 1);
  var t_bAskFriendButton = lingoBinary("and", tbNotFriend, lingoBinary("eq", meProp(_me, "m_iFriendRequestState"), 0));
  var t_bIsTrading = callMethod("get", callNamed("getObject", symbol("session")), "IsTrading");
  var t_bTradeState = callMethod("get", callNamed("getObject", symbol("session")), "traderequests");
  callMethod("setButtonState", _this, "avatarinfo.ignore.button", 1)
  callMethod("setButtonState", _this, "avatarinfo.trade.button", 0)
  callMethod("setButtonState", _this, "avatarinfo.askfriendship.button", 0)
  callMethod("setButtonState", _this, "avatarinfo.kick.button", callMethod("get", callNamed("getObject", symbol("session")), "ControlRoom"))
  callMethod("setButtonState", _this, "avatarinfo.report.button", 1)
  if (lingoBinary("and", lingoBinary("and", lingoBinary("eq", meProp(_me, "m_iTradeState"), 0), (lingoTruthy(t_bIsTrading) ? 0 : 1)), t_bTradeState)) {
  callMethod("setButtonState", _this, "avatarinfo.trade.button", 1)
  }

  callMethod("setButtonState", _this, "avatarinfo.askfriendship.button", t_bAskFriendButton)
  }

  var t_rFill = callNamed("image", 36, 36, 32);
  callMethod("fill", t_rFill, t_rFill.rect, callNamed("rgb", 39, 86, 146))
  setMeProp(_me, "m_ar_rPinData", new LingoList([]));
  var t_mp_iType_rImage = new LingoPropList([]);
  var i = 1;
  while (1) {
  var t_iType = callNamed("integer", callMethod("GetParam", meProp(_me, "m_rSelected"), lingoBinary("join", "pin.type.", i)));
  var t_iLevel = callNamed("integer", callMethod("GetParam", meProp(_me, "m_rSelected"), lingoBinary("join", "pin.level.", i)));
  if (lingoBinary("neq", undefined, t_iType)) {
  callMethod("add", meProp(_me, "m_ar_rPinData"), new LingoList([t_iType, t_iLevel]))
  if (lingoBinary("neq", t_iLevel, 0)) {
  callMethod("addProp", t_mp_iType_rImage, t_iType, new LingoPropList([symbol("level"), t_iLevel, symbol("Output"), undefined]))
  } else {
  callMethod("addProp", t_mp_iType_rImage, t_iType, undefined)
  }

  }

  if (lingoBinary("gt", i, 15)) {
  break;
  }

  i = lingoBinary("add", i, 1);
  }

  callNamed("executeMessage", "GetPinThumbnail", t_mp_iType_rImage, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_PinsRenderedCbk")]))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rControls"), "avatarinfo.userspin"), "")
  i = 1;
  while (1) {
  var t_sIcon = callMethod("GetParam", a_rSelected, lingoBinary("join", "icon.type.", i));
  if (lingoBinary("gt", i, 4)) {
  break;
  } else {
  if (callNamed("voidp", t_sIcon)) {
  callMethod("clearImage", callMethod("getElement", meProp(_me, "m_rControls"), lingoBinary("join", "avatarinfo.icon", i)))
  } else {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rControls"), lingoBinary("join", "avatarinfo.icon", i)), callNamed("getMember", lingoBinary("join", "badge_", t_sIcon)).image)
  }

  }

  i = lingoBinary("add", i, 1);
  }

  callMethod("show", meProp(_me, "m_rControls"))
  return 1;
}

