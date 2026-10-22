-- Score Script
property m_filmAmount
property m_storemember
property m_thumbmember
property m_lastphotorect
property m_photoid

on construct me
  m_storemember = member("PhotoImage")
  m_thumbmember = member("PhotoThumb")
  m_photoid = -1
  m_filmAmount = 0
  m_lastphotorect = rect(0, 0, 0, 0)
  return 1
end
on deconstruct me
  return 1
end
on countCS me, tImg
  tL = [3, 2, 73, 28, 83, 21, 43, 90, 92, 91, 37, 4, 3, 84, 12, 102, 103, 108, 97, 43, 44, 89, 109, 65, 61, -4, 76]
  tA = 0
  tW = tImg.width
  tH = tImg.height
  repeat with i = 1 to 100
    tA = (tA + tImg.getPixel(i mod tW, i * i mod tH).paletteIndex * tL[i mod tL.count + 1]) mod 85000
  end repeat
  return tA
end
on setLastPhotoRect me, a_rect
  m_lastphotorect = a_rect
end
on processImage me, a_img
  t_time = the milliSeconds
  tNu = image(a_img.width, a_img.height, 8, getMember("sepia_palette_camera"))
  repeat with y = 1 to a_img.height
    repeat with x = 1 to a_img.width
      tPixel = a_img.getPixel(x - 1, y - 1)
      tAvg = (tPixel.red + tPixel.green * 2 + tPixel.blue) / 4
      tNu.setPixel(x - 1, y - 1, (255 - tAvg) / 4 + 1)
    end repeat
  end repeat
  put "Camera.Component.processImage()" && the milliSeconds - t_time
  return tNu
end
on createThumb me, a_img
  tNu = image(80, 53, 8, getMember("sepia_palette_camera"))
  tHorzRatio = a_img.width / tNu.width
  tVertRatio = a_img.height / tNu.height
  repeat with y = 1 to tNu.height
    repeat with x = 1 to tNu.width
      tPixel = a_img.getPixel(x * tHorzRatio, y * tVertRatio)
      tNu.setPixel(x - 1, y - 1, tPixel)
    end repeat
  end repeat
  return tNu
end
on storePicture me, tText
  getBinaryManager().storePhotoCaption("SAVE_PICTURE_CAPTION /" & tText, me.getID())
end
on RegisterImage me, a_img, a_thumb
  m_storemember.image = a_img
  m_thumbmember.image = a_thumb
end
on getImage me
  return the image of m_storemember
end
on setFilmAmount me, a_iAmount
  m_filmAmount = a_iAmount
  me.getInterface().DisplayFilmAmount(m_filmAmount)
end
on GetFilmAmount me
  return m_filmAmount
end
on getPhotoID me
  return m_photoid
end
on thumbnailDataStored me, tContent
  put "Thumbnail stored succesfully" && "ID:" && tContent.word[1] && "Checksum:" && tContent.word[2]
  tCS = me.countCS(m_storemember.image)
  tdata = [#image: m_storemember.media, #time: the date && the time, #cs: tCS]
  getBinaryManager().storePhotoData(tdata, me.getID())
end
on binaryDataStored me, tContent
  put "Picture stored succesfully" && "ID:" && tContent.word[1] && "Checksum:" && tContent.word[2]
  me.setFilmAmount(m_filmAmount - 1)
  m_photoid = integer(tContent.word[1])
end
on captionReceived me, tSuccess
  if value(tSuccess.content) then
    put "Caption stored succesfully"
    tCS = me.countCS(m_thumbmember.image)
    tdata = [#image: m_thumbmember.media, #time: the date && the time, #cs: tCS]
    getBinaryManager().storeThumbData(tdata, me.getID())
  else
    put "Caption was invalid"
  end if
end