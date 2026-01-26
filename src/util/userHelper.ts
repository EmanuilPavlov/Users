export class UserHelper {
    static readonly AVATAR_COLORS = [
        "#1ABC9C", // turquoise
        "#2ECC71", // emerald
        "#3498DB", // peter river
        "#9B59B6", // amethyst
        "#34495E", // wet asphalt
        "#16A085", // green sea
        "#27AE60", // nephritis
        "#2980B9", // belize hole
        "#8E44AD", // wisteria
        "#2C3E50"  // midnight blue
    ];
    static readonly MIN_ASCII = 130;
    static readonly MAX_ASCII = 180;
    static readonly STEP = 5;

    static getInitial = (name?: string, email?: string): string => {
        if (!name && !email) return 'The data can not be null!';
        const specialRegex = /[^a-zA-Z]/;
        const arrayFromName= name?.trim().split(" ");
        const arrayWithoutSpecialChars: string[] = arrayFromName
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
                return (
                    arrayWithoutSpecialChars[0][0].toUpperCase() +
                    arrayWithoutSpecialChars[1][0].toUpperCase()
                );
            }
            if (arrayWithoutSpecialChars.length > 2) {
                return (
                    arrayWithoutSpecialChars[0][0].toUpperCase() +
                    arrayWithoutSpecialChars[2][0].toUpperCase()
                );
            }
            if ((arrayWithoutSpecialChars.length < 2 && arrayWithoutSpecialChars.length > 0)) {
                return  arrayWithoutSpecialChars[0][0].toUpperCase();
            }
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(<string>email)) {
            const parts = email ? email.split(/[@._\-+]+/) : [];
            if (parts.length > 3) {
                return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
            }

            if (parts.length < 3 || !name) {
                return (
                    parts[0][0].toUpperCase()
                );
            }
        }

        if(arrayWithoutSpecialChars?.length === 1 && (arrayWithoutSpecialChars[0] !== null && arrayWithoutSpecialChars[0] !== undefined))
            return arrayWithoutSpecialChars[0][0].toUpperCase();

        return `Invalid data!`
    };
    static colorizeAvatar = function (initials?: string) : string{
        if (!initials || initials?.length < 2) {return ''}
        const value : number = initials?.charCodeAt(0) + initials?.charCodeAt(1);

        if (value >= UserHelper.MIN_ASCII && value <= UserHelper.MAX_ASCII) {
            let index = Math.floor((value - UserHelper.MIN_ASCII) / UserHelper.STEP);
            if (index >= UserHelper.AVATAR_COLORS.length) {
                index = UserHelper.AVATAR_COLORS.length - 1;
            }
            return UserHelper.AVATAR_COLORS[index];
        }
        return '';
    }
}