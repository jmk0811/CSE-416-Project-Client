const defaultHeaders = {
	headers: {
		"Content-Type": "application/json; charset=UTF-8",
	},
};

/// /////////////////////////////////////////////////////////////////////////////

/*
 * User
 */

// register
export const registerUserAPIMethod = (user) => {
	return fetch(`/api/users`, {
		...defaultHeaders,
		method: "POST",
		body: JSON.stringify(user),
	}).then(checkLoginStatus);
};

// login
export const loginUserAPIMethod = (user) => {
	return fetch(`/api/login`, {
		...defaultHeaders,
		method: "POST",
		body: JSON.stringify(user),
	}).then(checkLoginStatus);
};

// logout
export const logoutUserAPIMethod = () => {
	return fetch(`/api/logout`, {
		...defaultHeaders,
		method: "POST",
	}).then(checkLoginStatus);
};

// get users (admin)
export const getUsersAPIMethod = () => {
	return fetch(`/api/users`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// get current user @
export const getCurrentUserAPIMethod = () => {
	return fetch(`/api/currentuser`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// update user
export const updateUserAPIMethod = (user, nUser) => {
	return fetch(`/api/users/${user._id}`, {
		...defaultHeaders,
		method: "PUT",
		body: JSON.stringify(nUser),
	}).then(checkStatus);
};

// delete user
export const deleteUserByIdAPIMethod = (userId) => {
	return fetch(`/api/users/${userId}`, {
		...defaultHeaders,
		method: "DELETE",
	})
		.then(checkStatus)
		.then(parseJSON);
};

// upload profile image to cloudinary @
export const uploadImageToCloudinaryAPIMethod = (formData) => {
	const cloudName = "minki-jeon";
	return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
		method: "POST",
		body: formData,
	})
		.then(checkStatus)
		.then(parseJSON);
};
/// /////////////////////////////////////////////////////////////////////////////
// Address
export const getAddressByIdAPIMethod = (addressId) => {
	return fetch(`/api/address/${addressId}`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};
export const updateAddressAPIMethod = (address) => {
	return fetch(`/api/address/${address._id}`, {
		...defaultHeaders,
		method: "PUT",
		body: JSON.stringify(address),
	}).then(checkStatus);
};

/// /////////////////////////////////////////////////////////////////////////////

/*
 * Volunteer
 */

export const getVolunteerWorksAPIMethod = () => {
	return fetch(`/api/volunteer`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

export const createVolunteerWorkAPIMethod = (volunteerWork) => {
	return fetch(`/api/volunteer`, {
		...defaultHeaders,
		method: "POST",
		body: JSON.stringify(volunteerWork),
	})
		.then(checkStatus)
		.then(parseJSON);
};

function checkLoginStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return true;
	}
	return false;
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const error = new Error(`${response.statusText}`);
	error.status = response.statusText;
	error.response = response;
	throw error;
}

function parseJSON(response) {
	return response.json();
}
