declare module "*.vue" {  // fixes .vue imports in .ts files
    import type {DefineComponent} from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
