const { GraphQLList, GraphQLID, GraphQLString } = require('graphql')
const { UserType, PostInputType, SubmissionType } = require('./types')
const { User, Post, Submission } = require('../models')


const users = {
    type: new GraphQLList(UserType),
    description: 'Query all users in the database',
    resolve(parent, args) {
        return User.find()
    }
}

//supposed to be get by POSTid, not just id?//
const postByID = {
    type: PostInputType,
    description: 'Query post by post id',
    args: {
        id: { type: GraphQLString}
    },
    async resolve(parent, args) {
        return Post.findbyId(args.id)
    }
}

const posts = {
    type: new GraphQLList(PostInputType),
    description: 'Query all posts in the database',
    resolve(parent, args) {
        return PostInputType.find()
    }
}

module.exports = { users, postByID, posts }