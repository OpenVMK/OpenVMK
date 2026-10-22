// vmk_jungle_cruise.cct / CBoundingCircle / SetType

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetType(_me: LingoMe, t_type: LingoValue) {
  switch (t_type) {
case symbol("nobody"):
  setMeProp(_me, "circleType", symbol("nobody"));
  setMeProp(_me, "mass", 0);
  break;
case symbol("static"):
  setMeProp(_me, "circleType", symbol("static"));
  setMeProp(_me, "mass", 2);
  break;
case symbol("moving"):
  setMeProp(_me, "circleType", symbol("moving"));
  setMeProp(_me, "mass", 1);
  setMeProp(_me, "animating", 1);
  break;
  }

}

