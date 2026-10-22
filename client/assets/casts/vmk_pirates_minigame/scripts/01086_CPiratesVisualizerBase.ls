-- Script
property m_mp_csVis

on construct me
  m_mp_csVis = [#on: 0]
  return 1
end
on deconstruct me
  if m_mp_csVis.on then
    me.setCollisionVisualization(0)
  end if
  return 1
end
on setCollisionVisualization me, a_bVal
  if a_bVal then
    m_mp_csVis = [#on: 1, #vis: [:]]
    case me.getObject().GetParam("BoundsType") of
      #point:
      #circle:
        m_mp_csVis.vis.addProp(#sprite, sprite(reserveSprite(me.getID())))
        tBoundSize = me.getObject().GetParam("BoundingCircleRadius")
        tImg = image(tBoundSize / 50, tBoundSize / 100, 32)
        tImg.fill(tImg.rect, [#shapeType: #rect, #lineSize: 1, #color: rgb(0, 0, 0), #bgColor: rgb(0, 0, 0)])
        tImg.fill(tImg.rect, [#shapeType: #oval, #lineSize: 1, #color: rgb(0, 255, 255), #bgColor: rgb(0, 255, 255)])
        tmember = member(createMember("collisionVis" & string(the milliSeconds), #bitmap))
        tmember.image = tImg
        m_mp_csVis.vis.sprite.member = tmember
      #triplecircle:
        m_mp_csVis.vis.addProp(#sprites, [])
        m_mp_csVis.vis.sprites.append(sprite(reserveSprite(me.getID())))
        m_mp_csVis.vis.sprites.append(sprite(reserveSprite(me.getID())))
        m_mp_csVis.vis.sprites.append(sprite(reserveSprite(me.getID())))
        tBoundSize = me.getObject().GetParam("1stRadius")
        tImg = image(tBoundSize / 50, tBoundSize / 100, 32)
        tImg.fill(tImg.rect, [#shapeType: #rect, #lineSize: 1, #color: rgb(0, 0, 0), #bgColor: rgb(0, 0, 0)])
        tImg.fill(tImg.rect, [#shapeType: #oval, #lineSize: 1, #color: rgb(0, 255, 255), #bgColor: rgb(0, 255, 255)])
        tmember = member(createMember("collisionVis1" & string(the milliSeconds), #bitmap))
        tmember.image = tImg
        m_mp_csVis.vis.sprites[1].member = tmember
        tBoundSize = me.getObject().GetParam("2ndRadius")
        tImg = image(tBoundSize / 50, tBoundSize / 100, 32)
        tImg.fill(tImg.rect, [#shapeType: #rect, #lineSize: 1, #color: rgb(0, 0, 0), #bgColor: rgb(0, 0, 0)])
        tImg.fill(tImg.rect, [#shapeType: #oval, #lineSize: 1, #color: rgb(0, 255, 255), #bgColor: rgb(0, 255, 255)])
        tmember = member(createMember("collisionVis2" & string(the milliSeconds), #bitmap))
        tmember.image = tImg
        m_mp_csVis.vis.sprites[2].member = tmember
        tBoundSize = me.getObject().GetParam("3rdRadius")
        tImg = image(tBoundSize / 50, tBoundSize / 100, 32)
        tImg.fill(tImg.rect, [#shapeType: #rect, #lineSize: 1, #color: rgb(0, 0, 0), #bgColor: rgb(0, 0, 0)])
        tImg.fill(tImg.rect, [#shapeType: #oval, #lineSize: 1, #color: rgb(0, 255, 255), #bgColor: rgb(0, 255, 255)])
        tmember = member(createMember("collisionVis3" & string(the milliSeconds), #bitmap))
        tmember.image = tImg
        m_mp_csVis.vis.sprites[3].member = tmember
      #box:
        m_mp_csVis.vis.addProp(#sprite, sprite(reserveSprite(me.getID())))
        tBoundDimensions = me.getObject().GetParam("BoxDimensions")

    end case
  else
    if m_mp_csVis.on then
      case me.getObject().GetParam("BoundsType") of
        #point:
        #circle:
          removeMember(m_mp_csVis.vis.sprite.member.name)
          releaseSprite(m_mp_csVis.vis.sprite.spriteNum)
        #triplecircle:
          removeMember(m_mp_csVis.vis.sprites[1].member.name)
          removeMember(m_mp_csVis.vis.sprites[2].member.name)
          removeMember(m_mp_csVis.vis.sprites[3].member.name)
          releaseSprite(m_mp_csVis.vis.sprites[1].spriteNum)
          releaseSprite(m_mp_csVis.vis.sprites[2].spriteNum)
          releaseSprite(m_mp_csVis.vis.sprites[3].spriteNum)
        #box:
          removeMember(m_mp_csVis.vis.sprite.member.name)
          releaseSprite(m_mp_csVis.vis.sprite.spriteNum)

      end case
      m_mp_csVis = [#on: 0]
    end if
  end if
end
on collisionVisualization me
  if m_mp_csVis.on then
    t_rGameEngine = getThread("minigame").getComponent()
    t_rVelTable = t_rGameEngine.GetVelocityTable()
    case me.getObject().GetParam("BoundsType") of
      #point:
      #circle:
        tPos = me.getObject().GetParam("WorldPosition")
        m_mp_csVis.vis.sprite.loc = ProjectAxonometricPosition(point(tPos.x, tPos.y))
        m_mp_csVis.vis.sprite.locZ = -30
        m_mp_csVis.vis.sprite.blend = 50
      #triplecircle:
        tPos = me.getObject().GetParam("WorldPosition")
        tdir = me.getObject().GetParam("Direction")
        tCircle1X = tPos.x + t_rVelTable.GetBaseVelX(tdir) * me.getObject().GetParam("1stOffset") / 256
        tCircle1Y = tPos.y + t_rVelTable.GetBaseVelY(tdir) * me.getObject().GetParam("1stOffset") / 256
        tCircle3X = tPos.x + t_rVelTable.GetBaseVelX(tdir) * me.getObject().GetParam("3rdOffset") / 256
        tCircle3Y = tPos.y + t_rVelTable.GetBaseVelY(tdir) * me.getObject().GetParam("3rdOffset") / 256
        m_mp_csVis.vis.sprites[1].loc = ProjectAxonometricPosition(point(tCircle1X, tCircle1Y))
        m_mp_csVis.vis.sprites[2].loc = ProjectAxonometricPosition(point(tPos.x, tPos.y))
        m_mp_csVis.vis.sprites[3].loc = ProjectAxonometricPosition(point(tCircle3X, tCircle3Y))
        m_mp_csVis.vis.sprites[1].locZ = -30
        m_mp_csVis.vis.sprites[2].locZ = -30
        m_mp_csVis.vis.sprites[3].locZ = -30
        m_mp_csVis.vis.sprites[1].blend = 50
        m_mp_csVis.vis.sprites[2].blend = 50
        m_mp_csVis.vis.sprites[3].blend = 50
      #box:

    end case
  end if
end
on SprZToScreenSpace me, a_ar_rSprites, a_iZLayer
  tMyObject = me.getObject()
  tPos = me.getObject().GetParam("WorldPosition")
  tTestPos = vector(tPos.x / 100.0, tPos.y / 100.0, tPos.z / 100.0)
  tMyObject.SetAbsPos(tTestPos + vector(0, 0, a_iZLayer))
  tZ = tMyObject.GetScrPos().z
  repeat with tSprite in a_ar_rSprites
    tSprite.locZ = tZ
  end repeat
end
on SprZToFixed me, a_ar_rSprites, a_vRefPos
  tMyObject = me.getObject()
  tMyObject.SetAbsPos(a_vRefPos)
  tZ = tMyObject.GetScrPos().z
  repeat with tSprite in a_ar_rSprites
    tSprite.locZ = tZ
  end repeat
end