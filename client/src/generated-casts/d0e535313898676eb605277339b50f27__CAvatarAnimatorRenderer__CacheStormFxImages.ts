// d0e535313898676eb605277339b50f27.cct / CAvatarAnimatorRenderer / CacheStormFxImages

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CacheStormFxImages(_me: LingoMe) {
  setMeProp(_me, "m_ar_StormImgList", new LingoList([]));
  var t_iTileSize = meProp(_me, "m_iTileSize");
  for (var i = 0; i <= 7; ++i) {
  var t_dir = i;
  setMeProp(_me, "m_bFlipped", 0);
  setMeProp(_me, "m_bActMv", 0);
  setMeProp(_me, "m_bActSit", 0);
  setMeProp(_me, "m_bActTlk", 0);
  setMeProp(_me, "m_bActCrr", 0);
  setMeProp(_me, "m_bActDnc", 0);
  setMeProp(_me, "m_bActEat", 0);
  setMeProp(_me, "m_bActWav", 0);
  setMeProp(_me, "m_bAnimating", 0);
  setMeProp(_me, "m_sCurrentAnim", "");
  setMeProp(_me, "m_iTileSize", 32);
  setMeProp(_me, "m_iHeadDir", t_dir);
  setMeProp(_me, "m_iBdDir", t_dir);
  callMethod("Refresh", _me, meProp(_me, "m_iHeadDir"), meProp(_me, "m_iBdDir"))
  callMethod("ActLeftHand", _me, 0)
  callMethod("ActRightHand", _me, 0)
  callMethod("ActLeftFoot", _me, 0)
  callMethod("ActRightFoot", _me, 0)
  setMeProp(_me, "m_bChanges", 1);
  var t_Img = callMethod("render", _me);
  if ((lingoTruthy(callNamed("voidp", t_Img)) ? 0 : 1)) {
  callMethod("add", meProp(_me, "m_ar_StormImgList"), t_Img)
  }

  }

  setMeProp(_me, "m_iTileSize", t_iTileSize);
  callMethod("Action", _me, meProp(_me, "m_mp_AvatarData"))
  if (callNamed("objectp", meProp(_me, "m_Obj_Magic"))) {
  callMethod("SetStormFximages", meProp(_me, "m_Obj_Magic"), meProp(_me, "m_ar_StormImgList"))
  }

}

