-- Script
property pMem
property pSpr

on construct this
  pMem = new(#text, castLib("bin"))
  pMem.name = "SpriteCounter"
  pMem.font = "Arial"
  pMem.wordWrap = 1
  pMem.rect = rect(0, 0, 267, 200)
  pMem.fontStyle = [#plain]
  pMem.fontSize = 20
  pMem.antialias = 1
  pMem.color = rgb(250, 250, 250)
  pSpr = sprite(reserveSprite())
  pSpr.member = pMem
  pSpr.locH = 760
  pSpr.locV = 1
  pSpr.locZ = 20000000
  pSpr.ink = 36
  createTimeout("SprLimitRefresh", 3000, #update, this.getID(), VOID, 0)
  this.update()
end
on deconstruct this
  releaseSprite(pSpr.spriteNum)
  pMem.erase()
  removeTimeout("SprLimitRefresh")
end
on setText this, a_sText
  pMem.text = a_sText
end
on update this
  this.setText(string(100 - getSpriteManager().getProperty(#freeSprCount) * 100 / _movie.lastChannel) & "%")
end