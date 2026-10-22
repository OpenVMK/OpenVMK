// 239fb1d2675fc448140198b03238814c.cct / CCustomLoadingScreenConfiguration / PullConfigurationSequential

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PullConfigurationSequential(_me: LingoMe, _this: LingoValue) {
  var t_sURL = callMethod("GetNewUrl", _this);
  callMethod("pullFromUrl", _this, t_sURL)
}

