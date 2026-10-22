// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAvatarProfile / CloseProfile

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CloseProfile(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rControls"))) {
  callNamed("removeWindow", callMethod("getID", meProp(_me, "m_rControls")))
  setMeProp(_me, "m_rControls", undefined);
  }

}

