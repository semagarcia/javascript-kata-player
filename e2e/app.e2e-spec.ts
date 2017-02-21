import { GftFightsPage } from './app.po';

describe('gft-fights App', function() {
  let page: GftFightsPage;

  beforeEach(() => {
    page = new GftFightsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
