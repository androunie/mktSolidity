import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Config} from 'codelyzer';
import { uuid } from 'uuidv4';


@Injectable({
  providedIn: 'root'
})
export class ApacheService {

  configUrl = 'assets/config.json';

  constructor(public http: HttpClient) { }

  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }

  getSpark() {
    return this.http.get('http://snomed.info/id/386068004');
  }

  getAllCancers() {
    console.log('rentre getAllCancers');
    return this.http.get('https://sparql.nextnet.top/snowmedct/query?query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX+owl%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0APREFIX+skos%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%0A%0A%0A%0ASELECT+%3Fsubject+%3Flabel%0AWHERE+%7B%0A++%3Fsubject+rdfs%3AsubClassOf+%3Chttp%3A%2F%2Fsnomed.info%2Fid%2F86049000%3E%0A++%0A++OPTIONAL+%7B%0A++%3Fsubject+rdfs%3Alabel+%3Flabel%0A%7D%0A++%0A%7D%0A%0ALIMIT+100');
  }

  semanticDataReceived(event) {
    const response = JSON.parse(event.target.response);
    const select = document.getElementById(event.target.scope);

    for (const match of response['results']['bindings']) {
      const element = document.createElement('option');
      element.append(match['label']['value']);
      element.setAttribute('value', match['subject']['value']);
      select.append(element);
    }

    select.addEventListener('change', onselectionchange);
    const uuid1 = uuid();
    select.setAttribute('selectedChild', uuid1);

    const div = document.createElement('div');
    const label = document.createElement('label');
    div.append(label);

    label.setAttribute('for', uuid1);
    label.append('subtype');
    const newSelect = document.createElement('select');
    newSelect.setAttribute('id', uuid1);

    const optionAny = document.createElement('option');
    optionAny.setAttribute('value', 'any');
    optionAny.append('any')

    newSelect.append(optionAny);
    div.append(newSelect);
    select.insertAdjacentElement('afterend', div);
    div.style.display = 'none';
  }

  loadSemanticData(snowmed_id, scope) {

    const query = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>' +
      'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema# >' +
      'PREFIX owl: <http://www.w3.org/2002/07/owl# >' +
      'PREFIX xsd: <http://www.w3.org/2001/XMLSchema# >' +
      'PREFIX skos: <http://www.w3.org/2004/02/skos/core# >' +
      'SELECT ?subject ?label' +
      'WHERE {' +
      '?subject rdfs:subClassOf <"' + snowmed_id  +
      'OPTIONAL { ' +
      '?subject rdfs:subClassOf <' + snowmed_id  +
      '}' +
      '}' +
      'LIMIT 100';

    const oReq = new XMLHttpRequest();
    console.log('oReq');
    console.log(oReq);

    oReq.open('POST', 'https://sparql.nextnet.top/snowmedct/query');

    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    oReq.addEventListener('load', this.semanticDataReceived);

    oReq.send('query=' + encodeURIComponent(query));
  }
}
