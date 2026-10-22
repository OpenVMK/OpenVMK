// mpa03424.dcr / pIcon / frameEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function frameEvent(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "pStatus"), symbol("start"))) {
  callMethod("frameEvent", meProp(_me, "pBoing"))
  var tPos = meProp(_me, "pBoing").pPos;
  setThePropOf(meProp(_me, "pSprite"), "width", lingoBinary("sub", meProp(_me, "pwidth"), lingoBinary("mul", lingoBinary("div", tPos, float(100)), meProp(_me, "pwidth"))));
  setThePropOf(meProp(_me, "pSprite"), "height", lingoBinary("sub", meProp(_me, "pheight"), lingoBinary("mul", lingoBinary("div", tPos, float(100)), meProp(_me, "pheight"))));
  if (lingoBinary("eq", meProp(_me, "pBoing").pStatus, symbol("nothing"))) {
  return symbol("kill");
  }

  } else {
  if (lingoBinary("eq", meProp(_me, "pStatus"), symbol("end"))) {
  setMeProp(_me, "pTime", lingoBinary("add", meProp(_me, "pTime"), 1));
  setMeProp(_me, "pwidth", lingoBinary("sub", meProp(_me, "pwidth"), lingoBinary("add", -float(30), lingoBinary("mul", meProp(_me, "pTime"), meProp(_me, "pTime")))));
  setMeProp(_me, "pheight", lingoBinary("sub", meProp(_me, "pheight"), lingoBinary("add", -float(30), lingoBinary("mul", meProp(_me, "pTime"), meProp(_me, "pTime")))));
  if (lingoBinary("or", lingoBinary("lt", meProp(_me, "pwidth"), 1), lingoBinary("lt", meProp(_me, "pheight"), 1))) {
  setThePropOf(meProp(_me, "pSprite"), "blend", 0);
  return symbol("kill");
  } else {
  setThePropOf(meProp(_me, "pSprite"), "width", meProp(_me, "pwidth"));
  setThePropOf(meProp(_me, "pSprite"), "height", meProp(_me, "pheight"));
  }

  }

  }

}

