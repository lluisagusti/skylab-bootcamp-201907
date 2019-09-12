const logic = require('../..')
const { expect } = require('chai')
const { models , mongoose } = require('democratum-data')
const { User, Poll } = models

describe('logic - vote poll', () => {
    before(() => mongoose.connect('mongodb://localhost/democratum-test',  { useNewUrlParser: true }))

    let cityPollId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus, pollId
    let cityUserId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole, userId

    let vote

    beforeEach(async() => {
        //await Poll.deleteMany()
        //await User.deleteMany()

        cityId = `VOTEPOLL-${Math.random()}`
        authorId = `vehmodel-${Math.random()}`
        question = `question-${Math.random()}`
        optionA = `optiona-${Math.random()}`
        optionB = `optionb-${Math.random()}`
        description = `description-${Math.random()}`
        expiryDate = new Date()
        imagePoll = `image-${Math.random()}`
        positives = 1
        negatives = 1
        pollStatus = 'pending'

        fullname = `VOTEUSER-${Math.random()}`
        address = `address-${Math.random()}`
        documentId = `documentid-${Math.random()}@domain.com`
        email = `email@-${Math.random()}.com`
        imgDocId = `imgdocid-${Math.random()}`
        password= `password-${Math.random()}`
        participatedPolls = `partipolls-${Math.random()}`
        proposedPolls = ['k89236423894y2348', '12323']
        userRole = 'citizen'

        const user = await User.create({cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole})
        userId = user.id

        /* const poll = await Poll.create({ cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus })
        pollId = poll.id */

        const poll = new Poll ({ cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus, pollId })

        await poll.save()
        pollId = poll.id

    })
    
    it('should succeed on positive vote', async () => {
        const result = await logic.votePoll(pollId, userId, 'positive')

        expect(result).to.exist

        const poll = await Poll.findById(pollId)
        expect(poll).to.exist
        expect(poll.positives).to.equal(++positives)
    })

    it('should succeed on negative vote', async () => {
        const result = await logic.votePoll(pollId, userId, 'negative')

        expect(result).to.exist

        const poll = await Poll.findById(pollId)
        expect(poll).to.exist
        expect(poll.negatives).to.equal(++negatives)
    })



     it('should fail on empty targetPollId', () =>
    expect(() =>
    logic.votePoll('', userId, vote)
    ).to.throw('targetPollId is empty or blank')
    )

    it('should fail on undefined targetPollId', () =>
        expect(() =>
        logic.votePoll(undefined, userId, vote)
        ).to.throw(`targetPollId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
    expect(() =>
    logic.votePoll(123, userId, vote)
    ).to.throw(`targetPollId with value 123 is not a string`)
    )

    it('should fail on empty userId', () =>
    expect(() =>
    logic.votePoll(pollId, '', vote)
    ).to.throw('userId is empty or blank')
    )

    it('should fail on undefined userId', () =>
        expect(() =>
        logic.votePoll(pollId, undefined, vote)
        ).to.throw(`userId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
    expect(() =>
    logic.votePoll(pollId, 123, vote)
    ).to.throw(`userId with value 123 is not a string`)
    )

    it('should fail on empty vote', () =>
    expect(() =>
    logic.votePoll(pollId, userId, '')
    ).to.throw('vote is empty or blank')
    )

    it('should fail on undefined vote', () =>
        expect(() =>
        logic.votePoll(pollId, userId, undefined)
        ).to.throw(`vote with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
    expect(() =>
    logic.votePoll(pollId, userId, 123)
    ).to.throw(`vote with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})