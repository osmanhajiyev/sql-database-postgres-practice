<template>
  <section class="user-view">
  <div class="content">
    <div class="subsection">
    <form style="margin: 15px 15px;">
      <div style="margin: 10px 0;">
        <span class="user-id">Employee ID: </span>
        <input type="text" :value="id" v-model="id"></input>
      </div>
      <div style="margin: 10px 0;">
        <span class="user-name">Name: </span>
        <input type="text" :value="name" v-model="name"></input>
      </div>
      <div style="margin: 10px 0;">
        <span class="user-union">Union ID: </span>
        <input type="text" :value="union" v-model="union"></input>
      </div>
      <div style="margin: 10px 0;">
        <span class="user-rate">Hourly rate: </span>
        <input type="text" :value="rate" v-model="rate"></input>
      </div>
      <div style="margin: 10px 0;">
        <span class="user-occupation">Occupation: </span>
        <input type="text" :value="occupation" v-model="occupation"></input>
      </div>
      <div style="margin: 10px 0;">
        <span class="user-sin">SIN: </span>
        <input type="text" :value="sin" v-model="sin"></input>
      </div>
      <div style="margin: 10px 0;">
        <span class="user-dept">Department ID: </span>
        <input type="text" :value="dept" v-model="dept"></input>
      </div>
    </form>
    <button type="button" class="button--grey" @click="submitInsert">Submit</button>
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
      title: `Register new employee`
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
  .user-id
    font-size 24px
    font-weight 500
    color #707070
  .user-name
    font-size 24px
    font-weight 500
    color #707070
  .user-union
    font-size 24px
    font-weight 500
    color #707070
  .user-rate
    font-size 24px
    font-weight 500
    color #707070
  .user-occupation
    font-size 24px
    font-weight 500
    color #707070
  .user-sin
    font-size 24px
    font-weight 500
    color #707070
  .user-dept
    font-size 24px
    font-weight 500
    color #707070
  a
    text-decoration underline
  &:hover
    color #515ec4

</style>
