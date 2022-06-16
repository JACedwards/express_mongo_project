const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLInt } = require('graphql')
const { QuestionInputType, AnswerInputType } = require('./types')
const { User, Quiz, Question, Submission } = require('../models')
const { createJwtToken } = require('../util/auth')


const register = {
    type: GraphQLString,
    args: {
        username:  {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    },

    async resolve(parent, args) {

        const checkUser = await User.findOne( { email: args. email })
        if (checkUser) {
            throw new Error("User with this email address already exists")
        }

        const { username, email, password } = args
        const user = new User({ username, email, password})

        await user.save()

        const token = createJwtToken(user)
        return token  
    }
}

const createPost = {
    type: GraphQLString,
    args: {
        postContent: {
           type: GraphQLString
        },
        postId:{
            type: GraphQLString
        },
        userId:{
            type: GraphQLString
        }
    },
    
    async resolve(parent, args) {
        const post = new post({
            postContent: args.postContent,
            postId: args.postId,
            userId: args.userId
        })
    },
}

const submitPost = {
    type: GraphQLString,
    args: {
        postContent: { 
            type: GraphQLString
        },
        userId: {
            type: GraphQLString
        },
        postId: {
            type: GraphQLString
        }
    },
    async resolve(parent, args) {
        const submission = new submission({
            postContent: args.postContent,
            postId: args.postId,
            userId: args.userId
        })
    },
}

module.exports = { register, createPost, submitPost }