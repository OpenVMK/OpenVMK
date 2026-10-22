// fda7c1aad86c08c12d1a13ae95116821.cct / RoomMath / PntInsideTri

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PntInsideTri(_me: LingoMe, a_ptTest: LingoValue, a_ptTriA: LingoValue, a_ptTriB: LingoValue, a_ptTriC: LingoValue) {
  var t_fA = callNamed("_TriArea", a_ptTest, a_ptTriB, a_ptTriC);
  var t_fB = callNamed("_TriArea", a_ptTest, a_ptTriA, a_ptTriC);
  var t_fC = callNamed("_TriArea", a_ptTest, a_ptTriA, a_ptTriB);
  var t_fD = callNamed("_TriArea", a_ptTriA, a_ptTriB, a_ptTriC);
  // HAND-CORRECTED: compare with a tolerance. The test is "the three
  // sub-triangles sum to MORE than the whole", which is exact only when the
  // corners are integers — and Director's `point()` holds integers. Ours keep
  // the float screen positions `CRoomVisualWall.PointInside` builds, so an
  // inside point's sum can land ~1e-13 over and read as OUTSIDE. Measured on
  // Tron's guest room: 20% of the left wall and 2% of the right refused
  // posters, in stripes, where Shockwave accepts them. The margin is far
  // below a pixel, so nothing truly outside becomes inside.
  var t_fSum = Number(t_fA) + Number(t_fB) + Number(t_fC);
  return t_fSum > Number(t_fD) + 1e-6 * Math.max(1, Math.abs(Number(t_fD))) ? 0 : 1;
}

