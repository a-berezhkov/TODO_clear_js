export {elemLineToThrough, elemLineUnThrough, drawTask}

/**
 *
 * @param element
 */
const elemLineToThrough = (element) => {
    element.classList.add("item__text_line-through")
}
/**
 *
 * @param element
 */
const elemLineUnThrough = (element) => {
    element.classList.remove("item__text_line-through")
}


/**
 * Отрисовка задачи
 * @param checkboxValue
 * @param label
 * @param id
 */
function drawTask(checkboxValue, label, id) {
    const tasks = document.querySelector(".container__items")
    const newTask = document.createElement("div")
    newTask.classList.add("item")
    newTask.dataset.item = id
    newTask.insertAdjacentHTML('afterbegin', '<input class="item_is-done" type="checkbox" name="isDone" id="checkbox-is-done[' + id + ']" ' + (checkboxValue ? "checked" : null) + '>')
    newTask.insertAdjacentHTML('beforeend', '<label class="item__text" for="checkbox-is-done[' + id + ']">' + label + '</label>')
    newTask.insertAdjacentHTML('beforeend', '<span class="item__close">❌</span>')
    tasks.prepend(newTask)
}

