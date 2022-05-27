export class Breadcrumb {
  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }

  title: string;

  url: string;

  type: string;
}
