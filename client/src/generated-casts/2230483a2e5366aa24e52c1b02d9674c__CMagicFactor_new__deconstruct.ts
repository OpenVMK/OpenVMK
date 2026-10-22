// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  var t_iCount = _this.m_ar_SpriteList.count;
  if (lingoBinary("gt", t_iCount, 0)) {
  for (var i = 1; i <= t_iCount; ++i) {
  if (lingoBinary("gt", _this.m_ar_SpriteList.count, 0)) {
  callNamed("releaseSprite", _this.m_ar_SpriteList[i].sprite.spriteNum)
  }

  }

  setThePropOf(_this, "m_ar_SpriteList", new LingoList([]));
  if (callNamed("timeoutExists", lingoBinary("join", "FxLocator", _this.m_iMyRef))) {
  callNamed("removeTimeout", lingoBinary("join", "FxLocator", _this.m_iMyRef))
  }

  if (callNamed("objectp", _this.m_FxSnd_obj)) {
  callNamed("StopSound", _this.m_FxSnd_obj)
  callNamed("removeObject", callMethod("getID", _this.m_FxSnd_obj))
  setThePropOf(_this, "m_FxSnd_obj", undefined);
  }

  if ((lingoTruthy(callNamed("voidp", _this.m_SprFuel1)) ? 0 : 1)) {
  callNamed("releaseSprite", _this.m_SprFuel1.sprite.spriteNum)
  }

  if ((lingoTruthy(callNamed("voidp", _this.m_SprFuel2)) ? 0 : 1)) {
  callNamed("releaseSprite", _this.m_SprFuel2.sprite.spriteNum)
  }

  callMethod("regMsgList", _this, 0)
  return 1;
  }

}

