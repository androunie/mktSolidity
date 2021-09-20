 function testJs() {
    alert('alert MSG ! ');
  }

 export function hello() {
   console.log('hello world');
 }

 export function uuidv4() {
   console.log('xxx');

   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
     return v.toString(16);
   });
 }


 export function onSelectChange(evt) {
   evt.target.disabled=true;
   var uuid=evt.target.getAttribute("selectedChild");

   var child_select = document.getElementById(uuid);
   console.log(child_select);
   child_select.parentElement.style.display="block";

   loadSemanticData(evt.target.selectedOptions[0].getAttribute("value"),uuid);
 }

 export function semanticDataReceived(evt) {
   var response = JSON.parse(evt.target.response);

   var select = document.getElementById(evt.target.scope);

   for (let match of response["results"]["bindings"]) {
     let element = document.createElement("option");
     element.append(match["label"]["value"]);
     element.setAttribute("value", match["subject"]["value"]);
     select.append(element);
   }

   select.addEventListener("change", onSelectChange);
   var uuid = uuidv4();
   select.setAttribute("selectedChild", uuid);

   var div = document.createElement("div");
   var label = document.createElement("label");
   div.append(label);

   label.setAttribute("for", uuid);
   label.append("subtype");
   var newSelect = document.createElement("select");
   newSelect.setAttribute("id", uuid);

   var optionAny = document.createElement("option");
   optionAny.setAttribute("value", "any");
   optionAny.append("any");

   newSelect.append(optionAny);
   div.append(newSelect);
   select.insertAdjacentElement("afterend", div);
   div.style.display = "none";
 }

 export function loadSemanticData(snowmed_id, scope) {
   console.log(snowmed_id + ";" + scope);
   var query =
     "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
 PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
 PREFIX owl: <http://www.w3.org/2002/07/owl#>\
 PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\
 PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
 \
 \
 \
 SELECT ?subject ?label \
 WHERE {\
   ?subject rdfs:subClassOf <" +
     snowmed_id +
     ">\
   \
   OPTIONAL {\
   ?subject rdfs:label ?label\
 }\
 \
 }\
 \
 LIMIT 100";

   this.serverTest = new XMLHttpRequest();
   this.server.open(this.method, this.url, true);
   this.server.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

   var oReq = new XMLHttpRequest();
   console.log(oReq);


   oReq.open('POST', 'https://sparql.nextnet.top/snowmedct/query', true);
   console.log(oReq.open("POST", "https://sparql.nextnet.top/snowmedct/query"));

   oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   oReq.setRequestHeader("Access-Control-Allow-Origin", "*");
   console.log(oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded"));


   oReq.addEventListener("load", semanticDataReceived);
   console.log(oReq.addEventListener("load", semanticDataReceived));

   oReq.scope = scope;
   console.log(oReq.scope = scope);

   oReq.send("query=" + encodeURIComponent(query));
   console.log(oReq.send("query=" + encodeURIComponent(query)));

 }

