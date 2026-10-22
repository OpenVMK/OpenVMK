// core.old.cct / CWindow / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "pTitle", callMethod("getID", _this));
  setMeProp(_me, "pLocX", 0);
  setMeProp(_me, "pLocY", 0);
  setMeProp(_me, "pLocZ", 0);
  setMeProp(_me, "pwidth", 0);
  setMeProp(_me, "pheight", 0);
  setMeProp(_me, "pVisible", 1);
  setMeProp(_me, "pActive", 0);
  setMeProp(_me, "pLock", 0);
  setMeProp(_me, "pModal", 0);
  setMeProp(_me, "pSpriteList", new LingoPropList([]));
  setMeProp(_me, "pScaleFlagH", 0);
  setMeProp(_me, "pScaleFlagV", 0);
  setMeProp(_me, "pDragFlag", 0);
  setMeProp(_me, "pDragOffset", new LingoList([0, 0]));
  setMeProp(_me, "pBoundary", lingoBinary("add", callNamed("rect", 0, 0, theProperty("stage").rect.width, theProperty("stage").rect.height), new LingoList([-float(20), -float(20), 20, 20])));
  setMeProp(_me, "pClientID", undefined);
  setMeProp(_me, "pMemberList", new LingoPropList([]));
  setMeProp(_me, "pElemList", new LingoPropList([]));
  setMeProp(_me, "pGroupData", new LingoList([]));
  setMeProp(_me, "pClientRect", new LingoList([0, 0, 0, 0]));
  setMeProp(_me, "pSpecialIDList", new LingoList(["drag", "close", "scale", "scaleh", "scalev"]));
  setMeProp(_me, "pProcedures", callMethod("createProcListTemplate", _this));
  return 1;
}

