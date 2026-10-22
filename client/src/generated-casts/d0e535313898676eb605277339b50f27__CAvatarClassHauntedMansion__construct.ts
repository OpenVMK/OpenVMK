// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_iCanvasHeight", callNamed("getVariable", "avatarHeight", 160));
  setMeProp(_me, "m_iCanvasWidth", callNamed("getVariable", "avatarWidth", 80));
  setMeProp(_me, "m_arPartList", new LingoList([]));
  setMeProp(_me, "m_mpPartIndex", new LingoPropList([]));
  setMeProp(_me, "m_arFlipList", new LingoList([0, 1, 2, 3, 4, 3, 2, 1]));
  setMeProp(_me, "pUpdateRect", callNamed("rect", 0, 0, 0, 0));
  setMeProp(_me, "m_iAnimCounter", 0);
  setMeProp(_me, "m_bEyesClosed", 0);
  setMeProp(_me, "m_iSync", 1);
  setMeProp(_me, "m_bChanges", 1);
  setMeProp(_me, "m_imgBuffer", callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32));
  setMeProp(_me, "m_rAlpha", callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 8, symbol("grayscale")));
  setMeProp(_me, "m_bFlipped", 0);
  setMeProp(_me, "m_bActMv", 0);
  setMeProp(_me, "m_bActSit", 0);
  setMeProp(_me, "m_bActTlk", 0);
  setMeProp(_me, "m_bActCrr", 0);
  var m_bActDnc = 0;
  setMeProp(_me, "m_bActEat", 0);
  var m_bActWav = 0;
  setMeProp(_me, "m_bAnimating", 0);
  setMeProp(_me, "m_sCurrentAnim", "");
  setMeProp(_me, "m_iLoc", undefined);
  var m_sStatusLeftHand = undefined;
  var m_sStatusRightHand = undefined;
  var m_iItemLeftHand = undefined;
  var m_iItemRightHand = undefined;
  setMeProp(_me, "m_sStatusLegs", undefined);
  setMeProp(_me, "m_iPulseCounter", 1);
  var m_iAnimCounter2 = 0;
  var m_iPulseCounter2 = 0;
  setMeProp(_me, "m_iMyRef", undefined);
  setMeProp(_me, "m_ObjAvatar", undefined);
  var m_iEmoticon = 0;
  var m_iPrevEmoticon = 0;
  return 1;
}

