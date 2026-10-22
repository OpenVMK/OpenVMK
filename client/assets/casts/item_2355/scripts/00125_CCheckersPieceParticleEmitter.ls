-- Script
property m_rPiece
property m_rMember
property m_vLastPos
property m_iMaxParticles
property m_ar_rSprites
property m_ar_rSpritePool

on construct this
  m_rMember = getMember("trick_2_star")
  m_vLastPos = vector()
  m_iMaxParticles = 20
  m_ar_rSprites = []
  m_ar_rSpritePool = []
end
on deconstruct this
  removeUpdate(this.getID())
  t_iCount = m_ar_rSprites.count
  repeat with i = 1 to t_iCount
    releaseSprite(m_ar_rSprites[i].spriteNum)
  end repeat
  m_ar_rSprites = VOID
  t_iCount = m_ar_rSpritePool.count
  repeat with i = 1 to t_iCount
    releaseSprite(m_ar_rSpritePool[i].spriteNum)
  end repeat
  m_ar_rSpritePool = VOID
end
on SetPiece this, a_rPiece
  m_rPiece = a_rPiece
  repeat with t_rSprite in m_ar_rSprites
    m_ar_rSpritePool.add(t_rSprite)
  end repeat
  m_ar_rSprites = []
  if m_ar_rSpritePool.count < m_iMaxParticles then
    repeat while m_ar_rSpritePool.count < m_iMaxParticles
      t_rSprite = sprite(reserveSprite(this.getID()))
      t_rSprite.member = m_rMember
      t_rSprite.visible = 0
      t_rSprite.width = m_rMember.width
      t_rSprite.height = m_rMember.height
      m_ar_rSpritePool.add(t_rSprite)
    end repeat
  end if
  receiveUpdate(this.getID())
end
on update this
  if m_rPiece.valid then
    t_vNewPos = m_rPiece.GetScrPos()
    if m_vLastPos <> t_vNewPos then
      this.PlaceParticles(t_vNewPos)
      m_vLastPos.x = t_vNewPos.x
      m_vLastPos.y = t_vNewPos.y
      m_vLastPos.z = t_vNewPos.z
    end if
  else
    removeObject(this.getID())
  end if
end
on IsPlaying this
  return 1
end
on PlaceParticles this, a_vPos
  t_iCount = m_ar_rSprites.count
  repeat with i = t_iCount down to 1
    t_rSprite = m_ar_rSprites[i]
    t_rSprite.blend = t_rSprite.blend - 10
    if t_rSprite.blend < 10 then
      m_ar_rSprites.deleteAt(i)
      m_ar_rSpritePool.add(t_rSprite)
    end if
  end repeat
  repeat with i = 1 to 3
    if m_ar_rSpritePool.count then
      t_rSprite = m_ar_rSpritePool[1]
      m_ar_rSpritePool.deleteAt(1)
    else
      if m_ar_rSprites.count then
        t_rSprite = m_ar_rSprites[1]
        m_ar_rSprites.deleteAt(1)
      else
        nothing()
      end if
    end if
    t_rSprite.loc = point(a_vPos.x + random(-10, 10), a_vPos.y + random(-10, 10))
    t_rSprite.locZ = a_vPos.z + 1000
    t_rSprite.visible = 1
    t_rSprite.blend = 90
    t_iScale = random(m_rMember.width / 2)
    t_rSprite.width = m_rMember.width - t_iScale
    t_rSprite.height = m_rMember.height - t_iScale
    m_ar_rSprites.add(t_rSprite)
  end repeat
end