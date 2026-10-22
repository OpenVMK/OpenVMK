-- Script
property m_rPiece
property m_bMoving
property m_rZTransfer
property m_rCurve
property m_fMoveTime
property m_rGameEngine

on construct this
  m_bMoving = 0
  m_rZTransfer = createObject(#temp, "CTransferFunction", "CRampClampTransferFunction")
  m_rCurve = createObject(#temp, "CRoomBezierCurve")
  m_fMoveTime = 0.0
  return 1
end
on deconstruct this
  m_rPiece = VOID
  m_rCurve = VOID
  m_rZTransfer = VOID
  m_rGameEngine = VOID
  return 1
end
on update this
  if m_bMoving then
    t_veScrPos = AbsToScr(m_rCurve.GetPointAt(m_fMoveTime)) + m_rGameEngine.GetRoomContext().GetScrPos()
    t_ar_rBlocks = m_rPiece.GetBlocks()
    repeat with t_rBlock in t_ar_rBlocks
      t_ar_rSprites = t_rBlock.GetVisual().GetSprites()
      repeat with t_rSprite in t_ar_rSprites
        t_rSprite.locH = t_veScrPos.x
        t_rSprite.locV = t_veScrPos.y
        t_rSprite.locZ = t_veScrPos.z
      end repeat
    end repeat
    if m_fMoveTime >= 1.0 then
      m_bMoving = 0
    end if
    m_fMoveTime = m_fMoveTime + 1.57499992847443
  end if
end
on SetStartAndEnd this, a_vStart, a_vEnd
  m_bMoving = 1
  m_fMoveTime = 0.0
  t_veSource = a_vStart
  t_veTarget = a_vEnd
  t_veMiddle = t_veSource + (t_veTarget - t_veSource) / 2 + vector(0, 0, 20)
  m_rCurve.clear()
  m_rCurve.AddTriple(t_veSource, t_veMiddle, t_veTarget)
end
on GetStartAndEnd this, a_vStart, a_vEnd
  t_vStart = m_rCurve.GetPointAt(0.0)
  a_vStart.x = t_vStart.x
  a_vStart.y = t_vStart.y
  a_vStart.z = t_vStart.z
  t_vEnd = m_rCurve.GetPointAt(1.0)
  a_vEnd.x = t_vEnd.x
  a_vEnd.y = t_vEnd.y
  a_vEnd.z = t_vEnd.z
end
on SetPiece this, a_rPiece
  m_rPiece = a_rPiece
end
on GetPiece this
  return m_rPiece
end
on SetCurve this, a_rCurve
  m_rCurve = a_rCurve
end
on GetCurve this
  return m_rCurve
end
on SetGameEngine this, a_rEngine
  m_rGameEngine = a_rEngine
  m_bInitialized = 1
end
on GetGameEngine this
  return m_rGameEngine
end