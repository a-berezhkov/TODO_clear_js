export {fetchTasksJSON, createItem, deleteItem, updateItem, deleteItems}

/**
 * Получение всех заданий пользователя
 * @returns {Promise<any>}
 */
async function fetchTasksJSON() {
    const response = await fetch("http://24api.ru/rest-todo/items-by-id?id=2");
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return await response.json();
}

/**
 * Создание записи
 * @param name
 * @param userId
 * @returns {Promise<any>}
 */
async function createItem(name, userId = 2,) {

    const data = {
        "name": name,
        "user_id": userId,
        "isDone": 0
    }

    const response = await fetch("http://24api.ru/rest-todo", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return await response.json();
}

/**
 * Удаление записи
 * @param id
 * @returns {Promise<Response>}
 */
async function deleteItem(id) {
    const response = await fetch("http://24api.ru/rest-todo/" + id, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return response;
}

/**
 * Обновление задачи
 * @param id
 * @param data
 * @returns {Promise<Response>}
 */
async function updateItem(id, data) {
    const response = await fetch("http://24api.ru/rest-todo/" + id, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return response;
}

/**
 *
 * @param ids array [1,2,3,4]
 * @returns {Promise<Response>}
 */
async function deleteItems(ids) {
    const response = await fetch("http://24api.ru/rest-todo/delete-items", {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({items: ids})
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return response;
}