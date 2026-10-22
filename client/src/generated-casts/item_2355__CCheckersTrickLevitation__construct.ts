// item_2355.cct / CCheckersTrickLevitation / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iCurFrame", 0);
  setMeProp(_me, "m_iLastFrame", 40);
  setMeProp(_me, "m_ar_rSprites", new LingoList([]));
  callMethod("add", meProp(_me, "m_ar_rSprites"), callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _this))))
  callMethod("add", meProp(_me, "m_ar_rSprites"), callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _this))))
  setMeProp(_me, "m_bRingAssigned", 0);
  callNamed("receivePrepare", callMethod("getID", _this))
}

