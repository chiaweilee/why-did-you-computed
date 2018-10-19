# why-did-you-computed
when Vue is making unnecessary computed

<a href="https://npmcharts.com/compare/why-did-you-computed?minimal=true"><img src="https://img.shields.io/npm/dm/why-did-you-computed.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/why-did-you-computed"><img src="https://img.shields.io/npm/v/why-did-you-computed.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/why-did-you-computed"><img src="https://img.shields.io/npm/l/why-did-you-computed.svg" alt="License"></a>

### Computed-Caching-vs-Methods

> *Computed properties are **cached based on their dependencies**. A computed property will only re-evaluate when some of its dependencies have changed.* . -- <a href="https://vuejs.org/v2/guide/computed.html#Computed-Caching-vs-Methods">vuejs.org</a>

### Unnecessary computed demo

```vue.js
export default {
  data () {
    return {
      rnd: []
    }
  },
  computed: {
    test () {
      console.log('computed!') // yes! it computed every second!
      return this.rnd[0]
    }
  },
  mounted () {} {
    setInterval(() => {
      this.rnd.push(Math.random())
    }, 1000)
  }
}
```

### Why to avoid it?

*Think about this..*

```vue.js
computed: {
  test () {
    // large CPU compute below
    [...].forEach(function (a) {
      a.forEach(function (b) {
      if (...) {
        ...
      } else {
        b.forEach(
          ...
          return this.rnd[0]
        )
      }
      })
    })
  }
}
```

### My resolve way (not the best)

```
npm install why-did-you-computed
```

```js
import Vue from 'vue'
import whyDidYouComputed from 'vue-did-you-computed'
Vue.use(whyDidYouComputed)
```

```vue.js
computed: {
    test () {
      // return this.rnd[0] // normal code
      return this.$whyDidYouComputed(this.rnd[0])(function (rnd) {
        // read 'usage' please
        return rnd
      })
    }
  },
```

### Usage

```js
this.$whyDidYouComputed(/* all dependencies you wanna use here */this.test1, this.test2, this.test3)
  (function (test1, test2, test3) { // this.test1 -> argument[0], this.test2 -> argument[1] ...
    // better ES5 function here
    // this === null
    // Do not use this.test
    // Do not use Math.random, new Date()...
    // Do not use any values out side of this function (use arguments only)
    // keep this function pure!
  })
```

### Pure function
> *In computer programming, a pure function is a function that has the following properties:

> *Its return value is the same for the same arguments (no variation with local static variables, non-local variables, mutable reference arguments or input streams from I/O devices).*

> *Its evaluation has no side effects (no mutation of local static variables, non-local variables, mutable reference arguments or I/O streams).*
