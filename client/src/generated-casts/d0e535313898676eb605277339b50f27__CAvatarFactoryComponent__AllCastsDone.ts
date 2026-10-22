// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryComponent / AllCastsDone

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AllCastsDone(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_objFigureSetLoader", callNamed("createObject", "figsetLoader", "CAvatarFigureSetLoader"));
  callNamed("createTimeout", "AvatarSetTimer", 600, symbol("DumpSetlists"), callMethod("getID", _this), undefined, 0)
}

