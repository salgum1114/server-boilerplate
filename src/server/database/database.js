import mongoose from 'mongoose';
import admin from 'firebase-admin';

import User from '../models/user';

export default {
    init: () => {
        // use Node.js with native Promise
        mongoose.Promise = global.Promise;
    
        // CONNECT TO MONGODB SERVER
        mongoose.connect('mongodb://localhost/blog')
            .then(() => console.log('Successfully connected to mongodb'))
            .then(() => {
                admin.auth().createUser({
                    email: 'salgum1112@gmail.com',
                    password: 'salgum1112',
                    displayName: 'Admin',
                }).then((user) => {
                    User.findOneByEmail(user.email).then((findUser) => {
                        const Admin = {
                            uid: user.uid,
                            email: user.email,
                            displayName: user.displayName,
                            providerId: user.providerData[0].providerId,
                            photoURL: user.photoURL,
                            role: 'admin',
                            bio: '신규 프로젝트팀에서 업무를 하고 있습니다. 프로토타이핑 및 인터렉티브한 UI 제작 작업을을 좋아합니다. 최근에는 리엑트 컴포넌트 기반의 디자인 시스템에 관심이 많습니다.',
                        };
                        if (!findUser) {
                            User.create(Admin);
                        } else {
                            User.updateByEmail(user.email, Admin);
                        }
                    }).catch((e) => {
                        console.error(e);
                    });
                }).catch((error) => {
                    if (error.code === 'auth/email-already-exists') {
                        admin.auth().getUserByEmail('salgum1112@gmail.com').then((user) => {
                            User.findOneByEmail(user.email).then((findUser) => {
                                const Admin = {
                                    uid: user.uid,
                                    email: user.email,
                                    displayName: user.displayName,
                                    providerId: user.providerData[0].providerId,
                                    photoURL: user.photoURL,
                                    role: 'admin',
                                    bio: '신규 프로젝트팀에서 업무를 하고 있습니다. 프로토타이핑 및 인터렉티브한 UI 제작 작업을을 좋아합니다. 최근에는 리엑트 컴포넌트 기반의 디자인 시스템에 관심이 많습니다.',
                                };
                                if (!findUser) {
                                    User.create(Admin);
                                } else {
                                    User.updateByEmail(user.email, Admin);
                                }
                            }).catch((e) => {
                                console.error(e);
                            });
                        });
                    }
                });
            })
            .catch(e => console.error(e));
    },
};
