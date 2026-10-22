// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / navigationNodeInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function navigationNodeInfo(_me: LingoMe, tMsg: LingoValue) {
  var t_mp_NodeInfo = new LingoPropList([]);
  t_mp_NodeInfo[symbol("nodetag")] = callMethod("GetIntFrom", tMsg.connection);
  t_mp_NodeInfo[symbol("parentnodetag")] = callMethod("GetIntFrom", tMsg.connection);
  t_mp_NodeInfo[symbol("absolutenodeusercount")] = callMethod("GetIntFrom", tMsg.connection);
  var t_bInstanceInfoIncluded = callMethod("GetIntFrom", tMsg.connection);
  var t_iSpaceCount = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_SpaceInfo = new LingoList([]);
  if (lingoBinary("gt", t_iSpaceCount, 0)) {
  for (var i = 1; i <= t_iSpaceCount; ++i) {
  var t_bPublicSpace = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_SpaceList = new LingoPropList([]);
  if (t_bPublicSpace) {
  t_ar_SpaceList[symbol("roomtype")] = "public";
  t_ar_SpaceList[symbol("spaceid")] = callMethod("GetIntFrom", tMsg.connection);
  t_ar_SpaceList[symbol("tag")] = callMethod("GetIntFrom", tMsg.connection);
  } else {
  t_ar_SpaceList[symbol("roomtype")] = "private";
  t_ar_SpaceList[symbol("spaceid")] = callMethod("GetIntFrom", tMsg.connection);
  t_ar_SpaceList[symbol("roomName")] = callMethod("GetStrFrom", tMsg.connection);
  t_ar_SpaceList[symbol("owner")] = callMethod("GetStrFrom", tMsg.connection);
  t_ar_SpaceList[symbol("description")] = callMethod("GetStrFrom", tMsg.connection);
  t_ar_SpaceList[symbol("friendonly")] = callMethod("GetIntFrom", tMsg.connection);
  t_ar_SpaceList[symbol("accesfromnavi")] = callMethod("GetIntFrom", tMsg.connection);
  t_ar_SpaceList[symbol("absoluteusercount")] = callMethod("GetIntFrom", tMsg.connection);
  t_ar_SpaceList[symbol("maxusers")] = callMethod("GetIntFrom", tMsg.connection);
  }

  if (t_bInstanceInfoIncluded) {
  var t_iMaxUsers = callMethod("GetIntFrom", tMsg.connection);
  var t_iInstanceCount = callMethod("GetIntFrom", tMsg.connection);
  if (lingoBinary("gt", t_iInstanceCount, 0)) {
  callMethod("addProp", t_ar_SpaceList, symbol("instances"), new LingoList([]))
  for (var g = 1; g <= t_iInstanceCount; ++g) {
  var t_mp_list = new LingoPropList([]);
  callMethod("addProp", t_mp_list, symbol("instanceID"), callMethod("GetIntFrom", tMsg.connection))
  var t_iUserCount = callMethod("GetIntFrom", tMsg.connection);
  var t_iPercent = lingoBinary("div", lingoBinary("mul", t_iUserCount, 100), t_iMaxUsers);
  callMethod("addProp", t_mp_list, symbol("instanusercount"), t_iUserCount)
  callMethod("addProp", t_mp_list, symbol("instanmaxusers"), t_iMaxUsers)
  callMethod("addProp", t_mp_list, symbol("instanuserpercent"), t_iPercent)
  callMethod("add", t_ar_SpaceList.instances, t_mp_list)
  }

  }

  }

  callMethod("add", t_ar_SpaceInfo, t_ar_SpaceList)
  }

  }

  t_mp_NodeInfo[symbol("spaces")] = t_ar_SpaceInfo;
  var t_iChildNodeCount = callMethod("GetIntFrom", tMsg.connection);
  if (lingoBinary("gt", t_iChildNodeCount, 0)) {
  var t_ar_ChildInfo = new LingoList([]);
  for (var h = 1; h <= t_iChildNodeCount; ++h) {
  var t_mp_ChildInfo = new LingoPropList([]);
  callMethod("addProp", t_mp_ChildInfo, symbol("childtag"), callMethod("GetIntFrom", tMsg.connection))
  callMethod("addProp", t_mp_ChildInfo, symbol("childabsoluteusercount"), callMethod("GetIntFrom", tMsg.connection))
  callMethod("add", t_ar_ChildInfo, t_mp_ChildInfo)
  }

  }

  t_mp_NodeInfo[symbol("children")] = t_ar_ChildInfo;
  callMethod("CreateNavigator", callMethod("getComponent", _me), t_mp_NodeInfo)
}

