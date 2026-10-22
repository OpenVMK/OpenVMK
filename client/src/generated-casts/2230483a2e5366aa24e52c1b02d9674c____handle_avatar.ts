// 2230483a2e5366aa24e52c1b02d9674c.cct /  / handle_avatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_avatar(_me: LingoMe, tMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  callNamed("trace", "handle_avatar")
  var mez = callNamed("getObject", symbol("room_handler"));
  var t_rLoader = callNamed("getObject", symbol("AvatarClothAssetManager"));
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", mez));
  var tID = callMethod("GetIntFrom", tMsg.connection);
  var tSex = callMethod("GetIntFrom", tMsg.connection);
  var tName = callMethod("GetStrFrom", tMsg.connection);
  var tMission = callMethod("GetStrFrom", tMsg.connection);
  var tTile = callMethod("GetIntFrom", tMsg.connection);
  var tTileStack = callMethod("GetIntFrom", tMsg.connection);
  callMethod("SetParam", mez.m_rXMLAvatar, "REF", callNamed("string", tID))
  callMethod("SetParam", mez.m_rXMLAvatar, "NAME", tName)
  callMethod("SetParam", mez.m_rXMLAvatar, "SEX", callNamed("string", tSex))
  callMethod("SetParam", mez.m_rXMLAvatar, "DESC", tMission)
  callNamed("trace", "pre if")
  if (callMethod("_CreateIndexed", t_rContext, tID, "avatar", mez.m_rXMLAvatar)) {
  callNamed("trace", ">> Avatar Created")
  var t_rAvatar = callMethod("_AccessIndexed", t_rContext, tID, "avatar");
  callNamed("trace", "badge")
  var iBadgeCount = callMethod("GetIntFrom", tMsg.connection);
  for (var i = 1; i <= iBadgeCount; ++i) {
  callMethod("SetParam", t_rAvatar, lingoBinary("join", "icon.type.", i), callMethod("GetIntFrom", tMsg.connection))
  }

  var iPinCount = callMethod("GetIntFrom", tMsg.connection);
  for (var i = 1; i <= iPinCount; ++i) {
  callMethod("SetParam", t_rAvatar, lingoBinary("join", "pin.singleuse.", i), callMethod("GetIntFrom", tMsg.connection))
  callMethod("SetParam", t_rAvatar, lingoBinary("join", "pin.type.", i), callMethod("GetIntFrom", tMsg.connection))
  callMethod("SetParam", t_rAvatar, lingoBinary("join", "pin.level.", i), callMethod("GetIntFrom", tMsg.connection))
  }

  callNamed("trace", "figure")
  var t_aFigure = new LingoList([]);
  for (var i = 1; i <= 12; ++i) {
  t_aFigure[i] = callMethod("GetIntFrom", tMsg.connection);
  }

  var t_aActions = new LingoList([]);
  for (var i = 1; i <= 12; ++i) {
  t_aActions[i] = callMethod("GetIntFrom", tMsg.connection);
  }

  callNamed("trace", "t_rTransfer")
  var t_rTransfer = callNamed("propList", symbol("input"), t_aFigure, symbol("Output"), callMethod("GetRenderer", callMethod("GetVisual", t_rAvatar)), symbol("avatar"), t_rAvatar);
  setThePropOf(t_rTransfer, "input", t_aFigure);
  callNamed("executeMessage", "CreateAvatar", t_rTransfer)
  callNamed("trace", "postExecute")
  if (callNamed("objectp", t_rTransfer.Output)) {
  callNamed("trace", "setremderer")
  callMethod("SetRenderer", callMethod("GetVisual", t_rAvatar), t_rTransfer.Output)
  callNamed("trace", "settotilestack")
  if (callMethod("SetToTileStack", callMethod("GetFactor", t_rAvatar), callMethod("_AccessIndexed", t_rContext, tTile, "tile"), tTileStack)) {
  callNamed("trace", "setoutlook")
  callMethod("SetOutlook", callMethod("GetVisual", t_rAvatar), new LingoList([]))
  }

  callNamed("trace", "actions")
  callMethod("Actions", callMethod("GetVisual", t_rAvatar), t_aActions)
  for (var i = 1; i <= 12; ++i) {
  if (lingoBinary("mod", i, 2)) {
  callMethod("LoadCastLibsForCloth", t_rLoader, undefined, t_aFigure[i])
  }

  }

  }

  }

}

