import { unsetValue } from '@nativescript/core/ui/core/view'
import { fromAstNodes } from '@nativescript/core/ui/styling/css-selector'
import { SyntaxTree } from '@nativescript/core/css'
import { cssTreeParse } from '@nativescript/core/css/css-tree-parser'

import { INSVElement } from '../nodes'

type Style = string | null

export function patchStyle(el: INSVElement, prev: Style, next: Style) {
  if (!next) {
    el.removeAttribute('style')
  } else {
    if (prev) {
      // reset previous styles
      let localStyle = `local { ${prev} }`
      let ast: SyntaxTree = cssTreeParse(localStyle, undefined)
      const rulesets = fromAstNodes(ast.stylesheet.rules)

      rulesets[0].declarations.forEach(d => {
        let property = d.property as string
        ;(el.nativeView.style as any)[property] = unsetValue
      })
    }
    // set new styles
    el.style = next
  }
}