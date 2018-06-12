import * as angular from 'angular';
import { NgModule } from 'angular-ts-decorators';
import { AppModule } from './main';

angular.element(document)
  .ready(() => {
    const ngModule = (AppModule as NgModule).module;
    if (ngModule) {
      angular.bootstrap(document, [ngModule.name], {strictDi: true});
    }
});
