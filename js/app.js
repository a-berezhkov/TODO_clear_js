import {
    checkboxChangeListener,
    submitListener,
    loadTasks,
    deleteListener,
    deleteActiveListener,
    deleteAllListener
} from "./listeners.js";

const tasks = document.querySelector(".container__items")

runObserver()
loadTasks()  // Загрузка заданий
submitListener() // Создание нового задания
deleteActiveListener()  // Слушаем на удаление удаленных записей
deleteAllListener() // Слушаем на удаление всех записей


/**
 * Observer для новых элементов списка
 */
function runObserver() {
    let observer = new MutationObserver(mutationRecords => {
        mutationRecords.forEach((elem) => {
            // если были добавлены ноды
            if (elem.addedNodes[0]) {
                checkboxChangeListener(elem.addedNodes[0].firstChild) // добавляем к ним слушатель события
                deleteListener(elem.addedNodes[0]) // вешаем событи удаления
            }
        })
    });
    observer.observe(tasks, {childList: true});
}


