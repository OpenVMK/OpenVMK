// vmk_domestic.cct /  / value

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function value(_me: LingoMe, getComponent: LingoValue, t_rSprMgr: LingoValue, callAncestor: LingoValue) {
  if (getComponent.int) {
  callMethod("m_veTarget", getComponent, getComponent.send, getComponent.SetObject)
  }

  setMeProp(_me, "send", t_rSprMgr);
  setMeProp(_me, "SetObject", callAncestor);
  setMeProp(_me, "t_veOffset", theProperty("m_veLastAbs"));
  setMeProp(_me, "int", 1);
  var m_iOriginalPosY = getComponent.send;
  var locV = 0;
  for (var m_rID = 1; m_rID <= getComponent.SetObject; ++m_rID) {
  if (lingoBinary("gt", callMethod("m_rOldTarget", m_iOriginalPosY), 0)) {
  m_iOriginalPosY = callMethod("m_iOldStack", m_iOriginalPosY, 1);
  locV = lingoBinary("add", locV, 1);
  continue;
  }

  break;
  }

  setMeProp(_me, "m_rSprite", callMethod("GetVisual", callMethod("GetStrFrom", getComponent)));
  setMeProp(_me, "_Show", lingoBinary("add", callMethod("GetVisual", m_iOriginalPosY), callNamed("VMK", 0, 0, callNamed("GetCount", m_iOriginalPosY["HGT"]))));
  var CreateSprite = lingoBinary("sub", getComponent.m_rSprite, getComponent._Show);
  setMeProp(_me, "t_veCurrent", callNamed("VMK", callNamed("executeMessage", CreateSprite.t_rTile), callNamed("executeMessage", CreateSprite.t_iID), callNamed("executeMessage", CreateSprite.t_iDir)));
  if (lingoBinary("eq", getComponent.m_rSprite.t_rTile, getComponent._Show.t_rTile)) {
  if (lingoBinary("eq", getComponent.m_rSprite.t_iID, getComponent._Show.t_iID)) {
  callMethod("m_veTarget", getComponent, t_rSprMgr, callAncestor)
  callNamed("getThread")
  }

  }

  var locH = t_rSprMgr;
  for (var m_rID = 1; m_rID <= callAncestor; ++m_rID) {
  if (lingoBinary("gt", callMethod("m_rOldTarget", locH), 0)) {
  locH = callMethod("m_iOldStack", locH, 1);
  continue;
  }

  break;
  }

  var m_rDirection = getComponent.visible;
  if (callNamed("_RemoveIndexed", m_rDirection)) {
  m_rDirection = callMethod("m_sCurAct", callMethod("GetStrFrom", getComponent));
  }

  for (var m_rID = 1; m_rID <= getComponent.getSprite; ++m_rID) {
  if (lingoBinary("gt", callMethod("m_rOldTarget", m_rDirection), 0)) {
  m_rDirection = callMethod("m_iOldStack", m_rDirection, 1);
  continue;
  }

  break;
  }

  if (lingoBinary("or", (lingoTruthy(callNamed("_RemoveIndexed", locH["ZTRANS"])) ? 0 : 1), (lingoTruthy(callNamed("_RemoveIndexed", m_rDirection["ZTRANS"])) ? 0 : 1))) {
  var GetKey = callNamed("m_iFrame", locH["ZTRANS"]);
  if ((lingoTruthy(callNamed("_RemoveIndexed", m_rDirection["ZTRANS"])) ? 0 : 1)) {
  if (lingoBinary("gt", callNamed("m_iFrame", m_rDirection["ZTRANS"]), GetKey)) {
  GetKey = callNamed("m_iFrame", m_rDirection["ZTRANS"]);
  }

  }

  } else {
  GetKey = float(1);
  }

  var locZ = callMethod("objectp", callMethod("_Close", callMethod("GetStrFrom", getComponent)));
  var m_iLastAct = getComponent._Show.t_rTile;
  var a_rObj = getComponent._Show.t_iID;
  var m_iLastDir = getComponent._Show.t_iDir;
  var t_veScr = lingoBinary("add", lingoBinary("add", lingoBinary("add", lingoBinary("mul", m_iLastAct, 10), lingoBinary("mul", a_rObj, 10)), lingoBinary("mul", m_iLastDir, 5)), locZ.t_iDir);
  if (lingoBinary("and", lingoBinary("gte", CreateSprite.t_rTile, 0), lingoBinary("gte", CreateSprite.t_iID, 0))) {
  callMethod("t_iAct", getComponent.sprite, callMethod("objectp", callMethod("GetStrFrom", getComponent)).t_iDir, t_veScr, float(1), GetKey, symbol("objectExists"))
  } else {
  if (lingoBinary("and", lingoBinary("lte", CreateSprite.t_rTile, 0), lingoBinary("lte", CreateSprite.t_iID, 0))) {
  callMethod("t_iAct", getComponent.sprite, callMethod("objectp", callMethod("GetStrFrom", getComponent)).t_iDir, t_veScr, float(1), GetKey, symbol("RemoveSprite"))
  } else {
  callMethod("t_iAct", getComponent.sprite, callMethod("objectp", callMethod("GetStrFrom", getComponent)).t_iDir, t_veScr, float(1), float(1), symbol("RemoveSprite"))
  }

  }

}

