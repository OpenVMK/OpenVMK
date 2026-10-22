// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenu / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  for (var category of meProp(_me, "helpCategories").toArray()) {
  callNamed("removeObject", callMethod("getID", category))
  }

  setMeProp(_me, "helpCategories", new LingoList([]));
  callNamed("removeObject", callMethod("getID", meProp(_me, "pContent")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "pXMLData")))
  setMeProp(_me, "pContent", undefined);
  setMeProp(_me, "pXMLData", undefined);
}

