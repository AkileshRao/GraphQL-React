const User = require('../../models/user');
const bcrpyt = require('bcryptjs');

module.exports = {
    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email });
            if (existingUser) {
                throw new Error('User exists already.')
            }
            const hashedPassword = await bcrpyt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save();

            return { email: result.email, _id: result.id }
        }

        catch (err) {
            throw err;
        }
    },
}