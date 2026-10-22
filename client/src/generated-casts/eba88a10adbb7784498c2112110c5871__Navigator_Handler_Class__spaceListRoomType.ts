// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / spaceListRoomType

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function spaceListRoomType(_me: LingoMe, tMsg: LingoValue) {
  var t_iRoomCode = callMethod("GetIntFrom", tMsg.connection);
  var t_iNodeCount = callMethod("GetIntFrom", tMsg.connection);
  var t_mp_SpaceList = new LingoPropList([]);
  if (lingoBinary("gt", t_iNodeCount, 0)) {
  for (var i = 1; i <= t_iNodeCount; ++i) {
  var t_iID = callMethod("GetIntFrom", tMsg.connection);
  var t_sName = callMethod("GetStrFrom", tMsg.connection);
  var t_sOwner = callMethod("GetStrFrom", tMsg.connection);
  var t_sDesc = callMethod("GetStrFrom", tMsg.connection);
  var t_bFriendsOnly = callMethod("GetIntFrom", tMsg.connection);
  var t_bAccesFromNavi = callMethod("GetIntFrom", tMsg.connection);
  var t_iUserCount = callMethod("GetIntFrom", tMsg.connection);
  var t_iMaxUsers = callMethod("GetIntFrom", tMsg.connection);
  t_mp_SpaceList[lingoBinary("join", t_sName, callNamed("getUniqueID"))] = new LingoPropList(["ID", t_iID, "Name", t_sName, "Owner", t_sOwner, "Description", t_sDesc, "friendOnly", t_bFriendsOnly, "AccesFromNavi", t_bAccesFromNavi, "UserCount", t_iUserCount, "MaxUsers", t_iMaxUsers]);
  }

  }

  var tThemedGuestRoomNavigator = callMethod("GetThemedGuestRoomNavigator", callMethod("getInterface", _me));
  if (callNamed("voidp", tThemedGuestRoomNavigator)) {
  callMethod("startThemedGuestRoomNavigator", callMethod("getInterface", _me))
  tThemedGuestRoomNavigator = callMethod("GetThemedGuestRoomNavigator", callMethod("getInterface", _me));
  }

  if ((lingoTruthy(callMethod("IsVisible", tThemedGuestRoomNavigator)) ? 0 : 1)) {
  callMethod("showHide", tThemedGuestRoomNavigator)
  }

  callMethod("SetRoom", tThemedGuestRoomNavigator, t_iRoomCode)
  callMethod("createComponentWindow", tThemedGuestRoomNavigator, t_mp_SpaceList)
}

