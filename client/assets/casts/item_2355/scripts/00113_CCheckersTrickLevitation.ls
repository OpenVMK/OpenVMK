-- Script
property m_iCurFrame
property m_iLastFrame
property m_ar_rSprites
property m_bRingAssigned

on construct this
  m_iCurFrame = 0
  m_iLastFrame = 40
  m_ar_rSprites = []
  m_ar_rSprites.add(sprite(reserveSprite(this.getID())))
  m_ar_rSprites.add(sprite(reserveSprite(this.getID())))
  m_bRingAssigned = 0
  receivePrepare(this.getID())
end
on deconstruct this
  removePrepare(this.getID())
  releaseSprite(m_ar_rSprites[1].spriteNum)
  releaseSprite(m_ar_rSprites[2].spriteNum)
  callAncestor(#deconstruct, this)
end
on SetPiece this, a_rPiece
  executeMessage("PlayFxSound", "checkers-levitation")
  callAncestor(#SetPiece, this, a_rPiece)
  t = createObject(getUniqueID(), "CCheckersPieceParticleEmitter")
  t.SetPiece(a_rPiece.getObject())
  this.setAnimation(t)
end
on prepare this
  if not m_bRingAssigned then
    t_rRoomContext = this.GetPiece().m_rGameEngine.GetRoomContext()
    t_iTargetTile = this.GetParams()[1]
    t_rTargetTile = t_rRoomContext._AccessIndexed(t_iTargetTile, "tile")
    if not voidp(t_rTargetTile) then
      t_rCurve = createObject(#temp, "CRoomBezierCurve")
      t_veSource = this.GetPiece().GetTheTileStack().getObject().GetAbsPos()
      t_veTarget = t_rTargetTile.GetAbsPos()
      t_veMiddle = t_veSource + (t_veTarget - t_veSource) / 2 + vector(0, 0, 20)
      t_rCurve.clear()
      t_rCurve.AddTriple(t_veSource, t_veMiddle, t_veTarget)
      t_veScrPos = AbsToScr(t_rCurve.GetPointAt(0.5)) + t_rRoomContext.GetScrPos()
      t_vTemp = t_veTarget - t_veSource
      if abs(t_vTemp.x - t_vTemp.y) <> 0.0 then
        t_iDir = 2
      else
        t_iDir = 0
      end if
      put "LEVITATION:" && t_veTarget, t_veSource, t_vTemp
      m_ar_rSprites[1].member = getMember("trick_2_ring_" & t_iDir & "_front")
      m_ar_rSprites[1].loc = point(t_veScrPos.x, t_veScrPos.y)
      m_ar_rSprites[1].locZ = t_veScrPos.z + 10000
      m_ar_rSprites[1].width = m_ar_rSprites[1].member.width
      m_ar_rSprites[1].height = m_ar_rSprites[1].member.height
      m_ar_rSprites[1].visible = 1
      m_ar_rSprites[2].member = getMember("trick_2_ring_" & t_iDir & "_back")
      m_ar_rSprites[2].loc = point(t_veScrPos.x, t_veScrPos.y)
      m_ar_rSprites[2].locZ = t_veScrPos.z
      m_ar_rSprites[2].width = m_ar_rSprites[2].member.width
      m_ar_rSprites[2].height = m_ar_rSprites[2].member.height
      m_ar_rSprites[2].visible = 1
    end if
    m_bRingAssigned = 1
  end if
  m_iCurFrame = m_iCurFrame + 1
  if m_iCurFrame > m_iLastFrame then
    removeObject(this.getID())
  end if
end