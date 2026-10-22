-- Script
property m_rGameEngine

on construct me
  return 1
end
on deconstruct me
  return 1
end
on testForObjectToObjectCollision me, i_rThisObject, i_rOtherObject
  if i_rThisObject = i_rOtherObject then
    exit
  end if
  case i_rOtherObject.GetParam("BoundsType") of
    #none:
      return 0
    #point:
      case i_rThisObject.GetParam("BoundsType") of
        #none:
          return 0
        #point:
          return 0
        #circle:
          return me.TestPointToCircleCollision(i_rOtherObject, i_rThisObject)
        #triplecircle:
          return me.TestPointToTripleCircleCollision(i_rOtherObject, i_rThisObject)
        #box:
          return me.TestPointToBoxCollision(i_rOtherObject, i_rThisObject)

      end case
    #circle:
      case i_rThisObject.GetParam("BoundsType") of
        #none:
          return 0
        #point:
          return me.TestPointToCircleCollision(i_rThisObject, i_rOtherObject)
        #circle:
          return me.TestCircleToCircleCollision(i_rThisObject, i_rOtherObject)
        #triplecircle:
          return me.TestCircleToTripleCircleCollision(i_rOtherObject, i_rThisObject)
        #box:
          return 0

      end case
    #triplecircle:
      case i_rThisObject.GetParam("BoundsType") of
        #none:
          return 0
        #point:
          return me.TestPointToTripleCircleCollision(i_rThisObject, i_rOtherObject)
        #circle:
          return me.TestCircleToTripleCircleCollision(i_rThisObject, i_rOtherObject)
        #triplecircle:
          return me.TestTripleCircleToTripleCircleCollision(i_rThisObject, i_rOtherObject)
        #box:
          return 0

      end case
    #box:
      case i_rThisObject.GetParam("BoundsType") of
        #none:
          return 0
        #point:
          return me.TestPointToBoxCollision(i_rThisObject, i_rOtherObject)
        #circle:
          return 0
        #triplecircle:
          return 0
        #box:
          return 0

      end case

  end case
  return 0
end
on TestPointToCircleCollision me, i_rThisObject, i_rOtherObject
  distanceX = i_rOtherObject.GetParam("WorldPosition").x - i_rThisObject.GetParam("WorldPosition").x
  if distanceX < 0 then
    distanceX = -distanceX
  end if
  distanceY = i_rOtherObject.GetParam("WorldPosition").y - i_rThisObject.GetParam("WorldPosition").y
  if distanceY < 0 then
    distanceY = -distanceY
  end if
  if sqrt(distanceX * distanceX + distanceY * distanceY) < i_rOtherObject.GetParam("BoundingCircleRadius") then
    return 1
  else
    return 0
  end if
end
on TestCircleToCircleCollision me, i_rThisObject, i_rOtherObject
  distanceX = i_rOtherObject.GetParam("WorldPosition").x - i_rThisObject.GetParam("WorldPosition").x
  if distanceX < 0 then
    distanceX = -distanceX
  end if
  distanceY = i_rOtherObject.GetParam("WorldPosition").y - i_rThisObject.GetParam("WorldPosition").y
  if distanceY < 0 then
    distanceY = -distanceY
  end if
  if sqrt(distanceX * distanceX + distanceY * distanceY) < i_rOtherObject.GetParam("BoundingCircleRadius") then
    return 1
  end if
  collisionDistance = i_rOtherObject.GetParam("BoundingCircleRadius") + i_rThisObject.GetParam("BoundingCircleRadius")
  if distanceY < collisionDistance and distanceX < collisionDistance then
    if sqrt(distanceX * distanceX + distanceY * distanceY) < collisionDistance then
      return 1
    end if
  end if
  return 0
end
on TestPointToTripleCircleCollision me, i_rThisObject, i_rOtherObject
  t_rGameEngine = getThread(#minigame).getComponent()
  t_rVelTable = t_rGameEngine.GetVelocityTable()
  tThisPos = i_rThisObject.GetParam("WorldPosition")
  tOtherPos = i_rOtherObject.GetParam("WorldPosition")
  tOtherDir = i_rOtherObject.GetParam("Direction")
  distanceX = abs(tOtherPos.x - tThisPos.x)
  if distanceX > i_rOtherObject.GetParam("LargestRadius") then
    return 0
  end if
  distanceY = abs(tOtherPos.y - tThisPos.y)
  if distanceY > i_rOtherObject.GetParam("LargestRadius") then
    return 0
  end if
  circle1X = tOtherPos.x + t_rVelTable.GetBaseVelX(tOtherDir) * i_rOtherObject.GetParam("1stOffset") / 256
  circle1Y = tOtherPos.y + t_rVelTable.GetBaseVelY(tOtherDir) * i_rOtherObject.GetParam("1stOffset") / 256
  if me.testDistance(circle1X, circle1Y, tThisPos.x, tThisPos.y, i_rOtherObject.GetParam("1stRadius")) then
    return 1
  end if
  if me.testDistance(tOtherPos.x, tOtherPos.y, tThisPos.x, tThisPos.y, i_rOtherObject.GetParam("2ndRadius")) then
    return 1
  end if
  circle3X = tOtherPos.x + t_rVelTable.GetBaseVelX(tOtherDir) * i_rOtherObject.GetParam("3rdOffset") / 256
  circle3Y = tOtherPos.y + t_rVelTable.GetBaseVelY(tOtherDir) * i_rOtherObject.GetParam("3rdOffset") / 256
  if me.testDistance(circle3X, circle3Y, tThisPos.x, tThisPos.y, i_rOtherObject.GetParam("3rdRadius")) then
    return 1
  end if
  return 0
end
on TestCircleToTripleCircleCollision me, i_rThisObject, i_rOtherObject
  t_rGameEngine = getThread(#minigame).getComponent()
  t_rVelTable = t_rGameEngine.GetVelocityTable()
  tThisPos = i_rThisObject.GetParam("WorldPosition")
  tOtherPos = i_rOtherObject.GetParam("WorldPosition")
  tOtherDir = i_rOtherObject.GetParam("Direction")
  distanceX = abs(tOtherPos.x - tThisPos.x)
  if distanceX > i_rThisObject.GetParam("BoundingCircleRadius") + i_rOtherObject.GetParam("LargestRadius") then
    return 0
  end if
  distanceY = abs(tOtherPos.y - tThisPos.y)
  if distanceY > i_rThisObject.GetParam("BoundingCircleRadius") + i_rOtherObject.GetParam("LargestRadius") then
    return 0
  end if
  circle1X = tOtherPos.x + t_rVelTable.GetBaseVelX(tOtherDir) * i_rOtherObject.GetParam("1stOffset") / 256
  circle1Y = tOtherPos.y + t_rVelTable.GetBaseVelY(tOtherDir) * i_rOtherObject.GetParam("1stOffset") / 256
  if me.testDistance(circle1X, circle1Y, tThisPos.x, tThisPos.y, i_rThisObject.GetParam("BoundingCircleRadius") + i_rOtherObject.GetParam("1stRadius")) then
    return 1
  end if
  if me.testDistance(tOtherPos.x, tOtherPos.y, tThisPos.x, tThisPos.y, i_rThisObject.GetParam("BoundingCircleRadius") + i_rOtherObject.GetParam("2ndRadius")) then
    return 1
  end if
  circle3X = tOtherPos.x + t_rVelTable.GetBaseVelX(tOtherDir) * i_rOtherObject.GetParam("3rdOffset") / 256
  circle3Y = tOtherPos.y + t_rVelTable.GetBaseVelY(tOtherDir) * i_rOtherObject.GetParam("3rdOffset") / 256
  if me.testDistance(circle3X, circle3Y, tThisPos.x, tThisPos.y, i_rThisObject.GetParam("BoundingCircleRadius") + i_rOtherObject.GetParam("3rdRadius")) then
    return 1
  end if
  return 0
end
on TestTripleCircleToTripleCircleCollision me, i_rThisObject, i_rOtherObject
  t_rGameEngine = getThread(#minigame).getComponent()
  t_rVelTable = t_rGameEngine.GetVelocityTable()
  tThisPos = i_rThisObject.GetParam("WorldPosition")
  tOtherPos = i_rOtherObject.GetParam("WorldPosition")
  tThisDir = i_rThisObject.GetParam("Direction")
  tOtherDir = i_rOtherObject.GetParam("Direction")
  distanceX = abs(tOtherPos.x - tThisPos.x)
  if distanceX > i_rThisObject.GetParam("LargestRadius") + i_rOtherObject.GetParam("LargestRadius") then
    return 0
  end if
  distanceY = abs(tOtherPos.y - tThisPos.y)
  if distanceY > i_rThisObject.GetParam("LargestRadius") + i_rOtherObject.GetParam("LargestRadius") then
    return 0
  end if
  circle1aX = tThisPos.x + t_rVelTable.GetBaseVelX(tThisDir) * i_rThisObject.GetParam("1stOffset") / 256
  circle1aY = tThisPos.y + t_rVelTable.GetBaseVelY(tThisDir) * i_rThisObject.GetParam("1stOffset") / 256
  circle1bX = tOtherPos.x + t_rVelTable.GetBaseVelX(tOtherDir) * i_rOtherObject.GetParam("1stOffset") / 256
  circle1bY = tOtherPos.y + t_rVelTable.GetBaseVelY(tOtherDir) * i_rOtherObject.GetParam("1stOffset") / 256
  if me.testDistance(circle1aX, circle1aY, circle1bX, circle1bY, i_rThisObject.GetParam("1stRadius") + i_rOtherObject.GetParam("1stRadius")) then
    return 1
  end if
  if me.testDistance(tThisPos.x, tThisPos.y, circle1bX, circle1bY, i_rThisObject.GetParam("2ndRadius") + i_rOtherObject.GetParam("1stRadius")) then
    return 1
  end if
  if me.testDistance(circle1aX, circle1aY, tOtherPos.x, tOtherPos.y, i_rThisObject.GetParam("1stRadius") + i_rOtherObject.GetParam("2ndRadius")) then
    return 1
  end if
  circle3bX = tOtherPos.x + t_rVelTable.GetBaseVelX(tOtherDir) * i_rOtherObject.GetParam("3rdOffset") / 256
  circle3bY = tOtherPos.y + t_rVelTable.GetBaseVelY(tOtherDir) * i_rOtherObject.GetParam("3rdOffset") / 256
  if me.testDistance(circle1aX, circle1aY, circle3bX, circle3bY, i_rThisObject.GetParam("1stRadius") + i_rOtherObject.GetParam("3rdRadius")) then
    return 1
  end if
  if me.testDistance(tThisPos.x, tThisPos.y, circle3bX, circle3bY, i_rThisObject.GetParam("2ndRadius") + i_rOtherObject.GetParam("3rdRadius")) then
    return 1
  end if
  if me.testDistance(tThisPos.x, tThisPos.y, tOtherPos.x, tOtherPos.y, i_rThisObject.GetParam("2ndRadius") + i_rOtherObject.GetParam("2ndRadius")) then
    return 1
  end if
  circle3aX = tThisPos.x + t_rVelTable.GetBaseVelX(tThisDir) * i_rThisObject.GetParam("3rdOffset") / 256
  circle3aY = tThisPos.y + t_rVelTable.GetBaseVelY(tThisDir) * i_rThisObject.GetParam("3rdOffset") / 256
  if me.testDistance(circle3aX, circle3aY, circle1bX, circle1bY, i_rThisObject.GetParam("3rdRadius") + i_rOtherObject.GetParam("1stRadius")) then
    return 1
  end if
  if me.testDistance(circle3aX, circle3aY, tOtherPos.x, tOtherPos.y, i_rThisObject.GetParam("3rdRadius") + i_rOtherObject.GetParam("2ndRadius")) then
    return 1
  end if
  circle3bX = tOtherPos.x + t_rVelTable.GetBaseVelX(tOtherDir) * i_rOtherObject.GetParam("3rdOffset") / 256
  circle3bY = tOtherPos.y + t_rVelTable.GetBaseVelY(tOtherDir) * i_rOtherObject.GetParam("3rdOffset") / 256
  if me.testDistance(circle3aX, circle3aY, circle3bX, circle3bY, i_rThisObject.GetParam("3rdRadius") + i_rOtherObject.GetParam("3rdRadius")) then
    return 1
  end if
  return 0
end
on TestPointToBoxCollision me, i_rThisObject, i_rOtherObject
  ar_bounds = i_rOtherObject.GetParam("BoxDimensions")
  tMyPos = i_rThisObject.GetParam("WorldPosition")
  tOtherPos = i_rOtherObject.GetParam("WorldPosition")
  if tMyPos.x > tOtherPos.x + ar_bounds[1].x and tMyPos.x < tOtherPos.x + ar_bounds[2].x and tMyPos.y > tOtherPos.y + ar_bounds[1].y and tMyPos.y < tOtherPos.y + ar_bounds[2].y then
    return 1
  end if
  return 0
end
on testDistance me, i_pos1X, i_pos1Y, i_pos2X, i_pos2Y, i_distance
  distX = abs(i_pos2X - i_pos1X)
  distY = abs(i_pos2Y - i_pos1Y)
  if distX > i_distance or distY > i_distance then
    return 0
  else
    if distX * distX + distY * distY < i_distance * i_distance then
      return 1
    end if
  end if
  return 0
end