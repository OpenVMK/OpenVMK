// d0e535313898676eb605277339b50f27.cct / CBodypartClass / setModel

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setModel(_me: LingoMe, tmodel: LingoValue) {
  setMeProp(_me, "m_iModel", tmodel);
  /**
   * ⚠ HAND-CORRECTED — a part that GAINS a model gets its ink now.
   *
   * `Define` runs `defineInk()` only `if tmodel > 0`. The Character window
   * builds every part once from the outfit being worn, so a shirt with no
   * second layer (the MOD shirt) leaves the `ch2` part with model 0 and ink 0.
   * Browsing to a shirt that has one (tie shirt, VMK Tank's logo) only calls
   * `setModel`, so that layer drew with Copy instead of Darken (41) and
   * stamped its whole rectangle: a black box round the tie, a pale box round
   * the logo. Director's Copy honoured the art's own alpha and hid the slip;
   * our body parts load at use_alpha 0 (the figure's silhouette comes from
   * `setAlpha`), so it shows. Same ink `Define` would have given.
   */
  const t_rProps = meProp(_me, "m_mpDrawProps") as LingoValue;
  if (lingoTruthy(lingoBinary("gt", tmodel, 0)) && t_rProps && callMethod("getaProp", t_rProps, symbol("ink")) === 0) {
    callMethod("defineInk", _me);
  }
}

