const items = [
    {
        id: 1,
        name: "Mouse"
    },
    {
        id: 2,
        name: "keyword"
    }
];

const getItems = (req, res) => {
    res.send(items);
};

const getItemByIndex = (req, res) => {
    if (req.params.index >= items.length) {
        res.status(404).send("item not found")
    }

    res.send(items[req.params.index])
}


const createItem = (req, res) => {
    const newItem = req.body;
    items.push(newItem)

    res.status(201).send(newItem);
}

const updateItem = (req, res) => {
    if (req.params.index >= items.length) {
        res.status(404).send("item not found")
    }

    items[req.params.index] = req.body;

    res.send(items[req.params.index]);
}

const deleteItem = (req, res) => {
    if (req.params.index >= items.length) {
        res.status(404).send("item not found")
    }

    const deleted = items.splice(req.params.index, 1);

    res.send(deleted[0])
}


module.exports = {
    getItems,
    getItemByIndex,
    createItem,
    updateItem,
    deleteItem
};