-- Script
property m_kMode
property m_bValid
property m_bRunning
property m_rMovable
property m_rContext
property m_rIterator
property m_sLastOwner
property m_ptLastScrPos
property m_veLastScrPos
property m_rOriginalPlace

on construct this
  m_kMode = #null
  m_bValid = 0
  m_bRunning = 0
  m_rMovable = VOID
  m_rContext = VOID
  m_rIterator = VOID
  m_sLastOwner = EMPTY
  m_ptLastScrPos = point(0, 0)
  m_veLastScrPos = vector()
  m_rOriginalPlace = VOID
  registerMessage("place_element_start", this.getID(), #PlaceElement)
  registerMessage("move_element_start", this.getID(), #MoveElement)
  registerMessage("place_poster_start", this.getID(), #PlacePoster)
  registerMessage("move_poster_start", this.getID(), #MovePoster)
  registerMessage("room_leave", this.getID(), #NoPlacement)
  return 1
end
on deconstruct this
  m_kMode = #null
  m_bValid = 0
  m_bRunning = 0
  m_rMovable = VOID
  m_rContext = VOID
  m_rIterator = VOID
  m_sLastOwner = EMPTY
  unregisterMessage("place_element_start", this.getID())
  unregisterMessage("move_element_start", this.getID())
  unregisterMessage("place_poster_start", this.getID())
  unregisterMessage("move_poster_start", this.getID())
  unregisterMessage("room_leave", this.getID())
  return 1
end
on getMovable this
  return m_rMovable
end
on PlaceElement this, a_iCode
  if m_bRunning then
    error(this, "Object placer already running!", #PlaceElement)
    exit
  end if
  t_rStruct = getThread(#room).component.m_rFurniMap.GetByTypeCode(a_iCode)
  if integer(t_rStruct.param["CODE"]) <> a_iCode then
    error(this, "Item definition not found:" && a_iCode, #PlaceElement)
    exit
  end if
  t_rXML = CreateXML(getMember("room.object.element.xml").text)
  t_rXML.Search("type", "NODE")
  t_rXML.SetParam("TYPE", string(a_iCode))
  t_rXML.SetParam("DIR", string(3))
  t_rXML.SetParam("STRUCT", t_rStruct)
  t_rXML.SetParam("REF", -1)
  m_rContext = getThread(#room).component._AccessRoom()
  t_sKey = m_rContext.createKey()
  if m_rContext.GetContext().create(t_sKey, t_rXML) then
    m_rMovable = m_rContext.Access(t_sKey)
  else
    error(this, "Failed to create temp poster!!!", #PlaceElement)
    exit
  end if
  getObject("RoomItemAssetManager").LoadCastLibsForItem(m_rMovable)
  m_kMode = #Place
  m_bRunning = 1
  m_sLastOwner = EMPTY
  m_veLastScrPos = vector()
  m_ptLastScrPos = point(0, 0)
  m_rContext = m_rMovable.GetContext()
  m_rIterator = m_rContext.GetIterator("floor")
  createObject("RoomObjPlacerEventAgent", "CEventAgent")
  getObject("RoomObjPlacerEventAgent").registerEvent(this, #mouseUp, #StopPlacement)
  receiveUpdate(this.getID())
end
on MoveElement this, a_rMovable
  m_kMode = #move
  m_bRunning = 1
  m_rMovable = a_rMovable
  m_sLastOwner = EMPTY
  m_veLastScrPos = vector()
  m_ptLastScrPos = point(0, 0)
  m_rContext = m_rMovable.GetContext()
  m_rIterator = m_rContext.GetIterator("floor")
  m_rOriginalPlace = a_rMovable.GetFactor().GetTheTileStack()
  createObject("RoomObjPlacerEventAgent", "CEventAgent")
  getObject("RoomObjPlacerEventAgent").registerEvent(this, #mouseUp, #StopPlacement)
  receiveUpdate(this.getID())
end
on PlacePoster this, a_iCode
  if m_bRunning then
    error(this, "Poster placer already running!", #PlacePoster)
    exit
  end if
  t_rStruct = getThread(#room).component.m_rFurniMap.GetByTypeCode(a_iCode)
  if integer(t_rStruct.param["CODE"]) <> a_iCode then
    error(this, "Item definition not found:" && a_iCode, #PlacePoster)
    exit
  end if
  t_rXML = CreateXML(getMember("room.object.poster.xml").text)
  t_rXML.Search("type", "NODE")
  t_rXML.SetParam("TYPE", string(a_iCode))
  t_rXML.SetParam("DIR", string(3))
  t_rXML.SetParam("STRUCT", t_rStruct)
  t_rXML.SetParam("REF", -1)
  m_rContext = getThread(#room).component._AccessRoom()
  t_sKey = m_rContext.createKey()
  if m_rContext.GetContext().create(t_sKey, t_rXML) then
    m_rMovable = m_rContext.Access(t_sKey)
  else
    error(this, "Failed to create temp poster!!!", #PlacePoster)
    exit
  end if
  m_rContext = m_rMovable.GetContext()
  m_rIterator = m_rContext.GetIterator("wall")
  if m_rIterator.GetCount() > 0 then
    m_kMode = #Place
    m_bRunning = 1
    m_sLastOwner = EMPTY
    m_ptLastScrPos = point(0, 0)
    m_rMovable.GetFactor().PlaceTo(m_rIterator.getToken(), vector())
    m_rOriginalPlace = m_rMovable.GetRelPos()
    createObject("RoomObjPlacerEventAgent", "CEventAgent")
    getObject("RoomObjPlacerEventAgent").registerEvent(this, #mouseUp, #StopPlacement)
    receiveUpdate(this.getID())
  else
    m_rContext.GetContext().Remove(m_rMovable.GetKey())
    m_bValid = VOID
    m_rMovable = VOID
    m_bRunning = 0
    m_sLastOwner = EMPTY
    m_ptLastScrPos = point(0, 0)
  end if
end
on MovePoster this, a_rMovable
  m_kMode = #move
  m_bRunning = 1
  m_rMovable = a_rMovable
  m_sLastOwner = EMPTY
  m_ptLastScrPos = point(0, 0)
  m_rContext = m_rMovable.GetContext()
  m_rIterator = m_rContext.GetIterator("wall")
  m_rOriginalPlace = [#pos: m_rMovable.GetRelPos(), #owner: integer(m_rMovable.GetOwner().GetParam("REF"))]
  createObject("RoomObjPlacerEventAgent", "CEventAgent")
  getObject("RoomObjPlacerEventAgent").registerEvent(this, #mouseUp, #StopPlacement)
  receiveUpdate(this.getID())
end
on NoPlacement this
  if objectExists("RoomObjPlacerEventAgent") then
    this.StopPlacement()
  end if
end
on StopPlacement this, a_Abort
  t_sClass = m_rMovable.GetParam("CLASS")
  if m_bValid then
    removeObject("RoomObjPlacerEventAgent")
    removeUpdate(this.getID())
    t_rOwner = m_rContext.GetObjByKey(m_sLastOwner)
    if not a_Abort then
      if objectp(t_rOwner) then
        t_iOwner = integer(t_rOwner.GetParam("REF"))
        t_sClass = m_rMovable.GetParam("CLASS")
        case m_kMode of
          #move:
            executeMessage("move_" & t_sClass & "_end", t_iOwner, m_rMovable.GetRelPos())
          #Place:
            t_vePos = m_rMovable.GetRelPos()
            m_rContext.GetContext().Remove(m_rMovable.GetKey())
            executeMessage("place_" & t_sClass & "_end", t_iOwner, t_vePos)

        end case
      else
        executeMessage("place_" & m_rMovable.GetParam("CLASS") & "_failed")
      end if
    else
      m_rMovable.GetFactor().RemFromStack()
      t_rCopy = m_rOriginalPlace
      repeat while 1
        if t_rCopy.GetCount() > 0 then
          t_rCopy = t_rCopy[1]
          t_iStack = t_iStack + 1
          next repeat
        end if
        exit repeat
      end repeat
      if t_rCopy.GetParam("CLASS") = "tile" then
        t_bStackable = 1
      else
        t_bStackable = integer(t_rCopy.GetParam("STK"))
      end if
      if t_bStackable then
        m_rMovable.GetFactor().SetToTileStack(m_rOriginalPlace, t_iStack)
      end if
    end if
    m_bValid = VOID
    m_rMovable = VOID
    m_bRunning = 0
    m_sLastOwner = EMPTY
    m_ptLastScrPos = point(0, 0)
  else
    if t_sClass = "poster" then
      removeObject("RoomObjPlacerEventAgent")
      removeUpdate(this.getID())
      case m_kMode of
        #move:
          executeMessage("move_" & t_sClass & "_end", m_rOriginalPlace.owner, m_rOriginalPlace.pos)
        #Place:
          m_rContext.GetContext().Remove(m_rMovable.GetKey())
          executeMessage("place_" & t_sClass & "_failed")

      end case
      m_bValid = VOID
      m_rMovable = VOID
      m_bRunning = 0
      m_sLastOwner = EMPTY
      m_ptLastScrPos = point(0, 0)
    end if
  end if
end
on update this
  if m_bRunning then
    if objectp(m_rMovable) then
      case m_rMovable.GetParam("CLASS") of
        "element":
          this._UpdateElement()
        "poster":
          this._UpdatePoster()

      end case
    end if
  end if
end
on _UpdatePoster this
  if m_bRunning then
    if the mouseLoc <> m_ptLastScrPos then
      m_bValid = 0
      m_ptLastScrPos = the mouseLoc
      if m_rIterator.FirstToken() then
        repeat while 1
          t_rWall = m_rIterator.getToken()
          if voidp(t_rWall) then
            exit repeat
          end if
          if t_rWall.GetVisual().PointInside(m_ptLastScrPos) then
            m_rMovable.GetFactor().FloatAbove(t_rWall, m_ptLastScrPos)
            m_bValid = t_rWall.GetVisual().PlaneInside(m_rMovable)
            if m_bValid then
              m_sLastOwner = t_rWall.GetKey()
            end if
            exit repeat
          end if
          if not m_rIterator.NextToken() then
            exit repeat
          end if
        end repeat
        if not m_bValid then
          if objectp(t_rWall) then
            m_rMovable.GetFactor().FloatAround(m_ptLastScrPos)
          end if
        end if
      end if
    end if
  else
    removeUpdate(this.getID())
  end if
end
on _UpdateElement this
  if m_bRunning then
    if the mouseLoc <> m_ptLastScrPos then
      m_bValid = 0
      m_ptLastScrPos = the mouseLoc
      t_iX = m_ptLastScrPos.locH
      t_iY = m_ptLastScrPos.locV
      if m_rIterator.FirstToken() then
        repeat while 1
          t_rFloor = m_rIterator.getToken()
          if voidp(t_rFloor) then
            exit repeat
          end if
          t_rTile = t_rFloor.GetVisual().GetTileByScrLoc(t_iX, t_iY)
          if objectp(t_rTile) then
            t_veLoc = t_rTile.GetScrPos()
            m_bValid = 1
            t_iStack = 0
            if m_veLastScrPos <> t_veLoc then
              m_rMovable.GetFactor().RemFromStack()
              t_rCopy = t_rTile
              repeat while 1
                if t_rCopy.GetCount() > 0 then
                  t_rCopy = t_rCopy[1]
                  t_iStack = t_iStack + 1
                  next repeat
                end if
                exit repeat
              end repeat
              if t_rCopy.GetParam("CLASS") = "tile" then
                t_bStackable = 1
              else
                t_bStackable = integer(t_rCopy.GetParam("STK"))
              end if
              if t_bStackable then
                if m_rMovable.GetFactor().SetToTileStack(t_rTile, t_iStack) then
                  m_veLastScrPos = t_veLoc
                  m_sLastOwner = t_rTile.GetKey()
                end if
              end if
            end if
            exit repeat
          end if
          if not m_rIterator.NextToken() then
            exit repeat
          end if
        end repeat
      end if
    end if
  else
    removeUpdate(this.getID())
  end if
end