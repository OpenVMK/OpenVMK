// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _CreateAvatars

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CreateAvatars(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rInput = a_rMsg.connection;
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", _this));
  if (callNamed("voidp", t_rContext)) {
  return callNamed("error", _this, "Room context not available!", symbol("_CreateAvatars"));
  }

  var t_iCount = callMethod("GetIntFrom", t_rInput);
  for (var i = 1; i <= t_iCount; ++i) {
  var t_sName = callMethod("GetStrFrom", t_rInput);
  var t_iSex = callMethod("GetIntFrom", t_rInput);
  var t_sDesc = callMethod("GetStrFrom", t_rInput);
  var t_ar_iFigure = new LingoList([]);
  for (var j = 1; j <= 12; ++j) {
  callMethod("append", t_ar_iFigure, callMethod("GetIntFrom", t_rInput))
  }

  var t_iPins = callMethod("GetIntFrom", t_rInput);
  var t_ar_ar_iPins = new LingoList([]);
  for (var j = 1; j <= t_iPins; ++j) {
  var t_iCode = callMethod("GetIntFrom", t_rInput);
  var t_iLevel = callMethod("GetIntFrom", t_rInput);
  var t_iSingleUse = callMethod("GetIntFrom", t_rInput);
  callMethod("add", t_ar_ar_iPins, new LingoList([t_iCode, t_iLevel, t_iSingleUse]))
  }

  var t_iIcons = callMethod("GetIntFrom", t_rInput);
  var t_ar_iIcons = new LingoList([]);
  for (var j = 1; j <= t_iIcons; ++j) {
  t_iCode = callMethod("GetIntFrom", t_rInput);
  callMethod("add", t_ar_iIcons, t_iCode)
  }

  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_iTile = callMethod("GetIntFrom", t_rInput);
  var t_iStack = callMethod("GetIntFrom", t_rInput);
  var t_ar_iActions = new LingoList([]);
  for (var j = 1; j <= 12; ++j) {
  callMethod("add", t_ar_iActions, callMethod("GetIntFrom", t_rInput))
  }

  var t_sTradeState = callNamed("string", t_ar_iActions[9]);
  var t_sFriendRequest = callNamed("string", t_ar_iActions[12]);
  var t_rObj = callMethod("_AccessIndexed", t_rContext, t_iRef, "avatar");
  if (callNamed("objectp", t_rObj)) {
  callMethod("SetParam", t_rObj, "NAME", t_sName)
  callMethod("SetParam", t_rObj, "SEX", callNamed("string", t_iSex))
  callMethod("SetParam", t_rObj, "DESC", t_sDesc)
  callMethod("SetParam", t_rObj, "TRADE", t_sTradeState)
  callMethod("SetParam", t_rObj, "FRIEND", t_sFriendRequest)
  } else {
  callMethod("SetParam", meProp(_me, "m_rXMLAvatar"), "REF", callNamed("string", t_iRef))
  callMethod("SetParam", meProp(_me, "m_rXMLAvatar"), "NAME", t_sName)
  callMethod("SetParam", meProp(_me, "m_rXMLAvatar"), "SEX", callNamed("string", t_iSex))
  callMethod("SetParam", meProp(_me, "m_rXMLAvatar"), "DESC", t_sDesc)
  callMethod("SetParam", meProp(_me, "m_rXMLAvatar"), "TRADE", t_sTradeState)
  callMethod("SetParam", meProp(_me, "m_rXMLAvatar"), "FRIEND", t_sFriendRequest)
  if (callMethod("_CreateIndexed", t_rContext, t_iRef, "avatar", meProp(_me, "m_rXMLAvatar"))) {
  t_rObj = callMethod("_AccessIndexed", t_rContext, t_iRef, "avatar");
  }

  }

  for (var j = 1; j <= t_ar_ar_iPins.count; ++j) {
  callMethod("SetParam", t_rObj, lingoBinary("join", "pin.type.", j), t_ar_ar_iPins[j][1])
  callMethod("SetParam", t_rObj, lingoBinary("join", "pin.level.", j), t_ar_ar_iPins[j][2])
  callMethod("SetParam", t_rObj, lingoBinary("join", "pin.singleuse.", j), t_ar_ar_iPins[j][3])
  }

  for (var k = j; k <= 15; ++k) {
  callMethod("RemParam", t_rObj, lingoBinary("join", "pin.type.", k))
  callMethod("RemParam", t_rObj, lingoBinary("join", "pin.level.", k))
  callMethod("RemParam", t_rObj, lingoBinary("join", "pin.singleuse.", k))
  }

  for (var j = 1; j <= t_ar_iIcons.count; ++j) {
  callMethod("SetParam", t_rObj, lingoBinary("join", "icon.type.", j), t_ar_iIcons[j])
  }

  for (var k = j; k <= 4; ++k) {
  callMethod("RemParam", t_rObj, lingoBinary("join", "icon.type.", k))
  }

  var t_rTransfer = new LingoPropList([symbol("input"), t_ar_iFigure, symbol("Output"), callMethod("GetRenderer", callMethod("GetVisual", t_rObj)), symbol("avatar"), t_rObj]);
  callNamed("executeMessage", "CreateAvatar", t_rTransfer)
  if (callNamed("objectp", t_rTransfer.Output)) {
  t_rObj = callMethod("_AccessIndexed", t_rContext, t_iRef, "avatar");
  callMethod("SetRenderer", callMethod("GetVisual", t_rObj), t_rTransfer.Output)
  callMethod("Actions", callMethod("GetVisual", t_rObj), t_ar_iActions)
  callMethod("SetOutlook", callMethod("GetVisual", t_rObj), t_ar_iFigure)
  if (lingoBinary("eq", t_iTile, -float(1))) {
  callMethod("visible", callMethod("GetVisual", t_rObj), 0, 0)
  callMethod("SetAvatarOnTile", callMethod("GetVisual", t_rObj), 0)
  }

  }

  var t_rTile = callMethod("_AccessIndexed", t_rContext, t_iTile, "tile");
  if (callNamed("objectp", t_rTile)) {
  if ((lingoTruthy(callMethod("SetToTileStack", callMethod("GetFactor", t_rObj), t_rTile, t_iStack)) ? 0 : 1)) {
  callNamed("error", _this, "Failed to set avatar into a tile!", symbol("_CreateAvatars"))
  }

  continue;
  }

  callNamed("error", _this, lingoBinary("joinPad", "Referred tile not found:", t_iTile), symbol("_CreateAvatars"))
  }

}

