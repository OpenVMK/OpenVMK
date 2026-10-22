// core.old.cct / CWindowDropDown / mouseUp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseUp(_me: LingoMe) {
  if (lingoBinary("lt", _me.pSprite.blend, 100)) {
  return 0;
  }

  if (lingoBinary("eq", meProp(_me, "pClickPass"), 0)) {
  return 0;
  }

  setMeProp(_me, "pClickPass", 0);
  setMeProp(_me, "pState", symbol("close"));
  setMeProp(_me, "pLastRollOver", undefined);
  if (lingoBinary("and", lingoBinary("gt", meProp(_me, "pRollOverItem"), 0), lingoBinary("lte", meProp(_me, "pRollOverItem"), meProp(_me, "pNumberOfMenuItems")))) {
  setMeProp(_me, "pSelectedItemNum", meProp(_me, "pRollOverItem"));
  setMeProp(_me, "pDropActiveBtnImg", callMethod("createDropImg", _me, new LingoList([meProp(_me, "pMenuItems")[meProp(_me, "pSelectedItemNum")]]), 0, symbol("up")));
  setThePropOf(_me, "pImage", meProp(_me, "pDropActiveBtnImg"));
  setThePropOf(_me.pSprite, "loc", meProp(_me, "pLoc"));
  callMethod("render", _me)
  callNamed("updateStage")
  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pTextKeys")[meProp(_me, "pSelectedItemNum")]))) {
  return meProp(_me, "pTextKeys")[meProp(_me, "pSelectedItemNum")];
  }

  }

}

