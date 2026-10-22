// vmk_domestic.cct / CDomesticHandler / handle_createpet

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_createpet(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  var tCon = tMsg.connection;
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  var t_iID = callMethod("GetIntFrom", tCon);
  var t_iType = callMethod("GetIntFrom", tCon);
  var t_iDir = callMethod("GetIntFrom", tCon);
  var t_sName = callMethod("GetStrFrom", tCon);
  var t_iTile = callMethod("GetIntFrom", tCon);
  var t_iAct = callMethod("GetIntFrom", tCon);
  var tXml = _this.m_rXMLDomestic;
  callMethod("SetParam", tXml, "REF", callNamed("string", t_iID))
  callMethod("SetParam", tXml, "NAME", t_sName)
  callMethod("SetParam", tXml, "TYPE", callNamed("string", t_iType))
  callMethod("SetParam", tXml, "DIR", callNamed("string", t_iDir))
  callMethod("SetParam", tXml, "ACT", callNamed("string", t_iAct))
  if (callMethod("_CreateIndexed", t_rContext, t_iID, "domestic", tXml)) {
  var t_rObj = callMethod("_AccessIndexed", t_rContext, t_iID, "domestic");
  callMethod("CreateSprites", callMethod("GetVisual", t_rObj))
  var t_rTile = callMethod("_AccessIndexed", t_rContext, t_iTile, "tile");
  if (callNamed("objectp", t_rTile)) {
  var t_iStack = 0;
  var t_rCopy = t_rTile;
  while (1) {
  if (lingoBinary("gt", callMethod("GetCount", t_rCopy), 0)) {
  t_rCopy = t_rCopy[1];
  t_iStack = lingoBinary("add", t_iStack, 1);
  continue;
  }

  break;
  }

  callMethod("SetToTileStack", callMethod("GetFactor", t_rObj), t_rTile, t_iStack)
  }

  }

}

