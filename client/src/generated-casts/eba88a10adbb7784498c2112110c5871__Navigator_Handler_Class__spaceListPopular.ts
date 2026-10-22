// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / spaceListPopular

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function spaceListPopular(_me: LingoMe, tMsg: LingoValue) {
  var t_mp_spaceListFeat = new LingoPropList([]);
  var t_mp_SpaceList = new LingoPropList([]);
  var t_iNodeCount = callMethod("GetIntFrom", tMsg.connection);
  for (var i = 1; i <= t_iNodeCount; ++i) {
  var t_iID = callMethod("GetIntFrom", tMsg.connection);
  var t_sName = callMethod("GetStrFrom", tMsg.connection);
  var t_sOwner = callMethod("GetStrFrom", tMsg.connection);
  var t_sDesc = callMethod("GetStrFrom", tMsg.connection);
  var t_bFriendsOnly = callMethod("GetIntFrom", tMsg.connection);
  var t_bAccesFromNavi = callMethod("GetIntFrom", tMsg.connection);
  var t_iUserCount = callMethod("GetIntFrom", tMsg.connection);
  var t_iMaxUsers = callMethod("GetIntFrom", tMsg.connection);
  t_mp_spaceListFeat[lingoBinary("join", t_sName, callNamed("getUniqueID"))] = new LingoPropList(["ID", t_iID, "Name", t_sName, "Owner", t_sOwner, "Description", t_sDesc, "friendOnly", t_bFriendsOnly, "AccesFromNavi", t_bAccesFromNavi, "UserCount", t_iUserCount, "MaxUsers", t_iMaxUsers, "Featured", 1]);
  }

  t_iNodeCount = callMethod("GetIntFrom", tMsg.connection);
  for (var i = 1; i <= t_iNodeCount; ++i) {
  t_iID = callMethod("GetIntFrom", tMsg.connection);
  t_sName = callMethod("GetStrFrom", tMsg.connection);
  t_sOwner = callMethod("GetStrFrom", tMsg.connection);
  t_sDesc = callMethod("GetStrFrom", tMsg.connection);
  t_bFriendsOnly = callMethod("GetIntFrom", tMsg.connection);
  t_bAccesFromNavi = callMethod("GetIntFrom", tMsg.connection);
  t_iUserCount = callMethod("GetIntFrom", tMsg.connection);
  t_iMaxUsers = callMethod("GetIntFrom", tMsg.connection);
  t_mp_spaceListFeat[lingoBinary("join", t_sName, callNamed("getUniqueID"))] = new LingoPropList(["ID", t_iID, "Name", t_sName, "Owner", t_sOwner, "Description", t_sDesc, "friendOnly", t_bFriendsOnly, "AccesFromNavi", t_bAccesFromNavi, "UserCount", t_iUserCount, "MaxUsers", t_iMaxUsers]);
  }

  var tGuestRoomNavigator = callMethod("GetGuestRoomNavigator", callMethod("getInterface", _me));
  if ((lingoTruthy(callNamed("voidp", tGuestRoomNavigator)) ? 0 : 1)) {
  callMethod("createComponentWindowWithFeatures", tGuestRoomNavigator, t_mp_spaceListFeat, t_mp_SpaceList)
  }

}

