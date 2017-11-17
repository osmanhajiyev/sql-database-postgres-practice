<template>
  <section class="timetables-view">
    <div class="content">
      <div class="subsection">
        <div class="subsection-title" style="vertical-align: middle;text-align: center;">Timetables</div>
          <table style="list-style-type: none; padding: 0; margin: 0; width: 100%;">
            <tr>
              <th>Timetable ID</th>
              <th>Employee ID</th>
              <th>Travel Start</th>
              <th>Meal time</th>
              <th>Wrap time</th>
              <th>Travel end</th>
            </tr>
            <tr v-for="(timetable, index) in timetables" :key="index" style="padding: 10px 20px; margin: 0 25px; text-align: center; position: relative;">
              <td>{{ timetable.timetable_id }}</td>
              <td>{{ timetable.employee_id }}</td>
              <td>{{ timetable.travel_start }}</td>
              <td>{{ timetable.meal_time }}</td>
              <td>{{ timetable.wrap_time }}</td>
              <td>{{ timetable.travel_end }}</td>
            </tr>
          </table>
      </div>
          <nuxt-link class="button--grey" style="float: right; padding: 5px 20px; text-decoration: none;" :to="{ path: `/employee/${employee_id}/timetables/add`, params: { employee_id: employee_id }}">
            Add Timetable
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  employee_id: 'employee_id',
  asyncData ({ params, error }) {
    return axios.get('/api/employee/' + params.employee_id + '/timetables')
      .then((res) => {
        return { timetables: res.data.timetables, employee_id: res.data.employee_id }
      })
  },
  head () {
    return {
      title: `Timetables`
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
  .user-username
    font-size 24px
    font-weight 500
  .user-password
    font-size 24px
    font-weight 500
    color #707070
  a
    text-decoration underline
    &:hover
      color #515ec4

</style>
