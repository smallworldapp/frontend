import store from '@/store';

/**
 * Enforce auth requriements, redirecting to/from login pages as necessary
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
function enforceAuth(to, from, next) {
    let isAuthed = store.state.session.exists;
    let redirect = store.state.redirect;

    if (isAuthed) {
        if (redirect != null) {
            store.commit('setRedirect', null);

            next(redirect);
        } else if (to.meta.isLoginPage) {
            next('/your-communities');
        } else {
            next();
        }
    } else if (!to.meta.isLoginPage && !to.meta.isPublic) {
        store.commit('setRedirect', to.path);

        if (to.path.startsWith('/server-admin')) {
            next('/login/admin');
        } else {
            next('/login');
        }
    } else {
        next();
    }
}

/**
 * Redirect to /server-admin page if this is an admin session
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
function adminRedirect(to, from, next) {
    let isAdmin = store.state.session.isAdmin;

    if (isAdmin && to.path == '/your-communities') {
        next('/server-admin');
    }

    next();
}

/**
 * Sync the document title with the router
 * @param {*} to
 */
function titleSync(to) {
    let title = to.meta.title;
    if (title) document.title = 'smallworld ' + title;
}

/**
 * Add the guards
 * @param {*} router
 */
export function init(router) {
    router.beforeEach(enforceAuth);
    router.beforeEach(adminRedirect);
    router.afterEach(titleSync);
}
