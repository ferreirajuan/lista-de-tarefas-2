const form = document.getElementById("item-form")
const list = document.getElementById("items-list")
const itemInput = document.getElementById("input-item-name")

let items = []

function createDeleteButton() {
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("delete-button")
    deleteButton.setAttribute("type", "button")

    const deleteButtonText = document.createElement("span")
    deleteButtonText.textContent = "Deletar"

    const deleteButtonIcon = document.createElement("img")
    deleteButtonIcon.setAttribute("src", "./assets/delete-icon.svg")
    deleteButtonIcon.setAttribute("alt", "Ícone de lixeira")

    deleteButton.append(deleteButtonText, deleteButtonIcon)

    return deleteButton
}

function createEditButton() {
    const editButton = document.createElement("button")
    editButton.classList.add("edit-button")
    editButton.setAttribute("type", "button")

    const editButtonIcon = document.createElement("img")
    editButtonIcon.setAttribute("src", "./assets/edit-icon.svg")
    editButtonIcon.setAttribute("alt", "Ícone de lápis")

    editButton.appendChild(editButtonIcon)

    return editButton
}

function createConfirmButton() {
    const confirmButton = document.createElement("button")
    confirmButton.classList.add("confirm-button")
    confirmButton.classList.add("hidden")
    confirmButton.setAttribute("type", "button")
    confirmButton.textContent = "Confirmar"

    return confirmButton
}

function createItem(itemId, itemTitle, checked) {
    const itemElement = document.createElement("li")
    itemElement.setAttribute("data-id", itemId)
    const itemTitleContainer = document.createElement("div")
    itemTitleContainer.classList.add("item-title-container")


    const itemTitleElement = document.createElement("span")
    itemTitleElement.textContent = itemTitle

    const checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")

    if(checked){
        checkbox.setAttribute("checked", checked)
        itemElement.classList.add("checked")
    }

    checkbox.addEventListener("change", function () {
        const itemId = itemElement.getAttribute("data-id")
        itemElement.classList.toggle("checked")

        const item = items.find(item => item.id === Number(itemId))
        item.checked = !item.checked
        localStorage.setItem("items", JSON.stringify(items))
    })

    const editItemInput = document.createElement("input")
    editItemInput.type = "text"
    editItemInput.classList.add("hidden")

    const itemButtonsContainer = document.createElement("div")
        itemButtonsContainer.classList.add("item-buttons-container")

        const deleteButton = createDeleteButton()
        const editButton = createEditButton()
        const confirmButton = createConfirmButton()

    
        deleteButton.addEventListener("click", function () {
            const itemId = itemElement.getAttribute("data-id")
            items = items.filter(item => item.id !== Number(itemId))
            console.log(items)

            itemElement.remove()
            localStorage.setItem("items", JSON.stringify(items))
        })

        editButton.addEventListener("click", function () {
            itemTitleElement.classList.add("hidden")
            checkbox.classList.add("hidden")

            deleteButton.classList.add("hidden")
            editButton.classList.add("hidden")

            editItemInput.classList.remove("hidden")
            confirmButton.classList.remove("hidden")
            editItemInput.value = itemTitleElement.textContent
            localStorage.setItem("items", JSON.stringify(items))
        })

        confirmButton.addEventListener("click", function () {
            itemTitleElement.classList.remove("hidden")
            checkbox.classList.remove("hidden")

            deleteButton.classList.remove("hidden")
            editButton.classList.remove("hidden")

            editItemInput.classList.add("hidden")
            confirmButton.classList.add("hidden")
            itemTitleElement.textContent = editItemInput.value

            const itemId = itemElement.getAttribute("data-id")

            const item = items.find(item => item.id === Number(itemId))
            item.title = editItemInput.value

            localStorage.setItem("items", JSON.stringify(items))
        })

        itemTitleContainer.append(checkbox, itemTitleElement, editItemInput)
        itemButtonsContainer.append(deleteButton, editButton, confirmButton)

        itemElement.append(itemTitleContainer, itemButtonsContainer)
        return itemElement

}

function loadItems() {
    const itemsFromStorage = localStorage.getItem("items")

    if(!itemsFromStorage){
        return
    }

    items = JSON.parse(itemsFromStorage)

    for (const item of items){
        const itemElement = createItem(item.id, item.title, item.checked)
        list.appendChild(itemElement)
    }
}

    form.addEventListener("submit", function (event) {
        event.preventDefault()

        const itemTitle = itemInput.value
        const itemId = new Date().getTime()

        const itemElement = createItem(itemId, itemTitle, false)

        
        list.appendChild(itemElement)

        items.push({
            id: itemId,
            title: itemTitle,
            checked: false
        })
        localStorage.setItem("items", JSON.stringify(items))

    })

    loadItems()