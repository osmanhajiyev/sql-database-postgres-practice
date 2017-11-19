<template>
  <section class="payments-view">
    <div class="content">
      <div class="subsection">
        <div class="subsection-title" style="vertical-align: middle;text-align: center;">People In Each Department</div>
          <table style="list-style-type: none; padding: 0; margin: 0; width: 100%;">
            <tr>
              <th>Number of People</th>
              <th>Department Name</th>
            </tr>
            <tr v-for="(x, index) in dp" :key="index" style="padding: 10px 20px; margin: 0 25px; text-align: center; position: relative;">
              <td>{{ x.peopleindept }}</td>
              <td>{{ x.dept_id }}</td>
            </tr>
          </table>
          </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  manager_id: 'manager_id',
  asyncData ({ params, error }) {
    return axios.get('/api/manager/dpSummary')
      .then((res) => {
        return { dp: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'No payment history found.' })
      })
  },
  head () {
    return {
      title: `People in Each Department`
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
  td
    text-align center
    margin center
  a
    text-decoration underline
    &:hover
      color #515ec4

</style>
