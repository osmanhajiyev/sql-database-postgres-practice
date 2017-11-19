<template>
  <section class="timetable-view">
  <div class="content">
    <div class="subsection">
    <form style="margin: 15px 15px;">
      <div style="margin: 10px 0;">
        <span class="timetable-tstart">Travel Start: </span>
        <input type="datetime-local" :value="travel_start" v-model="travel_start"></input>
      </div>
      <div style="margin: 10px 0;">
        <span class="timetable-mstart">Meal Start: </span>
        <input type="datetime-local" :value="meal_time" v-model="meal_time"></input>
      </div>
      <div style="margin: 10px 0;">
        <span class="timetable-wtime">Wrap Time: </span>
        <input type="datetime-local" :value="wrap_time" v-model="wrap_time"></input>
      </div>
      <div style="margin: 10px 0;">
        <span class="timetable-tend">Travel End: </span>
        <input type="datetime-local" :value="travel_end" v-model="travel_end"></input>
      </div>
    </form>
    <button type="button" class="button--grey" @click="submitInsert">Add Timetable</button>
    </div>
  </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  employee_id: 'employee_id',
  asyncData ({ params, error }) {
    return axios.get('/api/employee/' + params.employee_id)
      .then((res) => {
        return { employee: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Employee not found' })
      })
  },
  data (params) {
    return {
      employee_id: '',
      travel_start: '',
      meal_time: '',
      wrap_time: '',
      travel_end: ''
    }
  },

  methods: {
    submitInsert (error) {
      let self = this

      axios.post('/api/employee/' + self.employee.employee_id + '/timetables/add', {
        headers:
          {
            'Content-Type': 'application/json'
          },
        data:
          {
            employee_id: self.employee.employee_id,
            travel_start: self.travel_start,
            meal_time: self.meal_time,
            wrap_time: self.wrap_time,
            travel_end: self.travel_end
          }})
        .then((res) => {
          // res.data should contain the url for redirecting... bad practice
          self.$nuxt.$router.replace({ path: res.data })
        })
        .catch((e) => {
          error({ statusCode: 404, message: 'INVALID DATA' })
        })
    }
  },

  head () {
    return {
      title: `Add New Timetable`
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
  .timetable-tstart
    font-size 24px
    font-weight 500
    color #707070
  .timetable-mstart
    font-size 24px
    font-weight 500
    color #707070
  .timetable-wtime
    font-size 24px
    font-weight 500
    color #707070
  .timetable-tend
    font-size 24px
    font-weight 500
    color #707070
  a
    text-decoration underline
  &:hover
    color #515ec4

</style>