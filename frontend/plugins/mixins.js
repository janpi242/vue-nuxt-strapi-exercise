import Vue from 'vue'

if (!Vue.__setChildrenEqualHeight_mixin__) {
  Vue.__setChildrenEqualHeight_mixin__ = true
  Vue.mixin({
    methods: {
      setChildrenEqualHeight(node) {
        const nodeChildren = Array.from(node.children)
        let highiest = 0
        const nodeClone = node.cloneNode(true)
        const nodeCloneChildren = Array.from(nodeClone.children)
        nodeClone.style.visibility = 'hidden'
        nodeClone.style.pointerEvents = 'none'
        node.parentNode.appendChild(nodeClone)
        nodeCloneChildren.forEach((child) => {
          child.style.removeProperty('height')
        })
        nodeCloneChildren.forEach((child) => {
          if (child.clientHeight > highiest) {
            highiest = child.clientHeight
          }
        })
        nodeClone.parentNode.removeChild(nodeClone)
        nodeChildren.forEach((child) => {
          child.style.height = `${highiest}px`
        })
      },
    },
  })
}
