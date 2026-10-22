// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / spaceListSearch

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function spaceListSearch(_me: LingoMe, tMsg: LingoValue) {
  var t_iNodeCount = callMethod("GetIntFrom", tMsg.connection);
  if (lingoBinary("eq", t_iNodeCount, 0)) {
  return callMethod("NoResults", _me);
  }

  var t_mp_SpaceList = new LingoPropList([]);
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

  var tGuestRoomNavigator = callMethod("GetGuestRoomNavigator", callMethod("getInterface", _me));
  if ((lingoTruthy(callNamed("voidp", tGuestRoomNavigator)) ? 0 : 1)) {
  callMethod("createComponentWindow", tGuestRoomNavigator, t_mp_SpaceList)
  }

}

