declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

interface ImportMetaEnv {
  readonly VITE_API_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
