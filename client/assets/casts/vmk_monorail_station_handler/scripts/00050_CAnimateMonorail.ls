-- Movie Script
property mAnimationMembers
property pAnimating
property pCurrentAnimation
property pLeaveStationAnimation
property pLeaveStationAnimationFast
property pArriveAtStationAnimation
property pIndex
property pOffset

on construct me
  pIndex = 1
  pLeaveStationAnimation = script("CBezierAnimator").new(2600, 3.65371084213257, 200)
  pLeaveStationAnimation.p2 = point(-10, 0)
  pLeaveStationAnimation.p3 = point(0, 0)
  pLeaveStationAnimation.createCurvePoints()
  pLeaveStationAnimationFast = script("CBezierAnimator").new(2600, 3.65371084213257, 100)
  pLeaveStationAnimationFast.p2 = point(-10, 0)
  pLeaveStationAnimationFast.p3 = point(0, 0)
  pLeaveStationAnimationFast.createCurvePoints()
  pArriveAtStationAnimation = script("CBezierAnimator").new(1000, 3.65371084213257, 100)
  pArriveAtStationAnimation.p2 = point(1000, 0)
  pArriveAtStationAnimation.p3 = point(1000, 0)
  pArriveAtStationAnimation.createCurvePoints()
  mAnimationMembers = []
  pAnimating = 0
  pCurrentAnimation = [:]
  receiveUpdate(me.getID())
  pOffset = point(0, 0)
  return 1
end
on deconstruct me
  removeUpdate(me.getID())
  pSpeed = 0
  return 1
end
on leaveStation me
  pOffset = point(0, 0)
  pIndex = 1
  pCurrentAnimation = pLeaveStationAnimation.pCurvePoints
  pAnimating = 1
end
on leaveStationFast me
  pOffset = point(0, 0)
  pIndex = 1
  pCurrentAnimation = pLeaveStationAnimationFast.pCurvePoints
  pAnimating = 1
end
on approachStation me
  pIndex = 1
  pCurrentAnimation = pArriveAtStationAnimation.pCurvePoints
  tX = pCurrentAnimation.x[pCurrentAnimation.vertexCount]
  tY = pCurrentAnimation.y[pCurrentAnimation.vertexCount]
  pOffset = point(tX, tY)
  pAnimating = 1
end
on stopAnimating me
  pAnimating = 0
end
on update me
  if pAnimating then
    if pIndex < pCurrentAnimation.vertexCount then
      repeat with tMem in mAnimationMembers
        tX = pCurrentAnimation.x[pIndex]
        tY = pCurrentAnimation.y[pIndex]
        tMem.member.regPoint = tMem.regPoint - point(tX, tY) + pOffset
      end repeat
      pIndex = pIndex + 1
    else
      pAnimating = 0
    end if
  end if
end
on addAnimationMember me, i_memName
  put "Add" && i_memName
  tMem = [:]
  tMem[#member] = member(i_memName)
  tMem[#regPoint] = member(i_memName).regPoint
  tMem[#offset] = member(i_memName).regPoint
  mAnimationMembers.append(tMem)
end