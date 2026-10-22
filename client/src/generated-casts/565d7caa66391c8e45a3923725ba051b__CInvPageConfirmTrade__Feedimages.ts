// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageConfirmTrade / Feedimages

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Feedimages(_me: LingoMe, _this: LingoValue, a_ImgMine: LingoValue, a_ImgHers: LingoValue) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.mystuff"), a_ImgMine)
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.herstuff"), a_ImgHers)
}

