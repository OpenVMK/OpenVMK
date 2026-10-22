// d0e535313898676eb605277339b50f27.cct / CClothesThumbHandler / GetThumbnails

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetThumbnails(_me: LingoMe, a_mp_ItemList: LingoValue, a_rCallback: LingoValue) {
  var t_Obj = callNamed("createObject", callNamed("getUniqueID"), "CClothesPreviewRenderer");
  callMethod("Define", t_Obj, a_mp_ItemList, a_rCallback, "Thumb")
}

