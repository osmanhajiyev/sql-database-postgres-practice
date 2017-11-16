import { Router } from 'express'

import users from './users'
import manager from './manager'
import employee from './employee'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(employee)
router.use(manager)

export default router
