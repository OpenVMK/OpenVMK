// vmk_domestic.cct /  / CreateXML

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateXML(_me: LingoMe, getComponent: LingoValue) {
  if (lingoBinary("gt", getComponent.text.GetScrPos, 0)) {
  setThePropOf(getComponent.text, "handle_petchat", 1);
  }

}

