import { atom } from 'recoil';

export const darkMode = atom<boolean>({
	key: 'darkmode',
	default: false,
});
