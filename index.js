document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const listContainer = document.getElementById('list-container');
    const clearButton = document.getElementById('clear-button');

    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

    const saveList = () => {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    };

    const renderList = () => {
        listContainer.innerHTML = '';
        shoppingList.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-item';
            const itemText = document.createElement('span');
            itemText.textContent = item.name;
            itemText.contentEditable = true;
            if (item.purchased) {
                itemText.classList.add('purchased');
            }
            itemText.addEventListener('input', () => {
                item.name = itemText.textContent;
                saveList();
            });

            const purchaseButton = document.createElement('button');
            purchaseButton.textContent = 'Purchased';
            purchaseButton.addEventListener('click', () => {
                item.purchased = !item.purchased;
                saveList();
                renderList();
            });

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                shoppingList.splice(index, 1);
                saveList();
                renderList();
            });

            listItem.appendChild(itemText);
            listItem.appendChild(purchaseButton);
            listItem.appendChild(removeButton);
            listContainer.appendChild(listItem);
        });
    };

    addButton.addEventListener('click', () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            shoppingList.push({ name: itemName, purchased: false });
            saveList();
            renderList();
            itemInput.value = '';
        }
    });

    clearButton.addEventListener('click', () => {
        shoppingList = [];
        saveList();
        renderList();
    });

    renderList();
});
