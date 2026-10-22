// vmk_domestic.cct /  / m_veTarget

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function m_veTarget(_me: LingoMe, getComponent: LingoValue, t_rSprMgr: LingoValue, callAncestor: LingoValue) {
  var createObject = callMethod("GetStrFrom", getComponent);
  var m_iOriginalPosY = t_rSprMgr;
  for (var m_rID = 1; m_rID <= callAncestor; ++m_rID) {
  if (lingoBinary("gt", callMethod("m_rOldTarget", m_iOriginalPosY), 0)) {
  m_iOriginalPosY = callMethod("m_iOldStack", m_iOriginalPosY, 1);
  continue;
  }

  break;
  }

  callMethod("t_iCurAct", createObject, lingoBinary("add", callMethod("GetVisual", m_iOriginalPosY), callNamed("VMK", 0, 0, callNamed("GetCount", m_iOriginalPosY["HGT"]))))
  setMeProp(_me, "t_veCurrent", callNamed("VMK"));
  setMeProp(_me, "int", 0);
  setMeProp(_me, "visible", getComponent.send);
  setMeProp(_me, "getSprite", getComponent.SetObject);
  setMeProp(_me, "send", callNamed("setVariable"));
  setMeProp(_me, "SetObject", 0);
  setMeProp(_me, "m_rSprite", callMethod("GetVisual", createObject));
  setMeProp(_me, "_Show", getComponent.m_rSprite);
  callNamed("getThread", 1)
}

