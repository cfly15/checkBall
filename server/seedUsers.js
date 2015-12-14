Meteor.startup(function () {
    var users = [
        {
            email: "cfly15@gmail.com",
            password: "abc123",
            roles: 'admin',
            profile: {
                firstName: "Colin",
                lastName: "Flynn"
            }
        }
    ];

    if (Meteor.users.find().count() === 0) {
        _.each(users, function (user) {
            var id = Accounts.createUser(user);
            Roles.addUsersToRoles(id, user.roles, Roles.GLOBAL_GROUP);
        });
    }

});
