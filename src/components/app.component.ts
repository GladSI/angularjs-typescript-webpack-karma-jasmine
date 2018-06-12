import { Component } from 'angular-ts-decorators';

interface IAvailableForm {
  formName: string;
  required: boolean;
}

const template = require('./app.html');

@Component({
  selector: 'app',
  template,
})
export class AppComponent implements ng.IComponentController {

  /*
   * Known available forms
   */
  public formsNames = [
    'forms1',
    'forms2',
    'forms3',
  ];

  public availableForms: { [formsName: string]: IAvailableForm[] } = {};
  public selectedForms: { [formsName: string]: string[] } = {};

  /*@ngInject*/
  constructor(private $http: ng.IHttpService) {}

  /* tslint:disable:member-access */

  $onInit() {
    this.formsNames.forEach((formsName) => {
      this.fetchAvailableForms(formsName)
        .then((availableForms: IAvailableForm[]) => {
          this.availableForms[formsName] = availableForms;
          this.selectedForms[formsName] = [];
        });
    });
  }

  /* tslint:enable:member-access */

  public getSelectedForms(formName: string) {
    return this.selectedForms[formName];
  }

  private fetchAvailableForms(formsName: string) {
    return this.$http.get(`../${formsName}.json`)
      .then((response) => {
        return response.data;
      });
  }
}
