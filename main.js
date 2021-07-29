var firebaseConfig = {
    apiKey: "AIzaSyAg4UoBFhj7zRWUSvQkqgM__bXlL4L7BKo",
    authDomain: "crud-conteiner.firebaseapp.com",
    databaseURL: "https://crud-conteiner-default-rtdb.firebaseio.com",
    projectId: "crud-conteiner",
    storageBucket: "crud-conteiner.appspot.com",
    messagingSenderId: "267758605891",
    appId: "1:267758605891:web:e248e151c1fec0487766f6",
    measurementId: "G-1MJ1EEL72K"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  var d = new Date();
  var t = d.getTime();
  var counter = t;

  document.getElementById("form").addEventListener("submit",(e)=>{
      var cliente =  document.getElementById("cliente").value;
      var cont = document.getElementById("cont").value;
      var tipo = document.getElementById("tipo").value;
      var status = document.getElementById("status").value;
      var categoria = document.getElementById("categoria").value;
      var movs = document.getElementById("movs").value;
      var dta_inicio = document.getElementById("dta_inicio").value;
      var dta_fim = document.getElementById("dta_fim").value;
      
      e.preventDefault();
      //console.log("Clinete:" + cliente + cont + tipo + status
      // + categoria + movs + dta_inicio + dta_fim);
      createCliente(cliente,cont,tipo,status,
      categoria,movs,dta_inicio,dta_fim);
      form.reset();
  });

  function createCliente(cliente_nome,cont,tipo,status,
    categoria,movs,dta_inicio,dta_fim){
        console.log(counter);
        counter+=1;
        console.log(counter);
        var cliente ={
            cliente: cliente_nome,
            id:counter,
            conteiner: cont,
            tipo: tipo,
            status: status,
            categoria:categoria,
            movim: movs,
            dta_i: dta_inicio,
            dta_f: dta_fim
        }
        let db = firebase.database().ref("clientes/"+counter);
        db.set(cliente);
        document.getElementById("cardSection").innerHTML='';
        readCliente();

    }

    function readCliente(){
        var cliente = firebase.database().ref("clientes/");
        cliente.on("child_added",function(data){
            var clienteValue = data.val();
            
            document.getElementById("cardSection").innerHTML+=`
              <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${clienteValue.cliente}</h5>
                    <p class="card-text">ID: ${clienteValue.id}</p>
                    <p class="card-text">Nº do Contêiner: ${clienteValue.conteiner}</p>
                    <p class="card-text">Tipo: ${clienteValue.tipo}</p>
                    <p class="card-text">Status: ${clienteValue.status}</p>
                    <p class="card-text">Categoria: ${clienteValue.categoria}</p>
                    <p class="card-text">Movimentação: ${clienteValue.movim}</p>
                    <p class="card-text">Data e hora (início): ${clienteValue.dta_i}</p>
                    <p class="card-text">Data e hora (fim): ${clienteValue.dta_f}</p>
                    
                    <button type="submit" style="color: #fff" 
                    class="btn btn-warning" 
                    onclick="editarCliente(${clienteValue.id},'${clienteValue.cliente}',
                    '${clienteValue.conteiner}','${clienteValue.tipo}',
                    '${clienteValue.status}','${clienteValue.categoria}',
                    '${clienteValue.movim}','${clienteValue.dta_i}',
                    '${clienteValue.dta_f}')">Editar</button>
                    <button type="submit" class="btn btn-danger" 
                    onclick="deleteCliente(${clienteValue.id})">Deletar</button>


                </div> 
              </div>
            
            
            
            
            `
        });
}
function reset(){
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-4" id="form">
    <div class="form-group">
        <label>Cliente</label>
        <input type="text" class="form-control" id="cliente"
        placeholder="Digite o nome do cliente">

    </div>
    <br/>
    <div class="form-group">
        <label>N° do contêiner</label>
        <input type="text" class="form-control" id="cont"
        placeholder="Digite o número do contêiner">
    </div>
    <br/>
    <div class="form-group">
        <label>Tipo</label>
        <input type="number" class="form-control" id="tipo"
        placeholder="Digite o tipo">
    </div>
    <br/>
    <div class="form-group">
        <label>Status</label>
        <input type="text" class="form-control" id="status"
        placeholder="Digite o status">
    </div>
    <br/>
    <div class="form-group">
        <label>Categoria</label>
        <input type="text" class="form-control" id="categoria"
        placeholder="Digite a categoria">
    </div>
    <br/>
    <div class="form-group">
        <label>Movimentação</label>
        <input type="text" class="form-control" id="movs"
        placeholder="Informe a movimentação">
    </div>
    <br/>
    <div class="form-group">
        <label>Data e hora (Início)</label>
        <input type="datetime" class="form-control" id="dta_inicio"
        placeholder="Informe a data e hora do início ">
    </div>
    <br/>
    <div class="form-group">
        <label>Data e hora (Fim)</label>
        <input type="datetime" class="form-control" id="dta_fim"
        placeholder="Informe a data e hora do fim ">
    </div>

    <br/>
    <hr>
    <button type="submit" id="button1" 
    class="btn btn-primary">Adicionar Cliente</button>
    <button style="display: none" id="button2" class="btn btn-success">
    Editar</button>
    <button style="display: none" id="button3" class="btn btn-danger">Cancelar</button>

</form>
    `;


    document.getElementById("form").addEventListener("submit",(e)=>{
        var cliente =  document.getElementById("cliente").value;
        var cont = document.getElementById("cont").value;
        var tipo = document.getElementById("tipo").value;
        var status = document.getElementById("status").value;
        var categoria = document.getElementById("categoria").value;
        var movs = document.getElementById("movs").value;
        var dta_inicio = document.getElementById("dta_inicio").value;
        var dta_fim = document.getElementById("dta_fim").value;
        
        e.preventDefault();
        //console.log("Clinete:" + cliente + cont + tipo + status
        // + categoria + movs + dta_inicio + dta_fim);
        createCliente(cliente,cont,tipo,status,
        categoria,movs,dta_inicio,dta_fim);
        form.reset();
    });
    
}


function editarCliente(id,cliente,cont,tipo,status,
    categoria,movs,dta_inicio,dta_fim){

        document.getElementById("firstSection").innerHTML=`
        <form class="border p-4 mb-4" id="form2">
    <div class="form-group">
        <label>Cliente</label>
        <input type="text" class="form-control" id="cliente"
        placeholder="Digite o nome do cliente">

    </div>
    <br/>
    <div class="form-group">
        <label>N° do contêiner</label>
        <input type="text" class="form-control" id="cont"
        placeholder="Digite o número do contêiner">
    </div>
    <br/>
    <div class="form-group">
        <label>Tipo</label>
        <input type="number" class="form-control" id="tipo"
        placeholder="Digite o tipo">
    </div>
    <br/>
    <div class="form-group">
        <label>Status</label>
        <input type="text" class="form-control" id="status"
        placeholder="Digite o status">
    </div>
    <br/>
    <div class="form-group">
        <label>Categoria</label>
        <input type="text" class="form-control" id="categoria"
        placeholder="Digite a categoria">
    </div>
    <br/>
    <div class="form-group">
        <label>Movimentação</label>
        <input type="text" class="form-control" id="movs"
        placeholder="Informe a movimentação">
    </div>
    <br/>
    <div class="form-group">
        <label>Data e hora (Início)</label>
        <input type="datetime" class="form-control" id="dta_inicio"
        placeholder="Informe a data e hora do início ">
    </div>
    <br/>
    <div class="form-group">
        <label>Data e hora (Fim)</label>
        <input type="datetime" class="form-control" id="dta_fim"
        placeholder="Informe a data e hora do fim ">
    </div>

    <br/>
    <hr>
    <button style="display: none" id="button1" 
    class="btn btn-primary">Adicionar Cliente</button>
    <button style="display: inline-block" id="button2" class="btn btn-success">
    Editar</button>
    <button style="display: inline-block" id="button3" class="btn btn-danger">Cancelar</button>

</form>
        `;

        
    
    document.getElementById("form2").addEventListener("submit",(e)=>{
        e.preventDefault();
    });
    document.getElementById("button3").addEventListener("click",(e)=>{
        reset();
    });
    document.getElementById("button2").addEventListener("click",(e)=>{
        editarCliente2(id,document.getElementById("cliente").value,
        document.getElementById("cont").value,document.getElementById("tipo").value,
        document.getElementById("status").value,document.getElementById("categoria").value,
        document.getElementById("movs").value,document.getElementById("dta_inicio").value,
        document.getElementById("dta_fim").value);
    });
    document.getElementById("cliente").value=cliente;
    document.getElementById("cont").value=cont;
    document.getElementById("tipo").value=tipo;
    document.getElementById("status").value=status;
    document.getElementById("categoria").value=categoria;
    document.getElementById("movs").value=movs;
    document.getElementById("dta_inicio").value=dta_inicio;
    document.getElementById("dta_fim").value=dta_fim;
}

function editarCliente2(id,cliente,cont,tipo,status,
    categoria,movs,dta_inicio,dta_fim){
        var clienteEditado ={
            cliente: cliente,
            id:counter,
            conteiner: cont,
            tipo: tipo,
            status: status,
            categoria:categoria,
            movim: movs,
            dta_i: dta_inicio,
            dta_f: dta_fim
        }
        let db= firebase.database().ref("clientes/"+id);
        db.set(clienteEditado);

        document.getElementById("cardSection").innerHTML='';
        readCliente();
        reset();
    }
function deleteCliente(id){
    var cliente= firebase.database().ref("clientes/"+id);
    cliente.remove();
    reset();
    document.getElementById("cardSection").innerHTML='';
    readCliente();
}
