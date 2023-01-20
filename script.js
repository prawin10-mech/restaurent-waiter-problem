document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const price = e.target.price.value;
  const dish = e.target.dish.value;
  const table = e.target.table.value;
  const obj = {
    price,
    dish,
    table,
  };

  const postOrder = await axios.post(
    "https://crudcrud.com/api/0056f78d37d44c9b94d502156fde65d1/orders",
    obj
  );

  showDetailsOnDisplay(postOrder.data);
});

function showDetailsOnDisplay(data) {
  const tableName = data.table;
  const id = data._id;
  const childNode = `<div id="${id}">${data.dish}--${data.price} <button onclick="deleteDish('${id}')">Delete</button></div> `;
  console.log(childNode);
  document.getElementById(tableName).innerHTML += childNode;
}

document.addEventListener("DOMContentLoaded", async () => {
  const getOrders = await axios.get(
    "https://crudcrud.com/api/0056f78d37d44c9b94d502156fde65d1/orders"
  );
  for (let i = 0; i < getOrders.data.length; i++) {
    const tableName = getOrders.data[i].table;
    const id = getOrders.data[i]._id;
    const childNode = `<div id="${id}">${getOrders.data[i].dish}--${getOrders.data[i].price} <button onclick="deleteDish('${id}')">Delete</button></div> `;
    console.log(childNode);
    document.getElementById(tableName).innerHTML += childNode;
  }
});

async function deleteDish(id) {
  console.log(id);
  const dish = await axios.get(
    `https://crudcrud.com/api/0056f78d37d44c9b94d502156fde65d1/orders/${id}`
  );
  await axios.delete(
    `https://crudcrud.com/api/0056f78d37d44c9b94d502156fde65d1/orders/${id}`
  );
  deleteFromDisplay(dish);
}

async function deleteFromDisplay(dish) {
  console.log(dish);
  const tableName = dish.data.table;

  let parentNode = document.getElementById(tableName);
  let childNode = document.getElementById(dish.data._id);
  parentNode.removeChild(childNode);
}
