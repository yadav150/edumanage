// ============================================================
// AUTH.JS – Firebase Authentication Module
// ============================================================
// Future-ready for Firebase integration without changing UI.
// All functions use the existing toast notification system.
// ============================================================

// ============================================================
// FIREBASE CONFIGURATION (replace with your own)
// ============================================================

const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID'
};

// ============================================================
// FIREBASE INITIALIZATION (lazy load)
// ============================================================

let firebaseApp = null;
let auth = null;
let db = null;
let isFirebaseInitialized = false;

function initFirebase() {
    if (isFirebaseInitialized) return;
    if (typeof firebase === 'undefined') {
        console.warn('Firebase SDK not loaded. Auth functions will be mocked.');
        return;
    }
    try {
        firebaseApp = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        isFirebaseInitialized = true;
        console.log('Firebase initialized successfully.');
    } catch (error) {
        console.error('Firebase initialization error:', error);
    }
}

// ============================================================
// AUTH STATE MANAGEMENT
// ============================================================

let currentUser = null;
let authListeners = [];

function getCurrentUser() {
    return currentUser;
}

function isAuthenticated() {
    return currentUser !== null;
}

function isAdmin() {
    return currentUser && currentUser.role === 'admin';
}

function isTeacher() {
    return currentUser && currentUser.role === 'teacher';
}

function isStaff() {
    return currentUser && currentUser.role === 'staff';
}

function hasRole(role) {
    return currentUser && currentUser.role === role;
}

// ============================================================
// AUTH STATE OBSERVER
// ============================================================

function onAuthStateChanged(callback) {
    if (typeof callback === 'function') {
        authListeners.push(callback);
    }
}

function notifyAuthListeners(user) {
    authListeners.forEach(callback => {
        try {
            callback(user);
        } catch (e) {
            console.warn('Auth listener error:', e);
        }
    });
}

// ============================================================
// LOGIN
// ============================================================

async function loginUser(email, password) {
    try {
        showLoading(true);
        initFirebase();

        if (!auth) {
            // Mock login for development (no Firebase)
            return mockLogin(email, password);
        }

        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Fetch user role from Firestore
        let userData = { uid: user.uid, email: user.email, role: 'user' };
        try {
            const doc = await db.collection('users').doc(user.uid).get();
            if (doc.exists) {
                userData = { ...userData, ...doc.data() };
            }
        } catch (e) {
            console.warn('Could not fetch user role from Firestore:', e);
        }

        currentUser = userData;
        notifyAuthListeners(currentUser);
        showToast(`Welcome back, ${userData.name || user.email}!`, 'success');
        return { success: true, user: currentUser };
    } catch (error) {
        console.error('Login error:', error);
        showToast(getAuthErrorMessage(error), 'error');
        return { success: false, error: error.message };
    } finally {
        showLoading(false);
    }
}

// ============================================================
// REGISTER (create new account)
// ============================================================

async function registerUser(email, password, name, role = 'user') {
    try {
        showLoading(true);
        initFirebase();

        if (!auth) {
            // Mock registration for development
            return mockRegister(email, password, name, role);
        }

        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Store user data in Firestore
        const userData = {
            uid: user.uid,
            email: user.email,
            name: name || 'User',
            role: role,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        await db.collection('users').doc(user.uid).set(userData);

        currentUser = userData;
        notifyAuthListeners(currentUser);
        showToast(`Account created successfully! Welcome, ${name}!`, 'success');
        return { success: true, user: currentUser };
    } catch (error) {
        console.error('Registration error:', error);
        showToast(getAuthErrorMessage(error), 'error');
        return { success: false, error: error.message };
    } finally {
        showLoading(false);
    }
}

// ============================================================
// LOGOUT
// ============================================================

async function logoutUser() {
    try {
        showLoading(true);
        initFirebase();

        if (auth) {
            await auth.signOut();
        }

        currentUser = null;
        notifyAuthListeners(null);
        showToast('Logged out successfully', 'info');
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        showToast('Error logging out', 'error');
        return { success: false, error: error.message };
    } finally {
        showLoading(false);
    }
}

// ============================================================
// PASSWORD RESET
// ============================================================

async function resetPassword(email) {
    try {
        showLoading(true);
        initFirebase();

        if (!auth) {
            showToast('Password reset email sent (mock)', 'success');
            return { success: true };
        }

        await auth.sendPasswordResetEmail(email);
        showToast('Password reset email sent! Check your inbox.', 'success');
        return { success: true };
    } catch (error) {
        console.error('Password reset error:', error);
        showToast(getAuthErrorMessage(error), 'error');
        return { success: false, error: error.message };
    } finally {
        showLoading(false);
    }
}

// ============================================================
// UPDATE USER PROFILE
// ============================================================

async function updateUserProfile(uid, data) {
    try {
        showLoading(true);
        initFirebase();

        if (!db) {
            // Mock update
            showToast('Profile updated (mock)', 'success');
            return { success: true };
        }

        await db.collection('users').doc(uid).update({
            ...data,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Update currentUser if it's the same user
        if (currentUser && currentUser.uid === uid) {
            currentUser = { ...currentUser, ...data };
            notifyAuthListeners(currentUser);
        }

        showToast('Profile updated successfully!', 'success');
        return { success: true };
    } catch (error) {
        console.error('Update profile error:', error);
        showToast('Error updating profile', 'error');
        return { success: false, error: error.message };
    } finally {
        showLoading(false);
    }
}

// ============================================================
// CHANGE PASSWORD
// ============================================================

async function changePassword(currentPassword, newPassword) {
    try {
        showLoading(true);
        initFirebase();

        if (!auth || !auth.currentUser) {
            showToast('You must be logged in to change password', 'error');
            return { success: false };
        }

        // Re-authenticate user first
        const credential = firebase.auth.EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassword
        );
        await auth.currentUser.reauthenticateWithCredential(credential);
        await auth.currentUser.updatePassword(newPassword);

        showToast('Password changed successfully!', 'success');
        return { success: true };
    } catch (error) {
        console.error('Change password error:', error);
        showToast(getAuthErrorMessage(error), 'error');
        return { success: false, error: error.message };
    } finally {
        showLoading(false);
    }
}

// ============================================================
// MOCK AUTH FUNCTIONS (for development without Firebase)
// ============================================================

const mockUsers = [
    { uid: 'mock_uid_1', email: 'admin@school.com', name: 'Admin User', role: 'admin', password: 'admin123' },
    { uid: 'mock_uid_2', email: 'teacher@school.com', name: 'Teacher User', role: 'teacher', password: 'teacher123' },
    { uid: 'mock_uid_3', email: 'staff@school.com', name: 'Staff User', role: 'staff', password: 'staff123' }
];

function mockLogin(email, password) {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
        showToast('Invalid email or password', 'error');
        return { success: false, error: 'Invalid credentials' };
    }
    const { password: _, ...userData } = user;
    currentUser = userData;
    notifyAuthListeners(currentUser);
    showToast(`Welcome back, ${userData.name}!`, 'success');
    return { success: true, user: currentUser };
}

function mockRegister(email, password, name, role) {
    // Check if user already exists
    if (mockUsers.find(u => u.email === email)) {
        showToast('User already exists', 'error');
        return { success: false, error: 'User already exists' };
    }
    const newUser = {
        uid: `mock_uid_${mockUsers.length + 1}`,
        email,
        name: name || 'User',
        role: role || 'user',
        password
    };
    mockUsers.push(newUser);
    const { password: _, ...userData } = newUser;
    currentUser = userData;
    notifyAuthListeners(currentUser);
    showToast(`Account created successfully! Welcome, ${name}!`, 'success');
    return { success: true, user: currentUser };
}

// ============================================================
// ERROR MESSAGE HELPER
// ============================================================

function getAuthErrorMessage(error) {
    const code = error.code || '';
    const messages = {
        'auth/user-not-found': 'No account found with this email address.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/email-already-in-use': 'This email is already registered.',
        'auth/invalid-email': 'Invalid email address format.',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Please check your connection.',
        'auth/weak-password': 'Password should be at least 6 characters.',
        'auth/user-disabled': 'This account has been disabled.',
        'auth/requires-recent-login': 'Please log in again to perform this action.',
        'auth/invalid-credential': 'Invalid credentials. Please try again.'
    };
    return messages[code] || error.message || 'An authentication error occurred. Please try again.';
}

// ============================================================
// AUTO-LOGIN (check session on page load)
// ============================================================

function checkAuthState() {
    initFirebase();

    if (!auth) {
        // No Firebase – check localStorage for mock session
        const savedUser = localStorage.getItem('mockAuthUser');
        if (savedUser) {
            try {
                currentUser = JSON.parse(savedUser);
                notifyAuthListeners(currentUser);
            } catch (e) {
                localStorage.removeItem('mockAuthUser');
            }
        }
        return;
    }

    auth.onAuthStateChanged(async user => {
        if (user) {
            // Fetch user data from Firestore
            try {
                const doc = await db.collection('users').doc(user.uid).get();
                let userData = { uid: user.uid, email: user.email, role: 'user' };
                if (doc.exists) {
                    userData = { ...userData, ...doc.data() };
                }
                currentUser = userData;
                notifyAuthListeners(currentUser);
            } catch (e) {
                console.warn('Could not fetch user data:', e);
                currentUser = { uid: user.uid, email: user.email, role: 'user' };
                notifyAuthListeners(currentUser);
            }
        } else {
            currentUser = null;
            notifyAuthListeners(null);
        }
    });
}

// ============================================================
// PERSIST MOCK SESSION
// ============================================================

function persistMockSession(user) {
    if (user) {
        localStorage.setItem('mockAuthUser', JSON.stringify(user));
    } else {
        localStorage.removeItem('mockAuthUser');
    }
}

// ============================================================
// PROTECTED ROUTE HELPER
// ============================================================

function requireAuth(redirectTo = 'login') {
    if (!isAuthenticated()) {
        const currentPage = window.location.pathname;
        window.location.href = `${redirectTo}?redirect=${encodeURIComponent(currentPage)}`;
        return false;
    }
    return true;
}

function requireRole(role, redirectTo = 'dashboard') {
    if (!hasRole(role)) {
        showToast('You do not have permission to access this page.', 'error');
        window.location.href = redirectTo;
        return false;
    }
    return true;
}

// ============================================================
// GLOBAL EXPOSURE (for inline onclick handlers)
// ============================================================

window.auth = {
    getCurrentUser,
    isAuthenticated,
    isAdmin,
    isTeacher,
    isStaff,
    hasRole,
    loginUser,
    registerUser,
    logoutUser,
    resetPassword,
    updateUserProfile,
    changePassword,
    requireAuth,
    requireRole,
    onAuthStateChanged
};

// ============================================================
// INITIALIZE ON PAGE LOAD
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase and check auth state
    checkAuthState();

    // Mock session persistence
    const origNotify = notifyAuthListeners;
    notifyAuthListeners = function(user) {
        persistMockSession(user);
        origNotify(user);
    };

    console.log('Auth module initialized.');
});

// ============================================================
// EXPORT (for module bundlers)
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getCurrentUser,
        isAuthenticated,
        isAdmin,
        isTeacher,
        isStaff,
        hasRole,
        loginUser,
        registerUser,
        logoutUser,
        resetPassword,
        updateUserProfile,
        changePassword,
        requireAuth,
        requireRole,
        onAuthStateChanged
    };
}
