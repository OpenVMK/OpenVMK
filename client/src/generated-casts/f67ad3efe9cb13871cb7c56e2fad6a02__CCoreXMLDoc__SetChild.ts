// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLDoc / SetChild

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetChild(_me: LingoMe, _this: LingoValue, a_sID: LingoValue, a_rNode: LingoValue) {
  callMethod("setaProp", meProp(_me, "m_rRef").child, a_sID, a_rNode)
}

