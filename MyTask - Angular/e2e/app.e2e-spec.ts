import { MyTaskPage } from './app.po';

describe('my-task App', () => {
  let page: MyTaskPage;

  beforeEach(() => {
    page = new MyTaskPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
