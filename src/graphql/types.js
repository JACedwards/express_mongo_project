const { GraphQLObjectType, GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean, GraphQLFloat } = require('graphql')

const { User, Submission, Post } = require('../models')

const UserType = new GraphQLObjectType ({
    name: 'User',
    description: ' User type',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString},
        email: { type: GraphQLString},
        name: { type: GraphQLString},
        location: { type: GraphQLString},
        bio: { type: GraphQLString},
        favorite_food: { type: GraphQLString},
        posts: {
            type: GraphQLList(SubmissionType),
            resolve(parent, args) {
                return Submission.find({ userId: parent.id})
            }
        }


    }) 

})

const PostInputType = new GraphQLInputObjectType({
    name: 'PostInput',
    description: 'Post content input type for post submits',
    fields: () => ({
        userId: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
        },
        postContent: {
            type: String,
            required: true,
        },
        postTag: {
            type: String,
        },
        image: {
            type: String,
        }
    })
})


const SubmissionType = new GraphQLObjectType({
    name: 'Submission',
    description: 'Submission type',
    fields: () => ({
        id: { type: GraphQLID },
        postId: { type: GraphQLString},
        userId: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.userId)
                }
            },
        post: {
            type: PostInputType,
            resolve(parent, args) {
                returnPost.findById ( parent.postId)
            }

            }
        })

    })

    module.exports = {
        UserType,
        PostInputType,
        SubmissionType,
    }
