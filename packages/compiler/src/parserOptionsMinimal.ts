import {
  TextModes,
  ParserOptions,
  ElementNode,
  Namespaces
  // NodeTypes,
  // isBuiltInType
} from '@vue/compiler-core'
import { makeMap } from '@vue/shared'
import { isKnownView } from '@nativescript-vue/runtime'
// import { TRANSITION, TRANSITION_GROUP } from './runtimeHelpers'

const isRawTextContainer = /*#__PURE__*/ makeMap('style,script', true)

export const enum DOMNamespaces {
  HTML = Namespaces.HTML
}

export const parserOptionsMinimal: ParserOptions = {
  // return true for all?
  isVoidTag: makeMap(''),
  isNativeTag: isKnownView,
  // todo: return false?
  isPreTag: tag => tag === 'pre',

  isBuiltInComponent: (tag: string): symbol | undefined => {
    return undefined
    // if (isBuiltInType(tag, `Transition`)) {
    //   return TRANSITION
    // } else if (isBuiltInType(tag, `TransitionGroup`)) {
    //   return TRANSITION_GROUP
    // }
  },

  // todo: we might add support for different namespaces in the future
  // for example - it would be neat to be able to write inline svg
  // with the svg plugin?
  getNamespace(tag: string, parent: ElementNode | undefined): DOMNamespaces {
    return DOMNamespaces.HTML
  },

  // https://html.spec.whatwg.org/multipage/parsing.html#parsing-html-fragments
  getTextMode(tag: string, ns: DOMNamespaces): TextModes {
    // todo: look into if any of this would be useful in ns
    if (ns === DOMNamespaces.HTML) {
      if (tag === 'textarea' || tag === 'title') {
        return TextModes.RCDATA
      }
      if (isRawTextContainer(tag)) {
        return TextModes.RAWTEXT
      }
    }
    return TextModes.DATA
  }
}
