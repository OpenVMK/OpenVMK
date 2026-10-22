// registration.cct / CRegPage1 / ChangeRoomSelection

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ChangeRoomSelection(_me: LingoMe, _this: LingoValue, a_iDir: LingoValue) {
  if (callNamed("listp", meProp(_me, "m_ar_RoomList"))) {
  var t_iListCount = meProp(_me, "m_ar_RoomList").count;
  setMeProp(_me, "m_iSelectedRoom", lingoBinary("add", meProp(_me, "m_iSelectedRoom"), a_iDir));
  switch (1) {
case lingoBinary("gt", meProp(_me, "m_iSelectedRoom"), t_iListCount):
  setMeProp(_me, "m_iSelectedRoom", 1);
  break;
case lingoBinary("eq", meProp(_me, "m_iSelectedRoom"), 0):
  setMeProp(_me, "m_iSelectedRoom", t_iListCount);
  break;
  }

  setMeProp(_me, "m_iSelectedRoomId", meProp(_me, "m_ar_RoomList")[meProp(_me, "m_iSelectedRoom")]);
  var t_sMemName = lingoBinary("join", "reg.roomstyle.", meProp(_me, "m_iSelectedRoomId"));
  if (callNamed("memberExists", t_sMemName)) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.roomstyle"), callNamed("getMember", t_sMemName).image)
  } else {
  callNamed("put", lingoBinary("joinPad", "Missing :", t_sMemName))
  }

  var t_sTxt = callNamed("getText", lingoBinary("join", lingoBinary("join", "ROOM.", meProp(_me, "m_iSelectedRoomId")), ".NAME"));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.roomstyle.hd"), t_sTxt)
  }

}

