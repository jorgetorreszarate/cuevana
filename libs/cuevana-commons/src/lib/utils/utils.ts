export class Utils {
  static slugify(text: string): string {
    if (!text) return '';

    return text
      .toLowerCase()
      .normalize("NFD") // Descompone los caracteres con tildes en su forma base + tilde
      .replace(/[\u0300-\u036f]/g, "") // Elimina los caracteres diacríticos (tildes, etc.)
      .replace(/\s+/g, "-") // Reemplaza los espacios con guiones
      .replace(/[^a-z0-9-]/g, "") // Elimina caracteres especiales excepto guiones
      .replace(/-+/g, "-") // Reemplaza múltiples guiones por uno solo
      .trim(); // Elimina espacios al inicio y final
  }
}