// vmk_3.dcr / CMgrObject222 / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setThePropOf(_this, "pObjectList", callNamed("propList"));
  setThePropOf(_this, "pUpdateList", new LingoList([]));
  setThePropOf(_this, "pPrepareList", new LingoList([]));
  setThePropOf(_this, "pManagerList", new LingoList([]));
  setThePropOf(_this, "pInstanceList", new LingoList([]));
  setThePropOf(_this, "pEraseLock", 0);
  setThePropOf(_this, "pTimeOut", undefined);
  setThePropOf(_this, "pUpdatePause", 0);
  setThePropOf(_this, "pBaseClsMem", callNamed("script", "CObject"));
  setThePropOf(_this, "m_bLogger", 1);
  setThePropOf(_this, "m_sLogger", "");
}

