'use strict';

var axios = require('axios');

var furnitureApi = {
    url: 'URL',

    token: function token(_token) {
        if (_token) {
            this._token = _token;

            return;
        }

        return this._token;
    },
    registerUser: function registerUser(username, name, surname, email, password) {
        var _this = this;

        return Promise.resolve().then(function () {
            return axios.post(_this.url + '/users', { username: username, name: name, surname: surname, email: email, password: password });
        }).then(function (_ref) {
            var status = _ref.status,
                data = _ref.data;

            if (status !== 201) throw Error('unexpected response status ' + status + ' (' + data.status + ')');

            return true;
        }).catch(function (err) {
            if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

            if (err.response) {
                var message = err.response.data.error;


                throw Error(message);
            } else throw err;
        });
    },
    authenticateUser: function authenticateUser(email, password) {
        var _this2 = this;

        return Promise.resolve().then(function () {
            return axios.post(_this2.url + '/auth', { email: email, password: password }).then(function (_ref2) {
                var status = _ref2.status,
                    data = _ref2.data;

                if (status !== 200) throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                var _data$data = data.data,
                    id = _data$data.id,
                    token = _data$data.token;


                _this2.token(token);

                return data;
            });
        }).catch(function (err) {
            if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

            if (err.response) {
                var message = err.response.data.error;


                throw Error(message);
            } else throw err;
        });
    },
    retrieveUser: function retrieveUser(id) {
        var _this3 = this;

        return Promise.resolve().then(function () {
            return axios.get(_this3.url + '/users/' + id, { headers: { authorization: 'Bearer ' + _this3.token } }).then(function (_ref3) {
                var status = _ref3.status,
                    data = _ref3.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    unregisterUser: function unregisterUser(userId, email, password) {
        var _this4 = this;

        return Promise.resolve().then(function () {
            return axios.delete(_this4.url + '/users/' + userId, { data: { email: email, password: password }, headers: { authorization: 'Bearer ' + _this4.token } }).then(function (_ref4) {
                var status = _ref4.status,
                    data = _ref4.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    showItems: function showItems(categories) {
        var _this5 = this;

        return Promise.resolve().then(function () {
            return axios.get(_this5.url + '/' + categories);
        }).then(function (_ref5) {
            var status = _ref5.status,
                data = _ref5.data;

            if (status !== 200) throw Error('unexpected response status ' + status + ' (' + data.status + ')');

            return data.data;
        }).catch(function (err) {
            if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

            if (err.response) {
                var message = err.response.data.error;


                throw Error(message);
            } else throw err;
        });
    },
    showItem: function showItem(itemId) {
        var _this6 = this;

        return Promise.resolve().then(function () {
            return axios.get(_this6.url + '/users/orders/' + itemId);
        }).then(function (_ref6) {
            var status = _ref6.status,
                data = _ref6.data;

            if (status !== 200) throw Error('unexpected response status ' + status + ' (' + data.status + ')');

            return data.data;
        }).catch(function (err) {
            if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

            if (err.response) {
                var message = err.response.data.error;


                throw Error(message);
            } else throw err;
        });
    },
    listOrders: function listOrders(userId) {
        var _this7 = this;

        return Promise.resolve().then(function () {
            return axios.get(_this7.url + '/users/' + userId + '/orders', { headers: { authorization: 'Bearer ' + _this7.token() } });
        }).then(function (_ref7) {
            var status = _ref7.status,
                data = _ref7.data;

            if (status !== 200) throw Error('unexpected response status ' + status + ' (' + data.status + ')');

            return data.data;
        }).catch(function (err) {
            if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

            if (err.response) {
                var message = err.response.data.error;


                throw Error(message);
            } else throw err;
        });
    },
    newOrder: function newOrder(userId, deliveryAdress, creditCard, price, items) {
        var _this8 = this;

        return Promise.resolve().then(function () {
            return axios.post(_this8.url + '/users/' + userId + '/orders', { userId: userId, deliveryAdress: deliveryAdress, creditCard: creditCard, price: price, items: items }, { headers: { authorization: 'Bearer ' + _this8.token() } });
        }).then(function (_ref8) {
            var status = _ref8.status,
                data = _ref8.data;

            if (status !== 201) throw Error('unexpected response status ' + status + ' (' + data.status + ')');

            return data.data;
        }).catch(function (err) {
            if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

            if (err.response) {
                var message = err.response.data.error;


                throw Error(message);
            } else throw err;
        });
    }
};

module.exports = furnitureApi;

// newItem(title, image, description, color, category, stock, price) {
//     return Promise.resolve()
//         .then(() => {
//             return axios.post(`${this.url}/items`, { title, image, description, color, category, stock, price })
//         })
//         .then(({ status, data }) => {
//             if (status !== 201) throw Error(`unexpected response status ${status} (${data.status})`)

//             return true
//         })
//         .catch(err => {
//             if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

//             if (err.response) {
//                 const { response: { data: { error: message } } } = err

//                 throw Error(message)
//             } else throw err
//         })
// },
