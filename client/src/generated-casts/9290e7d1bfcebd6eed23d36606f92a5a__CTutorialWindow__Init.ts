// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CTutorialWindow / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, t_iClientID: LingoValue, t_sDialogTitle: LingoValue, t_iType: LingoValue, t_bModal: LingoValue) {
  setMeProp(_me, "m_iClientID", t_iClientID);
  setMeProp(_me, "m_sTutorialTitle", t_sDialogTitle);
  setMeProp(_me, "m_sWindowTitle", lingoBinary("join", meProp(_me, "m_sTutorialTitle"), "_window"));
  if ((lingoTruthy(callNamed("voidp", t_iType)) ? 0 : 1)) {
  setMeProp(_me, "m_iType", callNamed("max", callNamed("min", 3, t_iType), 1));
  }

  if ((lingoTruthy(callNamed("voidp", t_bModal)) ? 0 : 1)) {
  setMeProp(_me, "m_bModal", t_bModal);
  }

  switch (meProp(_me, "m_iType")) {
case 1:
  break;
case 2:
  break;
case 3:
  break;
case 4:
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Tutorial Window: unknow type", meProp(_me, "m_iType")))
  }

}

