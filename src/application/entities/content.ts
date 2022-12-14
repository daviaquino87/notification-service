export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validateLegthContent(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentValidate = this.validateLegthContent(content);

    if (!isContentValidate) {
      throw new Error('Content leht is invalid!');
    }

    this.content = content;
  }
}
