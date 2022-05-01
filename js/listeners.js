import {elemLineToThrough, elemLineUnThrough, drawTask} from "./styles.js";
import {createItem, fetchTasksJSON, deleteItem, updateItem, deleteItems} from './tasks.js'

export {checkboxChangeListener, submitListener, loadTasks, deleteListener, deleteActiveListener,deleteAllListener}

/**
 * Начальная загружка заданий
 */
const loadTasks = () => {
    document.addEventListener('DOMContentLoaded', function () {
        // Получаем все задачи с сервера
        fetchTasksJSON()
            .then(tasks => {
                (document.querySelector(".loader")).style.display = "none"
                tasks.forEach((task) => {
                    drawTask(task.isDone, task.name, task.id)
                })
            })
            // Навешиваем всем событие
            .then(() => {
                let itemsIsDone = document.querySelectorAll(".item_is-done");
                itemsIsDone.forEach((checkbox) => {
                    checkboxChangeListener(checkbox)
                });
            })

    })
}

/**
 * Нажатие на checkbox (метка задания "выполнено")
 * @param checkbox
 */
const checkboxChangeListener = (checkbox) => {
    if (checkbox.checked) {
        elemLineToThrough(checkbox.nextSibling)
    }
    checkbox.addEventListener('change', () => {
        const data = {
            'isDone': checkbox.checked ? 1 : 0
        }
        updateItem(checkbox.parentElement.dataset.item, data)
            .then(response => {
                if (response.ok) {
                    checkbox.checked ? elemLineToThrough(checkbox.nextSibling) : elemLineUnThrough(checkbox.nextSibling)
                } else {
                    alert("Ошибка сервера")
                }

            })


    })
}
/**
 *  Создание нового задания
 */
const submitListener = () => {
    document.querySelector("button[type='submit']").addEventListener('click', (event) => {
        event.preventDefault();
        const inputValue = document.querySelector("input[type='text']").value
        createItem(inputValue, 2).then(task => {
            drawTask(task.isDone, task.name, task.id)
            document.querySelector("input[type='text']").value = ""
        })



    })
}

/**
 *  Удаление задания
 */
const deleteListener = (item) => {

    item.childNodes[2].addEventListener('click', (event) => {

        deleteItem(event.target.parentElement.dataset.item).then(response => {
            if (response.ok) {
                event.target.parentElement.remove()
            } else {
                alert("Ошибка на сервере")
            }
        })
    })
}

/**
 *  Удаление выполненных заданий
 */
const deleteActiveListener = () => {
    document.querySelector('.footer__button-delete-active').addEventListener('click', () => {
        const checkedItems = document.querySelectorAll("input[type='checkbox']:checked")
        const ids = []
        checkedItems.forEach((checkbox) => {
            ids.push(checkbox.parentElement.dataset.item)
        })
        deleteItems(ids).then(response => {
            if (response.ok) {
                checkedItems.forEach((checkbox) => {
                    checkbox.parentElement.remove()
                })
            } else {
                alert("Ошибка на сервере")
            }
        })
    })
}

/**
 *  Удаление выполненных заданий
 */
const deleteAllListener = () => {
    document.querySelector('.footer__button-delete-all').addEventListener('click', () => {
        const items = document.querySelectorAll(".item")
        const ids = []
        items.forEach((item) => {
            ids.push(item.dataset.item)
        })
        deleteItems(ids).then(response => {
            if (response.ok) {
                items.forEach((item) => {
                    item.remove()
                })
            } else {
                alert("Ошибка на сервере")
            }
        })
    })
}