const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const bodyParser = require('body-parser')

const registerUser = require ('./user/register')
const authenticateUser = require ('./user/authenticate')
const updateUser = require ('./user/update')
const retrieveUser = require ('./user/retrieve')

// retrieve poll TODO

const newPoll = require('./poll/new-poll')
const votePoll = require('./poll/vote-poll')
const listAll = require('./poll/list-all')
const listApproved = require('./poll/list-approved')
const listExpired = require('./poll/list-expired')
const listPending = require('./poll/list-pending')
const listRejected = require('./poll/list-rejected')
const updatePoll = require('./poll/update-poll')
const changeStatus = require('./poll/change-status')

const router = Router()
const jsonBodyParser = bodyParser.json()

/* CITIZEN */
router.post('/auth', jsonBodyParser, authenticateUser)
router.post('/users', jsonBodyParser, registerUser)
router.patch ('/users', [tokenMiddleware, jsonBodyParser], updateUser)
router.get ('/users', [tokenMiddleware, jsonBodyParser], retrieveUser)

/* POLL */
router.post('/polls/newpoll', [tokenMiddleware, jsonBodyParser], newPoll)
router.patch ('/polls/:pollId/changestatus', [tokenMiddleware, jsonBodyParser], changeStatus)
router.patch ('/polls/:pollId/updatepoll', [tokenMiddleware, jsonBodyParser], updatePoll)
router.get('/polls/citypollsall/:targetCityId', [tokenMiddleware, jsonBodyParser], listAll)
router.get('/polls/citypollsapp/:targetCityId', [tokenMiddleware, jsonBodyParser], listApproved)
router.get('/polls/citypollsexp/:targetCityId', [tokenMiddleware, jsonBodyParser], listExpired)
router.get('/polls/citypollspen/:targetCityId', [tokenMiddleware, jsonBodyParser], listPending)
router.get('/polls/citypollsrej/:targetCityId', [tokenMiddleware, jsonBodyParser], listRejected)
router.patch('/polls/votepoll/:targetPollId', [tokenMiddleware, jsonBodyParser], votePoll)

// retrieve poll TODO
// retrieve user's poll

module.exports = router