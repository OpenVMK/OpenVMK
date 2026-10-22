// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewFriendInfo / showAddressBookEntryInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showAddressBookEntryInfo(_me: LingoMe) {
  var t_rSelected = callMethod("GetActive", meProp(_me, "m_rAddressbookList"));
  if ((lingoTruthy(callNamed("objectp", t_rSelected)) ? 0 : 1)) {
  return 0;
  }

  var t_rFriend = callMethod("GetNode", t_rSelected);
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "mes.friends.username"), t_rFriend.buddyname)
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "mes.friends.userslogan"), t_rFriend.slogan)
  if (t_rFriend.online) {
  var t_bAccessible = t_rFriend.locationAccessible;
  var t_sVisitInfo = lingoBinary("joinPad", callNamed("getText", "mes.friends.visitinfo.online"), t_rFriend.usersRoom);
  } else {
  t_bAccessible = 0;
  t_sVisitInfo = lingoBinary("joinPad", callNamed("getText", "mes.friends.visitinfo.offline"), t_rFriend.lastAccessTime);
  }

  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "mes.friends.visitinfo"), t_sVisitInfo)
  if (t_bAccessible) {
  callMethod("setButtonState", _me, "mes.sameroom.button", 1)
  } else {
  callMethod("setButtonState", _me, "mes.sameroom.button", 0)
  }

}

