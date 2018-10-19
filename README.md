# why-did-you-computed
when Vue is making unnecessary computed

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
