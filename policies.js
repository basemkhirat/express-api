module.exports = {

    user: {

        view: true,

        /**
         * users allowed to update:
         * - super admins
         * - users have user.update permission
         * - users can update themselves
         * @param req
         * @param user
         * @returns {boolean}
         */

        update(req, user = false) {

            if (!user) {
                return false
            }

            if (req.user.id === user.id) {
                return true;
            }

            if (req.hasPermission("user.update")) {
                return true;
            }
        },

        /**
         * users allowed to change status:
         * - super admins and cannot change status of themselves
         * - users have user.status permission and cannot change status of themselves
         * -
         * @param req
         * @param user
         * @returns {boolean}
         */

        status(req, user = false) {

            if (user) {

                return (
                    req.hasPermission("user.status")
                    && req.getUser("id") !== user.id
                    && !user.hasRole("superadmin")
                ) || user.status === req.param("status");

            }

            return req.hasPermission("user.status");
        },

        /**
         * users allowed to change role:
         * - super admins and cannot change role of themselves
         * - users have user.role permission and cannot change role of themselves
         * -
         * @param req
         * @param user
         * @returns {boolean}
         */

        role(req, user = false) {

            if (user && user.role && user.role.id === req.param("role")) { // role not changed
                return true;
            }

            return (req.role === 'superadmin' || req.hasPermission("user.role")) && req.user.id !== user.id
        },

        /**
         * users allowed to delete:
         * - super admins and cannot delete themselves
         * - users have user.delete permission and cannot delete themselves
         * -
         * @param req
         * @param user
         * @returns {boolean}
         */

        delete(req, user = false) {

            if (!user) {
                return false;
            }

            if (req.user.id === user.id) {
                return false;
            }

            if (req.hasPermission("user.delete")) {
                return true;
            }
        }
    },

    role: {

        view(req) {
            return req.hasRole("superadmin");
        },

        create(req) {
            return req.hasRole("superadmin");
        },

        update(req, role) {
            return req.hasRole("superadmin") && role.name !== "superadmin";
        },

        delete(req, role) {
            return req.hasRole("superadmin") && role.name !== "superadmin";
        }
    }
}
