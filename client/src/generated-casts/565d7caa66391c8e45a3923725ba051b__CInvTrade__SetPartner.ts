// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / SetPartner

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetPartner(_me: LingoMe, _this: LingoValue, a_iTraderRef: LingoValue, a_bOppositeGender: LingoValue) {
  var t_rTrader = callMethod("_AccessIndexed", callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component), a_iTraderRef, "avatar");
  var t_sTraderName = "";
  if (callNamed("objectp", t_rTrader)) {
  t_sTraderName = callMethod("GetParam", t_rTrader, "NAME");
  }

  setMeProp(_me, "m_sPartner", t_sTraderName);
  setMeProp(_me, "m_iPartnerRef", a_iTraderRef);
  if ((lingoTruthy(callNamed("voidp", a_bOppositeGender)) ? 0 : 1)) {
  setMeProp(_me, "m_bOppositeGender", a_bOppositeGender);
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.heaccepts.hd"), lingoBinary("joinPad", meProp(_me, "m_sPartner"), callNamed("getText", "tra.heaccepts")))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.heoffers.hd"), callNamed("replaceChunks", callNamed("getText", "tra.heoffers"), "\\$", meProp(_me, "m_sPartner")))
  var t_bShowAskFriend = 1;
  var t_rMessenger = callNamed("getThread", "Messenger");
  var t_sName = meProp(_me, "m_sPartner");
  if (lingoBinary("neq", t_rMessenger, 0)) {
  var t_ar_rFriends = callMethod("getFriendNames", callMethod("getComponent", t_rMessenger));
  if (lingoBinary("gt", callMethod("getOne", t_ar_rFriends, t_sName), 0)) {
  t_bShowAskFriend = 0;
  }

  }

  if (t_bShowAskFriend) {
  callMethod("setButtonState", _this, "tra.askfriend.button", 1)
  } else {
  callMethod("setButtonState", _this, "tra.askfriend.button", 0)
  }

  }

}

