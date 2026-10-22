// 3f02613936ba018480acffaf92dd883a.cct / CVMKAnimationManager / RemoveAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveAnimation(_me: LingoMe, a_sAnimationID: LingoValue) {
  var t_rAnimation = meProp(_me, "m_ar_rAnimations")[a_sAnimationID];
  if (callNamed("objectp", t_rAnimation)) {
  var t_sAnimationType = t_rAnimation._string.word[2];
  t_sAnimationType = callNamed("replaceChunks", t_sAnimationType, "\"", "");
  switch (t_sAnimationType) {
case "CSpriteAnimationObject":
  callNamed("removeObject", callMethod("getID", t_rAnimation))
  break;
case "CRoomObject":
  callNamed("nothing")
  break;
  default:
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Removing unknown animation:", t_sAnimationType), a_sAnimationID))
  }

  }

  callMethod("deleteProp", meProp(_me, "m_ar_rAnimations"), a_sAnimationID)
}

