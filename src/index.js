const assert = (same, why) => {
  if (!same) {
    console.warn(why)
  }
}

export default {
  install: function (Vue) {
    Vue.mixin({
      created () {
        if (!this._computedWatchers) return
        Object.keys(this._computedWatchers).forEach(computed => {
          this.$watch(computed, (t, f) => {
            const why = `Why did you computed? '${computed}' result did not change.`
            if (typeof t !== typeof f) return // ignore: different type
            if (typeof t === 'object') { // object
              if (t instanceof Array) { // array
                if (!(f instanceof Array)) return // ignore: t array, f not
                if (t.length !== f.length) return // ignore: both array, different length
                assert(!t.every((_t, i) => _t === f[i]), why)
              }
            } else {
              assert(t === f, why)
            }
          })
        })
      },
    })
  }
}
