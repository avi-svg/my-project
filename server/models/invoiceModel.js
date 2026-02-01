

async function addNewInvoice({totalAmount}, client){
    const tempCustomerId = 1; //at the moment customer is not implemented.
    //TODO change later.
    const QUERY = 'INSERT INTO public.invoices( customer_id, date, total_amount) VALUES ($1, $2, $3) RETURNING *;';
    const result = await client.query(QUERY, [tempCustomerId, new Date(), totalAmount]);
    return result.rows[0];
}


module.exports = {
    addNewInvoice
}