// d0e535313898676eb605277339b50f27.cct / CMagicFactor / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  var t_iCount = meProp(_me, "m_ar_SpriteList").count;
  if (lingoBinary("gt", t_iCount, 0)) {
  for (var i = 1; i <= t_iCount; ++i) {
  if (lingoBinary("gt", meProp(_me, "m_ar_SpriteList")[i].count, 0)) {
  callNamed("releaseSprite", meProp(_me, "m_ar_SpriteList")[i].sprite.spriteNum)
  }

  }

  }

  setMeProp(_me, "m_ar_SpriteList", new LingoList([]));
  if (callNamed("timeoutExists", lingoBinary("join", "FxLocator", meProp(_me, "m_iMyRef")))) {
  callNamed("removeTimeout", lingoBinary("join", "FxLocator", meProp(_me, "m_iMyRef")))
  }

  if (callNamed("objectp", meProp(_me, "m_FxSnd_obj"))) {
  callMethod("StopSound", meProp(_me, "m_FxSnd_obj"))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_FxSnd_obj")))
  setMeProp(_me, "m_FxSnd_obj", undefined);
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_SprFuel1"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_SprFuel1").sprite.spriteNum)
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_SprFuel2"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_SprFuel2").sprite.spriteNum)
  }

  callMethod("regMsgList", _this, 0)
  return 1;
}

