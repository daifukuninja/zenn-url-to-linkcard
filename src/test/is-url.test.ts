import { validateUrl } from '../is-url';

describe('is-url', () => {
  it('check url strings to be true', () => {
    expect(validateUrl("https://zenn.dev/")).toBe(true);
    expect(validateUrl("https://booth.pm/ja/browse/%E6%8A%80%E8%A1%93%E6%9B%B8?in_stock=true&sort=new")).toBe(true);
    expect(validateUrl("https://github.com/type-challenges/type-challenges/blob/main/README.ja.md")).toBe(true);
    expect(validateUrl("https://zenn.dev/daifukuninja/feed")).toBe(true);
    expect(validateUrl("https://news.google.com/home?hl=ja&gl=JP&ceid=JP%3Aja")).toBe(true);
    expect(validateUrl("https://translate.google.co.jp/?hl=ja&sl=ja&tl=en&text=%E8%A4%87%E6%95%B0%E8%A1%8C%E3%81%AE%E4%B8%80%E6%8B%AC%E5%A4%89%E6%8F%9B&op=translate")).toBe(true);
    expect(validateUrl("https://stackoverflow.com/questions/55680391/typescript-error-ts2403-subsequent-variable-declarations-must-have-the-same-typ")).toBe(true);
  });
  it('check not url strings to be false', () => {
    expect(validateUrl("テスト")).toBe(false);
  });
});
