// vmk_tutorial.cct / CGameCamera / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rSprBase", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setMeProp(_me, "m_rSprLock", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setMeProp(_me, "m_rSprLED", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setMeProp(_me, "m_memViewFinder", callNamed("getMember", "cam_viewfinder"));
  setMeProp(_me, "m_memLock", callNamed("getMember", "cam_viewfinder_lock"));
  setMeProp(_me, "m_memRedLED", callNamed("getMember", "led.red"));
  setMeProp(_me, "m_memGreenLED", callNamed("getMember", "led.green"));
  setMeProp(_me, "m_frameSwitchDelay", 0.5);
  setMeProp(_me, "m_filmWindTime", theProperty("milliSeconds"));
  setMeProp(_me, "m_constraints", callNamed("rect", 0, 0, theProperty("stage").image.width, theProperty("stage").image.height));
  setMeProp(_me, "m_bLock", 0);
  setMeProp(_me, "m_bActive", 1);
  return 1;
}

