'use strict';
export class Users {
    constructor(name, email) {
        this.avatar = '';
        this.avatarColor = '';
        this.name = name;
        this.email = email;
    }
    get getName() {
        return this.name;
    }
    get getEmail() {
        return this.email;
    }
    get getAvatar() {
        return this.avatar;
    }
    get getAvatarColor() {
        return this.avatarColor;
    }
    set setAvatarColor(avatarColor) {
        this.avatarColor = avatarColor;
    }
    set setAvatar(initial) {
        this.avatar = initial;
    }
}
Users.getInitial = (name, email) => {
    if (!name && !email)
        return 'The data can not be null!';
    const specialRegex = /[^a-zA-Z]/;
    const arrayFromName = name === null || name === void 0 ? void 0 : name.trim().split(" ");
    const arrayWithoutSpecialChars = arrayFromName
        ? arrayFromName
            .map(item => {
            let cleaned = "";
            item.split("").forEach(char => {
                if (!specialRegex.test(char)) {
                    cleaned += char;
                }
            });
            return cleaned.length > 3 ? cleaned : '';
        })
            .filter(Boolean)
        : [];
    if (name) {
        if (arrayWithoutSpecialChars.length == 2) {
            return (arrayWithoutSpecialChars[0][0].toUpperCase() +
                arrayWithoutSpecialChars[1][0].toUpperCase());
        }
        if (arrayWithoutSpecialChars.length > 2) {
            return (arrayWithoutSpecialChars[0][0].toUpperCase() +
                arrayWithoutSpecialChars[2][0].toUpperCase());
        }
        if ((arrayWithoutSpecialChars.length < 2 && arrayWithoutSpecialChars.length > 0)) {
            return arrayWithoutSpecialChars[0][0].toUpperCase();
        }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        const parts = email ? email.split(/[@._\-+]+/) : [];
        if (parts.length > 3) {
            return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
        }
        if (parts.length < 3 || !name) {
            return (parts[0][0].toUpperCase());
        }
    }
    if ((arrayWithoutSpecialChars === null || arrayWithoutSpecialChars === void 0 ? void 0 : arrayWithoutSpecialChars.length) === 1 && (arrayWithoutSpecialChars[0] !== null && arrayWithoutSpecialChars[0] !== undefined))
        return arrayWithoutSpecialChars[0][0].toUpperCase();
    return `Invalid data!`;
};
let user1 = new Users('Anton Katsarov', 'anton.katsarov@gmail.com');
let user2 = new Users('Anton Asenov Katsarov', '');
let user3 = new Users('anton asenov katsarov', '');
let user4 = new Users('!Anton', '');
let user5 = new Users('Anton', '');
let user6 = new Users('', 'anton.katsarov@creativiso.bg');
let user7 = new Users('3', 'anton.katsarov@creativiso.bg');
let user8 = new Users('123', 'invalidemail');
let user9 = new Users('  Anton   Katsarov  ', '123456');
let user10 = new Users('', '');
// let user11 = new Users(null, null);
let user12 = new Users('Anton    Katsarov', '');
let user13 = new Users('', 'John.Doe@EXAMPLE.COM');
console.log(Users.getInitial(user1.getName, user1.getEmail));
console.log(Users.getInitial(user2.getName, user2.getEmail));
console.log(Users.getInitial(user3.getName, user3.getEmail));
console.log(Users.getInitial(user4.getName, user4.getEmail));
console.log(Users.getInitial(user5.getName, user5.getEmail));
console.log(Users.getInitial(user6.getName, user6.getEmail));
console.log(Users.getInitial(user7.getName, user7.getEmail));
console.log(Users.getInitial(user8.getName, user8.getEmail));
console.log(Users.getInitial(user9.getName, user9.getEmail));
console.log(Users.getInitial(user10.getName, user10.getEmail));
// console.log(Users.getInitial(user11.getName, user11.getEmail));
console.log(Users.getInitial(user12.getName, user12.getEmail));
console.log(Users.getInitial(user13.getName, user13.getEmail));
