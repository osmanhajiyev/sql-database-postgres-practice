<template>
  <section class="timetables-view">
    <div class="content">
      <div class="subsection">
        <div style="margin: 25px 10px;">
          <span class="subsection-title" style="vertical-align: middle;">Timetables</span>
          <nuxt-link :to="{ path: `/employee/${employee_id}/timetables/add`, params: { employee_id: employee_id }}">
            Add Timetable
          </nuxt-link>
          <span style="vertical-align: right;">Timetable added successfully.</span>
        </div>
        <ul style="list-style-type: none; padding: 0; margin: 0;">
          <li v-for="(timetable, index) in timetables" :key="index" style="padding: 10px 20px; margin: 0 25px; position: relative;">
            {{timetable.employee_id + ' ' + timetable.timetable_id + ' ' + timetable.travel_start + ' ' + timetable.meal_time + ' ' + timetable.wrap_time + ' ' + timetable.travel_end }}
          </li>
        </ul>
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
        return { timetables: res.data, employee_id: res.data[0].employee_id }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'No timetables found.' })
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
