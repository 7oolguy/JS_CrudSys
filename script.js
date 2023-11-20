//get element

let createClient = document.getElementById("crt-ppu-d");
let editClient = document.getElementById("edit-ppu-d");

//checa se fields esta o todos preenchidos
const inputIsValid = () => {
  return document.getElementById("add-form").reportValidity();
};
const editedInputIsValid = () => {
    return document.getElementById("edit-form").reportValidity();
}

//storage functions
const getLocalStorage = () => JSON.parse(localStorage.getItem("cliente")) ?? [];
const setLocalStorage = (dbClient) =>
  localStorage.setItem("cliente", JSON.stringify(dbClient));

//delete from the storage
const deleteClient = (index) => {
  const client = readClient();
  client.splice(index, 1);
  setLocalStorage(client);
};

//update in the storage
const updateClient = (clienteUpdated, index) => {
  const client = readClient();
  client[index] = clienteUpdated;
  setLocalStorage(client);
};

//read from the storage
const readClient = () => getLocalStorage();

//create no storage
const addCliente = (lista) => {
  const dbClient = getLocalStorage();
  dbClient.push(lista);
  setLocalStorage(dbClient);
};

//interacao

//fecha a janela e limpa os fields
const closeWindow = () => {
  clearFields();
  createClient.hidden = true;
};

//limpa todos os fields ao fechar a janela
const clearFields = () => {
  const fields = document.querySelectorAll(".add-info");
  fields.forEach((field) => (field.value = ""));
};

//adiciona a informacao
const addInfo = () => {
  //checa se todos os fields foram preenchidos
  if (inputIsValid()) {
    const lista = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      numero: document.getElementById("numero").value,
      assunto: document.getElementById("assunto").value,
    };
    //adiciona a lista a memoria local
    addCliente(lista);
    //adiciona o cliente a tabela
    updateTable();
    closeWindow();
  }
};
const getIndex = () => {
    let index = document.getElementById('edit-ppu-d').attributes.dataset
    return index;
}
const addEdit = () => {
    //checa se todos os fields foram preenchidos
    index = getIndex();
    console.log('i am here' + index)
    if (editedInputIsValid()) {
      const lista = {
        nome: document.getElementById("edit-nome").value,
        email: document.getElementById("edit-email").value,
        numero: document.getElementById("edit-numero").value,
        assunto: document.getElementById("edit-assunto").value,
      };
      //adiciona a lista a memoria local
      updateClient(lista, index);
      //adiciona o cliente a tabela
      
      document.getElementById('edit-ppu-d').hidden = true;
    }
    updateTable();
  };
//gera uma nova fileira na tabela
const createRow = (client, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td data-index="${index}" class="newItem">${client.nome}</td>
        <td class="newItem">${client.numero}</td>
        <td class="newItem">${client.email}</td>
        <td class="newItem">${client.assunto}</td>
        <td>
            <button id="edit-${index}" data-action="edit" type="button" class="btn-edit">edit</button>
            <button id="del-${index}"data-action="del" type="button" class="btn-del">del</button>
        </td>
    `;
  document.querySelector(".table-content>tbody").appendChild(newRow);
};
//limpa a tabela
const clearTable = () => {
  const rows = document.querySelectorAll(".table-content>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};
//atualiza a tabela
const updateTable = () => {
  const client = readClient();
  clearTable();
  client.forEach(createRow);
};

const fillFields = (client) => {
  document.getElementById("edit-nome").value = client.nome;
  document.getElementById("edit-numero").value = client.numero;
  document.getElementById("edit-email").value = client.email;
  document.getElementById("edit-assunto").value = client.assunto;
  document.getElementById("edit-nome").dataset.index = client.index;
};

const editinputIsValid = () => {
  return document.getElementById("edit-form").reportValidity();
};

const editInfo = (index) => {
 const giveIndex = document.getElementById("edit-ppu-d");
 giveIndex.attributes.dataset = index;
  const client = readClient()[index];
  fillFields(client);
  document.getElementById("edit-ppu-d").hidden = false;
};

const editDelete = (event) => {
  if (event.target.type == "button") {
    const [action, index] = event.target.id.split("-");
    if (action == "edit") {
      editInfo(index);
    } else if (action == "del") {
      deleteClient(index);
      updateTable();
    }
  }
};

document
  .querySelector(".table-content>tbody")
  .addEventListener("click", editDelete);

const clearEditFields = () => {
  const fields = document.querySelectorAll(".edit-info");
  fields.forEach((field) => (field.value = ""));
};

const closeEditedWindow = () => {
  const ppu = document.getElementById("edit-ppu-d");
  clearEditFields();
  ppu.hidden = true;
};




//actions
const openAddContact = document.getElementById("btn-crt");
openAddContact.addEventListener("click", () => {
  if (createClient.hidden == true) {
    createClient.hidden = false;
  } else if (createClient.hidden == false) {
    closeWindow();
  }
});

const saveNewContact = document.getElementById("btn-add");
saveNewContact.addEventListener("click", () => {
  addInfo();
});
const saveEditContact = document.getElementById("btn-save");
saveEditContact.addEventListener("click", () => {
  addEdit();
});

const closeEdit = document.getElementById('btn-close');
closeEdit.addEventListener("click", () => {
    document.getElementById("edit-ppu-d").hidden = true;
})
const exitAdd = document.getElementById('btn-exit')
exitAdd.addEventListener("click", () => {
    document.getElementById('crt-ppu-d').hidden = true;
})
updateTable();
