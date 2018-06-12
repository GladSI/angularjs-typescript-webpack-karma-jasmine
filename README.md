
# Statement of the test task

- Develop component
- Multiple selection of elements
- From a fixed list of values

## Example of use

    <select-form
      ng-model="selectedForms"
      forms="availableForms"
    >
    </select-form>

- selectedForms(ngModel): array of selected forms string[]
- availableForms: <{ formName: string, required: boolean }>[]
- formName: form name displayed in dropdown

## Implementation

- Focus on the functional part
- Styles-layout: minimally necessary for proper functioning
- Cover with tests

## Facilities

- AngularJS
- Typescript
- webpack
- karma-jasmine

## Requirements

- If the form is required:
  - form is required for selection
  - dropdown is displayed as disabled
  - the user can not delete/edit this form
  - these forms are automatically added to ngModel
- Each form presented in availableForms can be selected only once
- Dropdown must contain only the values ​​available for selection
- When you click the (+) button, a new dropdown appears:
  - with a list of free (not selected) forms
- The (+) button will not be displayed if all forms are selected
- Pressing the (X) button deletes the last dropdown
- Required dropdown can not be deleted
- You can not edit required forms
- You can edit the not required forms

## Using

$ npm start

$ npm test

$ npm run test:coverage

- Locally used host localhost:3000
- The coverage page is formed in build/coverage/report/index.html
