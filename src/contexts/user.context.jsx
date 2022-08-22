import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

//actual value I want to access
export const UserContext = createContext({
	currentUser: null,
	setcurrentUser: () => null,
});

//actual component
export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser};


	useEffect(() => {
		const unsuscribe = onAuthStateChangedListener((user) => {
			console.log(user);
		});
		return unsuscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}