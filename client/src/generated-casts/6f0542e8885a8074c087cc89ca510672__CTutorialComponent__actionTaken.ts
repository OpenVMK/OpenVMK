// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialComponent / actionTaken

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function actionTaken(_me: LingoMe, t_ID: LingoValue) {
  if (lingoBinary("gt", callMethod("getOne", meProp(_me, "m_pTakenActions"), t_ID), 0)) {
  return 1;
  } else {
  return 0;
  }

}

