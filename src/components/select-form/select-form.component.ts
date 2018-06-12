import { Component, Input } from 'angular-ts-decorators';

interface IAvailableForm {
  formName: string;
  required: boolean;
}

// @ts-ignore: 'SELECTION_WIDTH' is declared but its value is never read.
const SELECTION_WIDTH = '300px';
const template = require('./select-form.html');

@Component({
  selector: 'selectForm',
  template,
})
export class SelectFormComponent implements ng.IComponentController {
  // available forms
  @Input() public forms: IAvailableForm[];
  // selected forms
  @Input() public ngModel: string[];

  /*
   *  [
   *    dropdownIdx: selectedFormIdx,
   *    ...
   *  ]
   */
  public currentSelectedForms: number[] = [];

  public selectionStyle = {
    width : SELECTION_WIDTH,
  };

  private distributionOfForms: boolean[] = [];
  private requiredForms = 0;

  /*@ngInject*/
  constructor() {
    this.forms = [];
    this.ngModel = [];
  }

  public getFormsForDistribution(currentIdx: number): number[] {
    const notYetDistributedForms: number[] = [currentIdx];
    for (let i = 0; i < this.distributionOfForms.length; ++i) {
      if (!this.distributionOfForms[i]) {
        notYetDistributedForms.push(i);
      }
    }
    notYetDistributedForms.sort((a, b) => a - b);
    return notYetDistributedForms;
  }

  public setSelectedForms(): void {
    this.correctDistributionOfForms();
    this.ngModel.length = 0;
    this.ngModel.push(...this.getCurrentSelectedForms());
  }

  public addFormSelection(): void {
    if (this.canAddFormSelection()) {
      const notDistributedFormIdx = this.getFirstUndistributedFormIdx();
      this.currentSelectedForms.push(notDistributedFormIdx);
      this.setSelectedForms();
    }
  }

  public deleteFormSelection(): void {
    if (this.canDeleteFormSelection()) {
      this.currentSelectedForms.pop();
      this.setSelectedForms();
    }
  }

  public canAddFormSelection(): boolean {
    return (this.getFirstUndistributedFormIdx() !== -1);
  }

  public canShowAddButton(): boolean {
    return this.canAddFormSelection();
  }

  public canDeleteFormSelection(): boolean {
    const alreadySelectedForms = this.currentSelectedForms.length;
    return alreadySelectedForms > 1 && alreadySelectedForms > this.requiredForms;
  }

  public canShowDeleteButton(): boolean {
    return this.canDeleteFormSelection();
  }

  public canEditForm(formIdx: number): boolean {
    return !this.forms[formIdx].required;
  }

  /* tslint:disable:member-access */

  $onChanges(changes: ng.IOnChangesObject) {
    if (changes.forms && changes.forms.currentValue) {
      this.initDistributionOfForms();
    }
  }

  /* tslint:enable:member-access */

  private getCurrentSelectedForms(): string[] {
    const alreadySelectedForms: string[] = [];
    for (let i = 0; i < this.distributionOfForms.length; ++i) {
      if (this.distributionOfForms[i]) {
        alreadySelectedForms.push(this.forms[i].formName);
      }
    }
    return alreadySelectedForms;
  }

  private correctDistributionOfForms(): void {
    for (let i = 0; i < this.distributionOfForms.length; ++i) {
      this.distributionOfForms[i] = false;
    }
    this.currentSelectedForms.forEach((availableFormIdx) => {
      this.distributionOfForms[availableFormIdx] = true;
    });
  }

  private getFirstUndistributedFormIdx(): number {
    for (let i = 0; i < this.distributionOfForms.length; ++i) {
      if (!this.distributionOfForms[i]) {
        return i;
      }
    }
    return -1;
  }

  private initDistributionOfForms(): void {
    this.currentSelectedForms = [];
    this.distributionOfForms = new Array(this.forms.length);

    // add required forms
    this.requiredForms = 0;
    this.forms.forEach((form, index) => {
      if (form.required) {
        ++this.requiredForms;

        this.currentSelectedForms.push(index);
        this.distributionOfForms[index] = true;
      } else {
        this.distributionOfForms[index] = false;
      }
    });

    // add selected form for first selection
    if (this.canAddFormSelection()) {
      const notDistributedFormIdx = this.getFirstUndistributedFormIdx();
      this.currentSelectedForms.push(notDistributedFormIdx);
      this.distributionOfForms[notDistributedFormIdx] = true;
    }

    this.setSelectedForms();
  }
}
