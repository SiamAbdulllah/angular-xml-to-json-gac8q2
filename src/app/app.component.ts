import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms'
import * as converter from 'xml-js';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  formGroup : FormGroup;
  outputXml : any ;
  inputXml : any;

  constructor(private _fb : FormBuilder){
  }

  selectFile(event){
    const reader = new FileReader();
    reader.onload = (e: any) => {
      let xml = e.target.result;
      this.inputXml = xml;
      let result1 = converter.xml2json(xml, {compact: true, spaces: 2});

      const JSONData = JSON.parse(result1);
      this.formGroup.patchValue(JSONData)
		}
    reader.readAsText(event.target.files[0])
  }

  createForm(){
    this.formGroup = this._fb.group({
        _declaration: {
          _attributes: {
            version: "1.0"
          }
        },
      Company : this._fb.group({
        Employee : this._fb.group({
          FirstName : this._fb.group({
            _text : [null]
          }),
          LastName : this._fb.group({
            _text : [null]
          }),
          ContactNo :  this._fb.group({
            _text : [null]
          }),
          Email : this._fb.group({
            _text : [null]
          }),
          Address : this._fb.group({
            City : this._fb.group({
              _text : [null]
            }),
            State : this._fb.group({
              _text : [null]
            }),
            Zip : this._fb.group({
              _text : [null]
            })
          }),
          
        })
      })
    })
  }

  ngOnInit(){
    this.createForm();
  }
  onSave(){
    const str = JSON.stringify(this.formGroup.value);
    this.outputXml = converter.json2xml(str, {compact: true,spaces: 4});
  }
}