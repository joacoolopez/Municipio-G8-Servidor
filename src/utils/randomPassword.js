import Chance from 'chance';
const chance = new Chance();

const randomPassword = () => {
    return chance.string({ length: 12, pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' });
}

export {randomPassword}