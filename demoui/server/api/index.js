import { Router } from 'express'

import users from './users'
import employee from './employee'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(employee)

export default router
