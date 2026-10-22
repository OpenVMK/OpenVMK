-- Behavior
on rectToQuad a_rc
  return [point(the left of a_rc, the top of a_rc), point(the right of a_rc, the top of a_rc), point(the right of a_rc, the bottom of a_rc), point(the left of a_rc, the bottom of a_rc)]
end
on flipQuadH a_q
  return [a_q[2], a_q[1], a_q[4], a_q[3]]
end
on ClipAlphaHighValues a_image, a_iThreshold
  repeat with y = 1 to a_image.height
    repeat with x = 1 to a_image.width
      tVal = a_image.getPixel(x, y, #integer)
      if tVal > a_iThreshold then
        tVal = 255
      end if
      a_image.setPixel(x, y, tVal)
    end repeat
  end repeat
end
on ClipAlphaLowValues a_image, a_iThreshold
  repeat with y = 1 to a_image.height
    repeat with x = 1 to a_image.width
      tVal = a_image.getPixel(x, y, #integer)
      if tVal < a_iThreshold then
        tVal = 0
      end if
      a_image.setPixel(x, y, tVal)
    end repeat
  end repeat
end