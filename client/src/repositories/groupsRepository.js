import Repository from "./Repository";

const resource = "/role";

export default {
    getGroup(id) {
        return Repository.get(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data.data;
            }
        });
    },
    updateGroup(id, data) {
        return Repository.put(`${resource}/${id}`, data).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    deleteGroup(id) {
        return Repository.delete(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    deleteGroups(ids) {
        return Repository.patch(`${resource}/?operation=delete&ids=${ids}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    getAllGroups(page, limit, filters = {}) {

        let groupQuery = (filters.group && filters.group !== '') ? '&role=' + filters.group : '';
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&q=' + filters.searchQuery : '';
        let filterQuery = groupQuery + searchQuery;

        return Repository.get(`${resource}?page=${page}&limit=${limit}${filterQuery}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    newGroup(data) {
        return Repository.post(`${resource}`, data).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        }).catch(error => {
            return error.response.data;
        })
    },
};
