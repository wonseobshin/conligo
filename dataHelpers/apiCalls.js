const wolf = require('./wolframProcessor');
const zomato = require('./zomatoProcessor');
module.exports = (knex) => {



    return (
        {
            newtodo: function (searchQuery, user, cb) {
                let category = '';
                wolf(searchQuery).then(function (result) {
                    if (result) {
                        category = result[0];
                        return category;
                    } else {
                        return false;
                    }
                }).then((result) => {
                    console.log(category);
                    if (!category) {
                        return zomato(searchQuery);
                    } else {
                        return false;
                    }
                }).then(function (result) {
                    console.log(category);
                    if (!result && !category) {
                        category = 'Product';
                    } else if (!category) {
                        category = result[0];
                        return category;
                    }
                }).then(() => {
                    const newTodoObj = {
                        name: searchQuery,
                        category: category
                    }
                    knex
                        .select("id")
                        .from("users")
                        .where("username", user)
                        .then((result) => {
                            knex('todos')
                                .insert([{ name: newTodoObj.name, category: newTodoObj.category, user_id: result[0].id }])
                                .catch((err) => {
                                    console.log(result, err)

                                }).then(cb)
                        });
                })
            },
            getProfilePic: function (user, cb) {
                knex
                .select("profile_pic")
                .from("users")
                .where("username", user)
                .then((results) => {
                    cb(results[0].profile_pic);
                })
            }

        }
    )
}



