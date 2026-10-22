-- Script
property m_ar_collisionObjects
property m_ar_tiles3D
property m_ar_tiles2D
property m_ar_floors
property m_ar_furniture
property m_sActiveFloor
property m_ar_links
property m_iTileSize
property detectedCollisions
property bounce
property friction
property m_ar_directions
property m_ar_tileRef
property m_iStatusDelay

on construct me
  m_ar_floors = [:]
  m_ar_links = []
  m_sActiveFloor = EMPTY
  m_iTileSize = 16
  m_ar_tiles3D = []
  m_ar_tiles2D = []
  m_ar_tileRef = []
  bounce = 0.5
  friction = 1.44999992847443
  m_ar_furniture = []
  detectedCollisions = []
  m_ar_collisionObjects = []
  m_ar_directions = []
  m_ar_directions.append(vector(-1, -1, 0))
  m_ar_directions.append(vector(0, -1, 0))
  m_ar_directions.append(vector(1, -1, 0))
  m_ar_directions.append(vector(1, 0, 0))
  m_ar_directions.append(vector(1, 1, 0))
  m_ar_directions.append(vector(0, 1, 0))
  m_ar_directions.append(vector(-1, 1, 0))
  m_ar_directions.append(vector(-1, 0, 0))
  m_iStatusDelay = 300
  t_iStatusDelay = getVariableValue("hm.editor.statusdelay")
  if not voidp(t_iStatusDelay) then
    m_iStatusDelay = t_iStatusDelay
  end if
  createTimeout("HMGCollisionEngineUpdate", m_iStatusDelay, #update, me.getID(), VOID, 0)
  registerMessage(#ActivateCollisionEngine, me.getID(), #setActive)
  registerMessage(#AddTileCollisionObject, me.getID(), #addCollisionObject)
  registerMessage(#RemoveTileCollisionObject, me.getID(), #removeCollisionObject)
  return 1
end
on deconstruct me
  removeTimeout("HMGCollisionEngineUpdate")
  unregisterMessage(#AddTileCollisionObject, me.getID())
  unregisterMessage(#RemoveTileCollisionObject, me.getID())
  m_ar_tiles2D = []
  detectedCollisions = []
  m_ar_collisionObjects = []
  return 1
end
on setActive me, t_bEngineIsActive
  me.update()
  removeTimeout("HMGCollisionEngineUpdate")
  createTimeout("HMGCollisionEngineUpdate", m_iStatusDelay, #update, me.getID(), VOID, 0)
  if t_bEngineIsActive then
  else
  end if
end
on update me
  repeat with _o in m_ar_collisionObjects
    _o.update()
  end repeat
  me.DetectCollisions()
end
on setBounce me, _bounce
  bounce = _bounce
end
on setFriction me, _friction
  friction = _friction
end
on addCollisionObject me, _o
  m_ar_collisionObjects.append(_o)
end
on removeCollisionObject me, _o
  m_ar_collisionObjects.deleteOne(_o)
end
on removeAllCollisionObjects me
  m_ar_collisionObjects = []
end
on resetMap me
  m_ar_tiles2D = []
end
on setTileMap me, _l
  m_ar_tiles2D = _l
end
on addTileToMap me, _e
  m_ar_tiles2D.add(_e)
end
on draw me, g, bAxionomicProjection
end
on addTiles me, i_ar_tiles
  repeat with t_vTile in i_ar_tiles
    me.addTile(t_vTile)
  end repeat
end
on addTile me, i_vPos
  m_ar_tiles2D.add(i_vPos)
end
on addFloor me, i_ar_floor, i_sFloorName
  m_ar_floor([i_sFloorName] = i_ar_floor)
end
on setActiveFloor me, a_sFloorName
  m_sActiveFloor = a_sFloorName
  m_ar_tiles2D = m_ar_floors[m_sActiveFloor]
end
on SetTileSize me, i_iTileSize
  m_iTileSize = i_iTileSize
end
on setLinks me, i_ar_links
  if listp(i_ar_links) then
    m_ar_links = i_ar_links
  else
    put "Incorrect link-format"
  end if
end
on DetectCollisions me
  repeat with _o in m_ar_collisionObjects
    t_vDir = _o.getDirection().duplicate()
    t_vDir.y = t_vDir.y * -1
    if t_vDir = vector(0, 0, 0) then
      next repeat
    end if
    t_vPos = _o.getLocation()
    t_vTestPos = t_vPos + t_vDir * m_iTileSize
    t_vTestPos.z = 0
    t_iFound = m_ar_furniture[1].getOne(t_vTestPos)
    if t_iFound > 0 then
      t_vFurniPos3D = m_ar_furniture[2][t_iFound]
      t_iFurniRef = m_ar_furniture[3][t_iFound]
      t_iFurniType = m_ar_furniture[4][t_iFound]
      put "Furni-collision detected:" && [t_iFurniType, t_iFurniRef, t_vFurniPos3D]
      next repeat
    end if
    t_iFound = m_ar_tiles2D.getOne(t_vTestPos)
    if t_iFound > 0 then
      t_v3DPos = m_ar_tiles3D[t_iFound]
      _o.SetLocation(t_v3DPos, m_ar_tileRef[t_iFound], t_vDir)
      next repeat
    end if
    t_linkPos = me.getLink(t_vPos, t_vDir)
    if vectorp(t_linkPos) then
      t_iTilePos = m_ar_tiles3D.getOne(t_linkPos)
      if t_iTilePos > 0 then
        _o.SetLocation(t_linkPos, m_ar_tileRef[t_iTilePos], t_vDir)
        next repeat
      end if
    end if
    t_vDir2 = me.getTrialDirection(t_vDir, -1)
    t_vTestPos = t_vPos + t_vDir2 * m_iTileSize
    t_vTestPos.z = 0
    t_iFound = m_ar_furniture[1].getOne(t_vTestPos)
    if t_iFound > 0 then
      t_vFurniPos3D = m_ar_furniture[2][t_iFound]
      t_iFurniRef = m_ar_furniture[3][t_iFound]
      t_iFurniType = m_ar_furniture[4][t_iFound]
      put "Furni-collision detected:" && [t_iFurniType, t_iFurniRef, t_vFurniPos3D]
      next repeat
    end if
    t_iFound = m_ar_tiles2D.getOne(t_vTestPos)
    if t_iFound > 0 then
      t_v3DPos = m_ar_tiles3D[t_iFound]
      _o.SetLocation(t_v3DPos, m_ar_tileRef[t_iFound], t_vDir)
      next repeat
    end if
    t_vDir1 = me.getTrialDirection(t_vDir, 1)
    t_vTestPos = t_vPos + t_vDir1 * m_iTileSize
    t_vTestPos.z = 0
    t_iFound = m_ar_furniture[1].getOne(t_vTestPos)
    if t_iFound > 0 then
      t_vFurniPos3D = m_ar_furniture[2][t_iFound]
      t_iFurniRef = m_ar_furniture[3][t_iFound]
      t_iFurniType = m_ar_furniture[4][t_iFound]
      put "Furni-collision detected:" && [t_iFurniType, t_iFurniRef, t_vFurniPos3D]
      next repeat
    end if
    t_iFound = m_ar_tiles2D.getOne(t_vTestPos)
    if t_iFound > 0 then
      t_v3DPos = m_ar_tiles3D[t_iFound]
      _o.SetLocation(t_v3DPos, m_ar_tileRef[t_iFound], t_vDir)
      next repeat
    end if
    t_linkPos = me.getLink(t_vPos, t_vDir1)
    if vectorp(t_linkPos) then
      t_iTilePos = m_ar_tiles3D.getOne(t_linkPos)
      if t_iTilePos > 0 then
        _o.SetLocation(t_linkPos, m_ar_tileRef[t_iTilePos], t_vDir)
        next repeat
      end if
    end if
    t_linkPos = me.getLink(t_vPos, t_vDir2)
    if vectorp(t_linkPos) then
      t_iTilePos = m_ar_tiles3D.getOne(t_linkPos)
      if t_iTilePos > 0 then
        _o.SetLocation(t_linkPos, m_ar_tileRef[t_iTilePos], t_vDir)
        next repeat
      end if
    end if
  end repeat
end
on getLink me, t_vPos, t_vDir
  t_iIndex = m_ar_directions.getPos(t_vDir)
  if t_iIndex < 1 then
    put "LINK PROBLEM"
    return 0
  end if
  repeat with t_link in m_ar_links[t_iIndex]
    if t_link[1] = t_vPos then
      return t_link[2]
    end if
  end repeat
  return 0
end
on getTrialDirection me, t_vOldDir, t_iRotDir
  t_iPos = m_ar_directions.getPos(t_vOldDir)
  t_newPos = t_iPos + t_iRotDir
  if t_newPos < 1 then
    t_newPos = m_ar_directions.count
  end if
  if t_newPos > m_ar_directions.count then
    t_newPos = 1
  end if
  return m_ar_directions[t_newPos]
end
on Detect me, objectList, _o
  detectedCollisions = []
  if count(detectedCollisions) > 0 then
    return 1
  end if
  return 0
end
on Response me, _o, _b, _f
  detectedCollisions.sort()
end
on responseVsEdge me, _o, _b, _f
end
on responseVsCircle me, _o, _b, _f
end
on detectCircleVsEdge me, _o, _edge
end
on detectCircleVsCircle me, a, b
end
on parseRoom me
  t_rContext = getThread("room").getComponent()._AccessRoom()
  if voidp(t_rContext) then
    put "ERROR, Could not hook Room!"
    exit
  end if
  t_ar_floors = me.createCollisionmap(t_rContext)
  t_ar_links = me.getRoomLinks(t_rContext)
  t_ar_links3D = me.links2positions(t_rContext, t_ar_links)
  me.setTileRefs(t_ar_floors)
  me.setFloors(t_ar_floors)
  me.SetTileSize(16)
  me.setLinks(t_ar_links3D)
  t_ar_mp_elemProps = []
  t_mp_mp_furniMap = [:]
  RipFurni(t_ar_mp_elemProps, t_mp_mp_furniMap, [303: #Coffin, 313: #Door, 320: #Door, 356: #Door, 357: #Door, 312: #loop, 82: #loop, 5: #loop])
  me.AddFurniture(t_ar_mp_elemProps, t_mp_mp_furniMap, t_ar_floors)
end
on createCollisionmap me, t_rContext
  t_ar_floors = [:]
  t_ar_floors.sort()
  t_rIterator = t_rContext.GetIterator("floor")
  if t_rIterator.FirstToken() then
    repeat while 1
      t_rFloor = t_rIterator.getToken()
      if not objectp(t_rFloor) then
        exit repeat
      end if
      t_sFloorName = t_rFloor.GetParam("NAME")
      t_x = float(t_rFloor.GetParam("X"))
      t_y = float(t_rFloor.GetParam("Y"))
      t_z = float(t_rFloor.GetParam("Z"))
      t_floorPos = vector(t_x, t_y, t_z)
      t_ar_tiles = []
      t_ar_tileRef = []
      repeat with i = 1 to t_rFloor.GetCount()
        tNode = t_rFloor[i]
        t_sClass = tNode.GetParam("CLASS")
        t_sX = tNode.GetParam("X")
        t_sY = tNode.GetParam("Y")
        t_sZ = tNode.GetParam("Z")
        t_vPos = vector(float(t_sX), float(t_sY), float(t_sZ))
        t_ar_tiles.append(t_vPos)
        t_ar_tileRef.append(tNode.GetParam("REF"))
      end repeat
      t_ar_floors[t_sFloorName] = [t_floorPos, t_ar_tiles, t_ar_tileRef]
      if not t_rIterator.NextToken() then
        exit repeat
      end if
    end repeat
  end if
  return t_ar_floors
end
on setFloors me, a_ar_floors
  m_ar_floors = [:]
  m_ar_tiles3D = []
  repeat with i = 1 to a_ar_floors.count
    t_vOffset = a_ar_floors[i][1]
    t_sFloorName = a_ar_floors.getPropAt(i)
    t_ar_floor = a_ar_floors[i][2].duplicate()
    repeat with t = 1 to t_ar_floor.count
      t_ar_floor[t] = t_ar_floor[t] + t_vOffset
    end repeat
    m_ar_floors[t_sFloorName] = t_ar_floor
  end repeat
  repeat with i = 1 to m_ar_floors.count
    repeat with t_vTile in m_ar_floors[i]
      m_ar_tiles3D.append(t_vTile.duplicate())
      m_ar_tiles2D.append(t_vTile.duplicate())
    end repeat
  end repeat
  repeat with t_vTile in m_ar_tiles2D
    t_vTile.z = 0
  end repeat
end
on setTileRefs me, a_ar_floors
  m_ar_tileRef = []
  repeat with t_ar_floor in a_ar_floors
    repeat with t_iRef in t_ar_floor[3]
      m_ar_tileRef.append(t_iRef)
    end repeat
  end repeat
end
on visualize2Dmap me
  cst = castLib(1)
  tmbr = new(#bitmap, cst)
  tmbr.regPoint = point(0, 0)
  tmbr.name = "tiles"
  t_iTileSize = 16
  t_rImg = image(1000, 1000, 32)
  t_rImg.fill(t_rImg.rect, [#shapeType: #rect, #color: rgb(220, 220, 250)])
  t_rImg.useAlpha = 1
  t_rTileImg = image(t_iTileSize, t_iTileSize, 32)
  t_rTileImg.fill(t_rTileImg.rect, [#shapeType: #rect, #color: rgb(255, 0, 0)])
  t_pOffset = point(300, 300)
  repeat with t_vPos in m_ar_tiles2D
    p1 = point(t_vPos.x, t_vPos.y) + t_pOffset
    p2 = p1 + point(t_iTileSize, t_iTileSize) + t_pOffset
    r1 = rect(p1, p1) + t_rTileImg.rect
    t_rImg.copyPixels(t_rTileImg, r1, t_rTileImg.rect, [#blendLevel: 32])
  end repeat
  repeat with t_vPos in m_ar_tiles2D
    x1 = point(t_vPos.x, t_vPos.y) + t_pOffset
    x2 = x1 + point(1, 1)
    t_rImg.fill(x1, x2, [#shapeType: #rect, #color: rgb(0, 0, 0)])
  end repeat
  repeat with t_linkDir in m_ar_links
    repeat with t_ar_Link in t_linkDir
      x1 = point(t_ar_Link[1].x, t_ar_Link[1].y) + t_pOffset
      x2 = point(t_ar_Link[2].x, t_ar_Link[2].y) + t_pOffset
      t_rImg.draw(x1, x2, [#shapeType: #line, #lineSize: 1, #color: rgb(0, 0, 0)])
    end repeat
  end repeat
  tmbr.image = t_rImg
  tmbr.regPoint = point(0, 0)
end
on AddFurniture me, a_ar_mp_elemProps, a_mp_mp_furniMap, t_ar_floors
  m_ar_furniture = []
  t_ar_furni2D = []
  t_ar_furni3D = []
  t_ar_furniRefs = []
  t_ar_furniType = []
  t_ar_blockMap = [:]
  repeat with tMap in a_mp_mp_furniMap
    t_ar_map = []
    repeat with t_Block in tMap[#map]
      t_ar_map.append([#x: value(t_Block["X"]), #y: value(t_Block["Y"])])
    end repeat
    t_ar_blockMap[string(tMap[#code])] = t_ar_map
  end repeat
  t_iFurniRef = 0
  repeat with tElement in a_ar_mp_elemProps
    t_iFurniRef = t_iFurniRef + 1
    t_ar_blocks = t_ar_blockMap[string(tElement.code)]
    t_ar_findMaxX = []
    t_ar_findMaxY = []
    repeat with t_ar_block in t_ar_blocks
      t_ar_findMaxX.append(t_ar_block.x)
      t_ar_findMaxY.append(t_ar_block.y)
    end repeat
    t_iMaxX = t_ar_findMaxX.max()
    t_iMaxY = t_ar_findMaxY.max()
    t_ar_rotated = []
    repeat with t_blk in t_ar_blocks
      t_rotBlk = rotateBlk(t_blk, tElement.Dir, t_iMaxX, t_iMaxY)
      t_ar_rotated.append(t_rotBlk)
    end repeat
    repeat with t_Block in t_ar_rotated
      t_vPos = tElement.pos + vector(t_Block.x * m_iTileSize, t_Block.y * m_iTileSize, 0)
      t_iPos = m_ar_tiles3D.getPos(t_vPos)
      if t_iPos > 0 then
        case tElement[#type] of
          #Door, #Coffin, #loop:
            t_vPos2D = t_vPos.duplicate()
            t_vPos2D.z = 0
            t_ar_furni2D.append(t_vPos2D)
            t_ar_furni3D.append(t_vPos)
            t_ar_furniRefs.append(t_iFurniRef)
            t_ar_furniType.append(tElement[#type])
          otherwise:
            m_ar_tiles3D.deleteAt(t_iPos)
            m_ar_tiles2D.deleteAt(t_iPos)
            m_ar_tileRef.deleteAt(t_iPos)

        end case
        next repeat
      end if
      put "Could NOT REMOVE block" && t_vPos
    end repeat
  end repeat
  m_ar_furniture = [t_ar_furni2D, t_ar_furni3D, t_ar_furniRefs, t_ar_furniType]
end
on getRoomLinks me, t_rContext
  t_ar_links = []
  t_ar_links.sort()
  t_rIterator = t_rContext.GetIterator("link")
  if t_rIterator.FirstToken() then
    repeat while 1
      t_rLink = t_rIterator.getToken()
      if not objectp(t_rLink) then
        exit repeat
      end if
      t_ar_Link = []
      repeat with i = 1 to t_rLink.GetCount()
        t_ar_Link.append(t_rLink[i].GetParam("REF"))
      end repeat
      t_ar_links.append(t_ar_Link)
      if not t_rIterator.NextToken() then
        exit repeat
      end if
    end repeat
  else
    t_roomXML = getThread("room").getComponent().m_rRoomXML
    if t_roomXML.Search("type", "LINKS") then
      repeat with i = 1 to t_roomXML.child.count
        t_ar_Link = []
        if t_roomXML[i].param.getaProp("CLASS") = "link" then
          repeat with c = 1 to t_roomXML[i].child.count
            t_ar_Link.append(t_roomXML[i].child[c].param.getaProp("REF"))
          end repeat
        end if
        t_ar_links.append(t_ar_Link)
      end repeat
    else
      put "Could not find links from room" && t_roomXML
    end if
  end if
  return t_ar_links
end
on links2positions me, t_rContext, i_ar_links
  t_ar_links = []
  repeat with t_ar_refs in i_ar_links
    t_ar_Link = []
    repeat with i = 1 to t_ar_refs.count
      t_iRef = integer(t_ar_refs[i])
      t_rTile = t_rContext._AccessIndexed(t_iRef, "tile")
      t_vPos = vector(0, 0, 0)
      t_floorPos = vector(0, 0, 0)
      if not voidp(t_rTile) then
        t_rFloor = t_rTile.GetOwner()
        if not voidp(t_rFloor) then
          t_x = float(t_rFloor.GetParam("X"))
          t_y = float(t_rFloor.GetParam("Y"))
          t_z = float(t_rFloor.GetParam("Z"))
          t_floorPos = vector(t_x, t_y, t_z)
        end if
        t_sX = t_rTile.GetParam("X")
        t_sY = t_rTile.GetParam("Y")
        t_sZ = t_rTile.GetParam("Z")
        t_vPos = vector(float(t_sX), float(t_sY), float(t_sZ))
      end if
      t_ar_Link.append(t_vPos + t_floorPos)
    end repeat
    t_ar_links.append(t_ar_Link)
  end repeat
  t_ar_sDirections = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  t_ar_final = []
  t_ar_final[1] = []
  t_ar_final[2] = []
  t_ar_final[3] = []
  t_ar_final[4] = []
  t_ar_final[5] = []
  t_ar_final[6] = []
  t_ar_final[7] = []
  t_ar_final[8] = []
  t_vOrigo = vector(0, 0, 1)
  t_vOrigo.normalize()
  repeat with t_ar_Link in t_ar_links
    v1 = t_ar_Link[1].duplicate()
    v2 = t_ar_Link[2].duplicate()
    v3 = v2 - v1
    v3.z = 0
    v3.normalize()
    a = DirectionFromVector(v3)
    d = integer(a + 22) / 45 + 1
    case d of
      0, 8:
        t_ar_final[1].append([v1, v2])
        t_ar_final[5].append([v2, v1])
      1:
        t_ar_final[2].append([v1, v2])
        t_ar_final[6].append([v2, v1])
      2:
        t_ar_final[3].append([v1, v2])
        t_ar_final[7].append([v2, v1])
      3:
        t_ar_final[4].append([v1, v2])
        t_ar_final[8].append([v2, v1])
      4:
        t_ar_final[5].append([v1, v2])
        t_ar_final[1].append([v2, v1])
      5:
        t_ar_final[6].append([v1, v2])
        t_ar_final[2].append([v2, v1])
      6:
        t_ar_final[7].append([v1, v2])
        t_ar_final[3].append([v2, v1])
      7:
        t_ar_final[8].append([v1, v2])
        t_ar_final[4].append([v2, v1])
      otherwise:
        t_ar_final[1].append([v1, v2])
        t_ar_final[5].append([v2, v1])

    end case
  end repeat
  t_count = 0
  repeat with t in t_ar_final
    t_count = t_count + t.count
  end repeat
  put t_ar_links.count && t_count
  return t_ar_final
end