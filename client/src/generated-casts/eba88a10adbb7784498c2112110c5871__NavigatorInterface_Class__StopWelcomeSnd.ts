// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / StopWelcomeSnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopWelcomeSnd(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_objSnd"))) {
  callMethod("StopSound", meProp(_me, "m_objSnd"))
  callNamed("removeObject", meProp(_me, "m_objSnd"))
  setMeProp(_me, "m_objSnd", undefined);
  }

}

