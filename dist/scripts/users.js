var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Users } from "./main.js";
let users;
const AVATAR_COLORS = [
    "#1ABC9C", // turquoise
    "#2ECC71", // emerald
    "#3498DB", // peter river
    "#9B59B6", // amethyst
    "#34495E", // wet asphalt
    "#16A085", // green sea
    "#27AE60", // nephritis
    "#2980B9", // belize hole
    "#8E44AD", // wisteria
    "#2C3E50" // midnight blue
];
const MIN_ASCII = 130;
const MAX_ASCII = 180;
const STEP = 5;
const colorizeAvatar = function (initials) {
    if (!initials || (initials === null || initials === void 0 ? void 0 : initials.length) < 2) {
        return '';
    }
    const value = (initials === null || initials === void 0 ? void 0 : initials.charCodeAt(0)) + (initials === null || initials === void 0 ? void 0 : initials.charCodeAt(1));
    // switch (true) {
    //     case value >= 130 && value < 135:
    //         user.setAvatarColor = AVATAR_COLORS[0];
    //         console.log('Matched: 130-134');
    //         break;
    //     case value >= 135 && value < 140:
    //         user.setAvatarColor = AVATAR_COLORS[1];
    //         console.log('Matched: 135-139');
    //         break;
    //     case value >= 140 && value < 145:
    //         user.setAvatarColor = AVATAR_COLORS[2];
    //         console.log('Matched: 140-144');
    //         break;
    //     case value >= 145 && value < 150:
    //         user.setAvatarColor = AVATAR_COLORS[3];
    //         console.log('Matched: 145-149');
    //         break;
    //     case value >= 150 && value < 155:
    //         user.setAvatarColor = AVATAR_COLORS[4];
    //         console.log('Matched: 150-154');
    //         break;
    //     case value >= 155 && value < 160:
    //         user.setAvatarColor = AVATAR_COLORS[5];
    //         console.log('Matched: 155-159');
    //         break;
    //     case value >= 160 && value < 165:
    //         user.setAvatarColor = AVATAR_COLORS[6];
    //         console.log('Matched: 160-164');
    //         break;
    //     case value >= 165 && value < 170:
    //         user.setAvatarColor = AVATAR_COLORS[7];
    //         console.log('Matched: 165-169');
    //         break;
    //     case value >= 170 && value < 175:
    //         user.setAvatarColor = AVATAR_COLORS[8];
    //         console.log('Matched: 170-174');
    //         break;
    //     case value >= 175 && value <= 180:  // CHANGED: < 180 to <= 180
    //         user.setAvatarColor = AVATAR_COLORS[9];
    //         console.log('Matched: 175-180');
    //         break;
    //     default:
    //         user.setAvatarColor = '#CCCCCC';
    //         console.log('Matched: Default');
    //         break;
    // }
    if (value >= MIN_ASCII && value <= MAX_ASCII) {
        let index = Math.floor((value - MIN_ASCII) / STEP);
        if (index >= AVATAR_COLORS.length) {
            index = AVATAR_COLORS.length - 1;
        }
        return AVATAR_COLORS[index];
    }
    return '';
};
const getAllUsersFromApi = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return yield response.json();
    }
    catch (error) {
        throw error;
    }
});
getAllUsersFromApi()
    .then(data => {
    users = data.map((user) => new Users(user.name, user.email));
    users.forEach((user) => {
        user.setAvatar = Users.getInitial(user.getName, user.getEmail);
        console.log(`[ ${user.getAvatar} ]\t${user.getName}\t${user.getEmail}`);
        user.setAvatarColor = colorizeAvatar(user.getAvatar);
    });
    const tbody = document.getElementById('data');
    if (tbody) {
        tbody.innerHTML = users.map(user => `
        <tr>
            <td class="py-2 text-center">
                <div style="background: ${user.getAvatarColor}" 
                     class="inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-white">
                    ${user.getAvatar}
                </div>
            </td>
            <td class="px-2 py-2 font-bold">${user.getName}</td>
            <td class="px-2 py-2 font-bold">${user.getEmail}</td>
        </tr>
    `).join('');
    }
})
    .catch(err => {
    console.error(err);
});
