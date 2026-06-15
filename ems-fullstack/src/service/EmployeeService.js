import axios from "./AuthService";

const URL = "http://localhost:8080/api/emp";

export const listEmployees = (page, size) =>
    axios.get(`${URL}?page=${page}&size=${size}`);


export const savedEmployee = (employee) => axios.post(URL, employee);

export const editEmployee = (employeeid) => {
    return axios.get(URL + '/' + employeeid);
}

export const searchEmployees = (
    keyword,
    page,
    size
) =>
    axios.get(
        `${URL}/search?keyword=${keyword}&page=${page}&size=${size}`
    );

export const updateDataEmployee = (employeeid , employee) =>{
    return axios.put(URL + '/' + employeeid,employee);
}
export const deleteEmployee = (employeeId)=> axios.delete(URL + '/' + employeeId);