export const ROLES = {
    ADMIN: 'ADMIN',
    WORKER: 'WORKER',
    MANAGER: 'MANAGER'
};

export const authRole = {
    admin: {
        allowedRoles: [ROLES.WORKER, ROLES.MANAGER],
        routes: [
            '/dashboard',
            '/profile',
            '/tasks',
            '/manage-employees',
            '/reports',
            '/assignments'
        ]
    },
    worker: {
        allowedRoles: [ROLES.WORKER],
        routes: [
            '/dashboard',
            '/profile',
            '/tasks'
        ]
    },
    manager: {
        allowedRoles: [ROLES.MANAGER],
        routes: [
            '/dashboard',
            '/profile',
            '/tasks',
            '/manage-employees',
            '/reports',
            '/assignments'
        ]
    }
};
