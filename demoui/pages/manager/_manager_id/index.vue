<template>
  <section class="manager-view">
    <div class="content">
      <div class="subsection">
        <span class="manager-id" style="padding: 10px 0 10px 10px; margin: 10px 0 10px 0;">{{ manager.manager_id }}</span>
        <span class="manager-type" style="padding: 10px 10px; margin: 10px 0 10px 0;">{{ `(${manager.manager_type})` }}</span>
        <div class="action buttons">
          <nuxt-link class="button--grey" style="padding: 5px 20px; text-decoration: none;" to="/manager/hire">Hire Employee</nuxt-link>
          <nuxt-link class="button--grey" style="padding: 5px 20px; text-decoration: none;" to="/manager/fire">Fire Employee</nuxt-link>
          <nuxt-link class="button--grey" style="padding: 5px 20px; text-decoration: none;" to="/manager/edit">Edit Employee Data</nuxt-link>
        </div class="actions">
        <nuxt-link class="button--grey" style="padding: 5px 20px; text-decoration: none;" :to="{ path: `/manager/cp`, params: { manager_id: manager.manager_id }}">
          View Current Payments
        </nuxt-link>
        <nuxt-link class="button--grey" style="padding: 5px 20px; text-decoration: none;" :to="{ path: `/manager/dpSummary`, params: { manager_id: manager.manager_id }}">
          Department Summary
        </nuxt-link>
        <nuxt-link class="button--grey" style="padding: 5px 20px; text-decoration: none;" :to="{ path: `/manager/${manager.manager_id}/myTime`, params: { manager_id: manager.manager_id }}">
          Given Time Sheets
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  manager_id: 'manager_id',
  asyncData ({ params, error }) {
    return axios.get('/api/manager/' + params.manager_id)
      .then((res) => {
        return { manager: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Manager not found' })
      })
  },
  head () {
    return {
      title: `Manager: ${this.manager.manager_id}`
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
