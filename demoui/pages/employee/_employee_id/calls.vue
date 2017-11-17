<template>
  <section class="calls-view">
    <div class="content">
      <div class="subsection">
          <div class="subsection-title" style="vertical-align: middle;text-align: center;">Callsheets</div>
          <table style="list-style-type: none; padding: 0; margin: 0; width: 100%;">
            <tr>
              <th>Callsheet ID</th>
              <th>Manager Name</th>
              <th>Call time</th>
              <th>Call Location</th>
            </tr>
            <tr v-for="(call, index) in calls" :key="index" style="padding: 10px 20px; margin: 0 25px; text-align: center; position: relative;">
              <td>{{ call.sheet_id }}</td>
              <td>{{ call.mname }}</td>
              <td>{{ call.time }}</td>
              <td>{{ call.location }}</td>
            </tr>
          </table>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  employee_id: 'employee_id',
  asyncData ({ params, error }) {
    return axios.get('/api/employee/' + params.employee_id + '/calls')
      .then((res) => {
        return { calls: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'No calls found.' })
      })
  },
  head () {
    return {
      title: `Calls`
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
