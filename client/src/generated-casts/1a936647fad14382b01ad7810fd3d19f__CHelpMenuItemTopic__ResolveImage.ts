// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenuItemTopic / ResolveImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResolveImage(_me: LingoMe) {
  switch (_me.Active) {
case 0:
  setMeProp(_me, "m_pBgImg", callMethod("duplicate", callNamed("member", "field.hlp2.active").image));
  break;
case 1:
  setMeProp(_me, "m_pBgImg", callMethod("duplicate", callNamed("member", "field.hlp2.selected").image));
  break;
  }

}

