
export class ToLowerValueConverter {
  toView(t) {
    return t.toUpperCase();
  }
  fromView(t) {
    return t.toLowerCase();
  }
}
