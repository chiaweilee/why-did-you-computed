<template>
  <div id="app">
    <div>test: {{ test }}</div>
    <div>computed: {{ whyComputed }} // test.slice(0, 5)</div>
    <div>computedCount: {{ computedCount }}</div>
    <div>watchCount: {{ watchCount }}</div>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      test: [0],
      computedCount: 0,
      watchCount: 0
    }
  },
  computed: {
    whyComputed () {
      this.computedCount += 1
      return this.test.slice(0, 5)
    }
  },
  watch: {
    whyComputed () {
      // console.log(arguments[0], arguments[1])
    },
    'test.0': {
      handler (to, from) {
        this.watchCount += 1
      },
      deep: true
    }
  },
  mounted () {
    setInterval(() => {
      this.test.push(parseInt(Math.random() * 10))
    }, 1000)
  }
}
</script>
