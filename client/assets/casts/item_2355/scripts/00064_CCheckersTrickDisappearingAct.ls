-- Script
on SetPiece this, a_rPiece
  executeMessage("PlayFxSound", "checkers-disappear")
  callAncestor(#SetPiece, this, a_rPiece)
  t_iTrick = 5
  t_sAnim = getVariable("checkers.trick.anim." & t_iTrick)
  if stringp(t_sAnim) and t_sAnim <> EMPTY then
    t_vPos = a_rPiece.getObject().GetScrPos()
    t_rAnim = this.getAnimation()
    t_rAnim.LoadAnimData(value(getMember(t_sAnim).text))
    t_rAnim.setPosition(point(t_vPos.x, t_vPos.y), t_vPos.z + 1)
    t_rAnim.SetSelfDestruct(0)
    t_rAnim.start()
  end if
end