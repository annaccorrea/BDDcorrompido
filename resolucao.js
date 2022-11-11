const config = require("./broken-database.json");
const fs = require("fs");


//função para trazer infos do arquivo json

//function readJson() {
  var jsonString = fs.readFileSync("./broken-database.json", "utf8");
  var jsonObject = JSON.parse(jsonString);
  //ref: https://heynode.com/tutorial/readwrite-json-files-nodejs/


//função para corrigir os nomes

function fixNome(data){
  var name = data.name;
  var teste = name.replace(/ø/gi, 'o');
      teste = teste.replace(/¢/gi, 'c');
      teste = teste.replace(/æ/gi, 'a');
      teste = teste.replace(/ß/gi, 'b');
      data['name'] = teste;
}

fixNome(jsonObject[0]);
fixNome(jsonObject[1]);
fixNome(jsonObject[2]);
fixNome(jsonObject[3]);
fixNome(jsonObject[4]);
fixNome(jsonObject[5]);
fixNome(jsonObject[6]);
fixNome(jsonObject[7]);
fixNome(jsonObject[8]);
fixNome(jsonObject[9]);


//função para corrigir os preços

jsonObject[0].price = parseFloat(jsonObject[0].price);
jsonObject[1].price = parseFloat(jsonObject[1].price);
jsonObject[2].price = parseFloat(jsonObject[2].price);
jsonObject[3].price = parseFloat(jsonObject[3].price);
jsonObject[4].price = parseFloat(jsonObject[4].price);
jsonObject[5].price = parseFloat(jsonObject[5].price);
jsonObject[6].price = parseFloat(jsonObject[6].price);
jsonObject[7].price = parseFloat(jsonObject[7].price);
jsonObject[8].price = parseFloat(jsonObject[8].price);
jsonObject[9].price = parseFloat(jsonObject[9].price);
  

//função para corrigir as quantidades

function fixQtd(data){
      if(!data.hasOwnProperty('quantity')){
        data.quantity = 0;
    }
  }
fixQtd(jsonObject[0]);
fixQtd(jsonObject[1]);
fixQtd(jsonObject[2]);
fixQtd(jsonObject[3]);
fixQtd(jsonObject[4]);
fixQtd(jsonObject[5]);
fixQtd(jsonObject[6]);
fixQtd(jsonObject[7]);
fixQtd(jsonObject[8]);
fixQtd(jsonObject[9]);
  

    //validação do banco de dados corrigido 

//f1. funçao para ordenar por id em ordem crescente
  jsonObject.sort(function(a, b){
    if(a.id < b.id) { 
      return -1; 
}
    if(a.id > b.id){
      return 1; }
    return 0;
})

//f2. função para ordenar primeiro por categoria em ordem alfabética

 jsonObject.sort(function(a, b){
  if(a.category < b.category) { 
    return -1; 
}
  if(a.category > b.category){
    return 1; }
  return 0;
}) //ref f1 e f2: https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript


// função para calcular o valor total do estoque por categoria
function qbC(data) {
  var categoria;
  var estoque = [];
  for(i in data) {
      categoria = data[i].category;
      estoque[categoria] = 0;
      for(let j in data) {
        categoria = data[j].category;
        estoque[categoria] = data[j].quantity * data[j].price;
      }
  }
    console.log(estoque);
}

  qbC(jsonObject);

  console.log(jsonObject);


 // exportar um arquivo JSON com o banco corrigido 

function exportA(jsonObject){
    var str = JSON.stringify(jsonObject);
    fs.writeFileSync("saida.json", str); 
    console.log("File written successfully\n"); 
 }
  exportA(jsonObject);

//ref: https://www-geeksforgeeks-org.cdn.ampproject.org/v/s/www.geeksforgeeks.org/node-js-fs-writefilesync-method/amp/?amp_gsa=1&amp_js_v=a9&usqp=mq331AQKKAFQArABIIACAw%3D%3D#amp_tf=De%20%251%24s&aoh=16484222289466&referrer=https%3A%2F%2Fwww.google.com&ampshare=https%3A%2F%2Fwww.geeksforgeeks.org%2Fnode-js-fs-writefilesync-method%2F

 