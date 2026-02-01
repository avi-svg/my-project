

async function addOrder({ totalQuantity, cartItems }, client) {
    
    console.log("1")
    try {
        const tempCustomerId = 1; //at the moment customer is not implemented.
        const orderId = await client.query('INSERT INTO orders (customer_id, total_quantity, order_date) VALUES ($1, $2, $3) RETURNING order_id', [tempCustomerId, totalQuantity, new Date()]);

        const detailes = [];
        for (const item of cartItems) {

            const tempMore = await client.query('INSERT INTO order_detailes (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING order_id, product_id, quantity, price', [orderId.rows[0].order_id, item.product_id, item.quantity, item.price]);
            detailes.push(tempMore.rows[0]);

        }
        
        console.log("Transaction Complete!")
        return detailes;
    }
    catch (err) {
        
        throw err;

    }
}


module.exports = {
    addOrder,
}