import { NgModule } from 'angular-ts-decorators';

import { AppComponent } from './components/app.component';
import { routes } from './app.routes';
import { FormsModule } from './components/forms.module';

export interface IComponentState extends ng.ui.IState {
  state: string;
  component?: any;
  views?: { [name: string]: IComponentState };
  template?: string;
}

@NgModule({
  id: 'app',
  imports: [
    FormsModule,
  ],
  declarations: [
    AppComponent,
  ],
})
export class AppModule {

  private static setTemplate(state: IComponentState) {
    const selector = state.component.selector;
    state.template = `<${selector}></${selector}>`;
    delete state.component;
  }

  private static provideStates(states: IComponentState[], $stateProvider: ng.ui.IStateProvider) {
    states.map((config) => {
      const name = config.state;
      const namedState = config.views;
      if (namedState) {
        const namedViews = Object.keys(namedState);
        namedViews.forEach((view) => {
          AppModule.setTemplate(namedState[view]);
        });
      } else {
        AppModule.setTemplate(config);
      }
      delete config.state;
      return {name, config};
    })
      .forEach((state) => $stateProvider.state(state.name, state.config));
  }

  /* tslint:disable:member-access */

  /*@ngInject*/
  config($urlRouterProvider: ng.ui.IUrlRouterProvider, $stateProvider: ng.ui.IStateProvider) {
    AppModule.provideStates(routes, $stateProvider);
    $urlRouterProvider.otherwise('/');
  }

  /*@ngInject*/
  run($window: ng.IWindowService, $q: ng.IQService) {
    // replace browser Promise to $q in app
    $window.Promise = $q;
  }

  /* tslint:enable:member-access */
}
