const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
    init: () => {
        // use Node.js with native Promise
        mongoose.Promise = global.Promise;
    
        // CONNECT TO MONGODB SERVER
        mongoose.connect('mongodb://localhost/blog')
            .then(() => console.log('Successfully connected to mongodb'))
            .then(() => {
                User.findById('salgum1112@gmail.com').then((user) => {
                    if (!user) {
                        const Admin = {
                            email: 'salgum1112@gmail.com',
                            username: 'salgum1112',
                            password: 'admin',
                            role: 'admin',
                            bio: '신규 프로젝트팀에서 업무를 하고 있습니다. 프로토타이핑 및 인터렉티브한 UI 제작 작업을을 좋아합니다. 최근에는 리엑트 컴포넌트 기반의 디자인 시스템에 관심이 많습니다.',
                        };
                        User.create(Admin);
                    }
                }).catch((error) => {
                    console.error(error);
                })
            })
            .catch(e => console.error(e));
    },
};