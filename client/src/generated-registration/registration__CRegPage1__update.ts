// registration.cct / CRegPage1 / update

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  setMeProp(_me, "m_ar_AvatarData", a_mp_kType_mp_iRef_rItem);
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  switch (a_kAlteredCategory) {
case "AvailableSets":
  callMethod("parseAvailableSets", _this)
  if (lingoBinary("gt", callMethod("findPos", meProp(_me, "m_ar_AvatarData"), "GuestRoomList"), 0)) {
  setMeProp(_me, "m_ar_RoomList", meProp(_me, "m_ar_AvatarData")["GuestRoomList"]);
  callMethod("ChangeRoomSelection", _this, 1)
  }

  break;
case "ChangeAvatar":
  callMethod("ParseFigure", _this, meProp(_me, "m_ar_AvatarData")["ChangeAvatar"])
  break;
case "AvatarData":
  callMethod("ParseMyAvatar", _this, meProp(_me, "m_ar_AvatarData")["AvatarData"])
  break;
case "GuestRoomList":
  setMeProp(_me, "m_ar_RoomList", meProp(_me, "m_ar_AvatarData")["GuestRoomList"]);
  callMethod("ChangeRoomSelection", _this, 1)
  break;
case "AvatarCreated":
  setMeProp(_me, "m_bDataGathered", 1);
  break;
case "AvatarNames":
  callMethod("_SuggestNames", _this)
  break;
case "GeneratedNames":
  callMethod("_PopulateNameList", _this, meProp(_me, "m_ar_AvatarData")["GeneratedNames"])
  break;
  default:
  callMethod("parseAvailableSets", _this)
  }

  }

}

