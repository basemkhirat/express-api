import Repository from "./Repository";

const resource = "/page";

export default {
    getPage(id) {
        return Repository.get(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data.data;
            }
        });
    },
    updatePage(id, data) {
        return Repository.put(`${resource}/${id}`, data).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        }).catch(error => {
            return error.response.data.errors;
        })
    },
    deletePage(id) {
        return Repository.delete(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    deletePages(ids) {
        return Repository.patch(`${resource}/?operation=delete&ids=${ids}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    getAllPages(page, limit, filters = {}) {
        let statusQuery = (filters.status && filters.status !== '') ? '&status=' + filters.status : '';
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&q=' + filters.searchQuery : '';
        let orderQuery = filters.order ? "&sort_type=" + filters.order : "";

        let filterQuery = searchQuery + statusQuery + orderQuery
        return Repository.get(`${resource}?page=${page}&limit=${limit}${filterQuery}&sort_field=_id`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        });
    },
    newPage(data) {
        return Repository.post(`${resource}`, data).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        }).catch(error => {
            return error.response.data.errors;
        })
    },
};
