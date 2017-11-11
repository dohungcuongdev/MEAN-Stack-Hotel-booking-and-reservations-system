import { CuongPage } from './app.po';

describe('Cuong App', function() {
  let page: CuongPage;

  beforeEach(() => {
    page = new CuongPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
