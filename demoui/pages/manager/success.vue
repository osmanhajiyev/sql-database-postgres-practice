<template>
  <section class="user-view">
  <div class="content">
    <div class="subsection">
    <h1>SUCCESS!</h1>
    </div>
  </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {

  data () {
    return {
      id: '',
      name: '',
      union: '',
      rate: '',
      occupation: '',
      sin: '',
      dept: ''
    }
  },

  methods: {
    submitInsert () {
      let self = this

      axios.post('/api/manager/hire', {
        headers:
          {
            'Content-Type': 'application/json'
          },
        data:
          {
            id: self.id,
            name: self.name,
            union: self.union,
            rate: self.rate,
            occupation: self.occupation,
            sin: self.sin,
            dept: self.dept
          }})
        .then((res) => {
          // res.data should contain the url for redirecting... bad practice
          self.$nuxt.$router.replace({ path: res.data })
        })
        .catch((e) => {
          console.log(e)
        })
    }
  },

  head () {
    return {
      title: `SUCCESS`
    }
  }
}
</script>

<style lang="stylus" scoped>
.user-view
  padding-top 0

.content
  position absolute
  width 100%

.subsection
  background-color #fff
  border-radius 2px
  margin 25px 0
  transition all .5s cubic-bezier(.55,0,.1,1)
  padding 10px 30px 10px 30px
  position relative
  line-height 20px
  .subsection-title
    margin 25px 10px
    font-size 26px
    font-weight 500
  a
    text-decoration underline
  &:hover
    color #515ec4

</style>
