## Why-did-you-computed

[![Greenkeeper badge](https://badges.greenkeeper.io/chiaweilee/....svg)](https://greenkeeper.io/)

### What happened?

see this.

```vue.js
data () {
    return {
      test: [0]
    }
  },
  computed: {
    whyComputed () {
      console.log('I computed!')
      return this.test[0]
    }
  },
  mounted () {
    setInterval(() => {
      this.test.push(1)
    }, 1000)
  }
```

### Why?

@yyx990803

This is due to a few things:

1. The watcher root.a keeps track of both root and root.a as dependencies. So when a new reactive property is added to root, the watcher will fire. This is designed to handle the case where root.a may not exist on initial watch and thus root.a won't be collected as a dependency.

2. When the watcher fires, if the new value and old value are both primitive and strictly equal, the watcher won't trigger the callback. However if the new value and old value are Objects or Arrays, then they may have been mutated, so we trigger the callback to be safe.

Long story short, we "over-fire" in some cases to ensure correctness of the entire system. This is a design constraint we are aware of, but in practice they won't lead to logical errors or critical perf problems.

So this is a wontfix for now, we may check to see if we can improve this when rewriting the reactivity system using Proxies.

[#5776](https://github.com/vuejs/vue/issues/5776)

### Install

```
npm install why-did-you-computed
```

```JavaScript
import Vue from 'vue'
import whyDidYouComputed from 'why-did-you-computed'

if (process.env.NODE_ENV !== 'production') {
    Vue.use(whyDidYouComputed)
}
```

### Console

you will get a warn message in `console` if any unnecessary computed run.

e.g: `Why did you computed? 'whyComputed' result did not change.`
