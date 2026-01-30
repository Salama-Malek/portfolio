declare module "aos" {
  interface AOS {
    init(options?: Record<string, unknown>): void;
    refresh(): void;
    refreshHard(): void;
  }

  const aos: AOS;
  export default aos;
}
