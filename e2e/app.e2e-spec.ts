import { AngularAlbumifyPage } from './app.po';

describe('angular-albumify App', () => {
  let page: AngularAlbumifyPage;

  beforeEach(() => {
    page = new AngularAlbumifyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
