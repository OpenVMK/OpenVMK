// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  setMeProp(_me, "m_arPartList", new LingoList([]));
  var pShadowSpr = undefined;
  var pMatteSpr = undefined;
  var pSprite = undefined;
  var t_mpDelays = new LingoPropList([]);
  t_mpDelays = _me.delays;
  for (var g = 1; g <= t_mpDelays.count; ++g) {
  callMethod("cancel", _me, callMethod("getPropAt", t_mpDelays, g))
  }

  setMeProp(_me, "m_iMyRef", undefined);
  setMeProp(_me, "m_ObjAvatar", undefined);
  var m_sStatusLeftHand = undefined;
  var m_sStatusRightHand = undefined;
  var m_iItemLeftHand = undefined;
  var m_iItemRightHand = undefined;
  return 1;
}

