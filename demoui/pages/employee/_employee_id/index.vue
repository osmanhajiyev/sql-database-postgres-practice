<template>
  <section class="employee-view">
    <div class="content">
      <div class="subsection">
      <br>
        <span class="employee-id" style="padding: 10px 0 10px 10px; margin: 10px 0 10px 0;">{{ `ID: ${employee.employee_id}` }}</span>
        <nuxt-link class="button--grey" style="position: relative; float: right; padding: 5px 20px; text-decoration: none;" :to="{ path: `/employee/${employee.employee_id}/calls`, params: { employee_id: employee.employee_id }}">
          View Calls
        </nuxt-link>
      </br>
      <br>
        <span class="employee-name" style="padding: 10px 10px; margin: 10px 0 10px 0;">{{ `Name: ${employee.name}` }}</span>
        <nuxt-link class="button--grey" style="position: relative; float: right; padding: 5px 20px; text-decoration: none;" :to="{ path: `/employee/${employee.employee_id}/timetables`, params: { employee_id: employee.employee_id }}">
          View Timetables
        </nuxt-link>
      </br>
      <br>
        <span class="employee-name" style="padding: 10px 10px; margin: 10px 0 10px 0;">{{ `Union ID: ${employee.union_id}` }}</span>
        <nuxt-link class="button--grey" style="float: right; padding: 5px 20px; text-decoration: none;" :to="{ path: `/employee/${employee.employee_id}/payments`, params: { employee_id: employee.employee_id }}">
          View Payment History
        </nuxt-link>
      </br>
      <br>
        <span class="employee-name" style="padding: 10px 10px; margin: 10px 0 10px 0;">{{ `Occupation: ${employee.occupation}` }}</span>
      </br>
      <br>
        <span class="employee-name" style="padding: 10px 10px; margin: 10px 0 10px 0;">{{ `SIN: ${employee.sin}` }}</span>
      </br>
      <br>
        <span class="employee-name" style="padding: 10px 10px; margin: 10px 0 10px 0;">{{ `Hourly rate: ${employee.hourly_rate}` }}</span>
      </br>
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
  head () {
    return {
      title: `Employee: ${this.employee.employee_id}`
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
