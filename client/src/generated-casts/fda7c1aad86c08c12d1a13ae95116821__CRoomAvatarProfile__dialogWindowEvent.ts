// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAvatarProfile / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, a_sDialog: LingoValue, a_kEvent: LingoValue) {
  switch (a_sDialog) {
case "RoomProfileKickUser":
  if (lingoBinary("eq", a_kEvent, symbol("dialogOK"))) {
  if (callNamed("objectp", meProp(_me, "m_rSelected"))) {
  callMethod("send", callNamed("getConnection", "VMK"), "KickUser", new LingoPropList([symbol("int"), callNamed("integer", callMethod("GetParam", meProp(_me, "m_rSelected"), "REF"))]))
  }

  callNamed("removeDialogWindow", "RoomProfileKickUser")
  } else {
  if (lingoBinary("eq", a_kEvent, "help")) {
  callNamed("executeMessage", symbol("open_help_page"), "help.messaging.friends")
  }

  }

  break;
case "RoomProfileIgnoreUser":
  if (lingoBinary("eq", a_kEvent, symbol("dialogOK"))) {
  if (callNamed("objectp", meProp(_me, "m_rSelected"))) {
  callMethod("send", callNamed("getConnection", "VMK"), "IgnoreUser", new LingoPropList([symbol("int"), callNamed("integer", callMethod("GetParam", meProp(_me, "m_rSelected"), "REF"))]))
  }

  callNamed("removeDialogWindow", "RoomProfileIgnoreUser")
  } else {
  if (lingoBinary("eq", a_kEvent, "help")) {
  callNamed("executeMessage", symbol("open_help_page"), "help.messaging.friends")
  }

  }

  break;
case "RoomProfileAskFriend":
  if (lingoBinary("eq", a_kEvent, symbol("dialogOK"))) {
  if (callNamed("objectp", meProp(_me, "m_rSelected"))) {
  callMethod("send", callNamed("getConnection", "VMK"), "AskToBeFriend", new LingoPropList([symbol("str"), callMethod("GetParam", meProp(_me, "m_rSelected"), "NAME")]))
  }

  callNamed("removeDialogWindow", "RoomProfileAskFriend")
  } else {
  if (lingoBinary("eq", a_kEvent, "help")) {
  callNamed("executeMessage", symbol("open_help_page"), "help.messaging.guide")
  }

  }

  break;
  }

}

