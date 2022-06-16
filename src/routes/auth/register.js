const axios = require('asiox')

module.exports = async (req, res ) => {
    const mutation = `
        mutations register($email: String!, $username:  String!, $password: String!) {
            register( email: $email, username: $username, password: $password )`

    if (req.body.password !== req.body.confirmPasswrod) {
        res.send({error: "Your passwords to not match" })
        return;
    }

    try {
        const { data} = await axios.post(process.env.GRAPHQL_ENDPOINT,
            {
                query: mutation,
                variables: {
                    email: req.body.email,
                    password: req.body.password,
                    username: req.body.username
                }
            });

        const jwtToken = data.data.register
        console.log(jwtToken)
        res.cookie('jwtToken', jwtToken,  {maxAge: 900000, httpOnly:  true});

        res.redirect('/')
    }catch(e) {
        console.log(e)
        res.redirect('/auth/register')
    }

}