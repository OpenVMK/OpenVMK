// 239fb1d2675fc448140198b03238814c.cct / CMainComponent / _GetMixedPreview

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _GetMixedPreview(_me: LingoMe, _this: LingoValue, a_mp_iType_rOutput: LingoValue, a_rCallback: LingoValue) {
  callMethod("LoadImageAssets", callNamed("createObject", callNamed("getUniqueID"), "CMixedThumbRendererDelegate"), a_mp_iType_rOutput, a_rCallback, "Preview")
}

