const defaultHeaders = {
	headers: {
		"Content-Type": "application/json; charset=UTF-8",
	},
};

// ************************************************** //

/*
 * User
 */

// create user (register)
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

// get all users (admin)
export const getUsersAPIMethod = () => {
	return fetch(`/api/users`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// get current user
export const getCurrentUserAPIMethod = () => {
	return fetch(`/api/currentuser`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// get user by id
export const getUserByIdAPIMethod = (userId) => {
	return fetch(`/api/users/${userId}`, {
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

// ************************************************** //

/*
 * Event
 */

// create event
export const createEventAPIMethod = (event) => {
	return fetch(`/api/events`, {
		...defaultHeaders,
		method: "POST",
		body: JSON.stringify(event),
	})
		.then(checkStatus)
		.then(parseJSON);
};

// update event
export const updateEventAPIMethod = (event, nEvent) => {
	return fetch(`/api/events/${event._id}`, {
		...defaultHeaders,
		method: "PUT",
		body: JSON.stringify(nEvent),
	}).then(checkStatus);
};

// get all events
export const getEventsAPIMethod = () => {
	return fetch(`/api/events`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// get event by id
export const getEventByIdAPIMethod = (eventId) => {
	return fetch(`/api/events/${eventId}`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// delete event
export const deleteQuestionByIdAPIMethod = (eventId) => {
	return fetch(`/api/events/${eventId}`, {
		...defaultHeaders,
		method: "DELETE",
	})
		.then(checkStatus)
		.then(parseJSON);
};

// ************************************************** //

/*
 * Certificate
 */

// create certificate
export const createCertificateAPIMethod = (certificate) => {
	return fetch(`/api/certificates`, {
		...defaultHeaders,
		method: "POST",
		body: JSON.stringify(certificate),
	})
		.then(checkStatus);
};

// update certificate
export const updateCertificateAPIMethod = (certificate) => {
	return fetch(`/api/certificates/${certificate._id}`, {
		...defaultHeaders,
		method: "PUT",
		body: JSON.stringify(certificate),
	}).then(checkStatus);
};

// get all certificates
export const getCertificatesAPIMethod = () => {
	return fetch(`/api/certificates`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// get certificate by id
export const getCertificateByIdAPIMethod = (certificateId) => {
	return fetch(`/api/certificates/${certificateId}`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// delete certificate
export const deleteCertificateByIdAPIMethod = (certificateId) => {
	return fetch(`/api/certificates/${certificateId}`, {
		...defaultHeaders,
		method: "DELETE",
	})
		.then(checkStatus)
		.then(parseJSON);
};

// ************************************************** //

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
