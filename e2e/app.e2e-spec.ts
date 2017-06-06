import { AngularComponentFormPage } from './app.po';

describe('angular-component-form App', () => {
  let page: AngularComponentFormPage;

  beforeEach(() => {
    page = new AngularComponentFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
