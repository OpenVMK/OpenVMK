-- Movie Script
property cameraLens
property greyCamera
property sepiaCamera
property pBlack
property pOffset
property m_sCameraWindowName
property m_sViewFinderName
property m_bActive

on construct me
  tW = 184
  tH = 123
  pOffset = rect(0, 0, tW, tH)
  cameraLens = image(tW, tH, 32)
  greyCamera = image(tW, tH, 8, member("sepia_palette_camera"))
  pBlack = image(tW, tH, 32)
  pBlack.fill(pBlack.rect, [#shapeType: #rect, #color: rgb("#000000")])
  m_sCameraWindowName = "VMKCamera"
  m_sViewFinderName = "camera.picture"
  m_bActive = 0
end
on removeFriendListUpdate me
end
on setActive me, t_active
  m_bActive = t_active
end
on updateViewFinder me
  if m_bActive then
    tWndObj = getWindow(m_sCameraWindowName)
    if tWndObj <> 0 then
      tElem = tWndObj.getElement(m_sViewFinderName)
      if tElem <> 0 then
        pOffset = tElem.pSprite.rect
        me.liveFeed()
        _movie.stage.image.copyPixels(greyCamera, pOffset, greyCamera.rect)
      end if
    end if
  end if
end
on SetOffset me
  tW = cameraLens.width / 2
  tH = cameraLens.height / 2
  tX = max(tW, min(the mouseH, _movie.stage.rect.width - tW))
  tY = max(tH, min(the mouseV, _movie.stage.rect.height - tH))
  pOffset = rect(tX - tW, tY - tH, tX + tW, tY + tH)
end
on liveFeed me
  cameraLens.copyPixels(_movie.stage.image, cameraLens.rect, pOffset)
  greyCamera.copyPixels(cameraLens, cameraLens.rect, cameraLens.rect, [#dither: 1215])
end